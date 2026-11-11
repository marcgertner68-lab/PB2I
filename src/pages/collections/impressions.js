import { mountComponents, refreshNavbar, initFadeIn } from '../../components.js';
import { initI18n, translateDOM } from '../../utils/i18n.js';

window.PB2I_PAGE = 'impressions';

// 1) Render base layout components immediately
mountComponents('impressions');

// 2) i18n in parallel, then refresh labels
initI18n().then(() => {
  refreshNavbar('impressions');
  translateDOM();
});
initFadeIn('[data-fade]');

// Chronologie data : 18 key moments in Belfort magnetography history (JJ Eltgen 2010 / PB2I archives)
const chronoData = [
  {
    id: "annees70",
    year: "Années 70's",
    btnSubtitle: "Imprimante PR71",
    title: "Lancement de l'imprimante à impact PR71",
    subtitle: "Conçue et fabriquée à Belfort, l'imprimante PR71 atteint 1600 lignes par minute.",
    desc: "<p>Sa vitesse d'impression de 1600 lpm ramène BULL à l'état de l'art mondial mais confirme la nécessité de passer à une technologie sans impact (NIP) pour franchir de nouveaux paliers de vitesse et de fiabilité.</p>",
    quote: "Technologie originale de support porte-caractère souple (bande ou « belt »). Cette bande restera pour BULL le composant de base de ses dernières imprimantes impact à venir, optimisées à vitesse plus modérée."
  },
  {
    id: "1973",
    year: "1973",
    btnSubtitle: "Veille NIP",
    title: "Veille technologique et prospective NIP",
    subtitle: "Mise en place d'une cellule de veille technologique NIP à la direction Product Planning de Belfort.",
    desc: "<p>Suivi assidu des mouvements de la concurrence et analyse approfondie des technologies non-impact émergentes (électrostatique, thermique, laser, jet d'encre). Le procédé magnétique part favori en interne en raison de l'expertise historique de Belfort dans les mémoires de masse.</p>",
    quote: "Le magnétisme capitalisait sur des compétences déjà très fortes chez Bull Belfort : têtes d'écriture haute précision, revêtements magnétiques et électronique rapide."
  },
  {
    id: "1974",
    year: "1974",
    btnSubtitle: "Évaluation DI-180",
    title: "Achat et test de l'imprimante DI-180",
    subtitle: "Évaluation par le service Études Avancées de la direction Études de Belfort.",
    desc: "<p>La DI-180 de la firme américaine Data Interface est à cette époque la seule imprimante magnétique sur le marché, utilisant des composants dérivés des dérouleurs de bande. Son impression sérielle était limitée à 180 lignes par minute.</p>",
    quote: "L'analyse minutieuse de la DI-180 met en lumière les verrous technologiques indispensables à lever pour passer à la très haute vitesse."
  },
  {
    id: "1975",
    year: "1975",
    btnSubtitle: "Premières maquettes",
    title: "Premières maquettes magnétographiques",
    subtitle: "Tentatives d'adaptation et essais de têtes d'écriture intégrées.",
    desc: "<p>Réalisation de maquettes à bande magnétique large et tests de têtes d'écriture empruntées aux disques informatiques. Premières recherches fondamentales sur les toners magnétiques en poudre.</p>",
    quote: "Les premières investigations prouvent que les approches conventionnelles des bandes souples et des disques ne peuvent pas être transposées telles quelles."
  },
  {
    id: "1976",
    year: "1976",
    btnSubtitle: "Division R&D dédiée",
    title: "Création de la division R&D dédiée",
    subtitle: "Renforcement massif des effectifs de recherche à Belfort.",
    desc: "<p>Création d'une division dédiée « Technologies NIP » au sein de la direction Études de Belfort. L'équipe passe rapidement de 5 à plus de 20 ingénieurs et techniciens pour accélérer les développements.</p>",
    quote: "Belfort mobilise ses meilleurs spécialistes en physique, chimie des poudres, micromécanique et électronique."
  },
  {
    id: "1977",
    year: "1977",
    btnSubtitle: "Rupture technique",
    title: "Rupture technologique décisive",
    subtitle: "Refonte intégrale des choix : tambour rigide et têtes parallèles.",
    desc: "<p>Les choix techniques sont intégralement revisités : adoption d'un tambour métallique rigide à couche épaisse au lieu d'une bande souple, enregistrement magnétique vertical perpendiculaire, et têtes d'écriture matricielles haute densité.</p>",
    quote: "Prise de conscience majeure : l'impression rapide sans impact et les mémoires de disques magnétiques sont deux univers distincts exigeant des solutions inédites."
  },
  {
    id: "1978",
    year: "1978",
    btnSubtitle: "Projet « Mathilde »",
    title: "Spécifications des futurs produits",
    subtitle: "Lancement officiel du projet de recherche sous le nom de code « Mathilde ».",
    desc: "<p>Fixation du cahier des charges : impression en continu sur papier paravent, vitesse de 6000 lignes/min (environ 90 pages/minute) et résolution de 120 puis 240 dpi. Le projet prend le nom de code interne « Mathilde ».</p>",
    quote: "Le nom « Mathilde », adopté par les ingénieurs de Belfort, deviendra le surnom légendaire de la machine auprès de la presse et du grand public."
  },
  {
    id: "1979",
    year: "1979",
    btnSubtitle: "Prototypes PEA",
    title: "Prototypes études et atelier de toner",
    subtitle: "Fabrication des premiers prototypes industrialisés à Belfort.",
    desc: "<p>Mise au point de prototypes d'études à 120 dpi (nommés PEA). Face aux résultats mitigés des fabricants de poudres pour les toners, Bull décide d'investir dans son propre atelier de production d'encre à Belfort.</p>",
    quote: "La maîtrise intégrée du tambour, des têtes magnétiques et de la formulation chimique du toner offre à Bull une avance stratégique déterminante."
  },
  {
    id: "1980",
    year: "1980",
    btnSubtitle: "IEEE Intermag 80",
    title: "Publication IEEE Intermag à Boston",
    subtitle: "Révélation mondiale de la magnétographie Bull face à General Electric.",
    desc: "<p>Après l'annonce par General Electric du Terminet-8000, Bull riposte en dévoilant sa technologie au congrès international IEEE INTERMAG'80 à Boston. Bull abandonne le programme à 120 dpi pour basculer directement sur le standard 240 dpi.</p>",
    quote: "La publication à Boston marque l'acte de naissance officiel de la magnétographie Bull sur la scène scientifique internationale."
  },
  {
    id: "1981",
    year: "1981",
    btnSubtitle: "Bull chef de file",
    title: "Bull s'impose comme chef de file mondial",
    subtitle: "Retrait définitif de la concurrence américaine sur l'impression magnétique.",
    desc: "<p>General Electric jette l'éponge et abandonne le Terminet-8000 après avoir échoué à adapter sa technologie à 240 dpi. Bull devient le seul constructeur au monde à maîtriser la magnétographie industrielle.</p>",
    quote: "Désormais seule à bord, l'équipe de Belfort redouble d'efforts pour préparer l'industrialisation en grande série."
  },
  {
    id: "1982",
    year: "1982",
    btnSubtitle: "Salons NCC & SICOB",
    title: "Démonstrations de la MP60",
    subtitle: "Présentations privées aux professionnels de l'industrie informatique.",
    desc: "<p>Démonstrations remarquées au salon NCC'82 aux États-Unis et au SICOB à Paris : vitesse de 90 pages par minute à 240 dpi sur papier continu 14 pouces. L'enthousiasme du marché confirme le potentiel commercial.</p>",
    quote: "La presse professionnelle salue la prouesse technologique d'une machine débitant 90 pages par minute avec une netteté et une régularité parfaites."
  },
  {
    id: "1983",
    year: "1983",
    btnSubtitle: "Lancement MP6090",
    title: "Lancement commercial mondial",
    subtitle: "Annonce de la MP6090 par Cynthia Peripherals et Bull.",
    desc: "<p>Annonces commerciales officielles aux États-Unis via Cynthia Peripherals Corp (filiale OEM de Belfort) et en Europe. La convention de nommage est adoptée : « MP6090 » désigne 90 ppm sur papier paravent.</p>",
    quote: "Belfort devient la référence mondiale pour la fabrication des têtes, des modules d'écriture et des tambours magnétiques."
  },
  {
    id: "1984",
    year: "1984",
    btnSubtitle: "Premières livraisons",
    title: "Premières livraisons clients de série",
    subtitle: "Déploiement sur site des premières MP6090.",
    desc: "<p>Démarrage des livraisons en clientèle. Avec la disparition de la DI-180 et l'abandon de GE, Bull est le constructeur exclusif proposant cette technologie de pointe sur le marché international.</p>",
    quote: "Le terme « magnétographie » entre officiellement dans le vocabulaire technique mondial par analogie avec l'électrophotographie laser."
  },
  {
    id: "1985",
    year: "1985",
    btnSubtitle: "Modèle MP6050",
    title: "Déclinaison format réduit MP6050",
    subtitle: "Adaptation sur papier continu de largeur 8,4 pouces.",
    desc: "<p>Développement et annonce d'une version compacte pour formats étroits. Bien que peu produite en volume, elle valide la souplesse de l'architecture d'écriture magnétique belfortaine.</p>",
    quote: "Une étape d'apprentissage technique qui conforte la modularité des générations ultérieures."
  },
  {
    id: "1986",
    year: "1986",
    btnSubtitle: "Génération MP6090.2",
    title: "Toner isolant et MP6090.2",
    subtitle: "Saut qualitatif : toner isolant et fiabilité accrue.",
    desc: "<p>Introduction d'un toner magnétique isolant plus résistant, amélioration du transfert diélectrique sur papier et lancement de la MP6090.2 qui succède au premier modèle avec un rendement et une régularité décuplés.</p>",
    quote: "Une intensité des noirs et une robustesse mécanique qui surpassent les imprimantes laser de même catégorie."
  },
  {
    id: "1987",
    year: "1987",
    btnSubtitle: "Feuilles MP5050",
    title: "Imprimante feuilles séparées MP5050",
    subtitle: "Impression recto-verso à 50 ppm sur feuilles libres.",
    desc: "<p>Lancement de la MP5050, seule machine magnétographique conçue pour les feuilles libres avec impression recto-verso. Le marché des feuilles volantes restant dominé par le laser, Bull concentre ses forces sur le papier continu à grand tirage.</p>",
    quote: "Un tour de force technique qui démontre l'adaptabilité du procédé magnétographique belfortain."
  },
  {
    id: "1990",
    year: "1990",
    btnSubtitle: "VaryPress Drupa",
    title: "Vers l'imprimerie : VaryPress THV",
    subtitle: "Présentation du prototype à DRUPA 90 à Düsseldorf.",
    desc: "<p>Nouveau bond technologique : partenariat avec des constructeurs de presses et présentation du prototype THV (Très Haute Vitesse) à Drupa 90. Naissance de la presse numérique VaryPress à 420 puis 700 ppm.</p>",
    quote: "La magnétographie quitte la seule salle informatique pour conquérir les ateliers de l'imprimerie industrielle et de l'éditique de masse."
  },
  {
    id: "1991",
    year: "1991 et après...",
    btnSubtitle: "Nipson & Ère numérique",
    title: "L'épopée Nipson et la haute vitesse",
    subtitle: "De la filiale Bull Nipson à l'indépendance internationale.",
    desc: "<p>Création de la filiale Nipson, succession des séries N7000 (jusqu'à 400 ppm), systèmes tandem TED (1600 ppm recto-verso), presses VaryPress, puis intégration chez Xeikon et Nipson Technology (600 dpi, DigiFlex).</p>",
    quote: "Plus de 40 années d'innovations continues à Belfort, faisant rayonner l'ingénierie informatique comtoise sur tous les continents."
  }
];

