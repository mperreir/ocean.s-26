function piocherNom() {
  nomJoueur = NOMS_MARITIMES[Math.floor(Math.random() * NOMS_MARITIMES.length)];
  const el = document.getElementById('joueur-bienvenue-new');
  if (el) el.textContent = 'Bienvenue, ' + nomJoueur + ' !';
}

// ── MÉDAILLE ──
function getMedaille(score) {
  if (score <= 0)  return { icon:'⚓', titre:'Gouverneur <em>débutant</em>',  phrase:'La gestion de l\'énergie est complexe. Revenez vous entraîner !', bonbons:0 };
  if (score <= 15) return { icon:'🥉', titre:'Gouverneur <em>confirmé</em>',  phrase:'Vous avez le sens du bien commun énergétique. Continuez !', bonbons:1 };
  if (score <= 30) return { icon:'🥇', titre:'Gouverneur <em>expert</em>',    phrase:'Vous avez su distribuer et gouverner avec équité. Bravo !', bonbons:2 };
  return             { icon:'🏆', titre:'Gouverneur <em>légendaire</em>', phrase:'Le territoire Au Courant a besoin de vous !',               bonbons:3 };
}

function showMedailleFinale() {
  const total = jauges.environnement + jauges.revenu_pecheurs + jauges.efficacite_energetique + jauges.acceptabilite_sociale;
  const m = getMedaille(total);
  document.getElementById('med-icon').textContent   = m.icon;
  document.getElementById('med-titre').innerHTML    = m.titre;
  document.getElementById('med-phrase').textContent = m.phrase;
  document.getElementById('med-score').textContent  = 'Score de médiation : ' + (total > 0 ? '+' : '') + total;
  const bonbonsEl = document.getElementById('med-bonbons');
  if (m.bonbons === 0) {
    bonbonsEl.innerHTML = '';
  } else {
    bonbonsEl.innerHTML = '<div class="medaille-bonbons-label">Votre récompense</div><div class="medaille-bonbons-val">' + '🍬'.repeat(m.bonbons) + '</div>';
  }
  // Préparer l'overlay animateur
  document.getElementById('anim-icon').textContent  = m.icon;
  document.getElementById('anim-titre').innerHTML   = nomJoueur + ' — ' + m.titre;
  document.getElementById('anim-bonbons').textContent = m.bonbons === 0 ? 'Aucun bonbon' : '🍬'.repeat(m.bonbons);
  showScreen('screen-medaille');
}

function showAnimateur() {
  document.getElementById('animateur-overlay').classList.add('visible');
}
function closeAnimateur() {
  document.getElementById('animateur-overlay').classList.remove('visible');
}

// ── THÈME ──
let isLight = false;
let seaMat, ambientLight, sunLight, sceneRef;
function toggleTheme() {
  isLight = !isLight;
  document.body.classList.toggle('light', isLight);
  document.getElementById('theme-toggle').textContent = isLight ? '🌙 Mode sombre' : '☀ Mode clair';
  if (sceneRef) {
    sceneRef.background = new THREE.Color(isLight ? 0xb8dcea : 0x071828);
    sceneRef.fog = new THREE.FogExp2(isLight ? 0xb8dcea : 0x071828, 0.016);
  }
  if (seaMat) seaMat.color.set(isLight ? 0x3a8ab0 : 0x0d3060);
  if (ambientLight) ambientLight.color.set(isLight ? 0x6090b0 : 0x1a4060);
  if (sunLight) sunLight.color.set(isLight ? 0xfff5d0 : 0xffd580);
}


// ── LOGIQUE JEU ──
let jauges={environnement:0,revenu_pecheurs:0,efficacite_energetique:0,acceptabilite_sociale:0};
let currentBlocIdx=0,currentScIdx=0,currentBloc=null;
const JMAX=15;

