from fastapi import APIRouter, UploadFile, File, HTTPException
from services.pdf_service import extract_text_from_pdf
from services.chunk_service import chunk_text
from services.embedding_service import create_embeddings
from services.vector_store import store_embeddings
from services.bm25_service import build_bm25, delete_document
import os
import shutil

router = APIRouter()

UPLOAD_FOLDER = "uploads"

# Create uploads folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    """
    Upload a PDF, extract text, create chunks,
    generate embeddings, store them in ChromaDB,
    and update the BM25 index.
    """

    # Validate file type
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    # Create file path
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    try:
        # Save uploaded PDF
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Extract text
        extracted_text = extract_text_from_pdf(file_path)

        # Split text into chunks
        chunks = chunk_text(extracted_text)

        # Generate embeddings
        embeddings = create_embeddings(chunks)

        # Store in ChromaDB
        stored_chunks = store_embeddings(
            chunks,
            embeddings,
            file.filename
        )

        # Update BM25 index
        build_bm25(
            chunks,
            file.filename
        )

        return {
            "filename": file.filename,
            "chunks_created": stored_chunks,
            "message": "PDF processed and stored successfully"
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing PDF: {str(e)}"
        )

    finally:
        file.file.close()

@router.delete("/delete/{filename}")
async def delete_pdf(filename: str):
    from services.vector_store import get_collection

    collection = get_collection()

    # Delete from ChromaDB
    collection.delete(
        where={"filename": filename}
    )

    # Delete from BM25
    delete_document(filename)

    # Delete uploaded file
    file_path = os.path.join(UPLOAD_FOLDER, filename)

    if os.path.exists(file_path):
        os.remove(file_path)

    return {
        "message": f"{filename} deleted successfully"
    }