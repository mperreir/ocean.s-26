# Au Courant

**La coop' du surplus éolien**

Au Courant est un dispositif d'assemblée énergétique territoriale. Les acteurs du littoral se réunissent pour décider ensemble qui bénéficie de l'électricité, quand et en quelle quantité. L'outil visualise les besoins, rend visibles les arbitrages et traduit les décisions dans le réseau local.

Ce projet est le fruit d'une collaboration entre les étudiants de l'École de design de Nantes et de Polytech Nantes qui sont :

- Anaïs Cart
- Matthieu Geslin
- Louis Gloanec
- Nathanël Henry
- Yuta Lysy
- Ali Wehbi
- Aziz El Hadj Khalifa
- Mohamed Lemine Niang
- Souaibou Dine Barry

---

## Matériel nécessaire

**Configuration de base :**

- 1 carte Arduino UNO
- 3 boutons arcade (pour choisir les options A, B, C)
- 1 câble USB (type A vers B, le même que les imprimantes)
- Des fils de connexion (câbles Dupont mâle-mâle)
- Un ordinateur Mac, Windows ou Ubuntu

**Avec joystick (optionnel) :**

- 1 joystick arcade, en plus des 3 boutons
- 1 breadboard (plaque de prototypage)

Le joystick sert uniquement à naviguer entre les domaines sur la carte (déplacer le bateau). Les boutons A, B, C restent nécessaires pour choisir les options dans les scénarios.

Voir la section "Plus loin : Intégrer un joystick arcade" en bas de ce document.

---

## Préparer l'Arduino (une seule fois)

L'Arduino est la petite carte électronique à laquelle sont branchés les boutons.

**Câblage des boutons :**

```
Arduino UNO
Pin 2 ── Bouton A ── GND
Pin 3 ── Bouton B ── GND
Pin 4 ── Bouton C ── GND
```

Pas besoin de résistances, les prises GND (masse) suffisent.

**Charger le programme sur l'Arduino :**

1. Branchez l'Arduino en USB sur votre ordinateur
2. Ouvrez l'Arduino IDE (à télécharger sur [arduino.cc](https://www.arduino.cc/en/software) si besoin)
3. Ouvrez le fichier `arduino/au_courant.ino`
4. Cliquez sur la flèche "Téléverser" (en haut à gauche)
5. Attendez le message "Téléversement terminé"

Cette étape n'est à faire qu'une seule fois.

---

## Sur Mac

### 1. Vérifier Python 3

Ouvrez le Terminal (Applications > Utilitaires > Terminal) et tapez :

```
python3 --version
```

Si vous voyez un numéro de version, c'est bon. Sinon, téléchargez Python sur [python.org](https://www.python.org/downloads/).

### 2. Installer pyserial

```
pip3 install pyserial
```

### 3. Lancer le jeu

Branchez l'Arduino en USB, puis dans le Terminal tapez `cd ` (avec un espace), glissez le dossier du projet dans la fenêtre et appuyez sur Entrée. Ensuite :

```
python3 server.py
```

Vous devriez voir :

```
[Serial] Connecté à /dev/cu.usbmodem...
[Web] Serveur sur http://localhost:8080/index.html
```

