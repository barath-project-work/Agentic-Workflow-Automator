"""Calendar Agent — Handles meeting scheduling and availability checks."""

from typing import Any

import httpx

from config import NOTIFICATION_SERVICE_URL


class CalendarAgent:
    """Agent responsible for scheduling meetings and checking availability."""

    def __init__(self):
        self.base_url = NOTIFICATION_SERVICE_URL

    async def schedule_meeting(
        self,
        customer_id: str,
        customer_email: str,
        preferred_date: str,
        duration_minutes: int = 30,
    ) -> dict[str, Any]:
        """Schedule a meeting with a customer."""
        payload = {
            "customer_id": customer_id,
            "customer_email": customer_email,
            "preferred_date": preferred_date,
            "duration_minutes": duration_minutes,
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/api/notifications/calendar",
                json=payload,
            )
            response.raise_for_status()
            return response.json()

    async def check_availability(self, date: str) -> list[str]:
        """Check available time slots for a given date."""
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.base_url}/api/notifications/calendar/availability",
                params={"date": date},
            )
            response.raise_for_status()
            return response.json()
