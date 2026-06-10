// ================================================================
// DRAWING
// ================================================================
function drawOcean() {
  let c1 = color('#0a3d6b'); let c2 = color('#010810');
  for (let i = 0; i <= height; i += 2) {
    stroke(lerpColor(c1, c2, i / height));
    strokeWeight(2);
    line(0, i, width, i);
  }
  noStroke();
  fill(150, 230, 255, 10);
  push(); translate(width * 0.16, 0); rotate(sin(frameCount * 0.01) * 0.08); rect(-25, 0, 50, height * 0.75, 25); pop();
  push(); translate(width * 0.52, 0); rotate(sin(frameCount * 0.015 - 0.5) * 0.08); rect(-32, 0, 64, height * 0.75, 32); pop();
  push(); translate(width * 0.80, 0); rotate(sin(frameCount * 0.012 + 0.5) * 0.08); rect(-25, 0, 50, height * 0.75, 25); pop();
  bubbles.forEach(b => { b.update(); b.draw(); });
  rocks.forEach(r => { fill(40, 30, 20); stroke(80, 60, 40, 100); strokeWeight(1); ellipse(r.x, height - 10, r.w, r.h * 2); });
  kelps.forEach(k => { k.update(); k.draw(); });
  fishes.forEach(f => { f.update(); f.draw(); });

  // Dessinés par-dessus le fond marin :
  crustaceans.forEach(c => { c.update(); c.draw(); });
}

function drawMast() {
  noStroke(); fill(20, 80, 128); rect(L.cx - L.mw / 2, 0, L.mw, height, 4);
  fill(100, 200, 255, 200); textSize(8); textFont('Orbitron'); text("T04", L.cx, 14);
}

function drawRotor() {
  push(); translate(L.cx, 21); rotate(frameCount * 0.02);
  noStroke(); fill(200, 230, 255, 220);
  for (let i = 0; i < 3; i++) { push(); rotate(PI * 2 / 3 * i); rect(-2, 0, 4, 42, 2); pop(); }
  pop();
}

class Bubble {
  constructor() { this.s = 3 + random(12); this.x = random(width); this.y = random(height, height * 2); this.speed = random(0.5, 2); }
  update() { this.y -= this.speed; this.x += sin(frameCount * 0.05 + this.y) * 0.5; if (this.y < -50) this.y = height + random(100); }
  draw() { fill(150, 230, 255, 40); stroke(150, 230, 255, 60); strokeWeight(1); ellipse(this.x, this.y, this.s); }
}

class Kelp {
  constructor(x, col) { 
    this.x = x; 
    this.col = col; 
    this.h = 70 + random(120); 
    this.offset = random(TWO_PI); 
  }
  update() { }
  draw() { 
    push(); 
    translate(this.x, height); 
    rotate(sin(frameCount * 0.02 + this.offset) * 0.15); 
    fill(this.col); 
    noStroke(); 
    rect(-2.5, -this.h, 5, this.h, 3); 
    pop(); 
  }
}

class Fish {
  constructor(imgId, rtl) {
    this.imgId = imgId;
    this.rtl = rtl;
    this.x = rtl ? random(width, width * 2) : random(-width, 0);
    this.y = random(height * 0.1, height * 0.8);
    this.speed = random(0.5, 1.5);
    this.size = this.imgId === 'requin' ? random(80, 120) : random(40, 65);
  }
  update() { if (this.rtl) { this.x -= this.speed; if (this.x < -100) this.x = width + random(100); } else { this.x += this.speed; if (this.x > width + 100) this.x = -random(100); } this.y += sin(frameCount * 0.01 + this.x) * 0.2; }
  draw() {
    push(); translate(this.x, this.y);
    if (this.rtl) scale(-1, 1);
    let img = loadedImages[this.imgId];
    if (img) {
      imageMode(CENTER); image(img, 0, 0, this.size * 2, this.size * 2);
    } else {
      textSize(this.size); text("🐟", 0, 0);
    }
    pop();
  }
}

class Crustacean {
  constructor(imgId, rtl) {
    this.imgId = imgId;
    this.rtl = rtl;
    this.x = random(0, width);
    this.y = height - random(0, 60); // Placé sur le fond marin (qui fait 72px de haut)
    this.speed = random(0.1, 0.4); // Slower than fish
    this.size = random(30, 50);
  }
  update() {
    if (this.rtl) {
      this.x -= this.speed;
      if (this.x < -50) this.x = width + 50;
    } else {
      this.x += this.speed;
      if (this.x > width + 50) this.x = -50;
    }
    // Small vertical waddle
    this.y += sin(frameCount * 0.05 + this.x) * 0.1;
  }
  draw() {
    push(); translate(this.x, this.y);
    if (this.rtl) scale(-1, 1);
    let img = loadedImages[this.imgId];
    if (img) {
      imageMode(CENTER); image(img, 0, 0, this.size * 2, this.size * 2);
    } else {
      textSize(this.size); text("🦀", 0, 0);
    }
    pop();
  }
}


