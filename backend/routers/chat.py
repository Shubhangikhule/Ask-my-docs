import time

from fastapi import APIRouter
from pydantic import BaseModel

from services.search_service import search_documents
from services.llm_service import generate_answer
from services.memory_service import add_message
from services.rewrite_service import rewrite_question
from services.query_expansion_service import expand_query

router = APIRouter()


class ChatRequest(BaseModel):
    question: str


@router.post("/chat")
async def chat(request: ChatRequest):

    # Start timer
    start_time = time.perf_counter()

    # -----------------------------------
    # Rewrite follow-up question
    # -----------------------------------
    rewritten_question = rewrite_question(request.question)

    # -----------------------------------
    # Generate search queries
    # -----------------------------------
    expanded_queries = expand_query(rewritten_question)

    print("\n========== GENERATED QUERIES ==========", flush=True)

    for query in expanded_queries:
        print(query, flush=True)

    print("=======================================\n", flush=True)

    # -----------------------------------
    # Retrieve relevant chunks
    # -----------------------------------
    results = search_documents(expanded_queries)

    # -----------------------------------
    # Build context
    # -----------------------------------
    context = "\n\n".join(
        item["document"]
        for item in results
    )

    # -----------------------------------
    # Generate answer
    # -----------------------------------
    answer = generate_answer(
        question=rewritten_question,
        context=context
    )

    # -----------------------------------
    # Save conversation
    # -----------------------------------
    add_message(
        role="user",
        content=request.question
    )

    add_message(
        role="assistant",
        content=answer
    )

    # -----------------------------------
    # Remove duplicate sources
    # -----------------------------------
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
            "chunk": metadata["chunk"],
            "relevance_score": round(
                item["rerank_score"],
                3
            )
        })

    # -----------------------------------
    # Calculate response time
    # -----------------------------------
    end_time = time.perf_counter()

    response_time_ms = round(
        (end_time - start_time) * 1000,
        2
    )

    # -----------------------------------
    # Return response
    # -----------------------------------
    return {
        "question": request.question,
        "rewritten_question": rewritten_question,
        "expanded_queries": expanded_queries,
        "answer": answer,
        "sources": sources,
        "retrieved_chunks": len(results),
        "response_time_ms": response_time_ms
    }