function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  document.getElementById('flux-bandeau').style.display = id==='screen-intro' ? 'none' : 'flex';
  if(id==='screen-carte'){
    document.querySelectorAll('.zone-marker').forEach(m=>m.classList.remove('travelling'));
  }
  document.getElementById('btn-reset-fixed').style.display = id==='screen-intro' ? 'none' : '';
}

function resetJeu(){
  jauges={environnement:0,revenu_pecheurs:0,efficacite_energetique:0,acceptabilite_sociale:0};
  currentBlocIdx=0; currentScIdx=0; currentBloc=null;
  travelling=false; travelCallback=null;
  visitedBlocs.clear();
  piocherNom();
  // Remettre le bateau à sa position de départ
  boatTarget.set(-16,0.25,14);
  boatG.position.set(-16,0.25,14);
  camTarget.set(-8,20,50);
  camera.position.set(-8,20,50);
  document.getElementById('progression').style.width='0%';
  updateJaugesUI();
  document.getElementById('screen-intro').scrollTop=0; showScreen('screen-intro');
}

function demarrerJeu() { showCarte(); }
document.getElementById('btn-retour-blocs').onclick=()=>showCarte();
document.getElementById('btn-next-bloc').onclick=()=>{
  const remaining = ZONES.filter(z => !visitedBlocs.has(z.idx));
  const next = remaining[Math.floor(Math.random() * remaining.length)];
  showCarte();
  setTimeout(() => navigateTo(next), 100);
};

// ── CARTE ──
function showCarte() {
  showScreen('screen-carte');
  // Réinitialiser caméra en vue large
  camTarget.set(-8, 20, 50);
  boatTarget.set(-16, 0.25, 14);
  buildZoneMarkers();
}

function buildZoneMarkers() {
  const container = document.getElementById('zones-container');
  container.innerHTML = '';
  ZONES.forEach(zone => {
    const done = visitedBlocs.has(zone.idx);
    const div = document.createElement('div');
    div.className = 'zone-marker' + (done ? ' done' : '');
    div.id = 'zone-' + zone.idx;
    const badge = done ? `<div class="zone-done-badge">— Déjà joué —</div>` : '';
    div.innerHTML = `<div class="zone-bubble"><div class="zone-emoji">${zone.emoji}</div><div class="zone-name">${zone.titre}</div>${badge}</div>`;
    if (!done) div.onclick = () => navigateTo(zone);
    container.appendChild(div);
  });
}

function updateZoneMarkers() {
  if (!document.getElementById('screen-carte') || document.getElementById('screen-carte').classList.contains('hidden')) return;
  ZONES.forEach(zone => {
    const el = document.getElementById('zone-' + zone.idx);
    if (!el) return;
    const v = zone.pos.clone();
    v.y = 2.5; // légèrement au-dessus de la mer
    v.project(camera);
    const x = (v.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-v.y * 0.5 + 0.5) * window.innerHeight;
    el.style.left = x + 'px';
    el.style.top  = y + 'px';
    // Masquer si derrière la caméra
    el.style.opacity = v.z < 1 ? '1' : '0';
    el.style.pointerEvents = v.z < 1 ? 'all' : 'none';
  });
}

function startBloc(idx){currentBlocIdx=idx;currentScIdx=0;currentBloc=DATA.blocs[idx];updateJaugesUI();showScreen('screen-game');loadScenario();}

