"""pgvector client for storing and querying vector embeddings."""

from typing import Any

import psycopg2
import psycopg2.extras

from config import DATABASE_URL


class PgVectorClient:
    """Client for interacting with pgvector for RAG and memory."""

    def __init__(self):
        self.connection = psycopg2.connect(DATABASE_URL)
        self._ensure_table()

    def _ensure_table(self):
        """Create the vector_embedding table if it doesn't exist."""
        with self.connection.cursor() as cur:
            cur.execute("CREATE EXTENSION IF NOT EXISTS vector;")
            cur.execute("""
                CREATE TABLE IF NOT EXISTS vector_embedding (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    content_type VARCHAR(50) NOT NULL,
                    content TEXT NOT NULL,
                    embedding vector(1536),
                    metadata JSONB,
                    created_at TIMESTAMP DEFAULT NOW()
                );
            """)
            cur.execute("""
                CREATE INDEX IF NOT EXISTS idx_embedding_hnsw
                ON vector_embedding
                USING hnsw (embedding vector_cosine_ops)
                WITH (m = 16, ef_construction = 200);
            """)
            self.connection.commit()

    def store_embedding(
        self,
        content_type: str,
        content: str,
        embedding: list[float],
        metadata: dict[str, Any] | None = None,
    ):
        """Store a text embedding in the vector store."""
        with self.connection.cursor() as cur:
            cur.execute(
                """
                INSERT INTO vector_embedding (content_type, content, embedding, metadata)
                VALUES (%s, %s, %s::vector, %s)
                """,
                (content_type, content, embedding, psycopg2.extras.Json(metadata) if metadata else None),
            )
            self.connection.commit()

    def search_similar(
        self,
        embedding: list[float],
        top_k: int = 5,
        min_similarity: float = 0.7,
    ) -> list[dict[str, Any]]:
        """Search for similar embeddings using cosine similarity."""
        with self.connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute(
                """
                SELECT content, metadata, 
                       1 - (embedding <=> %s::vector) AS similarity
                FROM vector_embedding
                WHERE 1 - (embedding <=> %s::vector) >= %s
                ORDER BY similarity DESC
                LIMIT %s
                """,
                (embedding, embedding, min_similarity, top_k),
            )
            return [dict(row) for row in cur.fetchall()]
