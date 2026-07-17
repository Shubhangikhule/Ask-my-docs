from services.embedding_service import create_embeddings
from services.vector_store import get_collection
from services.bm25_service import search_bm25
from services.reranker_service import rerank_results


def search_documents(query: str, top_k: int = 3):
    """
    Hybrid Search:
    - Vector Search
    - BM25 Search
    - Cross-Encoder Re-ranking
    """

    collection = get_collection()

    query_embedding = create_embeddings([query])[0]

    # -----------------------------
    # Vector Search
    # -----------------------------
    vector_results = collection.query(
        query_embeddings=[query_embedding],
        n_results=10
    )

    combined = []
    seen = set()

    documents = vector_results["documents"][0]
    metadatas = vector_results["metadatas"][0]
    distances = vector_results["distances"][0]

    print("\n========== VECTOR RESULTS ==========")

    for doc, metadata, distance in zip(
        documents,
        metadatas,
        distances
    ):

        print(
            f"Chunk {metadata['chunk']} | "
            f"Distance: {distance:.3f}"
        )

        if distance > 1.5:
            continue

        key = (
            metadata["filename"],
            metadata["chunk"]
        )

        if key in seen:
            continue

        seen.add(key)

        combined.append({
            "document": doc,
            "metadata": metadata,
            "distance": distance
        })

    # -----------------------------
    # BM25 Search
    # -----------------------------
    bm25_results = search_bm25(query, top_k=10)

    print("\n========== BM25 RESULTS ==========")

    for item, score in bm25_results:

        metadata = item["metadata"]

        print(
            f"Chunk {metadata['chunk']} | "
            f"Score: {score:.3f}"
        )

        key = (
            metadata["filename"],
            metadata["chunk"]
        )

        if key in seen:
            continue

        seen.add(key)

        combined.append({
            "document": item["document"],
            "metadata": metadata,
            "distance": score
        })

    print("\nCombined Results:", len(combined))

    # -----------------------------
    # Cross Encoder
    # -----------------------------
    reranked_results = rerank_results(
        query=query,
        results=combined,
        top_k=top_k
    )

    print("\n========== FINAL RERANKED ==========")

    for item in reranked_results:

        print(
            f"Chunk {item['metadata']['chunk']}"
        )

    print("=====================================\n")

    return reranked_results