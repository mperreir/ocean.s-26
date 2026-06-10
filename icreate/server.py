#!/usr/bin/env python3
"""Serveur pont : Arduino (Serial) → Navigateur (SSE)
Lance ce script puis ouvre http://localhost:8080/au_courant.html"""

import http.server
import threading
import json
import time
import serial
import os

PORT_WEB    = 8080
PORT_SERIAL = '/dev/ttyACM1'   # Linux. Sur Mac : /dev/cu.usbmodem... Sur Windows : COM3
BAUD        = 9600

# File d'événements non encore consommés
events = []
events_lock = threading.Lock()


def serial_reader():
    while True:
        try:
            ser = serial.Serial(PORT_SERIAL, BAUD, timeout=1)
            print(f"[Serial] Connecté à {PORT_SERIAL}")
            while True:
                line = ser.readline().decode('utf-8', errors='ignore').strip()
                if not line or not (line.startswith('B:') or line.startswith('S:') or line.startswith('J:')):
                    continue
                evt = {"type": line[0], "value": line[2:]}
                with events_lock:
                    events.append(evt)
                print(f"  → {line}")
        except serial.SerialException as e:
            print(f"[Serial] Erreur: {e} — reconnexion dans 2s...")
            time.sleep(2)
        except Exception as e:
            print(f"[Serial] Erreur inattendue: {e}")
            time.sleep(2)


class Handler(http.server.SimpleHTTPRequestHandler):

    def do_GET(self):
        if self.path == '/events':
            self.send_response(200)
            self.send_header('Content-Type', 'text/event-stream')
            self.send_header('Cache-Control', 'no-cache')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            with events_lock:
                sent_count = len(events)  # ignorer les événements passés
            try:
                while True:
                    with events_lock:
                        new = events[sent_count:]
                    for evt in new:
                        data = json.dumps(evt)
                        self.wfile.write(f"data: {data}\n\n".encode())
                        self.wfile.flush()
                        sent_count += 1
                    time.sleep(0.05)
            except (BrokenPipeError, ConnectionResetError):
                pass
            return

        return super().do_GET()

    def log_message(self, format, *args):
        if args and '200' not in str(args[1]):
            super().log_message(format, *args)


if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    threading.Thread(target=serial_reader, daemon=True).start()
    server = http.server.HTTPServer(('', PORT_WEB), Handler)
    print(f"[Web] Serveur sur http://localhost:{PORT_WEB}/au_courant.html")
    server.serve_forever()
