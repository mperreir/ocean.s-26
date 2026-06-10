# BIOSPIRA — Jeu éducatif IMTA (Aquaculture Multitrophique Intégrée)

> Un jeu interactif développé avec **p5.js** simulant la gestion d'un écosystème aquacole sous une éolienne offshore. Contrôlable au clavier **ou** via un joystick Arduino physique avec LEDs NeoPixel.

---

## Présentation du jeu

**BIOSPIRA** plonge le joueur sous une éolienne offshore pour construire un écosystème IMTA équilibré. L'IMTA (Aquaculture Multitrophique Intégrée) consiste à associer plusieurs espèces marines dans un même espace afin que les déchets des uns deviennent les nutriments des autres.

### Déroulement

Le jeu se déroule en **deux grandes phases** :

#### Phase 1 — Sélection des espèces (4 étapes)

Le joueur doit choisir la bonne espèce parmi 3 propositions pour chaque rôle :

| Étape | Question | ✅ Bonne réponse | ❌ Mauvaises réponses |
|-------|----------|-----------------|----------------------|
| 1/4 | Quel poisson ? | **Bar** | Requin, Saumon |
| 2/4 | Quelle algue ? | **Laminaires** | Algues rouges, Algues vertes |
| 3/4 | Quel filtreur ? | **Moules** | Coques, Huîtres |
| 4/4 | Quel recycleur de fond ? | **Concombre de mer** | Étoile de mer, Oursin violet |

- ✅ Bon choix → confettis + passage à l'étape suivante
- ❌ Mauvais choix → message d'explication + possibilité de réessayer

#### Phase 2 — Placement dans les bassins

Le joueur place chaque espèce dans le(s) bon(s) bassin(s) de l'éolienne :

| Bassin | Côté | Profondeur | Espèce attendue |
|--------|------|------------|-----------------|
| bL0    | Gauche | 0–5m   | Poissons (Bar) |
| bR0    | Droite | 0–5m   | Poissons (Bar) |
| bL1    | Gauche | 5–15m  | Algues (Laminaires) |
| bR1    | Droite | 15–30m | Filtreurs (Moules) |
| bL2    | Gauche | 30m+   | Recycleurs (Concombre) |
| bR2    | Droite | 30m+   | Recycleurs (Concombre) |

- 🟢 Bon placement → LED du bassin s'allume en **bleu**, animation de particules
- 🔴 Mauvais placement → LED s'allume en **rouge**, animation de tremblement, message d'erreur
- 🏆 Tous les bassins remplis → écran victoire avec la chaîne alimentaire complète

---

## Structure des fichiers

```
icreate/
├── index.html              # Page principale (structure HTML + chargement des scripts)
├── style.css               # Tous les styles visuels (dark mode, animations, responsive)
│
├── data.js                 # Données statiques + état global du jeu
├── draw.js                 # Classes de rendu p5.js
├── p5.js                   # Boucle setup/draw p5.js + layout
├── sketch.js               # Logique de jeu, inputs clavier/joystick, UI
│
├── arduino.js              # Communication Web Serial API ↔ Arduino
├── led.js                  # Contrôle des bandes LEDs NeoPixel
│
├── p5.min.js               # Bibliothèque p5.js (minifiée, usage interne)
├── logo-pecheur.png        # Logo du jeu
│
├── algues/                 # Images PNG des algues
│   ├── algues-brunes.png
│   ├── algues-rouges.png
│   └── algues-vertes.png
├── crustaces/              # Images PNG des mollusques/crustacés
│   ├── coquillages.png
│   ├── huitres.png
│   └── moules.png
├── echinodermes/           # Images PNG des échinodermes
│   ├── concombre.png / concombreA.png
│   ├── etoile-de-mer.png / etoile-de-merA.png
│   └── oursin.png / oursinA.png
├── poisson/                # Images PNG des poissons
│   ├── bar.png
│   ├── requin.png
│   └── saumon.png
├── assets/fonts/           # Polices locales (Orbitron, Nunito, Bricolage Grotesque)
│
└── sketch_mar5a/
    └── sketch_mar5a.ino    # Code Arduino (joystick 5 boutons + 5 bandes NeoPixel)
```

---

## Architecture du code

### `data.js` — Données et état global

Contient :
- **`PHASES[]`** : tableau des 4 phases de sélection (question, indice, choix possibles, bonne réponse)
- **`BDEFS[]`** : définitions des 6 bassins (côté, profondeur, espèce correcte, label)
- **`G`** : objet d'état global du jeu `{ phase, selections, placed, selTray, joyBasinFocusId }`
- **`joyUI`** : état du curseur joystick `{ phaseChoiceIdx, focus, trayIdx, basinIdx }`
- **`ARD`** : configuration de la connexion Arduino (port, reader, cooldowns)
- **`INACTIVITY_LIMIT`** : délai d'inactivité avant reset automatique (actuellement désactivé)

### `draw.js` — Rendu visuel p5.js

Classes :

