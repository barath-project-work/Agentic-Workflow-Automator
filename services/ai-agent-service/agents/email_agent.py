"""Email Agent — Drafts and sends personalized follow-up emails."""

from typing import Any

import httpx

from config import NOTIFICATION_SERVICE_URL


class EmailAgent:
    """Agent responsible for composing and sending emails via the notification service."""

    def __init__(self):
        self.base_url = NOTIFICATION_SERVICE_URL

    async def send_email(
        self,
        to: list[str],
        subject: str,
        body: str,
        cc: list[str] | None = None,
    ) -> dict[str, Any]:
        """Send an email to the specified recipients."""
        payload = {
            "to": to,
            "subject": subject,
            "body": body,
        }
        if cc:
            payload["cc"] = cc

        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/api/notifications/email",
                json=payload,
            )
            response.raise_for_status()
            return response.json()

    async def generate_email_body(
        self,
        customer_name: str,
        company: str,
        context: str | None = None,
    ) -> str:
        """Generate a personalized email body using LLM."""
        # TODO: Integrate with OpenAI for email generation
        return f"Dear {customer_name},\n\nI hope this message finds you well. "
