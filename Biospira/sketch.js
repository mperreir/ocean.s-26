// Réinitialise le timer d'inactivité à chaque interaction du joueur
function touchActivity() { if (lastActivity !== null) lastActivity = Date.now(); }

let gameStarted = false;

// ================================================================
// INPUTS: mouse + joystick
// ================================================================
function mousePressed() {
  touchActivity()
  if (document.getElementById('tray').style.display !== 'none' && G.selTray) {
    for (let b of basins) if (b.isMouseOver()) { onBasinClick(b.def.id); break; }
  }
}

function keyPressed() {
  touchActivity();
  if (keyCode === UP_ARROW) onJoyMove('up');
  else if (keyCode === DOWN_ARROW) onJoyMove('down');
  else if (keyCode === LEFT_ARROW) onJoyMove('left');
  else if (keyCode === RIGHT_ARROW) onJoyMove('right');
  else if (keyCode === ENTER || key === ' ') onJoyConfirm();
}

function onJoyMove(dir) {
  touchActivity()
  
  if (!gameStarted) return;
  
  let win = document.getElementById('win');
  if (win && win.style.display === 'flex') return;

  if (document.getElementById('panel').classList.contains('open')) {
    if (!document.querySelector('.schoice.joy-hover')) {
      joyUI.phaseChoiceIdx = 0;
      applyChoiceFocus();
    }
    joyMoveSelection(dir);
  }
  else if (document.getElementById('tray').style.display !== 'none') joyMovePlacement(dir);
}

function onJoyConfirm() {
  touchActivity()
  let intro = document.getElementById('intro');
  let win = document.getElementById('win');

  if (!gameStarted) { 
    initGame(); 
    return; 
  }
  
  if (win && win.style.display === 'flex') { restartGame(); return; }

  if (document.getElementById('panel').classList.contains('open')) {
    let focused = document.querySelector('.schoice.joy-hover');
    if (!focused) {
      joyUI.phaseChoiceIdx = 0;
      applyChoiceFocus();
      focused = document.querySelector('.schoice.joy-hover');
    }
    if (focused) {
      let id = focused.id.replace('sc_', '');
      selChoice(id);
      confirmChoice();
    }
    return;
  }

  if (document.getElementById('tray').style.display !== 'none') {
    if (joyUI.focus === 'tray') {
      let ids = getAvailableTrayTypes();
      if (!ids.length) return;
      selTray(ids[joyUI.trayIdx]);
      joyUI.focus = 'basin'; 
      applyTrayFocus();
      applyBasinFocus();
    } else {
      if (!G.selTray) {
        toast('Choisis une espece avant de placer', true);
        joyUI.focus = 'tray';
        applyTrayFocus();
        applyBasinFocus();
        return;
      }
      let bids = getAvailableBasinIds();
      if (!bids.length) return;
      onBasinClick(bids[joyUI.basinIdx]);
      applyTrayFocus();
      applyBasinFocus();
    }
  }
}

function joyMoveSelection(dir) {
  let items = document.querySelectorAll('.schoice');
  let count = items.length;
  if (count === 0) return;
  
  let delta = (dir === 'up' || dir === 'left') ? -1 : 1;
  joyUI.phaseChoiceIdx = (joyUI.phaseChoiceIdx + delta + count) % count;
  applyChoiceFocus();
}

