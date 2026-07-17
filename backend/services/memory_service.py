# Stores conversation history in memory
conversation_history = []


def add_message(role: str, content: str):
    """
    Add a message to the conversation history.
    role: 'user' or 'assistant'
    """

    conversation_history.append({
        "role": role,
        "content": content
    })


def get_history(limit: int = 6):
    """
    Return the last few messages.
    """

    return conversation_history[-limit:]


def clear_history():
    """
    Clear the conversation history.
    """

    conversation_history.clear()