| Classe | Description |
|--------|-------------|
| `Bubble` | Bulles animées montant dans l'eau |
| `Kelp` | Laminaires se balançant en bas de l'écran |
| `Fish` | Poissons nageant en arrière-plan |
| `Crustacean` | Crustacés/échinodermes marchant sur le fond |
| `Basin` | Bassins de l'éolienne (cœur du gameplay, avec filets animés, glow, animations d'espèces) |
| `Particle` | Particules émises lors d'un bon placement |
| `Confetti` | Confettis émis lors d'un bon choix ou victoire |

Fonctions de fond :
- `drawOcean()` — dégradé de fond + bubbles + kelps + poissons
- `drawMast()` — mât vertical de l'éolienne
- `drawRotor()` — hélices tournantes en haut du mât

### `p5.js` — Boucle principale

- **`setup()`** : initialise le canvas, précharge toutes les images, crée les objets de décor, appelle `buildBasins()` et `setupSerialUI()`
- **`calcLayout()`** : calcule les dimensions du layout en fonction de la taille de la fenêtre
- **`buildBasins()`** : instancie les 6 objets `Basin` à partir de `BDEFS`
- **`draw()`** : boucle 30fps → dessine l'océan, le mât, les bassins, les effets de particules/confettis, vérifie l'inactivité

### `sketch.js` — Logique de jeu

**Inputs :**
- `mousePressed()` / `keyPressed()` — souris et clavier (flèches + Entrée/Espace)
- `onJoyMove(dir)` / `onJoyConfirm()` — entrées joystick (clavier ou Arduino)
- `joyMoveSelection(dir)` / `joyMovePlacement(dir)` — navigation dans les menus/bassins

**Cycle de jeu :**
```
initGame()
  └─ startSelPhase()         ← Phase sélection (x4)
       └─ selChoice(id)
            └─ confirmChoice()
                 └─ startPlacementPhase()  ← Phase placement
                      └─ selTray(type)
                           └─ onBasinClick(bid)
                                └─ showWin()  ← Victoire
```

**Gestion UI :**
- `toast(msg, err)` — notification flottante
- `setBar(html)` — barre d'instructions en bas
- `refreshDots()` — indicateur de progression (4 points)
- `restartGame()` / `resetToIntro()` — recommencer

### `arduino.js` — Communication série

Utilise l'API **Web Serial** (Chrome/Edge uniquement) :
- `connectArduino()` — ouvre le port série à 9600 bauds
- `readSerialLoop()` — lit en continu les lignes envoyées par l'Arduino
- `processSerialLine(raw)` — parse les formats `1,0,0,1,0` ou `U:1,D:0,L:0,R:1,B:0`
- `onArduinoState(st)` — détecte les fronts montants et appelle `onJoyMove()` / `onJoyConfirm()` avec cooldown anti-rebond

### `led.js` — Contrôle des LEDs

| Fonction | Commande envoyée | Effet |
|----------|-----------------|-------|
| `ledsOffAll()` | `ALL,0` | Toutes les LEDs éteintes |
| `ledsBlueAll()` | `ALL,1` | Toutes les LEDs en bleu (victoire) |
| `setBasinLed(bid, "blue")` | `SPIRAL,<idx>,1` | LED du bassin en bleu (bon placement) |
| `setBasinLed(bid, "red")` | `SPIRAL,<idx>,2` | LED du bassin en rouge (mauvais placement) |

Correspondance bassins → index de bande LED :
```
bL0 → strip 0  |  bL1 → strip 1  |  bR0 → strip 2  |  bR1 → strip 3  |  bR2 → strip 4
```
> ⚠️ Le bassin `bL2` (concombre de mer côté gauche) n'a pas de LED associée dans la version actuelle.

---

## 🔌 Branchement Arduino

### Matériel nécessaire

- **1x** Arduino Uno (ou compatible)
- **1x** Joystick 4 directions (ou 4 boutons poussoirs indépendants)
- **6x** Bandes LED NeoPixel (longueurs : 4, 5, 6, 10, 11 LEDs)
- Résistances **330–470 Ω** (une par bande, sur la ligne DATA)
- Capacité **1000 µF / 6.3V** sur l'alimentation des LEDs (recommandé)
- Alimentation externe 5V si les bandes LEDs sont longues

### Brochage — Joystick / Boutons

| Bouton | Broche Arduino | Sens |
|--------|---------------|------|
| Haut   | D2 | `INPUT_PULLUP` → LOW = pressé |
| Bas    | D3 | `INPUT_PULLUP` → LOW = pressé |
| Gauche | D4 | `INPUT_PULLUP` → LOW = pressé |
| Droite | D5 | `INPUT_PULLUP` → LOW = pressé |
| Valider| D6 | `INPUT_PULLUP` → LOW = pressé |

> Chaque bouton est connecté entre la broche et le **GND**. Aucune résistance externe nécessaire (résistances internes activées par `INPUT_PULLUP`).

```
Bouton HAUT   → D2 ─────┤
Bouton BAS    → D3 ─────┤
Bouton GAUCHE → D4 ─────┤ → GND (commun)
Bouton DROITE → D5 ─────┤
Bouton VALIDER→ D6 ─────┤
```