// Flipbook pages (8 pages total = 4 double-page spreads on desktop, or 8 single pages on mobile)
const flipbookPages = [
  {
    pageNum: 1,
    chapterIdx: 0,
    chapterLabel: "1. Genèse & Recherches",
    eyebrow: "1. Genèse & Recherches",
    title: "Recherches initiales",
    theme: "light",
    body: `
      <p>La technologie électrophotographique, plus connue sous l’appellation d’impression « laser », reçoit naturellement les faveurs des sociétés ayant déjà une histoire en reprographie (Xerox, IBM…).</p>
      <p>Bull, au contraire, préfère capitaliser sur son expérience d’informaticien en matière d’enregistrement magnétique. Les travaux s’orientent vers une approche magnétique, discipline familière de par ses mémoires de masse (dérouleurs de bandes, disques).</p>
      <p>Cette technologie, bientôt rebaptisée <strong>magnétographie</strong>, avait déjà fait l’objet de tentatives par la société américaine Data Interface avec la DI-180.</p>
    `,
    img: "/assets/collections/impressions/flipbook_di180.webp",
    caption: "Imprimante magnétique Data Interface DI-180 évaluée à Belfort en 1974."
  },
  {
    pageNum: 2,
    chapterIdx: 0,
    chapterLabel: "1. Genèse & Recherches",
    eyebrow: "R&D Bull Belfort",
    title: "L'essor du « Non-Impact » & Mathilde",
    theme: "dark",
    body: `
      <p>Dès le début des années 70, alors que Bull lance l'imprimante rapide à impact PR71, les techniques sans impact (électrolytique, thermique, jet d’encre, électrostatique, laser) émergent chez les concurrents.</p>
      <p>Dès 1973, une cellule de <strong>veille technologique</strong> est créée au Product Planning de Belfort, soutenue par le laboratoire des Études Avancées dès 1976.</p>
      <p>Après cinq ans de maquettes, Belfort passe en 1979 aux prototypes <strong>PEA</strong> (120 dpi) puis <strong>PIA</strong> (240 dpi) sous le nom de code <strong>« Mathilde »</strong>, avant la présentation historique à l'IEEE Intermag 1980 à Boston.</p>
    `,
    img: "/assets/collections/impressions/NipBelfort-Fig2.webp",
    caption: "Prototype d’études PEA (1979) développé à Belfort."
  },
  {
    pageNum: 3,
    chapterIdx: 1,
    chapterLabel: "2. Choix Technologiques",
    eyebrow: "2. Choix Technologiques",
    title: "Enregistrement perpendiculaire sur tambour",
    theme: "light",
    body: `
      <p>La technologie retenue par Bull s'oppose frontalement à celle de General Electric et de Data Interface : au lieu d'une bande magnétique souple, Bull choisit un <strong>tambour métallique rigide</strong>.</p>
      <p>Les têtes d’enregistrement adoptent un pôle d’écriture vertical fin et un pôle de retour de flux élargi : cet enregistrement <strong>perpendiculaire</strong> nécessite une sous-couche à forte perméabilité magnétique (shunt) sous la couche d'enregistrement.</p>
    `,
    img: "/assets/collections/impressions/NipBelfort-Fig3.webp",
    caption: "Principe de la tête d'écriture perpendiculaire face au tambour."
  },
  {
    pageNum: 4,
    chapterIdx: 1,
    chapterLabel: "2. Choix Technologiques",
    eyebrow: "R&D Bull Belfort",
    title: "Barres modulaires & Atelier de Toner",
    theme: "dark",
    body: `
      <p>La barre d’écriture est construite de façon multi-blocs : chaque module surmoulé de 1,6 pouce intègre <strong>192 têtes</strong> multiplexées par une matrice de diodes.</p>
      <p>Parallèlement, face aux limites des fournisseurs externes, Bull investit dans son propre <strong>atelier de formulation de toner magnétique à Belfort</strong>. Le passage à l’encre isolante puis au transfert par rouleau diélectrique assure une densité d'impression exceptionnelle.</p>
    `,
    img: "/assets/collections/impressions/NipBelfort-Fig5.webp",
    caption: "Module surmoulé haute densité de têtes d'écriture magnétiques."
  },
  {
    pageNum: 5,
    chapterIdx: 2,
    chapterLabel: "3. L'Essor Commercial",
    eyebrow: "3. L'Essor Commercial",
    title: "Succès de la gamme MP6090",
    theme: "light",
    body: `
      <p>Après le retrait de General Electric en 1981, Bull devient le seul constructeur au monde à maîtriser la magnétographie à haute vitesse.</p>
      <p>En 1983, la <strong>MP6090</strong> (90 pages par minute à 240 dpi sur papier paravent) est lancée en Europe et aux États-Unis via la filiale OEM <em>Cynthia Peripherals</em>.</p>
      <p>Suivront les versions MP6090.2, MP6060 (60 ppm), MP5050 (feuilles séparées recto-verso) et MP6110 (110 ppm).</p>
    `,
    img: "/assets/collections/impressions/NipBelfort-Fig6.webp",
    caption: "Imprimante magnétographique Bull MP6090 produite à Belfort."
  },
  {
    pageNum: 6,
    chapterIdx: 2,
    chapterLabel: "3. L'Essor Commercial",
    eyebrow: "R&D Bull Belfort",
    title: "De l'informatique à l'imprimerie : VaryPress",
    theme: "dark",
    body: `
      <p>En 1990 à la Drupa de Düsseldorf, Bull crée la surprise avec le prototype THV (Très Haute Vitesse) : la ligne <strong>VaryPress</strong> est née, conçue pour s'intégrer dans les lignes de presses d'imprimerie sous tension.</p>
      <p>De la VP M420 (420 ppm) aux VP M700 et M800 (120 m/min, 800 ppm), les configurations en tandem <strong>TED</strong> (Twin Engine Duplex) atteignent <strong>1 400 à 1 600 pages par minute en recto-verso continu</strong>.</p>
    `,
    img: "/assets/collections/impressions/NipBelfort-Fig8.webp",
    caption: "Presse numérique industrielle VaryPress destinée à l'éditique et l'imprimerie."
  },
  {
    pageNum: 7,
    chapterIdx: 3,
    chapterLabel: "4. Ère Nipson & Rayonnement",
    eyebrow: "4. Ère Nipson & Rayonnement",
    title: "Nipson Printing Systems & 480 dpi",
    theme: "light",
    body: `
      <p>En 1992, Bull filialise son activité d'impression sous le nom de <strong>Nipson Printing Systems</strong>. La Série 6100 puis la génération <strong>N7000</strong> (200 à 400 ppm) adoptent la fixation par flash, élargissant la gamme de papiers compatibles.</p>
      <p>En 1997 aboutit le module de têtes intégrées sur silicium à <strong>480 dpi</strong>, fruit d'une longue coopération technologique avec le centre suisse CSEM de Neuchâtel.</p>
    `,
    img: "/assets/collections/impressions/NipBelfort-Fig9.webp",
    caption: "Têtes d'écriture intégrées sur silicium à 480 dpi (collaboration CSEM)."
  },
  {
    pageNum: 8,
    chapterIdx: 3,
    chapterLabel: "4. Ère Nipson & Rayonnement",
    eyebrow: "R&D Bull Belfort",
    title: "Rayonnement mondial & L'après-Bull",
    theme: "dark",
    body: `
      <p>En quinze ans, plusieurs milliers de machines sorties de Belfort équipent cinq continents, portées par des partenaires OEM internationaux : <strong>Mohawk</strong>, <strong>Memorex</strong>, <strong>GMC</strong> (PrintRobot / SpeedRobot) ou <strong>Atlantic Force</strong> (Magnaprint aux USA).</p>
      <p>Reprise en 1999 par le groupe belge <strong>Xeikon</strong> (lancement du 600 dpi) puis relancée en 2002 sous le nom <strong>Nipson Technology</strong>, la tradition magnétographique belfortaine aura marqué l'histoire industrielle pendant plus de 40 ans.</p>
      <p class="text-xs italic opacity-75 mt-2">— D'après Jean-Jacques Eltgen (juin 2006 / archives PB2I)</p>
    `,
    img: "/assets/collections/impressions/NipBelfort-Fig7.webp",
    caption: "Architecture mécanique et électromagnétique éprouvée dans le monde entier."
  }
];

