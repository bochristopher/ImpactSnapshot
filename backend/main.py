from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
import httpx
import os
from dotenv import load_dotenv
import asyncio
from datetime import datetime, timedelta
import json

load_dotenv()

app = FastAPI(title="Impact Snapshot API", version="1.0.0")

# CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SnapshotResponse(BaseModel):
    endpoint: str
    arr_risk: float
    error_count: int
    conversion_rate: float
    rollback_url: Optional[str] = None
    status: str  # "healthy", "warning", "critical"
    summary: str
    timestamp: str

class ErrorInjectionRequest(BaseModel):
    endpoint: str = "/checkout"
    error_type: str = "timeout"

# Mock data for demo purposes
MOCK_DATA = {
    "healthy": {
        "error_count": 0,
        "conversion_rate": 0.85,
        "arr_risk": 0,
        "status": "healthy",
        "summary": "All systems operational. Conversion rate at 85%."
    },
    "warning": {
        "error_count": 15,
        "conversion_rate": 0.72,
        "arr_risk": 2100,
        "status": "warning", 
        "summary": "Increased error rate detected. Conversion dropped to 72%. $2,100 at risk."
    },
    "critical": {
        "error_count": 47,
        "conversion_rate": 0.31,
        "arr_risk": 8400,
        "status": "critical",
        "summary": "Critical error spike! Conversion rate plummeted to 31%. $8,400 at immediate risk."
    }
}

# Global state for demo
current_status = "healthy"

# WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except:
                # Remove dead connections
                self.active_connections.remove(connection)

manager = ConnectionManager()

@app.get("/")
async def root():
    return {"message": "Impact Snapshot API", "status": "running"}

@app.get("/snapshot")
async def get_snapshot():
    """Main endpoint that aggregates data from all sources"""
    global current_status
    
    # Get current timestamp
    timestamp = datetime.now().isoformat()
    
    # Get data based on current status
    data = MOCK_DATA[current_status]
    
    # Construct rollback URL (will be populated by DevOps role)
    rollback_url = os.getenv("ORKES_ROLLBACK_URL", "https://orkes.io/demo-rollback")
    
    return SnapshotResponse(
        endpoint="/checkout",
        arr_risk=data["arr_risk"],
        error_count=data["error_count"],
        conversion_rate=data["conversion_rate"],
        rollback_url=rollback_url,
        status=data["status"],
        summary=data["summary"],
        timestamp=timestamp
    )

@app.post("/inject-error")
async def inject_error(request: ErrorInjectionRequest):
    """Simulate error injection for demo purposes"""
    global current_status
    
    if request.error_type == "critical":
        current_status = "critical"
    elif request.error_type == "warning":
        current_status = "warning"
    else:
        current_status = "healthy"
    
    # Broadcast the updated snapshot to all WebSocket clients
    snapshot = await get_snapshot()
    await manager.broadcast(json.dumps(snapshot.dict()))
    
    return {
        "message": f"Error injected: {request.error_type}",
        "status": current_status,
        "endpoint": request.endpoint
    }

@app.post("/rollback")
async def trigger_rollback():
    """Trigger the rollback workflow"""
    global current_status
    current_status = "healthy"
    
    # Broadcast the updated snapshot to all WebSocket clients
    snapshot = await get_snapshot()
    await manager.broadcast(json.dumps(snapshot.dict()))
    
    return {
        "message": "Rollback triggered successfully",
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Handle incoming messages (like ping)
            data = await websocket.receive_text()
            if data == "ping":
                # Send current snapshot data as response to ping
                snapshot = await get_snapshot()
                await websocket.send_text(json.dumps(snapshot.dict()))
    except WebSocketDisconnect:
        manager.disconnect(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 