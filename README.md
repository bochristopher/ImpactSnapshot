# Impact Snapshot Backend

Real-time error monitoring and revenue impact dashboard backend.

## Setup

1. Create a virtual environment:
```bash
python -m venv .venv
```

2. Activate the virtual environment:
```bash
# Windows
.venv\Scripts\activate

# macOS/Linux
source .venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure environment variables:
   - Copy `.env` and fill in your API keys
   - Get keys from: Datadog, Mixpanel, Google Gemini

## Running the Application

Start the development server:
```bash
uvicorn app:app --reload
```

The API will be available at:
- Main API: http://localhost:8000
- Interactive docs: http://localhost:8000/docs
- Health check: http://localhost:8000/health

## API Endpoints

- `GET /` - Root endpoint
- `GET /health` - Health check
- `GET /snapshot` - Get current impact snapshot (coming soon)
- `POST /inject` - Inject demo error (coming soon)
- `GET /ws` - WebSocket for real-time updates (coming soon) 