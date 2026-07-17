from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def home():
    return {
        "message": "Welcome to Ask My Docs",
        "status": "Backend Running Successfully!"
    }


@router.get("/health")
def health():
    return {
        "status": "OK"
    }