// ── THREE.JS ──
const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias:true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
sceneRef = scene;
scene.background = new THREE.Color(0x071828);
scene.fog = new THREE.FogExp2(0x071828, 0.016);

const camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, 0.1, 300);
camera.position.set(-13,22,55); camera.lookAt(0,0,0);

ambientLight = new THREE.AmbientLight(0x1a4060, 0.9); scene.add(ambientLight);
sunLight = new THREE.DirectionalLight(0xffd580, 1.1); sunLight.position.set(40,60,-20); scene.add(sunLight);
const fillLight = new THREE.DirectionalLight(0x4a9abe, 0.35); fillLight.position.set(-30,10,30); scene.add(fillLight);

const seaGeo = new THREE.PlaneGeometry(300,300,60,60);
seaMat = new THREE.MeshPhongMaterial({color:0x0d3060,shininess:70,specular:0x4a9abe});
const sea = new THREE.Mesh(seaGeo,seaMat); sea.rotation.x=-Math.PI/2; scene.add(sea);
const seaPos=seaGeo.attributes.position, seaBase=[];
for(let i=0;i<seaPos.count;i++) seaBase.push(seaPos.getY(i));

const turbines=[];
function makeTurbine(x,z,h){
  const g=new THREE.Group(),mat=new THREE.MeshPhongMaterial({color:0xdde8f0});
  const mast=new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.18,h,7),mat); mast.position.y=h/2; g.add(mast);
  const nacelle=new THREE.Mesh(new THREE.BoxGeometry(0.55,0.3,0.3),mat); nacelle.position.y=h; g.add(nacelle);
  const rotor=new THREE.Group(); rotor.position.set(0,h,0.16);
  for(let i=0;i<3;i++){const pale=new THREE.Mesh(new THREE.BoxGeometry(0.07,2.6,0.04),new THREE.MeshPhongMaterial({color:0xf0f5f8}));pale.position.y=1.3;const piv=new THREE.Group();piv.add(pale);piv.rotation.z=(i/3)*Math.PI*2;rotor.add(piv);}
  g.add(rotor);
  const base=new THREE.Mesh(new THREE.CylinderGeometry(0.28,0.38,2.5,7),new THREE.MeshPhongMaterial({color:0x1a3a5c}));base.position.y=-1.25;g.add(base);
  g.position.set(x,0,z);g.userData.rotor=rotor;g.userData.spd=0.007+Math.random()*0.006;scene.add(g);return g;
}
for(let c=0;c<6;c++)for(let r=0;r<4;r++)turbines.push(makeTurbine((c-2.5)*10+(Math.random()-0.5)*2,(r-1.5)*9-8+(Math.random()-0.5)*2,6+Math.random()*2));

const boatG=new THREE.Group();
boatG.add(new THREE.Mesh(new THREE.BoxGeometry(2.5,0.55,1),new THREE.MeshPhongMaterial({color:0x7b3a10})));
const cabin=new THREE.Mesh(new THREE.BoxGeometry(0.85,0.65,0.7),new THREE.MeshPhongMaterial({color:0xddd5b0}));cabin.position.set(0.2,0.6,0);boatG.add(cabin);
boatG.position.set(-16,0.25,14);scene.add(boatG);

const platG=new THREE.Group();
platG.add(new THREE.Mesh(new THREE.BoxGeometry(4,0.35,3),new THREE.MeshPhongMaterial({color:0x2a5a8a})));
const logo=new THREE.Mesh(new THREE.BoxGeometry(0.7,0.7,0.12),new THREE.MeshPhongMaterial({color:0x00a550}));logo.position.set(0,0.55,-1.3);platG.add(logo);
platG.position.set(16,0.2,10);scene.add(platG);

const clouds=[];
function makeCloud(x,y,z){const g=new THREE.Group(),m=new THREE.MeshPhongMaterial({color:0xc8e4f0,transparent:true,opacity:0.7});[[0,0,0,1.8,1],[1.4,0.3,0,1.3,0.85],[-1.3,0.2,0,1.1,0.8]].forEach(([cx,cy,cz,rx,ry])=>{const s=new THREE.Mesh(new THREE.SphereGeometry(1,6,6),m);s.scale.set(rx,ry,rx*0.9);s.position.set(cx,cy,cz);g.add(s);});g.position.set(x,y,z);g.userData.spd=0.004+Math.random()*0.007;scene.add(g);return g;}
[-20,10,30,-35,5,-15].forEach((x,i)=>clouds.push(makeCloud(x,20+i%3*4,-20-i*5)));

// ── ZONES DE DOMAINES ──
const ZONES = [
  { idx:0, emoji:'⚡', titre:'La Vie du Courant',    pos: new THREE.Vector3(14, 0.25, 5),   cam: new THREE.Vector3(14, 16, 28) },
  { idx:1, emoji:'🔀', titre:'Le Partage du Courant',pos: new THREE.Vector3(-16, 0.25, 10), cam: new THREE.Vector3(-16, 16, 30) },
  { idx:2, emoji:'🤝', titre:'Le Pouvoir du Courant',pos: new THREE.Vector3(0, 0.25, -5),   cam: new THREE.Vector3(0, 18, 16) },
];

