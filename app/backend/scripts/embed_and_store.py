from pathlib import Path
import os
import json
import psycopg2
from dotenv import load_dotenv
from openai import OpenAI

# Load .env from backend root no matter where script is run from
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(env_path)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

DATA_FILE = Path(__file__).resolve().parent.parent / "data" / "kevinsInfo.json"


def get_db_connection():
    return psycopg2.connect(
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT"),
    )


def create_table(conn):
    with conn.cursor() as cur:
        cur.execute("""
            CREATE EXTENSION IF NOT EXISTS vector;

            CREATE TABLE IF NOT EXISTS portfolio_embeddings (
                id SERIAL PRIMARY KEY,
                section TEXT NOT NULL,
                content TEXT NOT NULL,
                embedding VECTOR(1536) NOT NULL
            );
        """)
    conn.commit()


def load_profile():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def flatten_profile(profile: dict) -> list[tuple[str, str]]:
    chunks = []

    # Bio
    if profile.get("bio"):
        chunks.append(("bio", profile["bio"]))

    # General summary — catches broad questions like "tell me about kevin" or "who is kevin"
    if profile.get("general_summary"):
        chunks.append(("general_summary", profile["general_summary"]))

    # Work history summary — conversational chunk for casual questions like "where has kevin worked"
    if profile.get("work_history_summary"):
        chunks.append(("work_history_summary", profile["work_history_summary"]))

    # Education (supports both dict and list formats)
    edu = profile.get("education", {})
    if isinstance(edu, list):
        for entry in edu:
            parts = [
                f"School: {entry.get('school', '')}",
                f"Degree: {entry.get('degree', '')}",
                f"Graduation: {entry.get('graduation', '')}",
            ]
            if entry.get("status"):
                parts.append(f"Status: {entry['status']}")
            if entry.get("coursework"):
                parts.append(f"Relevant Coursework: {', '.join(entry['coursework'])}")
            chunks.append(("education", "\n".join(parts)))
    elif edu:
        edu_text = (
            f"School: {edu.get('school', '')}\n"
            f"Degree: {edu.get('degree', '')}\n"
            f"Graduation: {edu.get('graduation', '')}\n"
            f"Relevant Coursework: {', '.join(edu.get('coursework', []))}"
        )
        chunks.append(("education", edu_text))

    # Skills
    skills = profile.get("skills", {})
    for key, values in skills.items():
        if values:
            chunks.append((f"skills_{key}", f"{key}: {', '.join(values)}"))

    # Experience
    for exp in profile.get("experience", []):
        text = (
            f"Role: {exp.get('role', '')}\n"
            f"Company: {exp.get('company', '')}\n"
            f"Duration: {exp.get('duration', '')}\n"
            f"Description: {exp.get('description', '')}\n"
            f"Impact: {' | '.join(exp.get('impact', []))}"
        )
        chunks.append(("experience", text))

    # Projects
    for proj in profile.get("projects", []):
        text = (
            f"Project: {proj.get('name', '')}\n"
            f"Description: {proj.get('description', '')}\n"
            f"Details: {' | '.join(proj.get('details', []))}\n"
            f"Tech: {', '.join(proj.get('tech', []))}"
        )
        chunks.append(("project", text))

    # Leadership
    for lead in profile.get("leadership", []):
        text = (
            f"Role: {lead.get('role', '')}\n"
            f"Organization: {lead.get('organization', '')}\n"
            f"Duration: {lead.get('duration', '')}\n"
            f"Description: {lead.get('description', '')}\n"
            f"Impact: {' | '.join(lead.get('impact', []))}"
        )
        chunks.append(("leadership", text))

    # Personality
    personality = profile.get("personality", {})
    if personality.get("about"):
        chunks.append(("personality_about", personality["about"]))

    for key in ["hobbies", "interests_extended", "favorite_foods", "fun_facts"]:
        values = personality.get(key, [])
        if values:
            chunks.append((f"personality_{key}", " | ".join(values)))

    # Goals
    if profile.get("goals"):
        chunks.append(("goals", profile["goals"]))

    # Contact
    contact = profile.get("contact", {})
    if contact:
        contact_text = "\n".join(f"{k}: {v}" for k, v in contact.items())
        chunks.append(("contact", contact_text))

    # QA variants — each topic becomes one chunk combining question phrasings + answer
    for qa in profile.get("qa_variants", []):
        topic = qa.get("topic", "qa")
        variants = qa.get("variants", [])
        answer = qa.get("answer", "")
        if variants and answer:
            text = (
                f"Questions people might ask: {' | '.join(variants)}\n"
                f"Answer: {answer}"
            )
            chunks.append((f"qa_{topic}", text))

    return chunks


def get_embedding(text: str) -> list[float]:
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding


def clear_existing_embeddings(conn):
    with conn.cursor() as cur:
        cur.execute("DELETE FROM portfolio_embeddings;")
    conn.commit()


def store_embeddings(conn, chunks: list[tuple[str, str]]):
    with conn.cursor() as cur:
        for section, content in chunks:
            embedding = get_embedding(content)
            cur.execute("""
                INSERT INTO portfolio_embeddings (section, content, embedding)
                VALUES (%s, %s, %s::vector)
            """, (section, content, embedding))
    conn.commit()


def main():
    print("Loading profile...")
    profile = load_profile()

    print("Flattening profile into chunks...")
    chunks = flatten_profile(profile)
    print(f"Prepared {len(chunks)} chunks")

    print("Connecting to database...")
    conn = get_db_connection()

    try:
        print("Creating table...")
        create_table(conn)

        print("Clearing old embeddings...")
        clear_existing_embeddings(conn)

        print("Generating and storing embeddings...")
        store_embeddings(conn, chunks)

        print("Done. Embeddings stored successfully.")
    finally:
        conn.close()


if __name__ == "__main__":
    main()