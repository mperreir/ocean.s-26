#include <Adafruit_NeoPixel.h>

// ======================================================
// INPUTS: joystick + validate button (switches, pullup)
// ======================================================
const int PIN_UP     = 2;
const int PIN_DOWN   = 3;
const int PIN_LEFT   = 4;
const int PIN_RIGHT  = 5;
const int PIN_BUTTON = 6;

unsigned long lastSendMs = 0;
const unsigned long SEND_INTERVAL_MS = 20;

// ======================================================
// LED STRIPS (5 independent strips)
// ======================================================
// Data pins for each strip (spiral)
const int STRIP_PINS[5] = {7, 8, 9, 10, 11};

// LED count for each strip 
const int STRIP_LEN[5]  = {4, 5, 6, 10, 11};

// Create strips
Adafruit_NeoPixel s0(STRIP_LEN[0], STRIP_PINS[0], NEO_GRB + NEO_KHZ800);
Adafruit_NeoPixel s1(STRIP_LEN[1], STRIP_PINS[1], NEO_GRB + NEO_KHZ800);
Adafruit_NeoPixel s2(STRIP_LEN[2], STRIP_PINS[2], NEO_GRB + NEO_KHZ800);
Adafruit_NeoPixel s3(STRIP_LEN[3], STRIP_PINS[3], NEO_GRB + NEO_KHZ800);
Adafruit_NeoPixel s4(STRIP_LEN[4], STRIP_PINS[4], NEO_GRB + NEO_KHZ800);

Adafruit_NeoPixel* strips[5] = { &s0, &s1, &s2, &s3, &s4 };

String inLine;

// ---------------- colors ----------------
uint32_t colorForMode(Adafruit_NeoPixel* st, int mode){
  // mode: 0=OFF, 1=BLUE, 2=RED
  if (mode == 1) return st->Color(0, 0, 255);
  if (mode == 2) return st->Color(255, 0, 0);
  return st->Color(0, 0, 0);
}

void fillStrip(int idx, int mode){
  if (idx < 0 || idx > 4) return;
  Adafruit_NeoPixel* st = strips[idx];
  uint32_t c = colorForMode(st, mode);
  for (int i = 0; i < st->numPixels(); i++) st->setPixelColor(i, c);
  st->show();
}

void fillAll(int mode){
  for (int k = 0; k < 5; k++) fillStrip(k, mode);
}

// ---------------- serial read line ----------------
bool readSerialLine(String &out) {
  while (Serial.available()) {
    char c = (char)Serial.read();
    if (c == '\r') continue;
    if (c == '\n') {
      out = inLine;
      inLine = "";
      return true;
    }
    inLine += c;
    if (inLine.length() > 140) inLine = "";
  }
  return false;
}

// ---------------- commands from browser ----------------
// Supported commands:
//   ALL,<mode>
//   SPIRAL,<idx>,<mode>
//
// mode: 0=OFF, 1=BLUE, 2=RED
//
// Example:
//   ALL,0          -> all OFF
//   SPIRAL,3,1     -> strip #3 BLUE
//   SPIRAL,1,2     -> strip #1 RED
//   ALL,1          -> all BLUE (end game)
void handleCommand(String cmd) {
  cmd.trim();
  if (!cmd.length()) return;

  if (cmd.startsWith("ALL,")) {
    int mode = cmd.substring(4).toInt();
    fillAll(mode);
    Serial.println("OK");
    return;
  }

  if (cmd.startsWith("SPIRAL,")) {
    int p1 = cmd.indexOf(',', 7);
    if (p1 < 0) return;
    int idx = cmd.substring(7, p1).toInt();
    int mode = cmd.substring(p1 + 1).toInt();
    fillStrip(idx, mode);
    Serial.println("OK");
    return;
  }
}

void setup() {
  pinMode(PIN_UP,     INPUT_PULLUP);
  pinMode(PIN_DOWN,   INPUT_PULLUP);
  pinMode(PIN_LEFT,   INPUT_PULLUP);
  pinMode(PIN_RIGHT,  INPUT_PULLUP);
  pinMode(PIN_BUTTON, INPUT_PULLUP);

  Serial.begin(9600);

  for (int i = 0; i < 5; i++) {
    strips[i]->begin();
    strips[i]->setBrightness(40);
    strips[i]->show(); // OFF
  }

  // Start: all OFF 
  fillAll(0);
}

void loop() {
  // 1) send joystick state (every 20ms)
  unsigned long now = millis();
  if (now - lastSendMs >= SEND_INTERVAL_MS) {
    lastSendMs = now;

    int up     = digitalRead(PIN_UP)     == LOW ? 1 : 0;
    int down   = digitalRead(PIN_DOWN)   == LOW ? 1 : 0;
    int left   = digitalRead(PIN_LEFT)   == LOW ? 1 : 0;
    int right  = digitalRead(PIN_RIGHT)  == LOW ? 1 : 0;
    int button = digitalRead(PIN_BUTTON) == LOW ? 1 : 0;

    Serial.print("U:"); Serial.print(up);
    Serial.print(",D:"); Serial.print(down);
    Serial.print(",L:"); Serial.print(left);
    Serial.print(",R:"); Serial.print(right);
    Serial.print(",B:"); Serial.println(button);
  }

  // 2) read commands from browser
  String cmd;
  if (readSerialLine(cmd)) {
    handleCommand(cmd);
  }
}