function joyMovePlacement(dir) {
  if (joyUI.focus === 'tray') {
    if (dir === 'right') {
      joyUI.focus = 'basin';
      applyTrayFocus();
      applyBasinFocus();
      return;
    }
    let ids = getAvailableTrayTypes();
    if (!ids.length) return;
    let delta = (dir === 'up') ? -1 : (dir === 'down') ? 1 : 0;
    if (delta !== 0) {
      joyUI.trayIdx = (joyUI.trayIdx + delta + ids.length) % ids.length;
      applyTrayFocus();
    }
    return;
  }

  // FOCUS ON BASINS
  let bids = getAvailableBasinIds();
  if (!bids.length) return;
  
  let currentId = bids[joyUI.basinIdx];
  let curB = basins.find(b => b.def.id === currentId);
  if (!curB) return;

  let targetId = null;

  if (dir === 'left') {
    if (curB.def.side === 'right') {
      // Chercher le bassin de gauche au même niveau
      let leftOne = basins.find(b => b.def.side === 'left' && Math.abs(b.y - curB.y) < 10 && !G.placed[b.def.id]);
      if (leftOne) targetId = leftOne.def.id;
      else { 
        joyUI.focus = 'tray'; applyTrayFocus(); applyBasinFocus(); return; 
      }
    } else {
      // Déjà à gauche, on essaie de retourner au tray
      if (G.selTray) {
        return; // BLOQUE LE RETOUR
      }
      joyUI.focus = 'tray';
      applyTrayFocus();
      applyBasinFocus();
      return;
    }
  } else if (dir === 'right') {
    if (curB.def.side === 'left') {
      // Chercher le bassin de droite au même niveau
      let rightOne = basins.find(b => b.def.side === 'right' && Math.abs(b.y - curB.y) < 10 && !G.placed[b.def.id]);
      if (rightOne) targetId = rightOne.def.id;
    }
  } else if (dir === 'up' || dir === 'down') {
    let delta = (dir === 'up') ? -1 : 1;
    // Navigation verticale : on essaie de rester du même côté
    let sameSide = basins.filter(b => b.def.side === curB.def.side && !G.placed[b.def.id]);
    sameSide.sort((a, b) => a.y - b.y);
    let curIdxInSide = sameSide.findIndex(b => b.def.id === curB.def.id);
    
    if (curIdxInSide !== -1) {
      let nextIdx = curIdxInSide + delta;
      if (nextIdx >= 0 && nextIdx < sameSide.length) {
        targetId = sameSide[nextIdx].def.id;
      } else {
        // Fallback : naviguer dans la liste globale si on atteint le bord
        let nextGlobalIdx = (joyUI.basinIdx + delta + bids.length) % bids.length;
        targetId = bids[nextGlobalIdx];
      }
    }
  }

  if (targetId) {
    let newIdx = bids.indexOf(targetId);
    if (newIdx !== -1) {
      joyUI.basinIdx = newIdx;
      applyBasinFocus();
    }
  }
}

function getAvailableTrayTypes() {
  return Array.from(document.querySelectorAll('.tcard:not(.placed)'))
    .map(el => el.id.replace('tc_', ''));
}

function getAvailableBasinIds() {
  return basins
    .filter(b => !G.placed[b.def.id])
    .sort((a, b) => a.y - b.y || (a.def.side === 'left' ? -1 : 1))
    .map(b => b.def.id);
}

function applyChoiceFocus() {
  Array.from(document.querySelectorAll('.schoice')).forEach(e => e.classList.remove('joy-hover'));
  let items = Array.from(document.querySelectorAll('.schoice'));
  let el = items[joyUI.phaseChoiceIdx];
  if (el) el.classList.add('joy-hover');
}

function applyTrayFocus() {
  Array.from(document.querySelectorAll('.tcard')).forEach(e => e.classList.remove('joy-hover'));
  if (joyUI.focus !== 'tray') return;
  let ids = getAvailableTrayTypes();
  if (!ids.length) return;
  joyUI.trayIdx = Math.min(joyUI.trayIdx, ids.length - 1);
  let el = document.getElementById('tc_' + ids[joyUI.trayIdx]);
  if (el) el.classList.add('joy-hover');
}

function applyBasinFocus() {
  if (joyUI.focus !== 'basin') { G.joyBasinFocusId = null; return; }
  let bids = getAvailableBasinIds();
  if (!bids.length) { G.joyBasinFocusId = null; joyUI.focus = 'tray'; applyTrayFocus(); return; }
  joyUI.basinIdx = Math.min(joyUI.basinIdx, bids.length - 1);
  G.joyBasinFocusId = bids[joyUI.basinIdx];
}

function initJoySelectionForPhase() {
  joyUI.phaseChoiceIdx = 0;
  setTimeout(applyChoiceFocus, 50);
}

