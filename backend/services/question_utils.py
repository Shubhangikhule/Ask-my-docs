import re

AMBIGUOUS_WORDS = {
    "it",
    "its",
    "it's",
    "they",
    "them",
    "their",
    "this",
    "that",
    "these",
    "those",
    "he",
    "she",
    "his",
    "her",
    "former",
    "latter"
}

AMBIGUOUS_PATTERNS = [
    "what are the properties",
    "what are its properties",
    "what are it's properties",
    "what about it",
    "how does it work",
    "how does this work",
    "explain more",
    "tell me more",
    "can you explain",
]


def needs_rewrite(question: str) -> bool:
    """
    Returns True if the question is likely to depend
    on previous conversation.
    """

    q = question.lower()

    # Remove punctuation
    q = re.sub(r"[^\w\s']", "", q)

    words = q.split()

    # Pronoun-based ambiguity
    if any(word in AMBIGUOUS_WORDS for word in words):
        return True

    # Common follow-up patterns
    if any(pattern in q for pattern in AMBIGUOUS_PATTERNS):
        return True

    return False