const flipbookChapters = [
  { idx: 0, label: "1. Genèse & Recherches", pageStart: 0 },
  { idx: 1, label: "2. Choix Technologiques", pageStart: 2 },
  { idx: 2, label: "3. L'Essor Commercial", pageStart: 4 },
  { idx: 3, label: "4. Ère Nipson & Rayonnement", pageStart: 6 }
];

let activeChronoId = "annees70";
let currentPageIndex = 0; // 0..7
let animTimer = null;

function isDesktopView() {
  return window.innerWidth >= 768;
}

function renderPageMarkup(page) {
  const isDark = page.theme === "dark";
  return `
    <div class="flex flex-col justify-between h-full w-full p-6 sm:p-8 md:p-10 ${isDark ? 'bg-[#1b4d47] text-white' : 'bg-secondary text-[#252525]'}">
      <div class="flex flex-col gap-4">
        <div class="flex items-center justify-between border-b ${isDark ? 'border-white/20' : 'border-[#252525]/15'} pb-2">
          <span class="text-[11px] font-bold uppercase tracking-widest ${isDark ? 'text-[#79C0B8]' : 'text-[#205c56]'}">${page.eyebrow}</span>
          <span class="text-[11px] font-semibold ${isDark ? 'text-white/70' : 'text-[#252525]/60'}">Page ${page.pageNum} / 8</span>
        </div>
        <h3 class="font-heading font-bold text-xl md:text-2xl ${isDark ? 'text-white' : 'text-[#252525]'}">${page.title}</h3>
        <div class="text-[13.5px] leading-relaxed ${isDark ? 'text-white/95' : 'text-[#252525]/90'} space-y-3">
          ${page.body}
        </div>
      </div>
      <div class="rounded-xl overflow-hidden ${isDark ? 'bg-white shadow-sm' : 'bg-white/80 border border-[#252525]/15'} p-2 text-center mt-4">
        <img src="${page.img}" alt="${page.caption}" class="max-h-48 w-auto mx-auto object-contain rounded" loading="lazy" decoding="async">
        <p class="text-[11px] ${isDark ? 'text-gray-600' : 'text-[#252525]/75'} mt-1.5 font-medium">${page.caption}</p>
      </div>
    </div>
  `;
}

