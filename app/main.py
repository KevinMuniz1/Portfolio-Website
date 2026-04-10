import os
from typing import List, Dict, Any
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from openai.types.chat import ChatCompletionMessageParam
from retrieval import retrieve_chunks

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","https://kevinmuniz.dev"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str
    sources: List[Dict[str, Any]]

@app.get("/")
def root():
    return {"message": "Portfolio chatbot backend is running."}

@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    question = request.message
    chunks = retrieve_chunks(question, limit=5)
    context = "\n\n".join([chunk["content"] for chunk in chunks])
    messages: list[ChatCompletionMessageParam] = [
        {
            "role": "system",
            "content": (
                "You are Kevin Muniz's portfolio assistant. "
                "Answer ONLY using the provided context. "
                "If the answer is not contained in the context, say you do not know "
                "or that the information is not available in Kevin's portfolio data. "
                "Be clear, professional, and concise."
            )
        },
        {
            "role": "user",
            "content": f"Context:\n{context}\n\nQuestion:\n{question}"
        }
    ]
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages
    )
    reply = response.choices[0].message.content
    return {
        "reply": reply,
        "sources": [{"section": chunk["section"]} for chunk in chunks]
    }