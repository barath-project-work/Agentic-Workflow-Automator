from fastapi import FastAPI
from pydantic import BaseModel

from agents.orchestrator import OrchestratorAgent

app = FastAPI(
    title="AtlasAI Agent Service",
    description="AI Agent orchestration for sales workflow automation",
    version="0.1.0",
)


class WorkflowRequest(BaseModel):
    workflow_id: str
    goal: str
    requested_by: str
    parameters: dict = {}


class WorkflowStatus(BaseModel):
    workflow_id: str
    status: str
    result: dict = {}


@app.get("/health")
async def health():
    return {"status": "UP", "service": "ai-agent-service"}


@app.post("/api/agent/start")
async def start_workflow(request: WorkflowRequest):
    """Start an AI agent workflow for the given goal."""
    orchestrator = OrchestratorAgent()
    result = await orchestrator.execute(
        workflow_id=request.workflow_id,
        goal=request.goal,
        parameters=request.parameters,
    )
    return result


@app.get("/api/agent/status/{workflow_id}")
async def get_workflow_status(workflow_id: str):
    """Get the current status of a running workflow."""
    return {"workflow_id": workflow_id, "status": "RUNNING"}