function renderChronoGrid() {
  const grid = document.getElementById('chrono-grid');
  if (!grid) return;

  grid.innerHTML = chronoData.map(item => {
    const isActive = item.id === activeChronoId;
    return `
      <button 
        type="button"
        aria-pressed="${isActive}" onclick="window.selectChronoItem('${item.id}')"
        class="flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
          isActive 
            ? 'bg-[#79C0B8] border-[#79C0B8] text-[#1e2928] shadow-md font-bold scale-[1.02]' 
            : 'bg-white hover:bg-[#eaf5f3] border-gray-200 text-gray-700 hover:border-[#79C0B8]/60 shadow-xs'
        }"
      >
        <span class="font-heading font-bold text-base leading-tight mb-1 ${isActive ? 'text-[#1e2928]' : 'text-[#205c56]'}">${item.year}</span>
        <span class="text-[11px] leading-tight line-clamp-1 ${isActive ? 'text-[#1e2928]/90 font-semibold' : 'text-gray-500'}">${item.btnSubtitle}</span>
      </button>
    `;
  }).join('');
}

window.selectChronoItem = function(id) {
  const item = chronoData.find(x => x.id === id);
  if (!item) return;

  activeChronoId = id;
  renderChronoGrid();

  const titleEl = document.getElementById('chrono-title');
  const yearBadgeEl = document.getElementById('chrono-year-badge');
  const subtitleEl = document.getElementById('chrono-subtitle');
  const descEl = document.getElementById('chrono-desc');
  const quoteEl = document.getElementById('chrono-quote');

  if (titleEl) titleEl.textContent = item.title;
  if (yearBadgeEl) yearBadgeEl.textContent = item.year;
  if (subtitleEl) subtitleEl.textContent = item.subtitle;
  if (descEl) descEl.innerHTML = item.desc;
  if (quoteEl) {
    if (item.quote) {
      quoteEl.textContent = item.quote;
      quoteEl.classList.remove('hidden');
    } else {
      quoteEl.classList.add('hidden');
    }
  }
};

