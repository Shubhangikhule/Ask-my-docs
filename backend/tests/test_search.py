from services.search_service import search_documents

results = search_documents("What is a hash function?")

for i, chunk in enumerate(results, start=1):
    print(f"\nResult {i}\n")
    print(chunk[:500])