from services.llm_service import generate_answer


context = """
A hash function converts input data into a fixed-length hash value.
It is commonly used for data integrity and digital signatures.
"""

question = "What is a hash function?"

answer = generate_answer(question, context)

print(answer)