import chromadb

# Create a persistent ChromaDB client
client = chromadb.PersistentClient(path="chroma_db")

# Create (or load) the collection
collection = client.get_or_create_collection(
    name="documents"
)


def store_embeddings(
    chunks: list[str],
    embeddings: list[list[float]],
    filename: str
):
    """
    Store document chunks and embeddings in ChromaDB.

    If the same PDF is uploaded again, the old chunks are removed
    before inserting the new ones to avoid duplicate vectors.
    """

    # -------------------------------------------------
    # Remove existing chunks for this PDF (if any)
    # -------------------------------------------------
    try:
        collection.delete(
            where={"filename": filename}
        )
    except Exception:
        # Ignore if the document doesn't already exist
        pass

    # -------------------------------------------------
    # Create deterministic IDs
    # -------------------------------------------------
    ids = [
        f"{filename}_chunk_{i + 1}"
        for i in range(len(chunks))
    ]

    # -------------------------------------------------
    # Metadata
    # -------------------------------------------------
    metadatas = [
        {
            "filename": filename,
            "chunk": i + 1
        }
        for i in range(len(chunks))
    ]

    # -------------------------------------------------
    # Store in ChromaDB
    # -------------------------------------------------
    collection.add(
        ids=ids,
        documents=chunks,
        embeddings=embeddings,
        metadatas=metadatas
    )

    return len(chunks)


def get_collection():
    """
    Return the existing ChromaDB collection.
    """
    return collection