class Basin {
  constructor(x, y, def, w, h) {
    this.x = x; this.y = y; this.def = def; this.w = w; this.h = h;
    this.hover = false; this.shake = 0; this.wrongTimeout = 0;
    this.speciesCount = 0;   // nombre d'individus actuellement affichés
    this.maxSpecies = 6;     // objectif final
    this.spawnTimer = 0;     // compteur de frames entre chaque apparition
    this.spawnInterval = 28; // frames entre deux apparitions (~0.5s à 60fps)
  }
  isMouseOver() { return mouseX >= this.x && mouseX <= this.x + this.w && mouseY >= this.y && mouseY <= this.y + this.h; }
  
  drawCables() {
    // stroke(180, 220, 255, 140); strokeWeight(2.5);
    // let mastEdge = this.def.side === 'left' ? L.cx - L.mw / 2 : L.cx + L.mw / 2;
    // let basinEdge = this.def.side === 'left' ? this.x + this.w : this.x;
    // let midY = this.y + this.h / 2;
    // line(mastEdge, midY, basinEdge, midY);
    // strokeWeight(1); stroke(140, 200, 240, 56);
    // line(mastEdge, this.y + 10, basinEdge, this.y + 10); line(mastEdge, this.y + this.h - 10, basinEdge, this.y + this.h - 10);
    // noStroke(); fill(30, 96, 144); rect(L.cx - L.mw / 2 - 7, midY - 5, L.mw + 14, 10, 5);
  }

  drawNets() {
    let sameSide = BDEFS.filter(bd => bd.side === this.def.side);
    sameSide.sort((a, b) => a.yp - b.yp);
    let myIdx = sameSide.findIndex(bd => bd.id === this.def.id);
    
    if (myIdx !== -1 && myIdx < sameSide.length - 1) {
      let nextBasin = basins.find(b => b.def.id === sameSide[myIdx + 1].id);
      if (nextBasin) {
        let y1 = this.y + this.h;
        let y2 = nextBasin.y;
        let midY = (y1 + y2) / 2;
        let cinch = this.w * 0.12; 
        
        noFill(); stroke(100, 200, 255, 35); strokeWeight(1.2);
        
        let vLines = 7;
        for (let i = 0; i <= vLines; i++) {
          let xTop = this.x + (this.w / vLines) * i;
          let xBot = nextBasin.x + (nextBasin.w / vLines) * i;
          let xMid = lerp(xTop, xBot, 0.5);
          let center = this.x + this.w / 2;
          let offset = (xTop < center) ? cinch : (xTop > center) ? -cinch : 0;
          
          beginShape();
          vertex(xTop, y1);
          quadraticVertex(xMid + offset + sin(frameCount*0.02)*2, midY, xBot, y2);
          endShape();
        }
        
        let hLines = 4;
        for (let j = 1; j < hLines; j++) {
          let t = j / hLines;
          beginShape();
          for (let i = 0; i <= vLines; i++) {
            let xTop = this.x + (this.w / vLines) * i;
            let xBot = nextBasin.x + (nextBasin.w / vLines) * i;
            let xMid = lerp(xTop, xBot, 0.5);
            let center = this.x + this.w / 2;
            let offset = (xTop < center) ? cinch : (xTop > center) ? -cinch : 0;
            let px = (1-t)*(1-t)*xTop + 2*(1-t)*t*(xMid + offset) + t*t*xBot;
            let py = (1-t)*(1-t)*y1 + 2*(1-t)*t*midY + t*t*y2;
            let sag = sin((i/vLines) * PI) * 4;
            vertex(px, py + sag);
          }
          endShape();
        }
      }
    }
  }

