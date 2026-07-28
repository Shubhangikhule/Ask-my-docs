from sentence_transformers import CrossEncoder

_model = None


def get_model():
    global _model

    if _model is None:
        _model = CrossEncoder(
            "cross-encoder/ms-marco-MiniLM-L-6-v2"
        )

    return _model


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

    model = get_model()

    pairs = [
        (query, item["document"])
        for item in results
    ]

    scores = model.predict(pairs)

    for item, score in zip(results, scores):
        item["rerank_score"] = float(score)

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

    return results[:top_k]