import re

from groq import Groq
from config import settings

# Create Groq client
client = Groq(api_key=settings.GROQ_API_KEY)


def format_markdown(answer: str) -> str:
    """
    Clean and standardize LLM output into consistent Markdown.
    """

    answer = answer.replace("\r\n", "\n").strip()

    # Standard headings
    replacements = {
        r"^Definition[: ]*": "## Definition\n",
        r"^Inheritance Definition[: ]*": "## Definition\n",
        r"^Key Concepts[: ]*": "## Key Concepts\n",
        r"^Key Points[: ]*": "## Key Points\n",
        r"^Syntax[: ]*": "## Syntax\n",
        r"^Syntax and Example[: ]*": "## Syntax and Example\n",
        r"^Example[: ]*": "## Example\n",
        r"^Benefits[: ]*": "## Benefits\n",
        r"^Summary[: ]*": "## Summary\n",
    }

    for pattern, replacement in replacements.items():
        answer = re.sub(
            pattern,
            replacement,
            answer,
            flags=re.IGNORECASE | re.MULTILINE,
        )

    # Remove excessive blank lines
    answer = re.sub(r"\n{3,}", "\n\n", answer)

    return answer


def generate_answer(question: str, context: str) -> str:
    """
    Generate an answer using ONLY the retrieved document context.
    """

    prompt = f"""
You are an intelligent AI assistant for a Retrieval-Augmented Generation (RAG) system.

Your task is to answer the user's question ONLY from the retrieved document context.

==================================================
STRICT RULES
==================================================

1. Use ONLY the retrieved context.
2. Never use outside knowledge.
3. Never invent or assume information.
4. If the answer is NOT present in the context, reply EXACTLY:

I could not find the answer in the uploaded document.

==================================================
FORMATTING RULES
==================================================

Return your answer in PROFESSIONAL MARKDOWN.

Use this structure whenever applicable:

## Definition

Short definition.

## Key Concepts

- Point 1
- Point 2
- Point 3

## Syntax

Use fenced code blocks.

## Example

Only if present in the context.

## Benefits

- Benefit 1
- Benefit 2

## Summary

One short concluding paragraph.

Additional Rules:

- Use ONLY the provided context.
- Preserve formulas exactly.
- Preserve code exactly.
- Do NOT invent examples.
- Do NOT repeat information.
- Highlight important terms using **bold**.
- Keep paragraphs short.

==================================================
Retrieved Context
==================================================

{context}

==================================================
Question
==================================================

{question}

==================================================
Answer (Markdown)
==================================================
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        temperature=0,
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a Retrieval-Augmented Generation (RAG) assistant. "
                    "Answer ONLY using the provided document context. "
                    "Return answers in clean Markdown. "
                    "Never use outside knowledge."
                ),
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
    )

    raw_answer = response.choices[0].message.content.strip()

    formatted_answer = format_markdown(raw_answer)

    return formatted_answer