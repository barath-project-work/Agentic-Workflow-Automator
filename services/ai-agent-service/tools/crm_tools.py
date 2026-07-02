"""CRM tool functions that can be called by the orchestrator agent."""

from typing import Any

from agents.crm_agent import CRMAgent

_agent = CRMAgent()


async def search_customers(
    industry: str | None = None,
    location: str | None = None,
    days_since_contact: int | None = None,
    **kwargs,
) -> dict[str, Any]:
    """Search customers by industry, location, and contact recency."""
    customers = await _agent.search_customers(industry, location, days_since_contact)
    return {
        "tool": "search_customers",
        "status": "SUCCESS",
        "customers_found": len(customers),
        "customers": customers,
    }


async def update_crm_record(
    customer_id: str,
    field: str,
    value: Any,
    **kwargs,
) -> dict[str, Any]:
    """Update a single field on a customer record."""
    result = await _agent.update_customer(customer_id, {field: value})
    return {
        "tool": "update_crm_record",
        "status": "SUCCESS",
        "customer_id": customer_id,
        "field": field,
        "value": value,
        "result": result,
    }
