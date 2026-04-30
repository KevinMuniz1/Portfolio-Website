import os
from typing import Any, Dict, List

import psycopg2
from psycopg2 import pool
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Connection pool — keeps 2 connections open, scales up to 10 under load
_pool = psycopg2.pool.ThreadedConnectionPool(
    minconn=2,
    maxconn=10,
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

    # Borrow a connection from the pool instead of opening a new one
    conn = _pool.getconn()
    try:
        cur = conn.cursor()
        cur.execute(
            """
            SELECT content, section
            FROM portfolio_embeddings
            ORDER BY embedding <=> %s::vector
            LIMIT %s;
            """,
            (str(query_embedding), limit)
        )
        rows = cur.fetchall()
        cur.close()
        return [{"content": row[0], "section": row[1]} for row in rows]
    finally:
        # Return connection to pool so the next request can reuse it
        _pool.putconn(conn)
