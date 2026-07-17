from services.embedding_service import create_embeddings

chunks = [
    "Artificial Intelligence is changing the world.",
    "Machine Learning is a subset of AI.",
    "Deep Learning uses neural networks."
]

embeddings = create_embeddings(chunks)

print(f"Total Embeddings: {len(embeddings)}")
print(f"Dimensions of First Embedding: {len(embeddings[0])}")
print("\nFirst 10 values:")
print(embeddings[0][:10])