  update() {
    this.hover = this.isMouseOver() && document.getElementById('tray').style.display !== 'none';
    this.joyHover = G.joyBasinFocusId === this.def.id;
    if (this.wrongTimeout > 0) { this.wrongTimeout--; this.shake = sin(this.wrongTimeout * 0.5) * 5; } else this.shake = 0;
    // Animation de peuplement progressif
    if (G.placed[this.def.id] && this.speciesCount < this.maxSpecies) {
      this.spawnTimer++;
      if (this.spawnTimer >= this.spawnInterval) {
        this.speciesCount++;
        this.spawnTimer = 0;
      }
    }
  }
  draw() {
    push(); translate(this.x + this.shake, this.y);
    let isPlaced = G.placed[this.def.id]; let isWrong = this.wrongTimeout > 0;
    let bc = color(0, 180, 255, 100);
    if (this.hover || this.joyHover) bc = color('#00e5ff');
    if (isPlaced) bc = color('#00ff9d');
    if (isWrong) bc = color('#ff3d5a');
    
    // Joystick/Mouse glow effect
    if (this.joyHover || this.hover) {
      noStroke();
      fill(0, 229, 255, 15);
      rect(-4, -4, this.w + 8, this.h + 8, 16);
    }

    stroke(bc); strokeWeight(isPlaced || this.hover || this.joyHover || isWrong ? 3 : 2.5); fill(0, 50, 120, 60);
    rect(0, 0, this.w, this.h, 12, 12, 18, 18);

    noStroke(); fill(0, 150, 220, 30);
    let wh = this.h * 0.5 + sin(frameCount * 0.05 + this.y) * 4;
    rect(0, this.h - wh, this.w, wh, 0, 0, 16, 16);
    fill(232, 244, 248); stroke(200, 240, 255, 150); strokeWeight(1);
    let nf = max(3, round(this.w / 16)); let fSpace = this.w / (nf + 1);
    for (let i = 1; i <= nf; i++) rect(fSpace * i - 6, -5, 12, 10, 5);
    
    noStroke(); fill(0, 200, 255, 180); textSize(14); textFont('Orbitron'); 
    text(this.def.depth, this.w / 2, 18);
    
    fill(150, 220, 255, 200); textSize(13); 
    text(this.def.label, this.w / 2, this.h - 12);

    if (isPlaced) {
      let spId = ''; for (let p of PHASES) if (p.id === this.def.correct) spId = p.correct;
      let spImg = loadedImages[spId];
      // Grille d'affichage : on place les individus en rangées
      let count = max(1, this.speciesCount);
      let cols = count <= 2 ? count : count <= 4 ? 2 : 3;
      let rows = ceil(count / cols);
      let iSize = min(this.w, this.h) / (cols + 1.2); // taille d'un individu
      let startX = this.w / 2 - (cols - 1) * iSize * 0.5;
      let startY = this.h / 2 - (rows - 1) * iSize * 0.5;
      for (let idx = 0; idx < count; idx++) {
        let col = idx % cols;
        let row = floor(idx / cols);
        let ix = startX + col * iSize;
        let iy = startY + row * iSize;
        let wobble = sin(frameCount * 0.05 + idx * 1.3) * 0.06;
        push(); translate(ix, iy); rotate(wobble);
        if (spImg) {
          imageMode(CENTER); image(spImg, 0, 0, iSize, iSize);
        } else {
          let em = ''; for (let p of PHASES) if (p.id === this.def.correct) for (let c of p.choices) if (c.id === p.correct) em = c.emoji;
          textSize(iSize * 0.7); text(em, 0, 0);
        }
        pop();
      }
      // Compteur en bas du bassin
      noStroke(); fill(0, 229, 255, 200); textSize(10); textFont('Orbitron');
      text('×' + count, this.w / 2, this.h - 8);
    } else { fill(255, 70); textSize(26); text('?', this.w / 2, this.h / 2); }
    stroke(160, 210, 255, 56); strokeWeight(1);
    let nh = this.h * 0.55; let botW = 24; let bx = (this.w - botW) / 2;
    push(); translate(0, this.h - 2);
    for (let i = 0; i <= 7; i++) line((this.w / 7) * i, 0, bx + (botW / 7) * i, nh);
    for (let i = 0; i <= 5; i++) { let ty = (nh / 5) * i; let t = i / 5; line(0 + (bx) * t, ty, this.w + (bx + botW - this.w) * t, ty); }
    stroke(160, 210, 255, 100); strokeWeight(1.5); line(0, 0, bx, nh); line(this.w, 0, bx + botW, nh);
    pop(); pop();
  }
}

class Particle {
  constructor(x, y) { this.x = x; this.y = y; this.vx = random(-2, 2); this.vy = random(-1, -3); this.life = 1.0; this.size = random(3, 8); }
  update() { this.x += this.vx; this.y += this.vy; this.life -= 0.02; }
  draw() { noStroke(); fill(0, 220, 255, this.life * 150); ellipse(this.x, this.y, this.size); }
}

class Confetti {
  constructor() { this.x = random(width); this.y = -10; this.vx = random(-1, 1); this.vy = random(2, 5); this.col = random(['#00e5ff', '#00ff9d', '#ffd700', '#ff6b9d', '#a29bfe']); this.size = random(5, 14); this.shape = random([0, 1]); this.rot = random(TWO_PI); this.rs = random(-0.1, 0.1); }
  update() { this.x += this.vx; this.y += this.vy; this.rot += this.rs; }
  draw() { push(); translate(this.x, this.y); rotate(this.rot); fill(this.col); noStroke(); if (this.shape === 0) rect(-this.size / 2, -this.size / 2, this.size, this.size); else ellipse(0, 0, this.size); pop(); }
}