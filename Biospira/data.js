// ================================================================
// DATA
// ================================================================
const PHASES = [
  {
    id: 'fish', step: 'ÉTAPE 1/4', title: "Quel poisson pour l'IMTA ?",
    hint: '💡 Choisissez le poisson adapté aux eaux froides, producteur de nutriments.', correct: 'bar',
    choices: [
      { 
        id: 'bar', 
        img: 'poisson/bar.png', 
        emoji: '🐟', 
        name: 'LE BAR', 
        desc: "Espèce emblématique de la région. Il tolère très bien les variations de salinité et les courants de l'estuaire.", 
        tag: '✅ Idéal IMTA', 
        good: true 
      },
      { 
        id: 'requin', 
        img: 'poisson/requin.png', 
        emoji: '🦈', 
        name: 'REQUIN', 
        desc: "Grand prédateur solitaire. Son métabolisme lent et ses besoins d'espace rendent son intégration complexe en bassin.", 
        tag: '❌ Inadapté' 
      },
      { 
        id: 'saumon', 
        img: 'poisson/saumon.png', 
        emoji: '🐟', 
        name: 'SAUMON', 
        desc: "Grand voyageur des eaux fraîches. Il supporte mal la remontée des températures estivales de la région.", 
        tag: '❌ Sensible' 
      },
    ]
  },
  {
    id: 'algae', step: 'ÉTAPE 2/4', title: "Quelle algue pour absorber les rejets ?",
    hint: "💡 L'algue idéale absorbe l'azote des poissons et pousse vite en eau froide.", correct: 'laminaires',
    choices: [
      {
        id: 'laminaires', 
        img: 'algues/algues-brunes.png', 
        emoji: '🌿', 
        name: 'LES LAMINAIRES', 
        desc: "Véritables 'éponges' à nitrates. Elles captent les nutriments rejetés par les poissons pour croître rapidement en eaux locales.", 
        tag: '✅ Extracteur nutritif', 
        good: true 
      },
      { 
        id: 'alguesRouges', 
        img: 'algues/algues-rouges.png', 
        emoji: '💚', 
        name: 'ALGUES ROUGES', 
        desc: "Fragiles et exigeantes en lumière. Elles supportent mal les eaux troubles et agitées de l'estuaire de la Loire.", 
        tag: '❌ Délicates' 
      },
      { 
        id: 'alguesVertes', 
        img: 'algues/algues-vertes.png', 
        emoji: '🌱', 
        name: 'ALGUES VERTES', 
        desc: "Souvent liées à un déséquilibre de l'eau. Leur prolifération est un mauvais indicateur pour la santé du bassin.", 
        tag: '❌ Risque invasif' 
      }
    ]
  },
  {
    id: 'moules', step: 'ÉTAPE 3/4', title: "Quel filtreur pour l'eau traitée ?",
    hint: "💡 Cette espèce doit filtrer l'eau en continu et valoriser les particules fines.", correct: 'moules',
    choices: [
      { 
    id: 'moules', 
    img: 'crustaces/moules.png', 
    emoji: '🦪', 
    name: "LES MOULES", 
    desc: "Filtreurs naturels suspendus sous les cages. Elles purifient l'eau en consommant les fines particules organiques en suspension.", 
    tag: '✅ Filtreur efficace', 
    good: true 
},
{ 
    id: 'coquillage', 
    img: 'crustaces/coquillages.png', 
    emoji: '🐚', 
    name: 'LES COQUES', 
    desc: "Vivent enfouies dans le sable. Difficiles à élever dans une installation en pleine mer sans sol meuble adapté.", 
    tag: '⚠️ Besoin de sable' 
},
{ 
    id: 'huitres', 
    img: 'crustaces/huitres.png', 
    emoji: '🎭', 
    name: 'LES HUÎTRES', 
    desc: "Sensibles aux sédiments de la Loire. Elles risqueraient de s'étouffer à cause de la vase apportée par le fleuve.", 
    tag: '❌ Sensibles' 
}
    ]
  },
  {
    id: 'cucumber', step: 'ÉTAPE 4/4', title: "Quel recycleur de fond ?",
    hint: "💡 Cette espèce ingère les sédiments organiques et les recycle en nutriments.", correct: 'concombre',
    choices: [
      { 
    id: 'concombre', 
    img: 'echinodermes/concombre.png', 
    emoji: '🥒', 
    name: 'CONCOMBRE DE MER', 
    desc: "L'aspirateur du fond marin. Il recycle les restes de nourriture et déchets tombés au sol pour éviter leur accumulation.", 
    tag: '✅ Nettoyeur', 
    good: true 
},
{ 
    id: 'etoile', 
    img: 'echinodermes/etoile-de-mer.png', 
    emoji: '⭐', 
    name: "ÉTOILE DE MER", 
    desc: "Redoutable prédatrice. Elle risque de grimper sur les structures pour dévorer votre production de mollusques.", 
    tag: '❌ Carnivore' 
},
{ 
    id: 'oursin', 
    img: 'echinodermes/oursin.png', 
    emoji: '🟣', 
    name: 'OURSIN VIOLET', 
    desc: "Principalement brouteur. Il s'attaquerait à vos cultures d'algues plutôt que de nettoyer les déchets au fond.", 
    tag: '❌ Brouteur' 
}
    ]
  },
];

const BDEFS = [
  { id: 'bL0', side: 'left', yp: 20, correct: 'fish', depth: '0–5m', label: '' },
  { id: 'bR0', side: 'right', yp: 20, correct: 'fish', depth: '0–5m', label: '' },
  { id: 'bL1', side: 'left', yp: 45, correct: 'algae', depth: '5–15m', label: '' },
  { id: 'bR1', side: 'right', yp: 45, correct: 'moules', depth: '15–30m', label: '' },
  { id: 'bL2', side: 'left', yp: 70, correct: 'cucumber', depth: '30m+', label: '' },
  { id: 'bR2', side: 'right', yp: 70, correct: 'cucumber', depth: '30m+', label: '' }
];


let G = { phase: 0, selections: {}, placed: {}, selTray: null, joyBasinFocusId: null };

let bubbles = []; let fishes = []; let rocks = []; let kelps = []; let basins = []; let particles = []; let confettis = [];
let crustaceans = [];
let loadedImages = {};
let L = {};
let joyUI = { phaseChoiceIdx: 0, focus: 'tray', trayIdx: 0, basinIdx: 0 };
let lastActivity = null;
let winCountdownInterval = null;
// const INACTIVITY_LIMIT = 18000; // 3 minutes
const INACTIVITY_LIMIT = 18000000; // 3 minutes

const ARD = {
  supported: typeof navigator !== 'undefined' && 'serial' in navigator,
  port: null,
  reader: null,
  keepReading: false,
  buffer: '',
  last: { up: false, down: false, left: false, right: false, button: false },
  navCooldownMs: 160,
  confirmCooldownMs: 200,
  lastNavAt: 0,
  lastConfirmAt: 0
};