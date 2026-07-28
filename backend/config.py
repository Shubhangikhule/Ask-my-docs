from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Application
    APP_NAME: str = "Ask My Docs"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    # Groq
    GROQ_API_KEY: str

    # Load .env file
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8"
    )


settings = Settings()
