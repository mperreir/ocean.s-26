// ================================================================
// P5 SETUP / DRAW
// ================================================================
function setup() {
  frameRate(30);
  noSmooth();
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  // Pre-load images inside sketch setup (requires them to be async or just let browser cache them)
  // For P5js rendering (like in the basins), we need P5js Image objects
  PHASES.forEach(ph => {
    ph.choices.forEach(ch => {
      if (ch.img) {
        loadImage(ch.img, img => { loadedImages[ch.id] = img; });
      }
    });
  });

  // Pre-load specific images for the ocean floor that might not be in PHASES
  let floorImages = {
    'concombre_sol': 'echinodermes/concombre.png',
    'coquillage_sol': 'crustaces/coquillages.png',
    'huitres_sol': 'crustaces/huitres.png',
    'moules_sol': 'crustaces/moules.png'
  };
  for (let key in floorImages) {
    loadImage(floorImages[key], img => { loadedImages[key] = img; });
  }

  for (let i = 0; i < 28; i++) bubbles.push(new Bubble());
  // Ajout de plus de poissons (16 au lieu de 8)
  ['bar', 'requin', 'saumon', 'bar', 'requin', 'saumon', 'bar', 'requin', 'bar', 'saumon', 'requin', 'bar', 'saumon', 'requin', 'bar', 'saumon'].forEach((id, i) => fishes.push(new Fish(id, i % 2 === 0)));
  [[60, 30], [50, 30], [80, 38], [50, 26], [36, 18], [68, 32], [46, 22]].forEach(s => rocks.push({ w: s[0], h: s[1], x: random(width) }));
  [4, 11, 18, 80, 87, 93, 97].forEach(left => {
    let baseColor = random([color('#0a4a1a'), color('#0d5520'), color('#126028')]);
    for (let k = 0; k < 3; k++) kelps.push(new Kelp(width * (left + k * 1.5) / 100, baseColor));
  });

  // Ajouter des crustacés/échinodermes au fond de l'océan en utilisant les clés pré-chargées
  ['concombre_sol', 'coquillage_sol', 'huitres_sol', 'moules_sol', 'coquillage_sol'].forEach((id, i) => crustaceans.push(new Crustacean(id, i % 2 === 0)));

  calcLayout();
  buildBasins();
  setupSerialUI();
}

function calcLayout() {
  L.vw = width; L.vh = height;
  L.bw = max(100, min(180, width * 0.20));
  L.bh = max(80, min(130, L.bw * 0.75));
  L.mw = max(18, min(28, width * 0.026));
  L.gap = max(10, min(20, width * 0.015));
  L.cx = width / 2;
}

function basinX(side) {
  return side === 'left' ? L.cx - L.mw / 2 - L.gap - L.bw : L.cx + L.mw / 2 + L.gap;
}

function buildBasins() {
  basins = [];
  BDEFS.forEach(bd => basins.push(new Basin(basinX(bd.side), (bd.yp / 100) * height, bd, L.bw, L.bh)));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calcLayout();
  buildBasins();
}

function draw() {
  drawOcean();
  drawMast();
  basins.forEach(b => { b.drawNets(); b.update(); b.draw(); });
  drawRotor();
  particles.forEach(p => { p.update(); p.draw(); });
  particles = particles.filter(p => p.life > 0);
  confettis.forEach(c => { c.update(); c.draw(); });
  confettis = confettis.filter(c => c.y < height + 20);

  // Inactivité : si le jeu est commencé et qu'aucun geste depuis 3 min → restart
  if (lastActivity !== null && document.getElementById('win').style.display !== 'none') {
    if (Date.now() - lastActivity > INACTIVITY_LIMIT) {
      lastActivity = null;
      resetToIntro();
    }
  }
}