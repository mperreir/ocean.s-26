import serial
import serial.tools.list_ports
import pyautogui
import time
import sys

pyautogui.PAUSE = 0

def find_arduino_port():
    ports = serial.tools.list_ports.comports()
    for p in ports:
        desc = (p.description + (p.manufacturer or '')).lower()
        if any(mot in desc for mot in ['arduino', 'ch340', 'cp210', 'usbmodem', 'usbserial', 'série usb', 'serial usb']):
            return p.device
    if ports:
        if len(ports) == 1:
            print(f"Port détecté : {ports[0].device} - {ports[0].description}")
            return ports[0].device
        print("Plusieurs ports disponibles :")
        for i, p in enumerate(ports):
            print(f"  [{i}] {p.device} - {p.description}")
        try:
            choix = int(input("Entrez le numéro du port à utiliser : "))
            return ports[choix].device
        except (ValueError, IndexError):
            print("Choix invalide.")
            return None
    return None

port = find_arduino_port()
if port is None:
    print("Erreur : Aucun port série trouvé. Branchez votre Arduino et réessayez.")
    sys.exit(1)

try:
    arduino = serial.Serial(port, 9600, timeout=0.1)
    print(f"Connexion établie sur {port} ! Appuyez sur vos boutons.")
except Exception as e:
    print(f"Erreur : {e}")
    print("Vérifiez que l'IDE Arduino n'utilise pas déjà le port.")
    sys.exit(1)

arduino.reset_input_buffer()

actions = {
    "UP_ON":    lambda: pyautogui.keyDown('up'),
    "UP_OFF":   lambda: pyautogui.keyUp('up'),
    "DOWN_ON":  lambda: pyautogui.keyDown('down'),
    "DOWN_OFF": lambda: pyautogui.keyUp('down'),
    "LEFT_ON":  lambda: pyautogui.keyDown('left'),
    "LEFT_OFF": lambda: pyautogui.keyUp('left'),
    "RIGHT_ON":  lambda: pyautogui.keyDown('right'),
    "RIGHT_OFF": lambda: pyautogui.keyUp('right'),
    "Z_ON":  lambda: (pyautogui.keyDown('z'), time.sleep(0.05), pyautogui.keyUp('z')),
    "A_ON":  lambda: (pyautogui.keyDown('a'), time.sleep(0.05), pyautogui.keyUp('a')),
    "S_ON":  lambda: (pyautogui.keyDown('s'), time.sleep(0.05), pyautogui.keyUp('s')),
    "W_ON":  lambda: (pyautogui.keyDown('w'), time.sleep(0.05), pyautogui.keyUp('w')),
    "R_ON":  lambda: (pyautogui.keyDown('r'), time.sleep(0.05), pyautogui.keyUp('r')),
}

noms = {
    "UP_ON": "HAUT appuyé", "UP_OFF": "HAUT relâché",
    "DOWN_ON": "BAS appuyé", "DOWN_OFF": "BAS relâché",
    "LEFT_ON": "GAUCHE appuyé", "LEFT_OFF": "GAUCHE relâché",
    "RIGHT_ON": "DROITE appuyé", "RIGHT_OFF": "DROITE relâché",
    "Z_ON": "Bouton Z", "Z_OFF": "",
    "W_ON": "Bouton W", "W_OFF": "",
    "A_ON": "Bouton A", "A_OFF": "",
    "S_ON": "Bouton S", "S_OFF": "",
    "R_ON": "Bouton R", "R_OFF": "",
}

while True:
    data = arduino.readline().decode('utf-8').strip()
    if data in actions:
        actions[data]()
        if noms.get(data):
            print(noms[data])
