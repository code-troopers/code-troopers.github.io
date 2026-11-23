# code-troopers.com

Site vitrine de [Code-Troopers](https://code-troopers.com), agence de développement web et mobile à Tours.

Site statique [Hugo](https://gohugo.io) (contenu en Markdown, gabarits) et Webpack (CSS et JavaScript), publié sur GitHub Pages.

## Démarrer

Prérequis : Node.js 24 (`.nvmrc`), Corepack (`corepack enable`) et [Asciidoctor](https://asciidoctor.org) (`brew install asciidoctor` ou `sudo apt install asciidoctor`).

```bash
yarn install
yarn start     # http://localhost:3000, avec brouillons et articles datés dans le futur
yarn verify    # lint + contrôle du contenu + build de production, comme la CI
```

## Modifier le site

Tout est décrit dans [`AGENTS.md`](AGENTS.md), à destination des humains comme des agents IA : où se trouve chaque texte, comment ajouter un article ou une réalisation, conventions, workflow Git et ce qui demande une relecture technique.

En bref :

1. une branche depuis `main`, une PR vers `main` ;
2. la CI vérifie le build et le contenu, Netlify publie une preview de la PR ;
3. les PR de contenu (`site/content/`, images, PDF, `team.json`, `cloud.json`) peuvent être mergées dès que tout est vert ; les autres demandent l'approbation des propriétaires du code (`.github/CODEOWNERS`) ;
4. un merge dans `main` met le site en ligne automatiquement.

## Structure

```
site/content/   contenu : accueil, blog/, work/ (réalisations), team/, pages HTML
site/layouts/   gabarits Hugo et partials
site/data/      données : équipe, nuage de technologies, menu
site/static/    fichiers servis tels quels : images, PDF, llms.txt
src/            CSS (SCSS) et JavaScript compilés par Webpack
scripts/        contrôle du contenu exécuté par la CI
```
