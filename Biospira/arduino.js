// ================================================================
// SERIAL UI
// ================================================================
function setupSerialUI() {
  let btn = document.getElementById('serialBtn');
  if (!btn) return;
  if (!ARD.supported) {
    btn.textContent = 'Arduino: non supporte';
    btn.classList.add('err');
    return;
  }
  btn.addEventListener('click', connectArduino);
}

function setSerialBtn(state, txt) {
  let btn = document.getElementById('serialBtn');
  if (!btn) return;
  btn.classList.remove('ok', 'err');
  if (state) btn.classList.add(state);
  if (txt) btn.textContent = txt;
}

async function connectArduino() {
  if (!ARD.supported) {
    toast('Web Serial indisponible sur ce navigateur', true);
    return;
  }
  try {
    if (ARD.port) await disconnectArduino();
    ARD.port = await navigator.serial.requestPort();
    await ARD.port.open({ baudRate: 9600 });
    ARD.keepReading = true;
    setSerialBtn('ok', 'Arduino: connecte');
    toast('Arduino connecte');

    // IMPORTANT: init LEDs state right after connect
    ledsOffAll();

    readSerialLoop();
  } catch (err) {
    console.error(err);
    setSerialBtn('err', 'Arduino: erreur');
    toast('Connexion Arduino echouee', true);
  }
}

async function disconnectArduino() {
  ARD.keepReading = false;
  try {
    if (ARD.reader) {
      await ARD.reader.cancel();
      ARD.reader.releaseLock();
      ARD.reader = null;
    }
  } catch (e) { console.warn(e); }
  try {
    if (ARD.port) await ARD.port.close();
  } catch (e) { console.warn(e); }
  ARD.port = null;
}

async function readSerialLoop() {
  if (!ARD.port || !ARD.port.readable) return;
  const dec = new TextDecoder();
  while (ARD.keepReading && ARD.port && ARD.port.readable) {
    try {
      ARD.reader = ARD.port.readable.getReader();
      while (ARD.keepReading) {
        const { value, done } = await ARD.reader.read();
        if (done) break;
        ARD.buffer += dec.decode(value, { stream: true });
        let lines = ARD.buffer.split(/\r?\n/);
        ARD.buffer = lines.pop() || '';
        lines.forEach(processSerialLine);
      }
    } catch (err) {
      console.error(err);
      toast('Lecture serie interrompue', true);
      setSerialBtn('err', 'Arduino: deconnecte');
      break;
    } finally {
      if (ARD.reader) {
        ARD.reader.releaseLock();
        ARD.reader = null;
      }
    }
  }
  await disconnectArduino();
}

function processSerialLine(raw) {
  let line = (raw || '').trim();
  if (!line) return;

  // Supported formats:
  // 1,0,0,1,0
  // U:1,D:0,L:0,R:1,B:0
  let st = null;
  if (/^\s*[01]\s*,\s*[01]\s*,\s*[01]\s*,\s*[01]\s*,\s*[01]\s*$/.test(line)) {
    let p = line.split(',').map(v => parseInt(v.trim(), 10));
    if (p.length >= 5 && p.every(v => !Number.isNaN(v))) {
      st = { up: p[0] === 1, down: p[1] === 1, left: p[2] === 1, right: p[3] === 1, button: p[4] === 1 };
    }
  } else {
    let m = {};
    line.split(',').forEach(chunk => {
      let s = chunk.trim();
      if (!s) return;
      let kv = s.split(':');
      if (kv.length !== 2) return;
      m[kv[0].trim().toUpperCase()] = parseInt(kv[1].trim(), 10);
    });
    if (Object.keys(m).length) {
      st = {
        up: (m.U || m.UP || 0) === 1,
        down: (m.D || m.DOWN || 0) === 1,
        left: (m.L || m.LEFT || 0) === 1,
        right: (m.R || m.RIGHT || 0) === 1,
        button: (m.B || m.BTN || m.BUTTON || 0) === 1
      };
    }
  }
  if (st) onArduinoState(st);
}

function onArduinoState(st) {
  let now = millis();
  let upEdge = st.up && !ARD.last.up;
  let downEdge = st.down && !ARD.last.down;
  let leftEdge = st.left && !ARD.last.left;
  let rightEdge = st.right && !ARD.last.right;
  let buttonEdge = st.button && !ARD.last.button;

  if ((upEdge || downEdge || leftEdge || rightEdge) && now - ARD.lastNavAt > ARD.navCooldownMs) {
    ARD.lastNavAt = now;
    if (upEdge) onJoyMove('up');
    else if (downEdge) onJoyMove('down');
    else if (leftEdge) onJoyMove('right');
    else if (rightEdge) onJoyMove('left');
  }
  if (buttonEdge && now - ARD.lastConfirmAt > ARD.confirmCooldownMs) {
    ARD.lastConfirmAt = now;
    onJoyConfirm();
  }
  ARD.last = st;
}