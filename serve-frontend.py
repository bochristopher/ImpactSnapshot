#!/usr/bin/env python3
import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Change to the frontend-simple directory
os.chdir('frontend-simple')

PORT = 3000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
    print(f"🚀 Frontend server running at http://localhost:{PORT}")
    print(f"📱 QR code will be generated for mobile access")
    print(f"🎮 Use the demo controls to simulate different error states")
    print(f"🔗 Backend API running at http://localhost:8000")
    print(f"\nPress Ctrl+C to stop the server")
    
    # Open browser automatically
    webbrowser.open(f'http://localhost:{PORT}')
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n�� Server stopped") 