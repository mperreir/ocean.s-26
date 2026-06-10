const DATA = {
  blocs: [
    { id:"bloc_1", titre:"La Vie du Courant", emoji:"⚡", scenarios: [
      { id:"S1", titre:"Pas assez de vent",
        contexte:"Le vent tombe sur le parc. La production baisse et il faut décider qui recevra l'électricité disponible.",
        demande_marcel:"« Si le port coupe, on perd la pêche du jour. Le poisson n'attend pas. »",
        demande_claire:"« Quand l'électricité manque, il faut prioriser les usages les plus critiques. »",
        options:[
          {id:"S1_A",texte:"Donner priorité au port",effets:{environnement:-1,revenu_pecheurs:-2,efficacite_energetique:3,acceptabilite_sociale:-1}},
          {id:"S1_B",texte:"Prioriser hôpital et services publics",effets:{environnement:0,revenu_pecheurs:2,efficacite_energetique:0,acceptabilite_sociale:3}},
          {id:"S1_C",texte:"Stocker l'énergie disponible",effets:{environnement:2,revenu_pecheurs:2,efficacite_energetique:-1,acceptabilite_sociale:1}}
        ]},
      { id:"S2", titre:"Production maximale",
        contexte:"Le vent souffle fort et le parc produit beaucoup plus d'électricité que prévu.",
        demande_marcel:"« Pour une fois qu'il y en a plein, autant en faire profiter le coin. »",
        demande_claire:"« L'option la plus stable est d'envoyer l'énergie vers le réseau national. »",
        options:[
          {id:"S2_A",texte:"Envoyer toute l'énergie au réseau national",effets:{environnement:-1,revenu_pecheurs:2,efficacite_energetique:-2,acceptabilite_sociale:-1}},
          {id:"S2_B",texte:"Distribuer localement (port, logements)",effets:{environnement:1,revenu_pecheurs:1,efficacite_energetique:3,acceptabilite_sociale:2}},
          {id:"S2_C",texte:"Favoriser l'industrie locale",effets:{environnement:0,revenu_pecheurs:2,efficacite_energetique:1,acceptabilite_sociale:-1}}
        ]},
      { id:"S3", titre:"Prix négatifs",
        contexte:"Le prix de l'électricité devient négatif sur le marché. La loi oblige normalement les parcs à s'arrêter.",
        demande_marcel:"« Arrêter les éoliennes alors qu'on pourrait faire tourner le port… c'est du gâchis. »",
        demande_claire:"« Les règles du marché existent pour éviter de déséquilibrer le système électrique. »",
        options:[
          {id:"S3_A",texte:"Arrêter la production",effets:{environnement:-3,revenu_pecheurs:-2,efficacite_energetique:-2,acceptabilite_sociale:-1}},
          {id:"S3_B",texte:"Redistribuer localement",effets:{environnement:2,revenu_pecheurs:1,efficacite_energetique:2,acceptabilite_sociale:2}},
          {id:"S3_C",texte:"Envoyer l'énergie vers le réseau national",effets:{environnement:1,revenu_pecheurs:3,efficacite_energetique:-1,acceptabilite_sociale:0}}
        ]},
      { id:"S4", titre:"Production instable",
        contexte:"Le vent change rapidement. La production varie d'heure en heure.",
        demande_marcel:"« Nous on a surtout besoin que ça marche régulièrement. »",
        demande_claire:"« Il faut absorber ces variations pour stabiliser le système. »",
        options:[
          {id:"S4_A",texte:"Ajuster légèrement la distribution",effets:{environnement:0,revenu_pecheurs:0,efficacite_energetique:1,acceptabilite_sociale:1}},
          {id:"S4_B",texte:"Stocker l'énergie quand elle est disponible",effets:{environnement:2,revenu_pecheurs:2,efficacite_energetique:0,acceptabilite_sociale:1}},
          {id:"S4_C",texte:"Ne rien changer",effets:{environnement:-1,revenu_pecheurs:-1,efficacite_energetique:0,acceptabilite_sociale:-1}}
        ]},
      { id:"S5", titre:"Choisir un investissement",
        contexte:"Un budget est disponible pour améliorer le système énergétique local.",
        demande_marcel:"« Si cet argent peut aider le territoire, autant que ça profite aux communes. »",
        demande_claire:"« Investir dans des batteries rendrait le système beaucoup plus efficace. »",
        options:[
          {id:"S5_A",texte:"Construire une batterie",effets:{environnement:3,revenu_pecheurs:2,efficacite_energetique:0,acceptabilite_sociale:1}},
          {id:"S5_B",texte:"Créer un fonds pour les communes",effets:{environnement:0,revenu_pecheurs:0,efficacite_energetique:2,acceptabilite_sociale:3}},
          {id:"S5_C",texte:"Solution mixte",effets:{environnement:2,revenu_pecheurs:1,efficacite_energetique:1,acceptabilite_sociale:2}}
        ]}
    ]},
    { id:"bloc_2", titre:"Le Partage du Courant", emoji:"🔀", scenarios: [
      { id:"S6", titre:"Priorité énergétique",
        contexte:"La production est limitée et plusieurs acteurs demandent de l'électricité.",
        demande_marcel:"« Le port fait vivre toute la ville. On doit passer en premier. »",
        demande_claire:"« Les infrastructures critiques doivent être prioritaires. »",
        options:[
          {id:"S6_A",texte:"Priorité hôpital et secours",effets:{environnement:0,revenu_pecheurs:-1,efficacite_energetique:1,acceptabilite_sociale:2}},
          {id:"S6_B",texte:"Priorité industrie",effets:{environnement:-1,revenu_pecheurs:3,efficacite_energetique:0,acceptabilite_sociale:1}},
          {id:"S6_C",texte:"Priorité logements",effets:{environnement:-1,revenu_pecheurs:0,efficacite_energetique:0,acceptabilite_sociale:3}}
        ]},
      { id:"S7", titre:"Trois heures de surplus",
        contexte:"Un surplus d'électricité est disponible pendant quelques heures.",
        demande_marcel:"« Avec ça on pourrait faire tourner les machines du port à fond. »",
        demande_claire:"« Ce surplus pourrait aussi soutenir d'autres activités locales. »",
        options:[
          {id:"S7_A",texte:"Donner le surplus au port",effets:{environnement:-1,revenu_pecheurs:3,efficacite_energetique:1,acceptabilite_sociale:1}},
          {id:"S7_B",texte:"Alimenter l'école",effets:{environnement:0,revenu_pecheurs:-1,efficacite_energetique:1,acceptabilite_sociale:2}},
          {id:"S7_C",texte:"Alimenter une activité industrielle",effets:{environnement:-1,revenu_pecheurs:-2,efficacite_energetique:1,acceptabilite_sociale:-1}}
        ]},
      { id:"S8", titre:"Les chantiers navals",
        contexte:"Les chantiers navals demandent plus d'électricité pour lancer un nouveau projet.",
        demande_marcel:"« Les chantiers, c'est du boulot pour toute la côte. »",
        demande_claire:"« Une consommation industrielle stable aide aussi à équilibrer le réseau. »",
        options:[
          {id:"S8_A",texte:"Prioriser les chantiers",effets:{environnement:-1,revenu_pecheurs:-2,efficacite_energetique:1,acceptabilite_sociale:-1}},
          {id:"S8_B",texte:"Distribution équilibrée",effets:{environnement:1,revenu_pecheurs:2,efficacite_energetique:-1,acceptabilite_sociale:1}},
          {id:"S8_C",texte:"Favoriser port et habitants",effets:{environnement:1,revenu_pecheurs:1,efficacite_energetique:1,acceptabilite_sociale:2}}
        ]},
      { id:"S9", titre:"Pic de demande",
        contexte:"La demande d'électricité augmente fortement pendant quelques heures.",
        demande_marcel:"« Si le port coupe, on perd toute la chaîne du froid. »",
        demande_claire:"« Il faut privilégier les services essentiels pour la population. »",
        options:[
          {id:"S9_A",texte:"Priorité au port",effets:{environnement:-1,revenu_pecheurs:3,efficacite_energetique:1,acceptabilite_sociale:1}},
          {id:"S9_B",texte:"Priorité hôpital et école",effets:{environnement:1,revenu_pecheurs:2,efficacite_energetique:1,acceptabilite_sociale:2}},
          {id:"S9_C",texte:"Répartition égale",effets:{environnement:1,revenu_pecheurs:0,efficacite_energetique:-1,acceptabilite_sociale:3}}
        ]},
      { id:"S10", titre:"Urgence au port",
        contexte:"Une panne menace la chambre froide du port.",
        demande_marcel:"« Sans électricité maintenant, des tonnes de poisson sont perdues. »",
        demande_claire:"« Si on fait une exception pour le port, d'autres demanderont la même chose. »",
        options:[
          {id:"S10_A",texte:"Donner l'énergie au port",effets:{environnement:-1,revenu_pecheurs:3,efficacite_energetique:-1,acceptabilite_sociale:0}},
          {id:"S10_B",texte:"Refuser l'exception",effets:{environnement:-1,revenu_pecheurs:-3,efficacite_energetique:1,acceptabilite_sociale:-2}},
          {id:"S10_C",texte:"Créer une réserve d'urgence",effets:{environnement:1,revenu_pecheurs:1,efficacite_energetique:1,acceptabilite_sociale:3}}
        ]}
    ]},
    { id:"bloc_3", titre:"Le Pouvoir du Courant", emoji:"🤝", scenarios: [
      { id:"S11", titre:"Décision automatique",
        contexte:"Un algorithme pourrait gérer automatiquement la distribution de l'énergie.",
        demande_marcel:"« Une machine pour décider à notre place ? Ça me rassure moyen. »",
        demande_claire:"« Un algorithme peut optimiser le réseau bien mieux qu'un vote. »",
        options:[
          {id:"S11_A",texte:"Distribution automatique",effets:{environnement:1,revenu_pecheurs:-2,efficacite_energetique:3,acceptabilite_sociale:-2}},
          {id:"S11_B",texte:"Décision citoyenne",effets:{environnement:0,revenu_pecheurs:2,efficacite_energetique:-1,acceptabilite_sociale:3}},
          {id:"S11_C",texte:"Système hybride",effets:{environnement:1,revenu_pecheurs:1,efficacite_energetique:2,acceptabilite_sociale:2}}
        ]},
      { id:"S12", titre:"Utiliser la batterie",
        contexte:"Une batterie locale est pleine et il faut décider quand utiliser cette énergie.",
        demande_marcel:"« Si on l'utilise maintenant, le port peut en profiter. »",
        demande_claire:"« Attendre un pic de demande rendrait l'énergie plus utile. »",
        options:[
          {id:"S12_A",texte:"Utiliser l'énergie localement",effets:{environnement:-1,revenu_pecheurs:3,efficacite_energetique:-1,acceptabilite_sociale:2}},
          {id:"S12_B",texte:"Vendre au réseau national",effets:{environnement:1,revenu_pecheurs:-1,efficacite_energetique:3,acceptabilite_sociale:-1}},
          {id:"S12_C",texte:"Garder une réserve",effets:{environnement:1,revenu_pecheurs:2,efficacite_energetique:1,acceptabilite_sociale:2}}
        ]},
      { id:"S13", titre:"Délestage national",
        contexte:"Le réseau national demande de réduire la consommation locale.",
        demande_marcel:"« Pourquoi ce serait toujours à nous de couper ? »",
        demande_claire:"« Le réseau fonctionne à l'échelle du pays. Il faut parfois partager l'effort. »",
        options:[
          {id:"S13_A",texte:"Réduire l'industrie",effets:{environnement:0,revenu_pecheurs:2,efficacite_energetique:-1,acceptabilite_sociale:2}},
          {id:"S13_B",texte:"Prioriser l'industrie",effets:{environnement:0,revenu_pecheurs:-1,efficacite_energetique:-1,acceptabilite_sociale:3}},
          {id:"S13_C",texte:"Réduction équilibrée",effets:{environnement:-1,revenu_pecheurs:2,efficacite_energetique:1,acceptabilite_sociale:-2}}
        ]},
      { id:"S14", titre:"Élargir le réseau local",
        contexte:"Une commune voisine souhaite être connectée à l'électricité du parc.",
        demande_marcel:"« Si on partage trop loin, on perd ce qui nous revient. »",
        demande_claire:"« Étendre le réseau rend le système plus résilient. »",
        options:[
          {id:"S14_A",texte:"Ouvrir le réseau",effets:{environnement:1,revenu_pecheurs:1,efficacite_energetique:2,acceptabilite_sociale:3}},
          {id:"S14_B",texte:"Garder l'énergie locale",effets:{environnement:0,revenu_pecheurs:2,efficacite_energetique:1,acceptabilite_sociale:-2}},
          {id:"S14_C",texte:"Quota limité",effets:{environnement:1,revenu_pecheurs:1,efficacite_energetique:1,acceptabilite_sociale:2}}
        ]},
      { id:"S15", titre:"Accord avec le réseau national",
        contexte:"Un contrat est proposé pour envoyer une partie de l'électricité vers le réseau national.",
        demande_marcel:"« Si tout part ailleurs, le territoire n'y gagne rien. »",
        demande_claire:"« Un accord national stabilise la production du parc. »",
        options:[
          {id:"S15_A",texte:"Signer l'accord",effets:{environnement:0,revenu_pecheurs:-1,efficacite_energetique:2,acceptabilite_sociale:-1}},
          {id:"S15_B",texte:"Refuser et garder local",effets:{environnement:1,revenu_pecheurs:2,efficacite_energetique:-1,acceptabilite_sociale:3}},
          {id:"S15_C",texte:"Accord partiel",effets:{environnement:1,revenu_pecheurs:1,efficacite_energetique:1,acceptabilite_sociale:2}}
        ]}
    ]}
  ]
};



