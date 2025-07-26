from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import os
import asyncio
from dotenv import load_dotenv

# Load environment variables
try:
    load_dotenv()
except Exception as e:
    print(f"Warning: Could not load .env file: {e}")
    # Continue without .env file

# Simple in-memory state for demo
error_active = False

# Create FastAPI instance
app = FastAPI(
    title="Impact Snapshot Backend",
    description="Real-time error monitoring and revenue impact dashboard",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Impact Snapshot Backend is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/inject")
async def inject_error():
    """Inject a demo error to Datadog Events"""
    global error_active
    try:
        # Set error state to active
        error_active = True
        return {"status": "sent", "message": "Demo error injected successfully"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get("/snapshot")
async def get_snapshot():
    """Get current impact snapshot with dummy data"""
    global error_active
    
    if error_active:
        arr_risk = 4200
        endpoint = "/checkout"
        action = "rollback_release"
    else:
        arr_risk = 0
        endpoint = "/"
        action = "none"
    
    return {
        "endpoint": endpoint,
        "arr_risk": arr_risk,
        "lost_signups": 5 if error_active else 0,
        "action": action,
        "rollback_url": os.getenv("ORKES_URL", "https://api.orkes.io/api/workflow/rollback_release?version=1")
    }

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for live updates"""
    await websocket.accept()
    
    try:
        while True:
            global error_active
            
            if error_active:
                arr_risk = 4200
                endpoint = "/checkout"
                action = "rollback_release"
            else:
                arr_risk = 0
                endpoint = "/"
                action = "none"
            
            snapshot = {
                "endpoint": endpoint,
                "arr_risk": arr_risk,
                "lost_signups": 5 if error_active else 0,
                "action": action,
                "rollback_url": os.getenv("ORKES_URL", "https://api.orkes.io/api/workflow/rollback_release?version=1")
            }
            
            await websocket.send_json(snapshot)
            await asyncio.sleep(15)
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        await websocket.close() 