function loadScenario(){
  const sc=currentBloc.scenarios[currentScIdx],total=currentBloc.scenarios.length;
  document.getElementById('progression').style.width=(currentScIdx/total*100)+'%';
  document.getElementById('sc-tag').textContent=sc.id+' · '+currentBloc.emoji;
  document.getElementById('sc-titre').textContent=sc.titre;
  document.getElementById('sc-contexte').textContent=sc.contexte;
  const dEl=document.getElementById('sc-dialogues');dEl.innerHTML='';
  const speakers=[];
  if(sc.demande_marcel)speakers.push({cls:'marcel',name:'Marcel — Pêcheur',icon:'🎣',text:sc.demande_marcel});
  if(sc.demande_claire)speakers.push({cls:'claire',name:'Claire — EDF',icon:'⚡',text:sc.demande_claire});
  speakers.forEach((s,i)=>{const div=document.createElement('div');div.className=`dialogue ${s.cls}`;div.style.animationDelay=(i*0.15)+'s';div.innerHTML=`<div class="dialogue-avatar">${s.icon}</div><div class="dialogue-body"><div class="dialogue-name">${s.name}</div><div class="dialogue-text">"${s.text}"</div></div>`;dEl.appendChild(div);});
  const oEl=document.getElementById('sc-options');oEl.innerHTML='';
  ['A','B','C'].forEach((letter,i)=>{if(!sc.options[i])return;const btn=document.createElement('button');btn.className='option-btn';btn.innerHTML=`<span class="option-letter">${letter}</span>${sc.options[i].texte}`;btn.onclick=()=>chooseOption(sc.options[i],btn);oEl.appendChild(btn);});
  document.getElementById('scenario-panel').scrollTop=0;
  // Afficher le flux initial du scénario
  showFlux(sc.id);
}

function chooseOption(opt,btnEl){
  document.querySelectorAll('.option-btn').forEach(b=>{b.disabled=true;});
  btnEl.classList.add('selected');

  const panel = document.getElementById('scenario-panel');
  panel.scrollTo({top:0, behavior:'smooth'});
  panel.classList.add('locked');

  const sc = currentBloc.scenarios[currentScIdx];

  // Suspense — 1s avant que les scores et la distribution bougent
  setTimeout(() => {
    const e=opt.effets;
    jauges.environnement+=e.environnement||0;
    jauges.revenu_pecheurs+=e.revenu_pecheurs||0;
    jauges.efficacite_energetique+=e.efficacite_energetique||0;
    jauges.acceptabilite_sociale+=e.acceptabilite_sociale||0;
    updateJaugesUI();
    showEffets(e);
    updateFluxAfterChoice(sc.id, opt.id);
  }, 1000);

  // Passage au scénario suivant après 6s (5s pour voir les flux)
  setTimeout(()=>{
    panel.classList.remove('locked');
    currentScIdx++;
    if(currentScIdx>=currentBloc.scenarios.length) showBilan();
    else loadScenario();
  }, 4000);
}

function showEffets(e){const c=document.getElementById('effet-notif');c.innerHTML='';const labels={environnement:'♻️ Efficience',revenu_pecheurs:'🔀 Distribution',efficacite_energetique:'💶 Éco. locale',acceptabilite_sociale:'🗳️ Démocratie'};Object.entries(e).forEach(([k,v],i)=>{if(!v)return;const p=document.createElement('div');p.className='effet-pill '+(v>0?'pill-pos':'pill-neg');p.style.animationDelay=(i*0.08)+'s';p.textContent=`${labels[k]} ${v>0?'+':''}${v}`;c.appendChild(p);});setTimeout(()=>c.innerHTML='',2300);}

function updateJaugesUI(){const clamp=v=>Math.max(2,Math.min(98,50+(v/JMAX)*50));const col=v=>v>=0?'#2ecc71':'#e74c3c';[['j-env','jv-env',jauges.environnement],['j-pec','jv-pec',jauges.revenu_pecheurs],['j-ene','jv-ene',jauges.efficacite_energetique],['j-soc','jv-soc',jauges.acceptabilite_sociale]].forEach(([b,v,val])=>{document.getElementById(b).style.width=clamp(val)+'%';document.getElementById(b).style.background=col(val);document.getElementById(v).textContent=(val>0?'+':'')+val;document.getElementById(v).style.color=col(val);});}

