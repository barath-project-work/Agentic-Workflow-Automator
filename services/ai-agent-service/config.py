import os
from dotenv import load_dotenv

load_dotenv()

# OpenAI
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
OPENAI_MODEL_PLANNING = os.getenv("OPENAI_MODEL_PLANNING", "gpt-4-turbo")
OPENAI_MODEL_EXECUTION = os.getenv("OPENAI_MODEL_EXECUTION", "gpt-4o-mini")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "text-embedding-3-small")

# Service URLs
CUSTOMER_SERVICE_URL = os.getenv("CUSTOMER_SERVICE_URL", "http://localhost:8082")
NOTIFICATION_SERVICE_URL = os.getenv("NOTIFICATION_SERVICE_URL", "http://localhost:8085")
WORKFLOW_SERVICE_URL = os.getenv("WORKFLOW_SERVICE_URL", "http://localhost:8083")

# Database
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://atlasai:atlasai_secret@localhost:5432/atlasai")

# Redis
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

# Server
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8087"))
