import json
import os
from typing import Any, Dict, List

import psycopg2
from dotenv import load_dotenv
from openai import OpenAI



load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def get_db_connection():
    return psycopg2.connect(
         dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT"),
    )


def get_embedding(text: str) -> List[float]:
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding


def retrieve_chunks(question: str, limit: int = 5) -> List[Dict[str, Any]]:
    query_embedding = get_embedding(question)

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute(
            """
            SELECT content, section
            FROM portfolio_embeddings
            ORDER BY embedding <-> %s::vector
            LIMIT %s;
            """,
            (str(query_embedding), limit)
        )

        rows = cur.fetchall()

        results = []
        for row in rows:
            content, section = row

            results.append({
                "content": content,
                "section": section
            })

        return results

    finally:
        cur.close()
        conn.close()