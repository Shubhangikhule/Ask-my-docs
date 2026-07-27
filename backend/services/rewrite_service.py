from groq import Groq

from config import settings
from services.memory_service import get_history
from services.question_utils import needs_rewrite



def rewrite_question(question: str) -> str:
    """
    Rewrite only ambiguous follow-up questions.
    Standalone questions are returned unchanged.
    """

    # Skip rewriting if the question is already complete
    if not needs_rewrite(question):
        return question

    history = get_history()

    messages = [
        {
            "role": "system",
            "content": """
You are a question rewriting assistant.

Your task is to rewrite ONLY ambiguous follow-up questions.

Rules:

1. If the current question already makes sense by itself,
return it EXACTLY as it is.

2. Rewrite ONLY when the question depends on previous conversation.

3. Never change the topic.

4. Never add unnecessary information.

5. Return ONLY the rewritten question.
"""
        }
    ]

    messages.extend(history)

    messages.append(
        {
            "role": "user",
            "content": question
        }
    )

    client = Groq(api_key=settings.GROQ_API_KEY)


    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=messages,
        temperature=0
    )

    return response.choices[0].message.content.strip()