function updateFlipbookUI() {
  const desktop = isDesktopView();
  const leftContainer = document.getElementById('flipbook-left');
  const rightContainer = document.getElementById('flipbook-right');
  const safeIdx = desktop ? Math.floor(currentPageIndex / 2) * 2 : currentPageIndex;

  if (desktop) {
    const pLeft = flipbookPages[safeIdx];
    const pRight = flipbookPages[safeIdx + 1];
    if (leftContainer && pLeft) leftContainer.innerHTML = renderPageMarkup(pLeft);
    if (rightContainer && pRight) {
      rightContainer.classList.remove('hidden');
      rightContainer.innerHTML = renderPageMarkup(pRight);
    }
  } else {
    const pSingle = flipbookPages[safeIdx];
    if (leftContainer && pSingle) leftContainer.innerHTML = renderPageMarkup(pSingle);
    if (rightContainer) rightContainer.classList.add('hidden');
  }

  updateFlipbookHeaderOnly();
}

function animatePageTurn(targetIdx) {
  const stage = document.getElementById('flipbook-stage');
  const leftContainer = document.getElementById('flipbook-left');
  const rightContainer = document.getElementById('flipbook-right');
  const existingLeaf = document.getElementById('flipbook-turning-leaf');

  if (animTimer) {
    clearTimeout(animTimer);
    animTimer = null;
  }
  if (existingLeaf) existingLeaf.remove();

  const desktop = isDesktopView();
  const prevIdx = desktop ? Math.floor(currentPageIndex / 2) * 2 : currentPageIndex;
  const nextIdx = desktop ? Math.floor(targetIdx / 2) * 2 : targetIdx;

  if (prevIdx === nextIdx || !stage || !leftContainer) {
    currentPageIndex = nextIdx;
    updateFlipbookUI();
    return;
  }

  const goingForward = nextIdx > prevIdx;
  currentPageIndex = nextIdx;

  if (desktop && rightContainer) {
    const oldLeft = flipbookPages[prevIdx];
    const oldRight = flipbookPages[prevIdx + 1];
    const newLeft = flipbookPages[nextIdx];
    const newRight = flipbookPages[nextIdx + 1];

    const leaf = document.createElement('div');
    leaf.id = 'flipbook-turning-leaf';
    leaf.className = `flipbook-leaf-desktop ${goingForward ? 'flip-anim-next-desktop' : 'flip-anim-prev-desktop'}`;

    if (goingForward) {
      // Underlying right shows newRight immediately; underlying left stays oldLeft until turn completes
      leftContainer.innerHTML = renderPageMarkup(oldLeft);
      rightContainer.innerHTML = renderPageMarkup(newRight);

      leaf.innerHTML = `
        <div class="flipbook-face border-l border-[#252525]/15">${renderPageMarkup(oldRight)}</div>
        <div class="flipbook-face flipbook-face-back border-r border-[#252525]/20">${renderPageMarkup(newLeft)}</div>
      `;
    } else {
      // Underlying left shows newLeft immediately; underlying right stays oldRight until turn completes
      leftContainer.innerHTML = renderPageMarkup(newLeft);
      rightContainer.innerHTML = renderPageMarkup(oldRight);

      leaf.innerHTML = `
        <div class="flipbook-face border-l border-[#252525]/15">${renderPageMarkup(newRight)}</div>
        <div class="flipbook-face flipbook-face-back border-r border-[#252525]/20">${renderPageMarkup(oldLeft)}</div>
      `;
    }

    stage.appendChild(leaf);
    animTimer = setTimeout(() => {
      leaf.remove();
      updateFlipbookUI();
      animTimer = null;
    }, 580);

    // Update chapter pills & counter immediately for responsiveness
    updateFlipbookHeaderOnly();
  } else {
    // Mobile: 1 page turn animation
    const oldPage = flipbookPages[prevIdx];
    const newPage = flipbookPages[nextIdx];

    const leaf = document.createElement('div');
    leaf.id = 'flipbook-turning-leaf';

    if (goingForward) {
      leftContainer.innerHTML = renderPageMarkup(newPage);
      leaf.className = 'flipbook-leaf-mobile flip-anim-next-mobile shadow-xl';
      leaf.innerHTML = `<div class="flipbook-face">${renderPageMarkup(oldPage)}</div>`;
      stage.appendChild(leaf);
      animTimer = setTimeout(() => {
        leaf.remove();
        updateFlipbookUI();
        animTimer = null;
      }, 420);
    } else {
      leftContainer.innerHTML = renderPageMarkup(oldPage);
      leaf.className = 'flipbook-leaf-mobile flip-anim-prev-mobile shadow-xl';
      leaf.innerHTML = `<div class="flipbook-face">${renderPageMarkup(newPage)}</div>`;
      stage.appendChild(leaf);
      animTimer = setTimeout(() => {
        leaf.remove();
        updateFlipbookUI();
        animTimer = null;
      }, 420);
    }
    updateFlipbookHeaderOnly();
  }
}