function initJoyPlacement() {
  joyUI.focus = 'tray';
  joyUI.trayIdx = 0;
  joyUI.basinIdx = 0;
  applyTrayFocus();
  applyBasinFocus();
}

// ================================================================
// GAME UI
// ================================================================
let curChoice = null;

function refreshDots() {
  for (let i = 0; i < 4; i++) {
    let d = document.getElementById('pd' + i);
    if (d) d.className = 'pd' + (i < G.phase ? ' done' : i === G.phase ? ' act' : '');
  }
}

let _tt;

function toast(msg, err, keep) {
  let t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'show' + (err ? ' err' : '');
  clearTimeout(_tt);
  if (!keep) _tt = setTimeout(() => { t.className = ''; }, 2700);
}

function hideToast() {
  clearTimeout(_tt); document.getElementById('toast').className = '';
}

function setBar(html) { document.getElementById('ibar').innerHTML = html; }

function initGame() {
  if (gameStarted) return;
  
  let intro = document.getElementById('intro');
  if (!intro) return;

  gameStarted = true;
  lastActivity = Date.now();
  ledsOffAll();
  
  _doFullscreen();

  intro.style.display = 'none';
  intro.style.opacity = '0';
  intro.style.pointerEvents = 'none';

  setTimeout(() => {
    window.focus();
    if (document.activeElement) document.activeElement.blur();
  }, 100);

  startSelPhase();
}

window.initGame = initGame; window.confirmChoice = confirmChoice; window.restartGame = restartGame;

function startSelPhase() {
  hideToast();
  let ph = PHASES[G.phase];
  document.getElementById('panel').classList.add('open');
  document.getElementById('pStep').textContent = ph.step;
  document.getElementById('pTitle').textContent = ph.title;
  document.getElementById('pHint').textContent = ph.hint;
  document.getElementById('cbtn').style.display = 'none';
  curChoice = null;
  let cc = document.getElementById('choices');
  cc.innerHTML = '';

  if (!ph._shuffled) {
    ph._shuffled = [...ph.choices].sort(() => Math.random() - 0.5);
  }

  ph._shuffled.forEach(ch => {
    let el = document.createElement('div');
    el.className = 'schoice';
    el.id = 'sc_' + ch.id;
    let iconHtml = ch.img ? '<img src="' + ch.img + '" class="sc-img" alt="' + ch.name + '">' : '<div class="sc-em">' + ch.emoji + '</div>';
    el.innerHTML = iconHtml + '<div><div class="sc-nm">' + ch.name + '</div><div class="sc-ds">' + ch.desc + '</div></div>';
    el.addEventListener('click', () => { selChoice(ch.id); confirmChoice(); });
    cc.appendChild(el);
  });
  setBar('<strong>Étape ' + (G.phase + 1) + '/4 :</strong> Choisissez l\'espèce dans le panneau à droite');
  refreshDots();
  initJoySelectionForPhase();
}

function selChoice(id) {
  Array.from(document.querySelectorAll('.schoice')).forEach(e => e.classList.remove('sel', 'bad'));
  let el = document.getElementById('sc_' + id);
  if (el) { el.classList.add('sel'); }
  curChoice = id;
  hideToast();
}

function confirmChoice() {
  if (!curChoice) return;
  let ph = PHASES[G.phase]; let ok = (curChoice === ph.correct); let sp = ph.choices.find(c => c.id === curChoice);

  if (ok) {
    G.selections[ph.id] = ph.correct;
    toast('✅ Bon choix !');
    for (let i = 0; i < 20; i++) confettis.push(new Confetti());

    // Marquer l'élément comme bon
    let el = document.getElementById('sc_' + curChoice);
    if (el) {
      el.classList.remove('sel');
      el.classList.add('good');
    }

    curChoice = null; G.phase++;
    let pd = document.getElementById('pd' + (G.phase - 1));
    if (pd) pd.className = 'pd done';

    if (G.phase >= 4) setTimeout(startPlacementPhase, 1200); else setTimeout(startSelPhase, 1200);
  } else {
    toast('⚠️ Mauvais choix car : ' + sp.desc, true, true);
    Array.from(document.querySelectorAll('.schoice.sel')).forEach(e => {
      e.classList.remove('sel');
      e.classList.add('bad');
      setTimeout(() => e.classList.remove('bad'), 2000);
    });
    curChoice = null;
  }
}

