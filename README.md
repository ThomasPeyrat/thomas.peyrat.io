# thomas.peyrat.io

Site personnel de Thomas Peyrat. Astro 7, 100 % statique, sans framework UI : HTML, CSS natif et quelques lignes de JavaScript (thème, filtres, copie du BibTeX, transitions de page).

## Démarrer

Prérequis : Node.js ≥ 22.12.

```sh
npm install
npm run dev       # http://localhost:4321, rechargement à chaud
npm run build     # génère dist/ (le site complet, statique)
npm run preview   # sert dist/ pour vérifier le build
npm run check     # vérification des types et des schémas
```

Toute erreur de contenu (champ manquant, identifiant arXiv mal formé, publication « published » sans revue…) arrête le build avec un message qui indique le fichier et le champ.

## Où est quoi

```
src/
  site.config.ts          nom, phrase d'accueil, poste, e-mail, adresse, profils, navigation
  content.config.ts       le modèle de contenu (schémas Zod, commentés champ par champ)
  content/
    publications/*.md     une publication par fichier ; le corps = l'abstract (LaTeX autorisé)
    research/*.md         un axe de recherche par fichier, rédigé en étude de cas (LaTeX autorisé)
    talks/*.yaml          un exposé (ou un événement organisé) par fichier
    teaching/*.yaml       un cours ou un projet encadré par fichier
    news/*.md             une actualité par fichier ; la plus récente s'affiche sur l'accueil
    pages/primer.md       la page Primer
    cv.yaml               la page CV, une clé par section
  assets/portrait.jpg     le portrait (tirage noir et blanc) ; Astro en produit AVIF/WebP/JPEG
  styles/global.css       le système de design (tokens, grille, typographie)
  components/, layouts/, pages/
public/
  files/                  PDF servis tels quels (CV, articles, transparents)
  favicon.svg             le monogramme
```

Le nom de fichier (sans extension) devient l'identifiant et, pour les publications et la recherche, l'adresse de la page : `publications/mon-article.md` → `/publications/mon-article/`.

## Ajouter du contenu

### Une publication

Créer `src/content/publications/<slug>.md` :

```md
---
title: Titre exact de l'article
authors: [Caroline Hillairet, Thomas Peyrat, Anthony Réveillac]   # dans l'ordre de l'article
year: 2026
status: submitted        # preprint | submitted | revision | accepted | published
journal: "Annals of Applied Probability"   # obligatoire si status: published
volume: "36"
pages: "1–42"
links:
  arxiv: "2601.01234"    # entre guillemets
  hal: hal-01234567
  doi: 10.1214/xx-AAP0000
  pdf: files/mon-article.pdf   # fichier placé dans public/files/
  code: https://github.com/…
keywords: [Hawkes processes, stress testing]
research: [stress-testing-cyber-losses]   # identifiants de src/content/research/
---
L'abstract, en Markdown. Les formules s'écrivent $\lambda_t$ en ligne et
$$\mathbb E[N_T] = \int_0^T \lambda_s\,ds$$
en display.
```

Le BibTeX est généré automatiquement à partir de ces champs (clé forçable avec `bibkey:`). Le statut alimente les filtres de la page Publications.

### Un exposé

`src/content/talks/2026-06-ville.yaml` :

```yaml
date: 2026-06-01          # jour inconnu : mettre le 1er du mois (seul le mois est affiché)
event: "Nom de la conférence"
title: "Titre de l'exposé"   # facultatif
session: "Nom de la session" # facultatif
city: "Ville"
country: "Pays"
kind: invited             # invited | contributed | seminar | school | organiser
url: https://…            # page de l'événement, facultatif
slides: files/slides.pdf  # facultatif
```

### Un enseignement

`src/content/teaching/<slug>.yaml`, deux variantes :

```yaml
kind: course
title: Stochastic Calculus
institution: École Polytechnique
level: Master 1
role: Teaching assistant
start: 2026
end: 2027                  # facultatif
description: Une ligne.    # facultatif
```

```yaml
kind: supervision
title: Titre du projet
start: 2026
end: 2027
description: Ce qu'ont fait les étudiants, en une ligne.
```

### Une actualité

`src/content/news/2027-01-prix.md` :

```md
---
date: 2027-01-15
when: January 2027      # facultatif : la date telle qu'elle doit s'afficher
---
Le texte, en une ou deux lignes.
```

La plus récente apparaît dans la colonne « Now » de l'accueil.

### Un axe de recherche