Ouvrez [http://localhost:8080](http://localhost:8080) dans votre navigateur.

### Problèmes fréquents sur Mac

**"Aucun module nommé serial"** : relancez `pip3 install pyserial`

**L'Arduino n'est pas détecté** : ouvrez `server.py` avec un éditeur de texte et modifiez la ligne `PORT_SERIAL`. Le nom exact du port est visible dans l'Arduino IDE : menu Outils > Port. Remplacez par ce nom :

```
PORT_SERIAL = '/dev/cu.usbmodem...'
```

---

## Sur Windows

### 1. Vérifier Python 3

Ouvrez l'invite de commandes (touche Windows, tapez `cmd`, appuyez sur Entrée) et tapez :

```
python --version
```

Si vous voyez un numéro de version, c'est bon. Sinon, téléchargez Python sur [python.org](https://www.python.org/downloads/) en cochant "Add Python to PATH" lors de l'installation.

### 2. Installer pyserial

```
pip install pyserial
```

### 3. Lancer le jeu

Branchez l'Arduino en USB. Ouvrez le dossier du projet dans l'Explorateur de fichiers, cliquez sur la barre d'adresse en haut, tapez `cmd` et appuyez sur Entrée. Ensuite :

```
python server.py
```

Vous devriez voir :

```
[Serial] Connecté à COM3
[Web] Serveur sur http://localhost:8080/index.html
```

Ouvrez [http://localhost:8080](http://localhost:8080) dans votre navigateur.

### Problèmes fréquents sur Windows

**"Aucun module nommé serial"** : relancez `pip install pyserial`

**L'Arduino n'est pas détecté** : ouvrez `server.py` avec un éditeur de texte et modifiez la ligne `PORT_SERIAL`. Le numéro de port exact (COM3, COM4...) est visible dans le Gestionnaire de périphériques > Ports. Remplacez par ce numéro :

```
PORT_SERIAL = 'COM3'
```

---

## Sur Ubuntu (Linux)

### 1. Vérifier Python 3

Ouvrez un Terminal (Ctrl+Alt+T) et tapez :

```
python3 --version
```

Python 3 est généralement déjà installé sur Ubuntu. Sinon :

```
sudo apt install python3
```

### 2. Installer pyserial

```
pip3 install pyserial
```

### 3. Autoriser l'accès au port série

Sur Ubuntu, l'Arduino n'est pas accessible par défaut. Ajoutez votre utilisateur au groupe `dialout` :

```
sudo usermod -a -G dialout $USER
```

Déconnectez-vous puis reconnectez-vous pour que ça prenne effet (ou redémarrez).

### 4. Lancer le jeu

Branchez l'Arduino en USB. Ouvrez un Terminal dans le dossier du projet (clic droit sur le dossier > "Ouvrir dans un terminal"). Ensuite :

```
python3 server.py
```

Vous devriez voir :

```
[Serial] Connecté à /dev/ttyACM0
[Web] Serveur sur http://localhost:8080/index.html
```

Ouvrez [http://localhost:8080](http://localhost:8080) dans votre navigateur.

### Problèmes fréquents sur Ubuntu

**"Aucun module nommé serial"** : relancez `pip3 install pyserial`

**"Permission denied /dev/ttyACM0"** : vous n'avez pas encore les droits sur le port série. Relancez la commande `sudo usermod` ci-dessus et reconnectez-vous.

**L'Arduino n'est pas détecté** : ouvrez `server.py` avec un éditeur de texte et vérifiez la ligne `PORT_SERIAL`. Essayez `/dev/ttyACM0` ou `/dev/ttyACM1`. Pour voir quel port est utilisé, tapez dans le terminal :

```
ls /dev/ttyACM*
```

---

## Structure du projet

```
index.html        le jeu (ouvrir dans le navigateur)
style.css         apparence visuelle
src/
  scenarios.js    les 15 scénarios et leurs effets
  vue.js          la scène 3D et les flux d'énergie
  moteur.js       la logique du jeu
arduino/
  au_courant.ino  le programme chargé sur l'Arduino
server.py         le pont entre l'Arduino et le navigateur
```

---

## Plus loin : Intégrer un joystick arcade

Le joystick permet de naviguer entre les domaines sur la carte et de déplacer le bateau. Il vient en complément des 3 boutons, qui restent nécessaires pour choisir les options A, B, C dans les scénarios.

Un joystick arcade fonctionne comme des boutons : chaque direction (haut, bas, gauche, droite) est un contact digital. Il se branche sur une breadboard avec des fils Dupont.

**Câblage :**

Le joystick a une broche GND commune et une broche par direction. Branchez-les sur l'Arduino avec INPUT_PULLUP : pas besoin de résistances, comme pour les boutons.

```
Arduino UNO
GND   ── GND commun du joystick
Pin 5 ── Gauche
Pin 6 ── Droite
Pin 7 ── Haut  (optionnel)
Pin 8 ── Bas   (optionnel)
```

**Modifier le sketch Arduino :**

Ouvrez `arduino/au_courant.ino` et ajoutez les nouvelles broches dans `setup()` et `loop()`. Gauche et droite permettent de naviguer entre les domaines :

```cpp
const int PIN_GAUCHE = 5;
const int PIN_DROITE = 6;

// Dans setup() :
pinMode(PIN_GAUCHE, INPUT_PULLUP);
pinMode(PIN_DROITE, INPUT_PULLUP);

// Dans loop() :
if (digitalRead(PIN_GAUCHE) == LOW) {
  Serial.println("B:A");
  delay(300);
}
if (digitalRead(PIN_DROITE) == LOW) {
  Serial.println("B:C");
  delay(300);
}
```

Le reste du jeu (server.py et le navigateur) n'a pas besoin d'être modifié : il reçoit déjà les mêmes commandes B:A, B:B, B:C.
