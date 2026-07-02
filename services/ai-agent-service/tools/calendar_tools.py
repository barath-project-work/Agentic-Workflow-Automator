"""Calendar tool functions that can be called by the orchestrator agent."""

from typing import Any

from agents.calendar_agent import CalendarAgent

_agent = CalendarAgent()


async def schedule_meeting(
    customer_id: str,
    customer_email: str,
    preferred_date: str,
    duration_minutes: int = 30,
    **kwargs,
) -> dict[str, Any]:
    """Schedule a meeting with a customer."""
    result = await _agent.schedule_meeting(
        customer_id, customer_email, preferred_date, duration_minutes
    )
    return {
        "tool": "schedule_meeting",
        "status": "SUCCESS",
        "customer_id": customer_id,
        "preferred_date": preferred_date,
        "result": result,
    }
