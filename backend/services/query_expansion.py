"""
Production Query Expansion

Supports bidirectional synonym expansion.

Example:

RSA
⇄ Rivest Shamir Adleman
⇄ RSA Algorithm
⇄ Public Key Cryptography
⇄ Asymmetric Cryptography
"""


SYNONYM_GROUPS = [

    # RSA
    [
        "RSA",
        "Rivest Shamir Adleman",
        "RSA Algorithm",
        "Public Key Cryptography",
        "Asymmetric Cryptography"
    ],

    # Hash Function
    [
        "Hash Function",
        "Cryptographic Hash Function",
        "Message Digest"
    ],

    # SHA
    [
        "SHA",
        "Secure Hash Algorithm",
        "SHA Family",
        "SHA-256"
    ],

    # AES
    [
        "AES",
        "Advanced Encryption Standard",
        "Symmetric Encryption"
    ],

    # DES
    [
        "DES",
        "Data Encryption Standard",
        "Symmetric Encryption"
    ],

    # ECC
    [
        "ECC",
        "Elliptic Curve Cryptography"
    ],

    # PKI
    [
        "PKI",
        "Public Key Infrastructure"
    ],

    # CA
    [
        "CA",
        "Certificate Authority"
    ],

    # SSL
    [
        "SSL",
        "Secure Sockets Layer"
    ],

    # TLS
    [
        "TLS",
        "Transport Layer Security"
    ],

    # MAC
    [
        "MAC",
        "Message Authentication Code"
    ],

    # HMAC
    [
        "HMAC",
        "Hash-based Message Authentication Code"
    ],

    # MD5
    [
        "MD5",
        "Message Digest 5"
    ]
]


def expand_query(query: str) -> list[str]:
    """
    Expand a query using bidirectional synonym groups.

    If ANY synonym appears in the query,
    all other synonyms are also searched.
    """

    expanded_queries = {query}

    query_lower = query.lower()

    for group in SYNONYM_GROUPS:

        matched = False

        for phrase in group:

            if phrase.lower() in query_lower:

                matched = True
                break

        if matched:

            for phrase in group:

                expanded_queries.add(phrase)

    return list(expanded_queries)