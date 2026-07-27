from services.embedding_service import create_embeddings
from services.vector_store import get_collection
from services.bm25_service import search_bm25
from services.reranker_service import rerank_results

print("SEARCH SERVICE FILE LOADED", flush=True)

def search_documents(
    queries: list[str],
    document_name: str | None = None,
    top_k: int = 3,
):
    """
    Hybrid Search using multiple expanded queries.

    Steps:
    1. Vector Search
    2. BM25 Search
    3. Merge Results
    4. Remove Duplicates
    5. Cross-Encoder Re-ranking
    """
    print("DOCUMENT FILTER =", document_name, flush=True)

    print(
        "\n========== SEARCH SERVICE STARTED ==========",
        flush=True
    )

    print(
        "Queries received:",
        queries,
        flush=True
    )

    collection = get_collection()

    combined = []
    seen = set()

    for query in queries:

        print(
            f"\n\n========== PROCESSING QUERY: {query} ==========",
            flush=True
        )

        query_embedding = create_embeddings([query])[0]


        # -----------------------------
        # Vector Search
        # -----------------------------

        query_args = {
           "query_embeddings": [query_embedding],
           "n_results": 10,
        }

        if document_name:
         query_args["where"] = {
            "filename": document_name
       } 

        vector_results = collection.query(**query_args)

        documents = vector_results["documents"][0]
        metadatas = vector_results["metadatas"][0]
        distances = vector_results["distances"][0]


        print(
            f"\n========== VECTOR RESULTS ({query}) ==========",
            flush=True
        )


        for doc, metadata, distance in zip(
            documents,
            metadatas,
            distances
        ):

            print(
                f"Filename: {metadata['filename']} | "
                f"Chunk: {metadata['chunk']} | "
                f"Distance: {distance:.3f}",
                flush=True
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


            combined.append(
                {
                    "document": doc,
                    "metadata": metadata,
                    "distance": distance
                }
            )



        # -----------------------------
        # BM25 Search
        # -----------------------------

        bm25_results = search_bm25(
          query,
          document_name=document_name,
          top_k=10
        )


        print(
            f"\n========== BM25 RESULTS ({query}) ==========",
            flush=True
        )


        for item, score in bm25_results:

            metadata = item["metadata"]


            print(
                f"Filename: {metadata['filename']} | "
                f"Chunk: {metadata['chunk']} | "
                f"Score: {score:.3f}",
                flush=True
            )


            key = (
                metadata["filename"],
                metadata["chunk"]
            )


            if key in seen:
                continue


            seen.add(key)


            combined.append(
                {
                    "document": item["document"],
                    "metadata": metadata,
                    "distance": score
                }
            )



    print(
        "\n========== COMBINED RESULTS ==========",
        flush=True
    )

    print(
        "Total unique chunks:",
        len(combined),
        flush=True
    )


    if not combined:

        print(
            "No results found",
            flush=True
        )

        return []



    # -----------------------------
    # Cross Encoder Re-ranking
    # -----------------------------

    print(
        "\n========== STARTING RERANKING ==========",
        flush=True
    )


    reranked_results = rerank_results(
        query=queries[0],
        results=combined,
        top_k=top_k
    )



    print(
        "\n========== FINAL RERANKED RESULTS ==========",
        flush=True
    )


    for item in reranked_results:

        print(
            f"Filename: {item['metadata']['filename']} | "
            f"Chunk: {item['metadata']['chunk']}",
            flush=True
        )


    print(
        "============================================\n",
        flush=True
    )


    return reranked_results