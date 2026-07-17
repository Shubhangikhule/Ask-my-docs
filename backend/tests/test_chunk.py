from services.chunk_service import chunk_text

sample_text = """
Artificial Intelligence is changing the world.

Machine Learning is a subset of Artificial Intelligence.

Deep Learning is a subset of Machine Learning.

Large Language Models are becoming increasingly popular.
""" * 100


chunks = chunk_text(sample_text)

print(f"Total Chunks: {len(chunks)}")

print("\nFirst Chunk:\n")
print(chunks[0])