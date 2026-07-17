from rank_bm25 import BM25Okapi

# Global BM25 index
bm25 = None

# Store all document chunks
documents = []


def build_bm25(chunks: list[str], filename: str):
    """
    Add a new document's chunks to the existing BM25 index.
    """

    global bm25, documents

    # Add new chunks instead of replacing old ones
    for index, chunk in enumerate(chunks):
        documents.append({
            "document": chunk,
            "metadata": {
                "filename": filename,
                "chunk": index + 1
            }
        })

    # Tokenize all stored documents
    tokenized_documents = [
        item["document"].lower().split()
        for item in documents
    ]

    # Rebuild BM25 index
    bm25 = BM25Okapi(tokenized_documents)


def search_bm25(query: str, top_k: int = 10):
    """
    Search across all uploaded documents.
    """

    if bm25 is None:
        return []

    tokenized_query = query.lower().split()

    scores = bm25.get_scores(tokenized_query)

    ranked = sorted(
        zip(documents, scores),
        key=lambda x: x[1],
        reverse=True
    )

    return ranked[:top_k]