### Brochage — Bandes LEDs NeoPixel

| Bande | Broche DATA | Nb LEDs | Bassin associé |
|-------|-------------|---------|----------------|
| Strip 0 | D7  | 4  | bL0 (Poissons gauche) |
| Strip 1 | D8  | 5  | bL1 (Algues gauche) |
| Strip 2 | D9  | 6  | bR0 (Poissons droite) |
| Strip 3 | D10 | 10 | bR1 (Moules droite) |
| Strip 4 | D11 | 11 | bR2 (Concombre droite) |

**Schéma de câblage pour chaque bande :**

```
Arduino 5V ──────────────────── VCC (bande LED)
                │
               [470Ω]
                │
Arduino Dx ────────────────── DATA (bande LED)
Arduino GND ─────────────── GND (bande LED)
```

> **Important :** Placer une résistance de 330–470Ω en série sur le fil DATA pour protéger la première LED.

### Schéma général

```
                    ┌─────────────────────┐
                    │     ARDUINO UNO     │
   Bouton UP ──────►│ D2             D7 ──►──[470Ω]──► Strip 0 (4 LEDs)
   Bouton DOWN ────►│ D3             D8 ──►──[470Ω]──► Strip 1 (5 LEDs)
   Bouton LEFT ────►│ D4             D9 ──►──[470Ω]──► Strip 2 (6 LEDs)
   Bouton RIGHT ───►│ D5            D10 ──►──[470Ω]──► Strip 3 (10 LEDs)
   Bouton BTN ─────►│ D6            D11 ──►──[470Ω]──► Strip 4 (11 LEDs)
                    │                     │
   GND (commun) ───►│ GND            5V ──►──────────► VCC toutes les bandes
                    └─────────────────────┘
          USB ──────────────────────────────────────► Ordinateur (navigateur)
```

---

## Lancer le jeu

### Sans Arduino (mode clavier)

1. Ouvrir `index.html` dans un serveur local (ex: [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) dans VS Code, ou `npx serve .`)
2. Cliquer sur **🚀 PLONGER !** (ou appuyer sur Entrée)
3. Naviguer avec les **flèches** du clavier, valider avec **Entrée** ou **Espace**

> ⚠️ Ne pas ouvrir `index.html` directement comme fichier (`file://`) car les polices et images ne se chargeront pas correctement. Utiliser un serveur local.

### Avec Arduino

1. Installer la bibliothèque **Adafruit NeoPixel** dans l'IDE Arduino
2. Flasher `sketch_mar5a/sketch_mar5a.ino` sur l'Arduino
3. Ouvrir le jeu dans **Chrome** ou **Edge** (Web Serial non supporté sur Firefox/Safari)
4. Cliquer sur **🔌 Arduino** (bouton en haut du panneau ou sur l'écran d'intro)
5. Sélectionner le port série correspondant à l'Arduino
6. Le jeu envoie automatiquement les commandes LED à chaque action

---

## Design & Technologie

| Aspect | Choix |
|--------|-------|
| Rendu 2D | p5.js (canvas HTML5) |
| UI/Menus | HTML + CSS pur (overlay par-dessus le canvas) |
| Communication Arduino | Web Serial API (Chrome/Edge uniquement) |
| Polices | Orbitron (titres), Nunito + Bricolage Grotesque (corps) |
| Palette | Cyan `#00e5ff`, Vert `#00ff9d`, Rouge `#ff3d5a`, Or `#ffd700` |
| Framerate | 30 FPS |

---

## Compatibilité navigateur

| Navigateur | Jeu | Connexion Arduino |
|------------|-----|------------------|
| Chrome 89+ | ✅ | ✅ |
| Edge 89+   | ✅ | ✅ |
| Firefox    | ✅ | ❌ (Web Serial non supporté) |
| Safari     | ✅ | ❌ (Web Serial non supporté) |

---

## 📡 Protocole de communication Arduino ↔ Navigateur

### Arduino → Navigateur (état du joystick, toutes les 20ms)
```
U:1,D:0,L:0,R:0,B:0
```
Format alternatif accepté : `1,0,0,0,0` (up, down, left, right, button)

### Navigateur → Arduino (commandes LED)
```
ALL,0          # Toutes les LEDs éteintes (OFF)
ALL,1          # Toutes les LEDs en bleu (victoire)
SPIRAL,3,1     # Bande n°3 en bleu (bon placement)
SPIRAL,1,2     # Bande n°1 en rouge (mauvais placement)
SPIRAL,0,0     # Bande n°0 éteinte
```

Modes LED : `0` = OFF · `1` = BLEU · `2` = ROUGE

---

## 👥 Crédits

**Nom du projet :** BIOSPIRA

**Équipe :**
- BALDE Ibrahima Diamanka
- BOUDJOU Amine
- SASSI Maroua

Projet développé dans le cadre du projet **iCreate** de Polytech Nantes et l'école du Design.  
Dépôt GitLab : `https://gitlab.univ-nantes.fr/E24B135Q/icreate`