function getDesc(key, val) {
  const scales = {
    environnement: [
      [-8, "Vous avez laissé l'énergie produite se perdre en pure perte"],
      [-4, "Vous avez peu valorisé le surplus du parc éolien"],
      [-1, "Vous avez légèrement freiné la valorisation de la production"],
      [1,  "Vous avez maintenu une production à peine exploitée"],
      [4,  "Vous avez amélioré la valorisation de l'énergie produite"],
      [8,  "Vous avez optimisé l'usage de chaque mégawattheure"],
      [Infinity, "Vous avez transformé chaque surplus en ressource locale"]
    ],
    revenu_pecheurs: [
      [-8, "Vous avez laissé l'énergie aller aux mauvais usagers"],
      [-4, "Vous avez peu tenu compte des besoins réels du territoire"],
      [-1, "Vous avez fragilisé l'équité de la distribution locale"],
      [1,  "Vous avez maintenu une distribution minimale et fragile"],
      [4,  "Vous avez amélioré la répartition vers les usagers prioritaires"],
      [8,  "Vous avez construit une distribution juste et efficace"],
      [Infinity, "Vous avez fait de la distribution un modèle d'équité locale"]
    ],
    efficacite_energetique: [
      [-8, "Vous avez appauvri le territoire économiquement"],
      [-4, "Vous avez peu tenu compte des retombées locales"],
      [-1, "Vous avez légèrement fragilisé l'économie du territoire"],
      [1,  "Vous avez maintenu une économie locale à l'équilibre"],
      [4,  "Vous avez amélioré les retombées économiques locales"],
      [8,  "Vous avez renforcé l'autonomie économique du territoire"],
      [Infinity, "Vous avez fait d'Au Courant un moteur économique local"]
    ],
    acceptabilite_sociale: [
      [-8, "Vous avez vidé l'assemblée de tout sens démocratique"],
      [-4, "Vous avez fragilisé la gouvernance collective du dispositif"],
      [-1, "Vous n'avez pas réussi à renforcer la démocratie énergétique"],
      [1,  "Vous avez maintenu un semblant de délibération collective"],
      [4,  "Vous avez renforcé le pouvoir de l'assemblée Au Courant"],
      [8,  "Vous avez construit une gouvernance démocratique solide"],
      [Infinity, "Vous avez créé un modèle de démocratie énergétique exemplaire"]
    ]
  };
  const s = scales[key];
  for (const [threshold, label] of s) {
    if (val <= threshold) return label;
  }
  return s[s.length-1][1];
}

function showBilan(){
  visitedBlocs.add(currentBlocIdx);
  document.getElementById('progression').style.width='100%';
  const remaining = ZONES.filter(z => !visitedBlocs.has(z.idx));
  const allDone = remaining.length === 0;

  // Titre et sous-titre
  const titleEl = document.getElementById('bilan-title');
  const subEl = document.getElementById('bilan-sub');
  if (allDone) {
    titleEl.innerHTML = 'Score <em>final</em>';
    subEl.textContent = "Vous avez gouverné l\'énergie du territoire — voici le bilan global de vos votes.";
  } else {
    titleEl.innerHTML = 'Bilan du domaine';
    subEl.textContent = currentBloc.emoji + ' ' + currentBloc.titre + ' — résumé de vos décisions';
  }

  // Jauges
  const grid=document.getElementById('bilan-jauges');grid.innerHTML='';
  const clamp=v=>Math.max(2,Math.min(98,50+(v/JMAX)*50));
  [{k:'environnement',label:'♻️ Efficience',color:'#2ecc71'},{k:'revenu_pecheurs',label:'🔀 Distribution',color:'#e8931a'},{k:'efficacite_energetique',label:'💶 Économie locale',color:'#5bb8d4'},{k:'acceptabilite_sociale',label:'🗳️ Démocratie',color:'#a78bfa'}].forEach(item=>{
    const val=jauges[item.k],card=document.createElement('div');card.className='bilan-jauge-card';
    const desc = getDesc(item.k, val);
    card.innerHTML=`<div class="bilan-jauge-name">${item.label}</div><div class="bilan-jauge-bar-bg"><div class="bilan-jauge-bar-fill" style="background:${item.color}" data-w="${clamp(val)}"></div></div><div class="bilan-jauge-desc" style="color:${item.color}">${desc}</div><div class="bilan-jauge-chiffre">Score : ${val>0?'+':''}${val}</div>`;
    grid.appendChild(card);
  });

  // Boutons
  const nextBtn = document.getElementById('btn-next-bloc');
  const retourBtn = document.getElementById('btn-retour-blocs');
  if (allDone) {
    // Afficher la médaille après l'animation des barres
    setTimeout(() => showMedailleFinale(), 1400);
    nextBtn.style.display = 'none';
    retourBtn.style.display = 'none';
  } else {
    retourBtn.style.display = '';
    nextBtn.style.display = '';
    nextBtn.textContent = remaining.length === 1
      ? DATA.blocs[remaining[0].idx].emoji + ' ' + DATA.blocs[remaining[0].idx].titre + ' →'
      : 'Explorer un autre domaine →';
  }

  showScreen('screen-bilan');
  setTimeout(()=>{document.querySelectorAll('.bilan-jauge-bar-fill').forEach(b=>b.style.width=b.dataset.w+'%');},150);
}