function updateFlipbookHeaderOnly() {
  const desktop = isDesktopView();
  const safeIdx = desktop ? Math.floor(currentPageIndex / 2) * 2 : currentPageIndex;
  const activeChapterIdx = flipbookPages[safeIdx]?.chapterIdx ?? 0;
  const indicator = document.getElementById('flipbook-indicator');
  const prevBtn = document.getElementById('flipbook-prev');
  const nextBtn = document.getElementById('flipbook-next');
  const chaptersContainer = document.getElementById('flipbook-chapters');

  if (indicator) {
    if (desktop) {
      const spreadNum = Math.floor(safeIdx / 2) + 1;
      indicator.textContent = `Feuillet ${spreadNum} sur 4 (Pages ${safeIdx + 1}–${safeIdx + 2})`;
    } else {
      indicator.textContent = `Page ${safeIdx + 1} sur ${flipbookPages.length}`;
    }
  }
  const minIdx = 0;
  const maxIdx = desktop ? 6 : flipbookPages.length - 1;
  if (prevBtn) {
    prevBtn.disabled = safeIdx <= minIdx;
    prevBtn.classList.toggle('opacity-40', safeIdx <= minIdx);
    prevBtn.classList.toggle('cursor-not-allowed', safeIdx <= minIdx);
  }
  if (nextBtn) {
    nextBtn.disabled = safeIdx >= maxIdx;
    nextBtn.classList.toggle('opacity-40', safeIdx >= maxIdx);
    nextBtn.classList.toggle('cursor-not-allowed', safeIdx >= maxIdx);
  }
  if (chaptersContainer) {
    chaptersContainer.innerHTML = flipbookChapters.map(c => {
      const active = c.idx === activeChapterIdx;
      return `
        <button 
          type="button" 
          aria-pressed="${active}" aria-controls="flipbook-stage" onclick="window.goToFlipbookPage(${c.pageStart})"
          class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            active 
              ? 'bg-[#79C0B8] text-[#1e2928] font-bold shadow-xs' 
              : 'bg-gray-100 text-gray-600 hover:bg-[#eaf5f3] hover:text-[#205c56]'
          }"
        >
          ${c.label}
        </button>
      `;
    }).join('');
  }
}

