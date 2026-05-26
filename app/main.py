import os
import asyncio
from dotenv import load_dotenv
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from openai import AsyncOpenAI
from openai.types.chat import ChatCompletionMessageParam
from retrieval import retrieve_chunks

load_dotenv()
async_client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://kevinmuniz.dev", "https://www.kevinmuniz.dev"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SYSTEM_PROMPT = (
    "You are Kevin Muniz's portfolio assistant. "
    "Answer using the provided context. If you can reason an answer from the context, do so. "
    "If the context has no relevant information to answer the question, say you're not sure but let the user know they can reach Kevin directly at Muniz.Kevin@outlook.com. "
    "Keep answers short and to the point — 1 to 3 sentences max unless the question genuinely requires more detail. "
    "Do not repeat information or pad your response."
)


@app.get("/")
def root():
    return {"message": "Portfolio chatbot backend is running."}


@app.websocket("/ws/chat")
async def ws_chat(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_json()
            question = data.get("message", "").strip()
            if not question:
                continue

            chunks = await asyncio.to_thread(retrieve_chunks, question, 10)
            context = "\n\n".join([chunk["content"] for chunk in chunks])

            messages: list[ChatCompletionMessageParam] = [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"Context:\n{context}\n\nQuestion:\n{question}"},
            ]

            stream = await async_client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,
                stream=True,
            )
            async for chunk in stream:
                token = chunk.choices[0].delta.content
                if token:
                    await websocket.send_text(token)

            await websocket.send_text("[DONE]")
    except WebSocketDisconnect:
        pass
    except Exception:
        try:
            await websocket.send_text("[DONE]")
        except Exception:
            pass
