from groq import Groq
from config import settings

# Create Groq client
client = Groq(api_key=settings.GROQ_API_KEY)


def generate_answer(question: str, context: str) -> str:
    """
    Generate an answer using only the retrieved context.
    """

    prompt = f"""
You are an AI assistant for document question answering.

Rules:
1. Answer ONLY using the information in the retrieved context.
2. Do NOT use outside knowledge.
3. If the answer is not present in the context, reply exactly:
"I could not find the answer in the uploaded document."
4. Answer clearly and concisely.

Retrieved Context:
{context}

User Question:
{question}

Answer:
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0
    )

    return response.choices[0].message.content