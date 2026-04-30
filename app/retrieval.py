import os
from typing import Any, Dict, List

from psycopg2.pool import ThreadedConnectionPool
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

_pool = ThreadedConnectionPool(
    minconn=2,
    maxconn=10,
    dbname=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    host=os.getenv("DB_HOST"),
    port=os.getenv("DB_PORT"),
)


def expand_query(question: str) -> List[str]:
    """Ask GPT to rephrase the question 2 ways, return all 3 versions."""
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": (
                    "You rephrase questions into 2 alternative versions to improve search results. "
                    "Return ONLY the 2 rephrases, one per line, no numbering or extra text."
                )
            },
            {
                "role": "user",
                "content": f"Rephrase this question 2 ways:\n{question}"
            }
        ],
        max_tokens=100,
        temperature=0.3,
    )
    content = response.choices[0].message.content or ""
    rephrases = content.strip().splitlines()
    # Return original + rephrases, capped at 3 total
    return [question] + [r.strip() for r in rephrases if r.strip()][:2]


def get_embeddings(texts: List[str]) -> List[List[float]]:
    """Embed multiple texts in a single API call."""
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=texts
    )
    # Results come back in the same order as input
    return [item.embedding for item in response.data]


def retrieve_chunks(question: str, limit: int = 5) -> List[Dict[str, Any]]:
    # Step 1: expand the question into 3 versions
    queries = expand_query(question)

    # Step 2: embed all versions in one API call
    embeddings = get_embeddings(queries)

    conn = _pool.getconn()
    try:
        cur = conn.cursor()
        seen_contents = set()
        results = []

        # Step 3: search with each embedding and merge unique results
        for embedding in embeddings:
            cur.execute(
                """
                SELECT content, section
                FROM portfolio_embeddings
                ORDER BY embedding <=> %s::vector
                LIMIT %s;
                """,
                (str(embedding), limit)
            )
            for content, section in cur.fetchall():
                if content not in seen_contents:
                    seen_contents.add(content)
                    results.append({"content": content, "section": section})

        cur.close()
        # Return the top `limit` unique chunks across all queries
        return results[:limit]

    finally:
        _pool.putconn(conn)