`src/content/research/<slug>.md` avec `title`, `summary` (≤ 260 caractères), `period: { start: 2026 }` (sans `end` = en cours), `collaborators`, `order`. Le corps est l'étude de cas, en Markdown avec LaTeX. Les publications qui citent ce slug dans leur champ `research` s'affichent sous l'étude de cas.

### Le CV

Éditer `src/content/cv.yaml` et remplacer `public/files/Thomas_Peyrat_CV.pdf` (le PDF actuel date de novembre 2025).

### Le texte de l'accueil

Tout est dans `src/site.config.ts` : `voice` (la phrase), `position`, `summary`, `email`, `address`, `profiles` (un profil vide n'est pas affiché).

## Déployer

### GitHub Pages (recommandé)

Le site est configuré par défaut pour le dépôt `ThomasPeyrat/thomas.peyrat.io` : il est publié à l'adresse `https://thomaspeyrat.github.io/thomas.peyrat.io/` (voir `astro.config.mjs`).

1. Pousser ce dossier sur la branche `main` du dépôt.
2. Sur GitHub, une seule fois : Settings → Pages → Build and deployment → Source : **GitHub Actions**.
3. Chaque push sur `main` construit et publie le site (`.github/workflows/deploy.yml`, onglet Actions pour suivre).

Autre adresse :

- **Domaine personnel** (par ex. `thomas.peyrat.io`) : créer `public/CNAME` contenant le domaine, configurer le DNS chez le registrar (CNAME vers `thomaspeyrat.github.io`), renseigner le domaine dans Settings → Pages, et définir les variables de dépôt `SITE_URL=https://thomas.peyrat.io` et `BASE_PATH=/`.
- **Dépôt renommé** : `BASE_PATH=/<nouveau-nom>/`.

Les variables se définissent dans Settings → Secrets and variables → Actions → Variables.

### Hébergement institutionnel (SSH)

```sh
DEPLOY_TARGET=login@serveur:/chemin/public_html/ npm run deploy:rsync
# si le site vit dans un sous-dossier :
SITE_URL=https://serveur.fr BASE_PATH=/~login/ DEPLOY_TARGET=… npm run deploy:rsync
```

Le script construit le site puis synchronise `dist/` (les fichiers supprimés localement le sont aussi sur le serveur).

## Système de design

- **Une couleur de fond, une encre, une couleur signature.** Écru `#F3F0E9`, vert-noir `#141B17`, gris laine `#5E635B` pour le texte secondaire. Le vert maison `#1E3529` n'apparaît que dans le bandeau de pied de page. Mode sombre : `#0E1310` / `#ECE8DF` / `#A3A69E` / `#18291F`. Tous les tokens sont sur `:root` dans `src/styles/global.css`.
- **Deux familles**, auto-hébergées (aucune requête vers Google) : Gilda Display pour le nom, la voix, les titres et les listes ; Libre Franklin pour tout le reste, avec les petites capitales espacées (`.caps`, 11 px, `letter-spacing: .22em`).
- **Grille** : 12 colonnes, gouttière `--gutter`. Pages intérieures : titre sur 8 colonnes, chapeau sur 4 ; listes par année (2 colonnes de date, 10 de contenu) ; fiches avec un cartouche à gauche (3 colonnes) et le texte à droite (7 colonnes).
- **Monogramme** TP (`src/components/Monogram.astro`) : la barre du T devient la panse du P. Il sert de favicon, d'icône mobile et signe le pied de page.
- **Mouvement** : transitions de page Astro (`ClientRouter`), nom qui se resserre et photo dévoilée à l'ouverture de l'accueil, soulignés qui se tracent. Tout est désactivé sous `prefers-reduced-motion`.
- **Thème** : Auto (système) → Light → Dark, mémorisé dans le navigateur.

## Sécurité des dépendances

`npm audit` signale un avis de faible gravité sur KaTeX (GHSA-238p-pmpm-9mq7), remonté aussi via `remark-math` et `rehype-katex`. Il ne concerne que le rendu de LaTeX non fiable avec l'option `trust` activée. Ici, KaTeX ne tourne qu'au build, sur vos propres fichiers, `trust` désactivé, et le site publié est du HTML statique. Ne pas lancer `npm audit fix --force` : il installe KaTeX 0.19, qui dégrade le rendu des indices avec la feuille de style actuelle (testé).

## À vérifier avant la mise en ligne

- La phrase `voice` de `src/site.config.ts` (provisoire).
- Les statuts des trois articles marqués `submitted`.
- Les profils HAL, arXiv, ORCID, Scholar et GitHub (vides pour l'instant).
- Le CV PDF (novembre 2025) et les dates des actualités.
- La pérennité de l'adresse `thomas.peyrat@ensae.fr`.
