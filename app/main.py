import os
from typing import List, Dict, Any, Generator
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from openai import OpenAI
from openai.types.chat import ChatCompletionMessageParam
from retrieval import retrieve_chunks

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://kevinmuniz.dev", "https://portfolio-website-production-0660.up.railway.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def root():
    return {"message": "Portfolio chatbot backend is running."}

@app.post("/chat")
def chat(request: ChatRequest):
    question = request.message
    chunks = retrieve_chunks(question, limit=5)
    context = "\n\n".join([chunk["content"] for chunk in chunks])

    messages: list[ChatCompletionMessageParam] = [
        {
            "role": "system",
            "content": (
                "You are Kevin Muniz's portfolio assistant. "
                "Answer using the provided context. If you can reason an answer from the context, do so. "
                "Only say you don't know if the context has truly no relevant information. "
                "Be clear, professional, and concise."
            )
        },
        {
            "role": "user",
            "content": f"Context:\n{context}\n\nQuestion:\n{question}"
        }
    ]

    # stream=True tells OpenAI to send tokens as they're generated
    def generate() -> Generator[str, None, None]:
        stream = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            stream=True,
        )
        for chunk in stream:
            token = chunk.choices[0].delta.content
            if token:
                yield token

    # StreamingResponse forwards each token to the frontend as it arrives
    return StreamingResponse(generate(), media_type="text/plain")
