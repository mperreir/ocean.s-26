// ================================================================
// LED CONTROL (Browser -> Arduino, 5 strips = 5 basins)
// Arduino protocol:
//   SPIRAL,<idx>,<mode>   mode: 0=OFF 1=BLUE 2=RED
//   ALL,<mode>
// ================================================================
const BASIN_LED = { bL0: 0, bL1: 1, bR0: 2, bR1: 3, bR2: 4 };

// avoid writer lock collisions if multiple events happen quickly
let _ardWriteQueue = Promise.resolve();

function sendArduino(cmd) {
  if (!ARD.port || !ARD.port.writable) return;
  _ardWriteQueue = _ardWriteQueue.then(async () => {
    const writer = ARD.port.writable.getWriter();
    try {
      const data = new TextEncoder().encode(cmd + "\n");
      await writer.write(data);
    } finally {
      writer.releaseLock();
    }
  }).catch(err => console.warn("sendArduino error:", err));
}

function ledsOffAll() { sendArduino("ALL,0"); }
function ledsBlueAll() { sendArduino("ALL,1"); }

function setBasinLed(bid, color) {
  const idx = BASIN_LED[bid];
  if (idx === undefined) return;

  if (color === "blue") sendArduino(`SPIRAL,${idx},1`);
  else if (color === "red") sendArduino(`SPIRAL,${idx},2`);
  else sendArduino(`SPIRAL,${idx},0`);
}