function startPlacementPhase() {
  hideToast();
  document.getElementById('panel').classList.remove('open');
  let tray = document.getElementById('tray'); tray.style.display = 'flex'; tray.innerHTML = '';

  let shuffledPhases = [...PHASES].sort(() => Math.random() - 0.5);

  shuffledPhases.forEach(ph => {
    let sp = ph.choices.find(c => c.id === ph.correct); let relB = BDEFS.filter(b => b.correct === ph.id);
    let sub = relB.length > 1 ? relB.length + ' bassins' : ph.id === 'algae' ? 'Côté gauche' : ph.id === 'fish' ? 'Côté droit' : ph.id === 'moules' ? 'Côté droit' : '';
    let card = document.createElement('div'); card.className = 'tcard'; card.id = 'tc_' + ph.id;
    let iconHtml = sp.img ? '<img src="' + sp.img + '" class="tc-img" alt="' + sp.name + '">' : '<div class="tc-em">' + sp.emoji + '</div>';
    card.innerHTML = iconHtml + '<div><div class="tc-nm">' + sp.name + '</div>';
    card.addEventListener('click', () => selTray(ph.id)); tray.appendChild(card);
  });
  for (let i = 0; i < 4; i++) { let d = document.getElementById('pd' + i); if (d) d.className = 'pd'; }
  setBar('🎯 <strong>Choisir</strong> une espèce, puis le <strong>bon bassin</strong> sur l\'éolienne !');
  initJoyPlacement();
}

function selTray(type) {
  let relB = BDEFS.filter(b => b.correct === type);
  if (relB.every(b => G.placed[b.id])) { toast('Toutes les cases de ce type sont remplies !', true); return; }

  Array.from(document.querySelectorAll('.tcard')).forEach(c => c.classList.remove('act'));
  let card = document.getElementById('tc_' + type);
  if (card) card.classList.add('act');

  G.selTray = type;
  let ph = PHASES.find(p => p.id === type);
  let sp = ph.choices.find(c => c.id === ph.correct);
  toast('👆 Cliquez sur le bon bassin pour ' + sp.emoji + ' !');

  applyTrayFocus();
  applyBasinFocus();
}

function onBasinClick(bid) {
  if (!G.selTray) { toast('⬅️ Sélectionnez d\'abord une espèce !', true); return; }
  let bd = BDEFS.find(b => b.id === bid);
  if (!bd) return;
  if (G.placed[bid]) { toast('Ce bassin est déjà occupé !', true); return; }

  let placing = G.selTray;
  let bObj = basins.find(b => b.def.id === bid);

  if (placing === bd.correct) {
    setBasinLed(bid, "blue");
    let ph = PHASES.find(p => p.id === placing);
    let sp = ph.choices.find(c => c.id === ph.correct);
    for (let i = 0; i < 15; i++) particles.push(new Particle(bObj.x + bObj.w / 2, bObj.y + bObj.h / 2));
    G.placed[bid] = true;
    
    // Check if category is finished
    let relB = BDEFS.filter(b => b.correct === placing);
    if (relB.every(b => G.placed[b.id])) {
      let card = document.getElementById('tc_' + placing);
      if (card) card.classList.add('placed');
      G.selTray = null;
      Array.from(document.querySelectorAll('.tcard')).forEach(c => c.classList.remove('act'));
    }

    // Retour automatique du focus sur les espèces à gauche après un placement réussi
    joyUI.focus = 'tray';

    toast('🟢 Excellent ! ' + sp.emoji + ' ' + sp.name + ' est au bon endroit !');
    let total = Object.keys(G.placed).length;
    if (total >= BDEFS.length) { setTimeout(showWin, 900); return; }
    setBar('✅ Encore <strong>' + (BDEFS.length - total) + '</strong> bassin(s) à remplir !');
    
    applyTrayFocus();
    applyBasinFocus();
  } else {
    setBasinLed(bid, "red");
    if (bObj) bObj.wrongTimeout = 30;
    toast('🔴 Ce n\'est pas la bonne espèce pour ce bassin !', true);
    applyBasinFocus();
  }
}

