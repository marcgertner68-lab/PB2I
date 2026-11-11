# PB2I — Patrimoine Belfortain de l'Industrie Informatique

Ce projet est le site web de l'association **PB2I** (Patrimoine Belfortain de l'Industrie Informatique), dédiée à la préservation et à la présentation du patrimoine industriel informatique de Belfort.

Le site propose une vitrine interactive présentant l'histoire de l'association, ses missions, ses actualités, ainsi que ses différentes collections muséales et technologies (*Mécanographie*, *Impressions*, *Magnétographie*, *Nos collections*).

> Réalisation & Design UI/UX : **Florian Gertner Kilian** ([wizyx.me](https://wizyx.me) · [LinkedIn](https://linkedin.com/in/flogk/))

---

## 🛠️ Technologies utilisées

Le projet est conçu avec des technologies web modernes, légères et performantes :

1. **Framework & Outils de Build** :
   - **[Vite](https://vite.dev/) (v8)** : Serveur de développement et bundler multi-pages (MPA).
   - **Rollup** : Compilation optimisée de chaque page HTML indépendante (`vite.config.js`).

2. **Styles, Design & Accessibilité** :
   - **[Tailwind CSS](https://tailwindcss.com/) (v4)** : Plugin `@tailwindcss/vite` et design tokens CSS (`@theme` dans `src/style.css`).
   - **Charte accessible** : Turquoise PB2I (`--color-primary: #79C0B8`), fonds minéraux (`#F3F7F5` / `#eaf5f3`) et contraste de texte accessible (`--color-primary-text: #205c56`, WCAG AA/AAA).
   - **Polices auto-hébergées** : `@fontsource-variable/literata` (titres) et `@fontsource-variable/inter` (texte courant), sans appel CDN bloquant.

3. **Logique applicative & SEO / GEO** :
   - **Vanilla JavaScript (ES6+)** : Composants réutilisables (`Navbar`, `Footer`, modale vidéo avec fermeture Échap/clic extérieur, carrousel, chronologie interactive, Flipbook 3D responsive).
   - **Internationalisation (i18n)** : Traduction côté client avec persistance (`FR`, `EN`, `DE`).
   - **SEO & GEO** : Balises sémantiques, Open Graph / Twitter Cards, métadonnées d'auteur, `robots.txt`, `sitemap.xml`, `llms.txt` et données structurées Schema.org JSON-LD (`WebSite`, `Museum`, `NGO`).

---

## 📁 Structure du Projet

```text
PB2I/
├── collections/          # Pages HTML des collections & technologies (impressions, magnetographie, mecanographie, musee)
├── public/
│   ├── assets/           # Médias statiques optimisés (.webp, flags SVG, PDF historiques)
│   ├── data/             # Données et traductions JSON par langue (fr, en, de)
│   ├── llms.txt          # Fiche structurée GEO pour moteurs d'IA générative
│   ├── robots.txt        # Règles d'indexation
│   └── sitemap.xml       # Plan de site XML
├── src/
│   ├── components/       # Navbar, Footer, Cartes, Modales vidéo & machines
│   ├── pages/            # Scripts ES6 spécifiques à chaque page HTML
│   ├── utils/            # Helpers (navLinks.js, i18n.js, markdown.js, api.js)
│   └── style.css         # Thème Tailwind v4, tokens et animations (dont Flipbook 3D)
├── dist/                 # Livrable de production généré par Vite
├── package.json          # Dépendances et scripts pnpm
└── vite.config.js        # Configuration des points d'entrée MPA
```

---

## 🚀 Démarrage rapide

### Prérequis

Assurez-vous d'avoir installé [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée) et `pnpm`.

### 1. Installation des dépendances

Installez les modules nécessaires répertoriés dans le fichier `package.json` :

```bash
pnpm install
```

### 2. Lancer le serveur de développement

Démarrez le serveur local avec rechargement à chaud (Hot Module Replacement - HMR) :

```bash
pnpm dev
```

Une fois lancé, ouvrez votre navigateur à l'adresse suivante : [http://localhost:5173](http://localhost:5173).

### 3. Compiler pour la production

Générez le livrable optimisé et minifié dans le dossier `dist/` :

```bash
pnpm build
```

### 4. Prévisualiser le livrable de production

Pour tester localement le dossier de production compilé avant déploiement :

```bash
pnpm preview
```

---

## 📝 Mise à jour et Maintenance du site

Le site a été conçu avec une architecture modulaire pour faciliter sa mise à jour sans avoir à modifier directement le code HTML ou CSS pour les contenus dynamiques (actualités, machines, traductions, etc.).

### 1. Ajouter ou modifier une actualité (News)

Les actualités sont chargées dynamiquement depuis `public/data/<langue>/articles.json` selon la langue active. **Aucun code à écrire** : tout se passe dans le JSON.

#### Structure d'un article

```json
{
  "id": "journees-patrimoine-2026",
  "title": "Journées du Patrimoine 2026",
  "excerpt": "Environ 140 visiteurs reçus pour cette nouvelle édition",
  "date": "2026-09-20",
  "author": "PB2I",
  "authorAvatar": "/assets/og-image.webp",
  "thumbnail": "/assets/og-image.webp",
  "content": [
    "Premier paragraphe.",
    { "type": "image", "src": "/assets/images/2026/10/photo.webp", "caption": "Légende optionnelle.", "size": "wide" },
    "Paragraphe situé après l'image."
  ],
  "images": [],
  "tags": ["Nouveau", "Visite"]
}
```

| Champ | Obligatoire | Rôle |
|---|---|---|
| `id` | oui | Identifiant unique dans l'URL : `article.html?id=<id>`. Slug en minuscules, tirets. |
| `title` | oui | Titre affiché en haut de l'article et dans les cartes. |
| `excerpt` | oui | Résumé de 3 lignes max sur la grille des actualités. |
| `date` | oui | Format `AAAA-MM-JS`. |
| `author` | oui | Nom ; les initiales servent d'avatar sur la carte. |
| `thumbnail` | oui | Image de la carte. Format `.webp` recommandé. |
| `content` | oui | Liste **ordonnée** de blocs : voir ci-dessous. |
| `images` | non | Galerie en fin d'article (voir « images » plus bas). |
| `attachments` | non | Liste de `{ "label": "Programme PDF", "url": "/assets/pdf/2026/07/x.pdf" }`, affichée en fin d'article sous « Liens & Documents utiles ». |
| `tags` | non | Étiquettes affichées sous l'article. |

#### Écrire le texte

Chaque élément de `content` est rendu **dans l'ordre**. Deux formes possibles :

- une **chaîne** = un paragraphe ;
- un **objet** `{"type": "image"}` = une image, affichée exactement là où elle est écrite.

```json
"content": [
  "Premier paragraphe, avec du **gras**, de l'*italique* et un [lien](https://exemple.fr).",
  "Deuxième paragraphe."
]
```

Mise en forme disponible dans le texte : `**gras**`, `*italique*`, `[lien](url)`.
Les puces et les listes ne sont pas gérées dans les articles : écrivez un paragraphe par ligne, en commençant chaque ligne par `—` ou `•` pour obtenir un rendu visuel de liste.

#### Placer une image au milieu du texte

Insérez un objet `image` entre vos paragraphes, à l'endroit voulu :

```json
"content": [
  "Paragraphe d'introduction.",
  {
    "type": "image",
    "src": "/assets/images/2026/10/IMG-20260919-WA0014.webp",
    "caption": "La salle des fibrés, mise en place avec Fil en Fibre.",
    "size": "wide"
  },
  "Paragraphe qui suit l'image."
]
```

| Clé de l'objet image | Obligatoire | Effet |
|---|---|---|
| `type: "image"` | oui | Identifie le bloc comme une image. |
| `src` | oui | Chemin **commençant par `/`**, relatif à `public/`. |
| `caption` | non | Légende sous l'image, en petit italique. Absente → aucune légende. |
| `size` | non | Absent ou `"wide"` = pleine largeur. `"half"` = deux images côte à côte. |

Quelques règles :

- Le chemin de `src` commence par `/` : les fichiers se trouvent dans `public/assets/...`.
- Cliquer sur l'image l'ouvre en plein écran dans un nouvel onglet.
- Une image introuvable est masquée silencieusement plutôt que d'afficher une icône cassée.
- Une image placée dans le texte **ne va pas** dans `images` : elle y serait affichée une seconde fois.
- Les images listées uniquement dans `images` s'affichent dans la galerie en fin d'article, comme auparavant.

Le rendu est produit par `src/components/articleBody.js` : c'est le seul endroit à modifier si un jour le format change.

#### Ajouter l'article dans les autres langues

Copiez et traduisez l'objet dans les fichiers correspondants, en gardant le **même `id`** et le **même `src` d'images** :

- Anglais : `public/data/en/articles.json`
- Allemand : `public/data/de/articles.json`

Un article absent d'une langue n'est simplement pas listé dans cette langue ; le site ne casse pas. Les liens des images ne se traduisent pas.

#### Vérifier

```bash
pnpm build
```

Puis ouvrez `http://localhost:5173/article.html?id=<votre-id>` après `pnpm dev`. Un article valide : titre, paragraphes, images dans le bon ordre, aucune image cassée, et un `console.warn` si un bloc de `content` est mal typé.

### 2. Ajouter ou modifier une machine (Collections)
Les informations sur les machines des collections sont également structurées en JSON.
Pour ajouter une machine :
1. Ouvrez le fichier JSON correspondant à la collection dans le dossier de la langue (ex: [mecanographie.json](public/data/fr/collections/mecanographie.json) sous `public/data/fr/collections/`).
2. Ajoutez un nouvel objet dans le tableau :
   ```json
   {
     "id": "trieuse-ibm",
     "name": "Trieuse de cartes IBM",
     "image": "/assets/collections/mecanographie/trieuse_ibm.webp",
     "description": "Description détaillée de la machine.\n- Les lignes commençant par un tiret '- ' ou puce '• ' sont formatées automatiquement en listes à puces.\n- Vous pouvez insérer une image interne dans la description avec la syntaxe standard markdown : ![Alt text](/assets/images/illustration.webp)"
   }
   ```
3. Reportez et traduisez la même clé et structure dans les collections des autres langues :
   - Anglais : [mecanographie.json](public/data/en/collections/mecanographie.json)
   - Allemand : [mecanographie.json](public/data/de/collections/mecanographie.json)

### 3. Gérer les traductions générales du site
Les textes statiques de l'interface (Navbar, Footer, etc.) sont centralisés dans des fichiers de traduction :
- Français : [ui.json](public/data/fr/ui.json)
- Anglais : [ui.json](public/data/en/ui.json)
- Allemand : [ui.json](public/data/de/ui.json)

Pour modifier un élément d'interface, éditez simplement la clé correspondante dans ces fichiers JSON.

### 4. Ajouter et optimiser des images
Pour maintenir un chargement ultra-rapide du site, toutes les images doivent être optimisées au format moderne `.webp`.

1. Placez vos fichiers dans `public/assets/`, de préférence dans un dossier daté `images/<AAAA>/<MM>/` pour rester cohérent avec l'existant.
2. Convertissez-les en `.webp` avec un outil de votre choix (XnConvert, Squoosh, `cwebp`, ou le superviseur d'images de votre système).
3. Référencez ensuite uniquement le `.webp` dans vos fichiers JSON et HTML — aucun script de conversion automatique n'est fourni dans ce dépôt.

Le même fichier image sert au `thumbnail` (carte), au bloc `image` du texte et à la galerie `images` : ne le dupliquez pas dans plusieurs dossiers, une seule copie et plusieurs références suffisent.

### 5. Déploiement en production
Le processus de déploiement est entièrement géré en intégration continue (CI/CD) :
- Toute modification poussée (`git push`) sur la branche `main` déclenche le workflow de déploiement GitHub Actions (`.github/workflows/deploy.yml`).
- Le workflow compile le projet (`pnpm build`) et déploie le dossier `dist/` sur **GitHub Pages** de manière totalement automatisée en quelques dizaines de secondes.