// Cible lerp bateau et caméra
const boatTarget = new THREE.Vector3(-16, 0.25, 14);
const camTarget   = new THREE.Vector3(-8, 20, 50);
let visitedBlocs = new Set();
let travelling = false;
let travelCallback = null;

function navigateTo(zone) {
  if (travelling) return;
  travelling = true;
  boatTarget.copy(zone.pos);
  camTarget.copy(zone.cam);
  // Désactiver tous les marqueurs pendant le voyage
  document.querySelectorAll('.zone-marker').forEach(m => m.classList.add('travelling'));
  // Callback déclenché à l'arrivée
  travelCallback = () => {
    travelling = false;
    startBloc(zone.idx);
  };
}

let t=0;
(function animate(){
  requestAnimationFrame(animate); t+=0.011;
  for(let i=0;i<seaPos.count;i++){const x=seaPos.getX(i),z=seaPos.getZ(i);seaPos.setY(i,seaBase[i]+Math.sin(x*0.28+t)*0.22+Math.sin(z*0.18+t*0.75)*0.18);}
  seaPos.needsUpdate=true;
  turbines.forEach(tb=>{if(tb.userData.rotor)tb.userData.rotor.rotation.z+=tb.userData.spd;});

  // Lerp bateau vers cible
  boatG.position.x += (boatTarget.x - boatG.position.x) * 0.04;
  boatG.position.z += (boatTarget.z - boatG.position.z) * 0.04;
  boatG.position.y = 0.25 + Math.sin(t*0.85)*0.07;
  boatG.rotation.z = Math.sin(t*0.65)*0.035;

  // Orientation du bateau dans la direction du mouvement
  const dx = boatTarget.x - boatG.position.x;
  const dz = boatTarget.z - boatG.position.z;
  if (Math.abs(dx)+Math.abs(dz) > 0.05) {
    boatG.rotation.y = Math.atan2(dx, dz);
  }

  // Lerp caméra
  camera.position.x += (camTarget.x - camera.position.x) * 0.025;
  camera.position.z += (camTarget.z - camera.position.z) * 0.025;
  camera.position.y += (camTarget.y - camera.position.y) * 0.025;
  camera.lookAt(boatG.position.x, 0, boatG.position.z);

  // Vérifier arrivée
  const distB = Math.abs(boatG.position.x - boatTarget.x) + Math.abs(boatG.position.z - boatTarget.z);
  if (travelling && distB < 0.8 && travelCallback) {
    const cb = travelCallback; travelCallback = null;
    cb();
  }

  // Mise à jour position marqueurs HTML
  updateZoneMarkers();

  clouds.forEach(c=>{c.position.x+=c.userData.spd;if(c.position.x>65)c.position.x=-65;});
  renderer.render(scene,camera);
})();

window.addEventListener('resize',()=>{camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix();renderer.setSize(window.innerWidth,window.innerHeight);});


function renderFlux(usagers, prodPct) {
  // Production
  const cappedProd = Math.min(prodPct, 100);
  document.getElementById('flux-prod-val').textContent = prodPct + '%';
  document.getElementById('flux-prod-val').style.color = prodPct > 100 ? '#e74c3c' : prodPct < 30 ? '#e8931a' : 'var(--foam)';
  document.getElementById('flux-prod-bar').style.width = cappedProd + '%';
  document.getElementById('flux-prod-bar').style.background = prodPct > 100 ? '#e74c3c' : prodPct < 30 ? '#e8931a' : 'var(--foam)';

  // Usagers
  const container = document.getElementById('flux-usagers');
  container.innerHTML = '';
  usagers.forEach(u => {
    const div = document.createElement('div');
    div.className = 'flux-usager';
    div.innerHTML = `
      <div class="flux-usager-icon">${u.icon}</div>
      <div class="flux-usager-label">${u.label}</div>
      <div class="flux-usager-pct" style="color:${u.color}" data-pct="${u.pct}">0%</div>
      <div class="flux-usager-bar-bg"><div class="flux-usager-bar" style="background:${u.color};width:0%"></div></div>
    `;
    container.appendChild(div);
  });
  // Animer après un tick
  setTimeout(() => {
    container.querySelectorAll('.flux-usager').forEach((el, i) => {
      const pct = usagers[i].pct;
      el.querySelector('.flux-usager-pct').textContent = pct + '%';
      el.querySelector('.flux-usager-bar').style.width = pct + '%';
    });
  }, 80);
}

function showFlux(scenarioId) {
  const d = FLUX_DATA[scenarioId];
  if (!d) return;
  renderFlux(d.initial, d.prod);
}

function updateFluxAfterChoice(scenarioId, optionId) {
  const d = FLUX_DATA[scenarioId];
  if (!d || !d.options[optionId]) return;
  renderFlux(d.options[optionId], d.prod);
}

