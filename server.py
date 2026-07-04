"""
==========================================================
BINAH COMMAND CENTER
Local Development Server
==========================================================
"""

import http.server
import socketserver
import threading
import webbrowser
from pathlib import Path

# ==========================================================
# CONFIGURATION
# ==========================================================

PORT = 8000

ROOT = Path(__file__).parent.resolve()

# ==========================================================
# HANDLER
# ==========================================================

class Handler(http.server.SimpleHTTPRequestHandler):

    def __init__(self, *args, **kwargs):
        super().__init__(
            *args,
            directory=str(ROOT),
            **kwargs
        )

# ==========================================================
# START SERVER
# ==========================================================

def start():

    with socketserver.TCPServer(("", PORT), Handler) as httpd:

        print("=" * 55)
        print(" BINAH COMMAND CENTER")
        print("=" * 55)
        print()
        print(f" Server running:")
        print(f" http://localhost:{PORT}")
        print()
        print(" Press CTRL+C to stop.")
        print()

        threading.Timer(
            1,
            lambda: webbrowser.open(
                f"http://localhost:{PORT}"
            )
        ).start()

        httpd.serve_forever()

# ==========================================================
# MAIN
# ==========================================================

if __name__ == "__main__":

    start()