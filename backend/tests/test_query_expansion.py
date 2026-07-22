from services.query_expansion_service import expand_query


question = "What is inheritance?"

queries = expand_query(question)

print("\nGenerated Queries:\n")

for i, query in enumerate(queries, start=1):
    print(f"{i}. {query}")