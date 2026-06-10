#include <Servo.h>
#include <Adafruit_NeoPixel.h>

const int pinLED = A0;
const int NUM_LEDS = 8;
Adafruit_NeoPixel strip(NUM_LEDS, pinLED, NEO_GRB + NEO_KHZ800);

const int pinUP = 8;
const int pinDOWN = 9;
const int pinLEFT = 10;
const int pinRIGHT = 11;

const int pinBTN_Z = 2;
const int pinBTN_A = 4;
const int pinBTN_S = 12;
const int pinBTN_W = 7;
const int pinBTN_R = 13;

Servo servoZ;
Servo servoA;
Servo servoS;

int count = 0;
int etape = 0; // 0=comptage, 1=W activé, 2=motorZ, 3=motorS, 4=motorA
bool motorZ = false;
bool motorA = false;
bool motorS = false;

int prevUP = 1;
int prevDOWN = 1;
int prevLEFT = 1;
int prevRIGHT = 1;
int prevBTN_Z = 1;
int prevBTN_A = 1;
int prevBTN_S = 1;
int prevBTN_W = 1;
int prevBTN_R = 1;

void setup() {
  pinMode(pinUP, INPUT_PULLUP);
  pinMode(pinDOWN, INPUT_PULLUP);
  pinMode(pinLEFT, INPUT_PULLUP);
  pinMode(pinRIGHT, INPUT_PULLUP);
  pinMode(pinBTN_Z, INPUT_PULLUP);
  pinMode(pinBTN_A, INPUT_PULLUP);
  pinMode(pinBTN_S, INPUT_PULLUP);
  pinMode(pinBTN_W, INPUT_PULLUP);
  pinMode(pinBTN_R, INPUT_PULLUP);

  strip.begin();
  strip.show();
  Serial.begin(9600);
}

void setColor(uint8_t r, uint8_t g, uint8_t b) {
  for(int i = 0; i < NUM_LEDS; i++) {
    strip.setPixelColor(i, strip.Color(r, g, b));
  }
  strip.show();
}

void loop() {
  int UP = digitalRead(pinUP);
  int DOWN = digitalRead(pinDOWN);
  int LEFT = digitalRead(pinLEFT);
  int RIGHT = digitalRead(pinRIGHT);

  if(UP != prevUP) {
    Serial.println(UP == 0 ? "UP_ON" : "UP_OFF");
    prevUP = UP;
  }
  if(DOWN != prevDOWN) {
    Serial.println(DOWN == 0 ? "DOWN_ON" : "DOWN_OFF");
    prevDOWN = DOWN;
  }
  if(LEFT != prevLEFT) {
    Serial.println(LEFT == 0 ? "LEFT_ON" : "LEFT_OFF");
    prevLEFT = LEFT;
  }
  if(RIGHT != prevRIGHT) {
    Serial.println(RIGHT == 0 ? "RIGHT_ON" : "RIGHT_OFF");
    prevRIGHT = RIGHT;
  }

  int BTN_Z = digitalRead(pinBTN_Z);
  if(BTN_Z != prevBTN_Z) {
    if(prevBTN_Z == LOW && BTN_Z == HIGH) {
      count++;
      Serial.print("COUNT:");
      Serial.println(count);
      Serial.println("Z_ON");
      if(count >= 7 && etape == 0) {
        etape = 1;
        setColor(255, 255, 0); // Jaune
      }
    }
    prevBTN_Z = BTN_Z;
  }

  int BTN_W = digitalRead(pinBTN_W);
  if(BTN_W != prevBTN_W) {
    if(prevBTN_W == LOW && BTN_W == HIGH) {
      if(etape == 1) {
        motorZ = true;
        etape = 2;
        setColor(0, 255, 0); // Vert
        Serial.println("W_ON");
      }
    }
    prevBTN_W = BTN_W;
  }

  int BTN_S = digitalRead(pinBTN_S);
  if(BTN_S != prevBTN_S) {
    if(prevBTN_S == LOW && BTN_S == HIGH) {
      if(etape == 2) {
        motorZ = false;
        motorS = true;
        etape = 3;
        setColor(255, 255, 255); // Blanc
        Serial.println("S_ON");
      }
    }
    prevBTN_S = BTN_S;
  }

  int BTN_A = digitalRead(pinBTN_A);
  if(BTN_A != prevBTN_A) {
    if(prevBTN_A == LOW && BTN_A == HIGH) {
      if(etape == 3) {
        motorS = false;
        motorA = true;
        etape = 4;
        setColor(255, 0, 0); // Rouge
        Serial.println("A_ON");
      }
    }
    prevBTN_A = BTN_A;
  }

  if(motorZ) { if(!servoZ.attached()) servoZ.attach(3); servoZ.writeMicroseconds(2100); }
  else { servoZ.detach(); }

  if(motorA) { if(!servoA.attached()) servoA.attach(5); servoA.writeMicroseconds(2100); }
  else { servoA.detach(); }

  if(motorS) { if(!servoS.attached()) servoS.attach(6); servoS.writeMicroseconds(2100); }
  else { servoS.detach(); }

  int BTN_R = digitalRead(pinBTN_R);
  if(BTN_R != prevBTN_R) {
    if(prevBTN_R == LOW && BTN_R == HIGH) {
      count = 0;
      etape = 0;
      motorZ = false;
      motorA = false;
      motorS = false;
      setColor(0, 0, 255); // Bleu
      Serial.println("Z_OFF");
      Serial.println("A_OFF");
      Serial.println("S_OFF");
      Serial.println("R_ON");
    }
    prevBTN_R = BTN_R;
  }

  delay(20);
}