// init
document.getElementById('btn-reset-fixed').style.display = 'none';
document.getElementById('flux-bandeau').style.display = 'none';
piocherNom();

// ── BOUTONS ARDUINO (SSE) ──────────────────────────────────────────────────
(function() {
  // ordre visuel gauche→centre→droite : Partage(ZONES[1]), Pouvoir(ZONES[2]), Vie(ZONES[0])
  const visualOrder = [1, 2, 0];

  const src = new EventSource('http://localhost:8080/events');
  src.onmessage = function(e) {
    try {
      const data = JSON.parse(e.data);

      if (data.type !== 'B') return;
      const idx = ['A','B','C'].indexOf(data.value.toUpperCase());
      if (idx === -1) return;

      // Écran intro — n'importe quel bouton lance le jeu
      const introVisible = !document.getElementById('screen-intro').classList.contains('hidden');
      if (introVisible) {
        document.getElementById('btn-commencer-new').click();
        return;
      }

      // Overlay animateur — n'importe quel bouton ferme
      const animateurVisible = document.getElementById('animateur-overlay').classList.contains('visible');
      if (animateurVisible) {
        closeAnimateur();
        return;
      }

      // Écran carte — A/B/C sélectionne les zones dans l'ordre visuel gauche→centre→droite
      const carteVisible = !document.getElementById('screen-carte').classList.contains('hidden');
      if (carteVisible) {
        const zone = ZONES[visualOrder[idx]];
        if (zone && !visitedBlocs.has(zone.idx) && !travelling) navigateTo(zone);
        return;
      }

      // Écran scénario — options A/B/C
      const gameVisible = !document.getElementById('screen-game').classList.contains('hidden');
      if (gameVisible) {
        const btns = document.querySelectorAll('#sc-options .option-btn:not(:disabled)');
        if (btns[idx]) btns[idx].click();
        return;
      }

      // Écran bilan — 3 boutons d'action
      const bilanVisible = !document.getElementById('screen-bilan').classList.contains('hidden');
      if (bilanVisible) {
        const bilanBtns = [
          document.getElementById('btn-retour-blocs'),
          document.getElementById('btn-next-bloc'),
          document.getElementById('btn-reset')
        ];
        const btn = bilanBtns[idx];
        if (btn && btn.style.display !== 'none') btn.click();
        return;
      }

      // Écran médaille — A=Montrer animateur, B=Nouveau joueur
      const medailleVisible = !document.getElementById('screen-medaille').classList.contains('hidden');
      if (medailleVisible) {
        const medBtns = [
          document.getElementById('btn-animateur'),
          document.getElementById('btn-reset-medaille')
        ];
        if (medBtns[idx]) medBtns[idx].click();
        return;
      }
    } catch(_) {}
  };
  src.onerror = function() {
    // silencieux si le serveur n'est pas lancé
  };
})();
