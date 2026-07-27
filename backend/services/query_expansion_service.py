from groq import Groq

from config import settings




def expand_query(question: str) -> list[str]:
    """
    Generate multiple search-friendly queries for ANY domain.

    This function works for any uploaded PDF because the LLM
    generates the search queries dynamically.

    Example:
        Input:
            What is inheritance?

        Output:
            [
                "What is inheritance?",
                "Inheritance in object oriented programming",
                "Definition of inheritance"
            ]
    """

    prompt = f"""
You are an expert search assistant for a Retrieval-Augmented Generation (RAG) system.

Your job is to rewrite the user's question into a few search-friendly queries.

Rules:

1. Keep the original meaning.
2. Do NOT answer the question.
3. Return the ORIGINAL question as the FIRST query.
4. Generate AT MOST TWO additional search queries.
5. Each query must help retrieve relevant document chunks.
6. Do NOT use numbering.
7. Do NOT use bullet points.
8. Return EXACTLY one query per line.

Question:
{question}
"""
    client = Groq(api_key=settings.GROQ_API_KEY)
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        temperature=0,
        messages=[
            {
                "role": "system",
                "content": "You generate search queries for document retrieval."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    text = response.choices[0].message.content.strip()

    # Always include the original question
    queries = [question]

    for line in text.split("\n"):

        line = line.strip()

        if not line:
            continue

        if line not in queries:
            queries.append(line)

    # Return a maximum of 3 queries
    return queries[:3]