function showWin() {
  ledsBlueAll();
  let ov = document.getElementById('win');
  ov.style.display = 'flex';
  let row = document.getElementById('wchain');
  row.innerHTML = '';
  let order = ['fish', 'algae', 'moules', 'cucumber'];
  let arrows = ['→ nourrit →', '→ filtre pour →', '→ recycle pour →'];
  order.forEach((type, i) => {
    let ph = PHASES.find(p => p.id === type);
    let sp = ph.choices.find(c => c.id === ph.correct);
    let it = document.createElement('div');
    it.className = 'wci';
    let winIcon = sp.img ? '<img src="' + sp.img + '" class="wce-img" alt="' + sp.name + '">' : '<div class="wce">' + sp.emoji + '</div>';
    it.innerHTML = winIcon + '<div class="wcl">' + sp.name + '</div>';
    row.appendChild(it);
    if (i < 3) {
      let a = document.createElement('div');
      a.className = 'war';
      a.innerHTML = arrows[i];
      row.appendChild(a);
    }
  });
  let numC = windowWidth > 500 ? 150 : 70;
  for (let i = 0; i < numC; i++) confettis.push(new Confetti());
}

function resetToIntro() {
  gameStarted = false;
  clearInterval(winCountdownInterval); winCountdownInterval = null;
  PHASES.forEach(ph => ph._shuffled = null); 
  G = { phase: 0, selections: {}, placed: {}, selTray: null };
  document.getElementById('win').style.display = 'none';
  document.getElementById('tray').style.display = 'none';
  document.getElementById('panel').classList.remove('open');
  Array.from(document.querySelectorAll('.tcard, .schoice')).forEach(c => c.classList.remove('placed', 'act', 'joy-hover', 'bad', 'good', 'sel'));
  confettis = []; buildBasins(); refreshDots();
  let el = document.getElementById('intro');
  el.style.display = 'flex'; el.style.opacity = '1'; el.style.pointerEvents = 'auto';
  lastActivity = null;
}

function restartGame() {
  gameStarted = true;
  ledsOffAll();
  PHASES.forEach(ph => ph._shuffled = null);
  G = { phase: 0, selections: {}, placed: {}, selTray: null, joyBasinFocusId: null };
  joyUI = { phaseChoiceIdx: 0, focus: 'tray', trayIdx: 0, basinIdx: 0 };
  document.getElementById('win').style.display = 'none';
  document.getElementById('tray').style.display = 'none';
  let fr = document.getElementById('floatReplay');
  if (fr) fr.style.display = 'none';
  Array.from(document.querySelectorAll('.tcard, .schoice')).forEach(c => c.classList.remove('placed', 'act', 'joy-hover', 'bad', 'good', 'sel'));
  confettis = [];
  buildBasins();
  refreshDots();
  startSelPhase();
}

function showFloatReplay() {
    document.getElementById('win').style.display = 'none';
    document.getElementById('floatReplay').style.display = 'block';
}

function _doFullscreen() {
    var el = document.documentElement;
    try {
        if (el.requestFullscreen) el.requestFullscreen();
        else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
        else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
    } catch (e) {
        console.warn("Fullscreen request failed", e);
    }
}

function toggleFullscreen() {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
        (document.exitFullscreen || document.webkitFullscreenElement || function () { }).call(document);
    } else { _doFullscreen(); }
}

// Tentative de passage en plein écran sur la TOUTE PREMIÈRE interaction
function firstInteraction() {
    _doFullscreen();
    window.removeEventListener('click', firstInteraction);
    window.removeEventListener('keydown', firstInteraction);
}
window.addEventListener('click', firstInteraction);
window.addEventListener('keydown', firstInteraction);

document.addEventListener('fullscreenchange', function () {
    var btn = document.getElementById('fsBtn');
    if (btn) btn.textContent = document.fullscreenElement ? '⛷' : '⛶';
    window.focus();
});

document.querySelector('.sbtn').addEventListener('click', function () {
    _doFullscreen();
}, true);