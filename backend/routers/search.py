from fastapi import APIRouter
from services.search_service import search_documents

router = APIRouter()


@router.post("/search")
async def search(query: str):

    results = search_documents(query)

    return {
        "query": query,
        "results": results
    }