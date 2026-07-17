from sentence_transformers import CrossEncoder

# Load the model only once
model = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")


def rerank_results(
    query: str,
    results: list,
    top_k: int = 3
):
    """
    Re-rank retrieved chunks using a Cross-Encoder.
    Return the Top-K most relevant chunks.
    """

    if not results:
        return []

    # Build (query, document) pairs
    pairs = [
        (query, item["document"])
        for item in results
    ]

    # Predict relevance scores
    scores = model.predict(pairs)

    # Attach scores
    for item, score in zip(results, scores):
        item["rerank_score"] = float(score)

    # Sort by highest score
    results.sort(
        key=lambda x: x["rerank_score"],
        reverse=True
    )

    print("\n========== RERANK SCORES ==========")

    for item in results:
        print(
            f"Chunk {item['metadata']['chunk']} "
            f"| Score: {item['rerank_score']:.3f}"
        )

    print("===================================\n")

    # Return Top-K
    return results[:top_k]