window.flipbookPrev = function() {
  const step = isDesktopView() ? 2 : 1;
  const baseIdx = isDesktopView() ? Math.floor(currentPageIndex / 2) * 2 : currentPageIndex;
  const target = Math.max(0, baseIdx - step);
  if (target !== baseIdx) animatePageTurn(target);
};

window.flipbookNext = function() {
  const desktop = isDesktopView();
  const step = desktop ? 2 : 1;
  const maxIdx = desktop ? 6 : flipbookPages.length - 1;
  const baseIdx = desktop ? Math.floor(currentPageIndex / 2) * 2 : currentPageIndex;
  const target = Math.min(maxIdx, baseIdx + step);
  if (target !== baseIdx) animatePageTurn(target);
};

window.goToFlipbookPage = function(pageStart) {
  animatePageTurn(pageStart);
};

window.switchTab = function(tab) {
  const btnTambours = document.getElementById('tab-tambours');
  const btnBande = document.getElementById('tab-bande');
  const contentTambours = document.getElementById('content-tambours');
  const contentBande = document.getElementById('content-bande');

  if (!btnTambours || !btnBande || !contentTambours || !contentBande) return;

  const activeCls = 'px-6 py-3 font-bold text-[#205c56] border-b-2 border-[#79C0B8] transition-colors cursor-pointer bg-white';
  const inactiveCls = 'px-6 py-3 font-semibold text-gray-600 border-b-2 border-transparent transition-colors hover:text-gray-800 hover:bg-gray-50 cursor-pointer';
  const isTambours = tab === 'tambours';

  btnTambours.className = isTambours ? activeCls : inactiveCls;
  btnBande.className = isTambours ? inactiveCls : activeCls;
  btnTambours.setAttribute('aria-selected', String(isTambours));
  btnBande.setAttribute('aria-selected', String(!isTambours));
  contentTambours.classList.toggle('hidden', !isTambours);
  contentBande.classList.toggle('hidden', isTambours);
};

// Keep Flipbook synced when viewport crosses mobile/desktop threshold
let lastDesktopState = isDesktopView();
window.addEventListener('resize', () => {
  const nowDesktop = isDesktopView();
  if (nowDesktop !== lastDesktopState) {
    lastDesktopState = nowDesktop;
    if (animTimer) {
      clearTimeout(animTimer);
      animTimer = null;
    }
    const existingLeaf = document.getElementById('flipbook-turning-leaf');
    if (existingLeaf) existingLeaf.remove();
    updateFlipbookUI();
  }
});

// Initial render
function initPage() {
  renderChronoGrid();
  window.selectChronoItem('annees70');
  updateFlipbookUI();
}

document.addEventListener('DOMContentLoaded', initPage);
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  initPage();
}
