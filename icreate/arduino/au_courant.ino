// AU COURANT — 3 Boutons arcade (A, B, C)
// Bouton A : pin 2 + GND
// Bouton B : pin 3 + GND
// Bouton C : pin 4 + GND

const int PINS[3]    = {2, 3, 4};
const char LABELS[3] = {'A', 'B', 'C'};
bool lastState[3]    = {HIGH, HIGH, HIGH};

void setup() {
  Serial.begin(9600);
  for (int i = 0; i < 3; i++) {
    pinMode(PINS[i], INPUT_PULLUP);
  }
  delay(500);
  for (int i = 0; i < 3; i++) {
    lastState[i] = digitalRead(PINS[i]);
  }
  Serial.println("AU_COURANT_READY");
}

void loop() {
  for (int i = 0; i < 3; i++) {
    bool state = digitalRead(PINS[i]);
    if (state == LOW && lastState[i] == HIGH) {
      Serial.print("B:");
      Serial.println(LABELS[i]);
    }
    lastState[i] = state;
  }
  delay(50);
}
