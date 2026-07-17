from groq import Groq

from config import settings

client = Groq(api_key=settings.GROQ_API_KEY)


def expand_query(question: str) -> list[str]:
    """
    Generate multiple search queries using the LLM.

    This works for ANY domain and ANY uploaded PDF.
    """

    prompt = f"""
You are an expert search assistant.

Given the user's question, generate up to 3 search queries
that would help retrieve the correct document chunks.

Rules:

1. Keep the original meaning.
2. Do NOT answer the question.
3. Include the original question.
4. Return one query per line.
5. Maximum 3 queries.
6. No numbering.
7. No bullet points.

Question:

{question}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        temperature=0,
        messages=[
            {
                "role": "system",
                "content": "You generate search queries."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    text = response.choices[0].message.content.strip()

    queries = []

    for line in text.split("\n"):

        line = line.strip()

        if not line:
            continue

        if line not in queries:
            queries.append(line)

    return queries