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

    for index, chunk in enumerate(chunks):
        documents.append({
            "document": chunk,
            "metadata": {
                "filename": filename,
                "chunk": index + 1
            }
        })

    tokenized_documents = [
        item["document"].lower().split()
        for item in documents
    ]

    bm25 = BM25Okapi(tokenized_documents)


def search_bm25(
    query: str,
    document_name: str | None = None,
    top_k: int = 10,
):
    """
    Search BM25.
    If document_name is provided, return chunks only from that PDF.
    """

    if bm25 is None:
        return []

    tokenized_query = query.lower().split()

    scores = bm25.get_scores(tokenized_query)

    ranked = sorted(
        zip(documents, scores),
        key=lambda x: x[1],
        reverse=True,
    )

    # Filter by selected document
    if document_name:
        ranked = [
            (item, score)
            for item, score in ranked
            if item["metadata"]["filename"] == document_name
        ]

    return ranked[:top_k]


def delete_document(filename: str):
    """
    Remove a PDF from the BM25 index.
    """

    global documents, bm25

    # Remove all chunks belonging to this file
    documents = [
        item
        for item in documents
        if item["metadata"]["filename"] != filename
    ]

    # Rebuild BM25
    if documents:
        tokenized_documents = [
            item["document"].lower().split()
            for item in documents
        ]

        bm25 = BM25Okapi(tokenized_documents)
    else:
        bm25 = None