const NOMS_MARITIMES = [
  'Capitaine','Corsaire','Amiral','Navigateur','Matelot',
  'Mousse','Pilote','Vigie','Timonier','Commandant',
  'Explorateur','Flibustier','Écumeur','Hauturier','Caboteur'
];
let nomJoueur = '';


const FLUX_DATA = {
  // Domaine 1 — La Vie du Courant
  S1: {
    prod: 15,
    initial: [{icon:'🐟',label:'Port',pct:50,color:'#e8931a'},{icon:'🏥',label:'Hôpital',pct:30,color:'#2ecc71'},{icon:'🏠',label:'Logements',pct:20,color:'#5bb8d4'}],
    options: {
      S1_A: [{icon:'🐟',label:'Port',pct:70,color:'#e8931a'},{icon:'🏥',label:'Hôpital',pct:20,color:'#2ecc71'},{icon:'🏠',label:'Logements',pct:10,color:'#5bb8d4'}],
      S1_B: [{icon:'🏥',label:'Hôpital',pct:50,color:'#2ecc71'},{icon:'🏠',label:'Logements',pct:30,color:'#5bb8d4'},{icon:'🐟',label:'Port',pct:20,color:'#e8931a'}],
      S1_C: [{icon:'🔋',label:'Stockage',pct:60,color:'#2ecc71'},{icon:'🐟',label:'Port',pct:25,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:15,color:'#5bb8d4'}]
    }
  },
  S2: {
    prod: 120,
    initial: [{icon:'🌐',label:'Réseau national',pct:100,color:'#7aacbf'}],
    options: {
      S2_A: [{icon:'🌐',label:'Réseau national',pct:100,color:'#7aacbf'}],
      S2_B: [{icon:'🐟',label:'Port',pct:40,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:40,color:'#5bb8d4'},{icon:'🏭',label:'Industrie',pct:20,color:'#a78bfa'}],
      S2_C: [{icon:'🏭',label:'Industrie',pct:60,color:'#a78bfa'},{icon:'🐟',label:'Port',pct:25,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:15,color:'#5bb8d4'}]
    }
  },
  S3: {
    prod: 95,
    initial: [{icon:'⛔',label:'Arrêt forcé',pct:100,color:'#e74c3c'}],
    options: {
      S3_A: [{icon:'⛔',label:'Arrêt forcé',pct:100,color:'#e74c3c'}],
      S3_B: [{icon:'🐟',label:'Port',pct:40,color:'#e8931a'},{icon:'🏥',label:'Hôpital',pct:30,color:'#2ecc71'},{icon:'🏠',label:'Logements',pct:30,color:'#5bb8d4'}],
      S3_C: [{icon:'🌐',label:'Réseau national',pct:60,color:'#7aacbf'},{icon:'🐟',label:'Port',pct:25,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:15,color:'#5bb8d4'}]
    }
  },
  S4: {
    prod: 70,
    initial: [{icon:'🐟',label:'Port',pct:30,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:40,color:'#5bb8d4'},{icon:'🏭',label:'Industrie',pct:30,color:'#a78bfa'}],
    options: {
      S4_A: [{icon:'🐟',label:'Port',pct:35,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:40,color:'#5bb8d4'},{icon:'🏭',label:'Industrie',pct:25,color:'#a78bfa'}],
      S4_B: [{icon:'🔋',label:'Stockage',pct:50,color:'#2ecc71'},{icon:'🐟',label:'Port',pct:25,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:25,color:'#5bb8d4'}],
      S4_C: [{icon:'🐟',label:'Port',pct:30,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:40,color:'#5bb8d4'},{icon:'🏭',label:'Industrie',pct:30,color:'#a78bfa'}]
    }
  },
  S5: {
    prod: 80,
    initial: [{icon:'🐟',label:'Port',pct:35,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:35,color:'#5bb8d4'},{icon:'🌐',label:'Réseau national',pct:30,color:'#7aacbf'}],
    options: {
      S5_A: [{icon:'🔋',label:'Stockage',pct:60,color:'#2ecc71'},{icon:'🐟',label:'Port',pct:20,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:20,color:'#5bb8d4'}],
      S5_B: [{icon:'🏛️',label:'Communes',pct:50,color:'#a78bfa'},{icon:'🐟',label:'Port',pct:30,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:20,color:'#5bb8d4'}],
      S5_C: [{icon:'🔋',label:'Stockage',pct:30,color:'#2ecc71'},{icon:'🏛️',label:'Communes',pct:35,color:'#a78bfa'},{icon:'🐟',label:'Port',pct:35,color:'#e8931a'}]
    }
  },
  // Domaine 2 — Le Partage du Courant
  S6: {
    prod: 75,
    initial: [{icon:'🐟',label:'Port',pct:40,color:'#e8931a'},{icon:'🏭',label:'Industrie',pct:30,color:'#a78bfa'},{icon:'🏠',label:'Logements',pct:30,color:'#5bb8d4'}],
    options: {
      S6_A: [{icon:'🏥',label:'Hôpital',pct:50,color:'#2ecc71'},{icon:'🚒',label:'Secours',pct:30,color:'#e74c3c'},{icon:'🐟',label:'Port',pct:20,color:'#e8931a'}],
      S6_B: [{icon:'🏭',label:'Industrie',pct:50,color:'#a78bfa'},{icon:'🐟',label:'Port',pct:30,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:20,color:'#5bb8d4'}],
      S6_C: [{icon:'🏠',label:'Logements',pct:60,color:'#5bb8d4'},{icon:'🐟',label:'Port',pct:25,color:'#e8931a'},{icon:'🏥',label:'Hôpital',pct:15,color:'#2ecc71'}]
    }
  },
  S7: {
    prod: 60,
    initial: [{icon:'❓',label:'En attente',pct:100,color:'#7aacbf'}],
    options: {
      S7_A: [{icon:'🐟',label:'Port',pct:60,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:25,color:'#5bb8d4'},{icon:'🏫',label:'École',pct:15,color:'#a78bfa'}],
      S7_B: [{icon:'🏫',label:'École',pct:55,color:'#a78bfa'},{icon:'🐟',label:'Port',pct:30,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:15,color:'#5bb8d4'}],
      S7_C: [{icon:'🏭',label:'Laverie',pct:65,color:'#7aacbf'},{icon:'🐟',label:'Port',pct:20,color:'#e8931a'},{icon:'🏫',label:'École',pct:15,color:'#a78bfa'}]
    }
  },
  S8: {
    prod: 85,
    initial: [{icon:'🐟',label:'Port',pct:35,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:35,color:'#5bb8d4'},{icon:'🏭',label:'Chantiers',pct:30,color:'#a78bfa'}],
    options: {
      S8_A: [{icon:'🏭',label:'Chantiers',pct:50,color:'#a78bfa'},{icon:'🐟',label:'Port',pct:30,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:20,color:'#5bb8d4'}],
      S8_B: [{icon:'🐟',label:'Port',pct:38,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:37,color:'#5bb8d4'},{icon:'🏭',label:'Chantiers',pct:25,color:'#a78bfa'}],
      S8_C: [{icon:'🏭',label:'Chantiers',pct:35,color:'#a78bfa'},{icon:'🐟',label:'Port',pct:35,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:30,color:'#5bb8d4'}]
    }
  },
  S9: {
    prod: 65,
    initial: [{icon:'❓',label:'En attente',pct:100,color:'#7aacbf'}],
    options: {
      S9_A: [{icon:'🐟',label:'Port',pct:55,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:45,color:'#5bb8d4'}],
      S9_B: [{icon:'🏥',label:'Hôpital',pct:38,color:'#2ecc71'},{icon:'🏫',label:'École',pct:32,color:'#a78bfa'},{icon:'🐟',label:'Port',pct:30,color:'#e8931a'}],
      S9_C: [{icon:'🐟',label:'Port',pct:25,color:'#e8931a'},{icon:'🏥',label:'Hôpital',pct:25,color:'#2ecc71'},{icon:'🏫',label:'École',pct:25,color:'#a78bfa'},{icon:'🏠',label:'Logements',pct:25,color:'#5bb8d4'}]
    }
  },
  S10: {
    prod: 70,
    initial: [{icon:'🐟',label:'Port',pct:30,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:40,color:'#5bb8d4'},{icon:'🏭',label:'Industrie',pct:30,color:'#a78bfa'}],
    options: {
      S10_A: [{icon:'🐟',label:'Port (urgence)',pct:60,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:25,color:'#5bb8d4'},{icon:'🏭',label:'Industrie',pct:15,color:'#a78bfa'}],
      S10_B: [{icon:'🐟',label:'Port',pct:30,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:40,color:'#5bb8d4'},{icon:'🏭',label:'Industrie',pct:30,color:'#a78bfa'}],
      S10_C: [{icon:'🔋',label:'Réserve',pct:20,color:'#2ecc71'},{icon:'🐟',label:'Port',pct:35,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:45,color:'#5bb8d4'}]
    }
  },
  // Domaine 3 — Le Pouvoir du Courant
  S11: {
    prod: 78,
    initial: [{icon:'🐟',label:'Port',pct:35,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:35,color:'#5bb8d4'},{icon:'🏭',label:'Industrie',pct:30,color:'#a78bfa'}],
    options: {
      S11_A: [{icon:'🏭',label:'Industrie',pct:50,color:'#a78bfa'},{icon:'🐟',label:'Port',pct:30,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:20,color:'#5bb8d4'}],
      S11_B: [{icon:'🐟',label:'Port',pct:38,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:37,color:'#5bb8d4'},{icon:'🏭',label:'Industrie',pct:25,color:'#a78bfa'}],
      S11_C: [{icon:'🐟',label:'Port',pct:35,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:35,color:'#5bb8d4'},{icon:'🏭',label:'Industrie',pct:30,color:'#a78bfa'}]
    }
  },
  S12: {
    prod: 100,
    initial: [{icon:'🔋',label:'Batterie',pct:100,color:'#2ecc71'}],
    options: {
      S12_A: [{icon:'🐟',label:'Port',pct:45,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:35,color:'#5bb8d4'},{icon:'🏭',label:'Industrie',pct:20,color:'#a78bfa'}],
      S12_B: [{icon:'🌐',label:'Réseau nat.',pct:70,color:'#7aacbf'},{icon:'🔋',label:'Réserve',pct:30,color:'#2ecc71'}],
      S12_C: [{icon:'🔋',label:'Réserve',pct:50,color:'#2ecc71'},{icon:'🐟',label:'Port',pct:30,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:20,color:'#5bb8d4'}]
    }
  },
  S13: {
    prod: 70,
    initial: [{icon:'🐟',label:'Port',pct:35,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:35,color:'#5bb8d4'},{icon:'🏭',label:'Industrie',pct:30,color:'#a78bfa'}],
    options: {
      S13_A: [{icon:'🐟',label:'Port',pct:45,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:40,color:'#5bb8d4'},{icon:'🏭',label:'Industrie (-30%)',pct:15,color:'#a78bfa'}],
      S13_B: [{icon:'🐟',label:'Port',pct:25,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:25,color:'#5bb8d4'},{icon:'🏭',label:'Industrie',pct:50,color:'#a78bfa'}],
      S13_C: [{icon:'🐟',label:'Port',pct:35,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:35,color:'#5bb8d4'},{icon:'🏭',label:'Industrie',pct:30,color:'#a78bfa'}]
    }
  },
  S14: {
    prod: 75,
    initial: [{icon:'🐟',label:'Port',pct:35,color:'#e8931a'},{icon:'🏠',label:'Locaux',pct:40,color:'#5bb8d4'},{icon:'🏭',label:'Industrie',pct:25,color:'#a78bfa'}],
    options: {
      S14_A: [{icon:'🐟',label:'Port',pct:25,color:'#e8931a'},{icon:'🏠',label:'Locaux',pct:30,color:'#5bb8d4'},{icon:'🏡',label:'Guérande',pct:30,color:'#a78bfa'},{icon:'🏭',label:'Industrie',pct:15,color:'#7aacbf'}],
      S14_B: [{icon:'🐟',label:'Port',pct:40,color:'#e8931a'},{icon:'🏠',label:'Locaux',pct:40,color:'#5bb8d4'},{icon:'🏭',label:'Industrie',pct:20,color:'#a78bfa'}],
      S14_C: [{icon:'🐟',label:'Port',pct:32,color:'#e8931a'},{icon:'🏠',label:'Locaux',pct:35,color:'#5bb8d4'},{icon:'🏡',label:'Guérande',pct:18,color:'#a78bfa'},{icon:'🏭',label:'Industrie',pct:15,color:'#7aacbf'}]
    }
  },
  S15: {
    prod: 80,
    initial: [{icon:'🐟',label:'Port',pct:35,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:35,color:'#5bb8d4'},{icon:'🏭',label:'Industrie',pct:30,color:'#a78bfa'}],
    options: {
      S15_A: [{icon:'🌐',label:'Réseau nat.',pct:30,color:'#7aacbf'},{icon:'🐟',label:'Port',pct:35,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:35,color:'#5bb8d4'}],
      S15_B: [{icon:'🐟',label:'Port',pct:40,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:40,color:'#5bb8d4'},{icon:'🏭',label:'Industrie',pct:20,color:'#a78bfa'}],
      S15_C: [{icon:'🌐',label:'Réseau nat.',pct:15,color:'#7aacbf'},{icon:'🐟',label:'Port',pct:38,color:'#e8931a'},{icon:'🏠',label:'Logements',pct:47,color:'#5bb8d4'}]
    }
  }
};
