from fastapi import APIRouter
from pydantic import BaseModel

from services.search_service import search_documents
from services.llm_service import generate_answer
from services.memory_service import add_message
from services.rewrite_service import rewrite_question

router = APIRouter()


class ChatRequest(BaseModel):
    question: str


@router.post("/chat")
async def chat(request: ChatRequest):

    # Rewrite follow-up question into a standalone question
    rewritten_question = rewrite_question(request.question)

    # Retrieve relevant chunks using the rewritten question
    results = search_documents(rewritten_question)

    # Build context for the LLM
    context = "\n\n".join(
        item["document"]
        for item in results
    )

    # Generate answer using the rewritten question
    answer = generate_answer(
        question=rewritten_question,
        context=context
    )

    # Save the ORIGINAL user question
    add_message(
        role="user",
        content=request.question
    )

    # Save assistant answer
    add_message(
        role="assistant",
        content=answer
    )

    # Remove duplicate sources
    seen = set()
    sources = []

    for item in results:
        metadata = item["metadata"]

        key = (
            metadata["filename"],
            metadata["chunk"]
        )

        if key in seen:
            continue

        seen.add(key)

        sources.append({
            "filename": metadata["filename"],
            "chunk": metadata["chunk"]
        })

    return {
        "question": request.question,
        "rewritten_question": rewritten_question,
        "answer": answer,
        "sources": sources
    }