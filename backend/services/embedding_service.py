from langchain_huggingface import HuggingFaceEmbeddings

# Load embedding model (downloads automatically the first time)
embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


def create_embeddings(texts: list[str]):
    """
    Convert a list of text chunks into embeddings.
    """
    embeddings = embedding_model.embed_documents(texts)
    return embeddings