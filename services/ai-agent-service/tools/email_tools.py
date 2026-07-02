"""Email tool functions that can be called by the orchestrator agent."""

from typing import Any

from agents.email_agent import EmailAgent

_agent = EmailAgent()


async def send_email(
    to: list[str],
    subject: str,
    body: str,
    cc: list[str] | None = None,
    **kwargs,
) -> dict[str, Any]:
    """Send an email to the specified recipients."""
    result = await _agent.send_email(to, subject, body, cc)
    return {
        "tool": "send_email",
        "status": "SUCCESS",
        "to": to,
        "subject": subject,
        "result": result,
    }
