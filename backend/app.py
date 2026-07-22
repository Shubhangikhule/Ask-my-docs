from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings

from routers.health import router as health_router
from routers.upload import router as upload_router
from routers.search import router as search_router
from routers.chat import router as chat_router

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(upload_router)
app.include_router(search_router)
app.include_router(chat_router)