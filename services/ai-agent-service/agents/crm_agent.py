"""CRM Agent — Handles customer lookup and CRM record updates."""

from typing import Any

import httpx

from config import CUSTOMER_SERVICE_URL


class CRMAgent:
    """Agent responsible for CRM operations — searching and updating customer records."""

    def __init__(self):
        self.base_url = CUSTOMER_SERVICE_URL

    async def search_customers(
        self,
        industry: str | None = None,
        location: str | None = None,
        days_since_contact: int | None = None,
    ) -> list[dict[str, Any]]:
        """Search for customers matching the given criteria."""
        params = {}
        if industry:
            params["industry"] = industry
        if location:
            params["location"] = location
        if days_since_contact:
            params["days"] = days_since_contact

        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.base_url}/api/customers/search",
                params=params,
            )
            response.raise_for_status()
            return response.json()

    async def get_customer(self, customer_id: str) -> dict[str, Any]:
        """Get a single customer by ID."""
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.base_url}/api/customers/{customer_id}"
            )
            response.raise_for_status()
            return response.json()

    async def update_customer(self, customer_id: str, data: dict[str, Any]) -> dict[str, Any]:
        """Update a customer record."""
        async with httpx.AsyncClient() as client:
            response = await client.patch(
                f"{self.base_url}/api/customers/{customer_id}",
                json=data,
            )
            response.raise_for_status()
            return response.json()
