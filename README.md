# PB2I — Patrimoine Belfortain de l'Industrie Informatique

Ce projet est le site web de l'association **PB2I** (Patrimoine Belfortain de l'Industrie Informatique), dédiée à la préservation et à la présentation du patrimoine industriel informatique de Belfort.

Le site propose une vitrine interactive présentant l'histoire de l'association, ses missions, ses actualités, ainsi que ses différentes collections muséales (mécanographie, imprimantes, magnétographie, etc.).

---

## 🛠️ Technologies utilisées

Le projet est conçu avec des technologies web modernes, légères et performantes :

1. **Framework & Outils de Build** :
   - **[Vite](https://vite.dev/) (v8)** : Utilisé comme serveur de développement ultra-rapide et bundler de production multi-pages (MPA).
   - **Rollup** : Intégré à Vite pour la compilation optimisée de chaque page HTML indépendante.

2. **Styles & Design** :
   - **[Tailwind CSS](https://tailwindcss.com/) (v4)** : Intégré via le plugin officiel `@tailwindcss/vite` pour des styles utilitaires de nouvelle génération et un thème natif CSS (`@theme`).
   - **CSS3 Vanilla** : Utilisé pour les variables globales de design tokens, la gestion des grilles responsives complexes et les micro-animations.
   - **Polices de caractères** : Literata (serif chaleureux pour les titres) et Inter (sans-serif moderne pour le corps de texte).

3. **Logique applicative** :
   - **Vanilla JavaScript (ES6+)** : Gestion du cycle de vie du site, montage dynamique des composants réutilisables (Navbar, Footer, Modales, Lecteur vidéo) et animations interactives.
   - **Système d'Internationalisation (i18n)** : Système de traduction côté client avec détection et persistance de la langue (`FR`, `EN`, `DE`) dans le stockage local (`localStorage`).

---

## 📁 Structure du Projet

```text
PB2I/
├── collections/          # Fichiers HTML des différentes collections
├── data/                 # Données de traduction statiques (JSON) par langue (fr, en, de)
├── dist/                 # Fichiers compilés prêts pour la production (générés)
├── public/               # Actifs statiques publics (Favicon, icônes globales SVG)
├── src/
│   ├── assets/           # Images, logos et illustrations du site
│   ├── components.js     # Logique de montage des composants partagés (Navbar, Footer, etc.)
│   ├── main.js           # Point d'entrée par défaut
│   ├── style.css         # Feuille de style globale et configuration du thème Tailwind v4
│   └── pages/            # Scripts JavaScript spécifiques à chaque page HTML
├── package.json          # Dépendances et scripts de commande pnpm
└── vite.config.js        # Configuration du serveur de développement et des points d'entrée MPA
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
Les actualités sont chargées dynamiquement depuis des fichiers JSON selon la langue active.
Pour ajouter une actualité :
1. Ouvrez le fichier [articles.json](file:///c:/Users/starl/Documents/Projets/Sites/PB2I/public/data/fr/articles.json) (pour le français).
2. Ajoutez un nouvel objet au début du tableau `articles` avec la structure suivante :
   ```json
   {
     "id": "ma-nouvelle-actualite",
     "title": "Titre de l'actualité",
     "excerpt": "Court résumé de l'actualité qui sera affiché sur la grille.",
     "date": "2026-07-31",
     "author": "PB2I",
     "authorAvatar": "/assets/images/avatar-default.jpg",
     "thumbnail": "/assets/images/actualites/ma-photo.webp",
     "content": [
       "Premier paragraphe de l'article.",
       "Deuxième paragraphe de l'article."
     ],
     "images": [],
     "tags": ["Nouveau", "Exposition"]
   }
   ```
3. Pour assurer le support multilingue, copiez et traduisez cette actualité dans les fichiers correspondants aux autres langues :
   - Anglais : [articles.json](file:///c:/Users/starl/Documents/Projets/Sites/PB2I/public/data/en/articles.json)
   - Allemand : [articles.json](file:///c:/Users/starl/Documents/Projets/Sites/PB2I/public/data/de/articles.json)

### 2. Ajouter ou modifier une machine (Collections)
Les informations sur les machines des collections sont également structurées en JSON.
Pour ajouter une machine :
1. Ouvrez le fichier JSON correspondant à la collection dans le dossier de la langue (ex: [mecanographie.json](file:///c:/Users/starl/Documents/Projets/Sites/PB2I/public/data/fr/collections/mecanographie.json) sous `public/data/fr/collections/`).
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
   - Anglais : [mecanographie.json](file:///c:/Users/starl/Documents/Projets/Sites/PB2I/public/data/en/collections/mecanographie.json)
   - Allemand : [mecanographie.json](file:///c:/Users/starl/Documents/Projets/Sites/PB2I/public/data/de/collections/mecanographie.json)

### 3. Gérer les traductions générales du site
Les textes statiques de l'interface (Navbar, Footer, etc.) sont centralisés dans des fichiers de traduction :
- Français : [ui.json](file:///c:/Users/starl/Documents/Projets/Sites/PB2I/public/data/fr/ui.json)
- Anglais : [ui.json](file:///c:/Users/starl/Documents/Projets/Sites/PB2I/public/data/en/ui.json)
- Allemand : [ui.json](file:///c:/Users/starl/Documents/Projets/Sites/PB2I/public/data/de/ui.json)

Pour modifier un élément d'interface, éditez simplement la clé correspondante dans ces fichiers JSON.

### 4. Ajouter et optimiser des images
Pour maintenir un chargement ultra-rapide du site, toutes les images doivent être optimisées au format moderne `.webp`. Un script automatique est fourni à cet effet :
Lorsque vous ajoutez de nouvelles images au format `.jpg`, `.jpeg` ou `.png` dans `public/assets/` ou `src/` :
1. Ouvrez votre terminal à la racine du projet et lancez :
   ```bash
   node convert-webp.js
   ```
2. Ce script va :
   - Convertir automatiquement les nouvelles images au format compressé `.webp` (qualité 80%).
   - Supprimer les fichiers originaux PNG/JPG obsolètes.
   - Parcourir et mettre à jour automatiquement toutes les références de ces images dans les fichiers HTML, JS, JSON et CSS.

### 5. Déploiement en production
Le processus de déploiement est entièrement géré en intégration continue (CI/CD) :
- Toute modification poussée (`git push`) sur la branche `main` déclenche le workflow de déploiement GitHub Actions (`.github/workflows/deploy.yml`).
- Le workflow compile le projet (`pnpm build`) et déploie le dossier `dist/` sur **GitHub Pages** de manière totalement automatisée en quelques dizaines de secondes.

