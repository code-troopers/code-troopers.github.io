# AGENTS.md

Instructions pour tout agent IA (Codex, Claude, Copilot, Cursor, Gemini…) qui travaille sur ce dépôt. À lire en entier avant la première modification.

## 1. Contexte

- Site vitrine de **Code-Troopers**, agence de développement web et mobile à Tours : https://code-troopers.com
- Site statique **Hugo** (gabarits + contenu Markdown) et **Webpack** (CSS/JS). Site entièrement en français (`fr-FR`).
- La personne qui te parle n'est **pas forcément développeuse** (par exemple une personne de l'équipe commerciale). Elle ne verra pas si tu ajoutes une librairie, casses un gabarit ou dégrades le style. **C'est à toi d'être prudent à sa place.**
- Relecteurs techniques : l'équipe GitHub `@code-troopers/owners` (développeurs seniors). Toute modification technique passe par leur relecture.

## 2. Règle d'or : classer la demande avant d'agir

Avant toute modification, classe la demande dans un des deux niveaux et annonce-le à l'utilisateur.

### Niveau 1 : contenu (rapide, sans relecture technique)

Autorisé, puis PR mergeable dès que la CI est verte et la preview relue :

- corriger une faute, reformuler une phrase **à la demande explicite** de l'utilisateur ;
- ajouter ou modifier un article de blog, une réalisation, un membre de l'équipe ;
- ajouter ou remplacer une image, un PDF (offre de stage, brochure) ;
- modifier le nuage de technologies (`site/data/cloud.json`) ;
- mettre à jour `site/static/llms.txt`.

Chemins concernés (et **uniquement** ceux-là) : `site/content/`, `site/static/files/`, `site/static/images/`, `site/static/img/`, `site/static/llms.txt`, `site/data/team.json`, `site/data/cloud.json`.

### Niveau 2 : technique (relecture obligatoire)

Tout le reste. En particulier :

- tout fichier hors des chemins ci-dessus : gabarits (`site/layouts/`), styles (`src/css/`), JavaScript (`src/`), configuration (`site/hugo.toml`, `webpack.*.js`, `netlify.toml`, `.github/`, `package.json`…), ce fichier `AGENTS.md` ;
- **ajouter, supprimer ou mettre à jour une dépendance** (`package.json`, `yarn.lock`) ;
- changer la mise en page, les couleurs, la typographie, la structure HTML d'une page ;
- modifier le menu (`site/data/menu.json`), le pied de page, les textes de la section Compétences (ils sont dans des gabarits) ;
- changer l'URL d'une page existante, supprimer une page ;
- intégrer une vidéo, un widget de réseau social, un formulaire ou tout autre élément externe (`<iframe>`, `<script>`, `<style>`, attributs `onclick`…) ;
- une demande de contenu qui t'oblige à toucher un fichier du niveau 2.

Pour le niveau 2 : fais le travail sur une branche, ouvre la PR, **ne la merge pas**. GitHub demande automatiquement la relecture à l'équipe `@code-troopers/owners` (fichier `.github/CODEOWNERS`). Explique à l'utilisateur, en termes simples, ce qui a été modifié et pourquoi une relecture est nécessaire.

**En cas de doute, c'est du niveau 2.**

### Toujours interdit

- Pousser directement sur `main`, faire un `git push --force`, réécrire l'historique publié.
- Ajouter un script tiers, un traceur, une police externe, un iframe ou un CDN.
- Inventer des faits : chiffres, clients, témoignages, certifications, tarifs, dates. Tout ce qui est affirmé sur le site doit venir de l'utilisateur ou du contenu existant.
- Supprimer ou réécrire du contenu existant qui n'est pas visé par la demande.
- Committer des secrets, des fichiers générés (`dist/`, `site/data/webpack.json`) ou des fichiers personnels.
- Contourner un garde-fou (désactiver la CI, modifier `CODEOWNERS`, ignorer une erreur de build).

## 3. Installer et lancer le site en local

### Prérequis (une seule fois)

| Outil | Pourquoi | Installation (macOS) |
| --- | --- | --- |
| Git | versionner | `xcode-select --install` |
| Node.js **24** | build | `brew install node@24` ou `nvm install 24` (version dans `.nvmrc`) |
| Yarn 4 via Corepack | dépendances | `corepack enable` (fourni avec Node) |

Hugo n'est **pas** à installer : il est fourni par le paquet npm `hugo-extended` (version figée volontairement, voir section 9).

### Commandes

```bash
yarn install          # installer les dépendances (après chaque git pull qui modifie yarn.lock)
yarn start            # serveur local sur http://localhost:3000 (brouillons et articles datés dans le futur visibles)
yarn verify           # tout vérifier comme la CI : lint + contrôle du contenu + build de production
yarn check:content    # seulement le contrôle du contenu (rapide)
```

`yarn start` se recharge tout seul à chaque modification. Arrêt : `Ctrl+C`.

### Problèmes fréquents

| Symptôme | Cause | Solution |
| --- | --- | --- |
| `This project's package.json defines "packageManager": "yarn@4…". However the current global version of Yarn is 1.x` | Corepack non activé | `corepack enable`, puis relancer |
| Erreur de version Node, ou paquets qui refusent de s'installer | Node trop ancien | Installer et utiliser Node 24 (`nvm use`) |
| `Port 3000 is already in use` | Un autre `yarn start` tourne | Fermer l'autre terminal ou `PORT=3001 yarn start` |
| Page sans style en local | Webpack pas encore prêt | Attendre quelques secondes et recharger |
| `yarn install` échoue faute de réseau (bac à sable de l'agent) | Accès réseau coupé | Demander à l'utilisateur d'autoriser l'accès réseau pour cette commande |

## 4. Workflow Git et publication

`main` est la seule branche longue. **Un merge dans `main` = mise en ligne automatique** (GitHub Actions publie sur GitHub Pages en quelques minutes).

1. Partir de `main` à jour : `git switch main && git pull`.
2. Créer une branche courte et explicite : `content/article-xxx`, `content/typo-accueil`, `fix/…`, `feat/…`.
3. Faire la modification, puis `yarn verify`. Corriger toute erreur avant d'aller plus loin. Le contrôle du contenu affiche aussi des avertissements déjà connus sur d'anciens contenus : ils ne bloquent pas, mais **ta modification ne doit en ajouter aucun**.
4. Vérifier visuellement avec `yarn start` les pages touchées, en largeur ordinateur **et** mobile.
5. Committer avec un message en anglais au format Conventional Commits, sans mention d'IA ni trailer `Co-Authored-By` :
   - `fix(content): fix typo on homepage`
   - `feat(blog): add article on senior developers`
   - `feat(work): add Fizzer case study`
   - `chore(team): update team member photo`
6. Pousser et ouvrir une PR vers `main` en remplissant le modèle (`.github/PULL_REQUEST_TEMPLATE.md`). Le dépôt est public : **titre et description de la PR en anglais**, sans mention d'IA :
   ```bash
   git push -u origin HEAD
   gh pr create --base main --title "<commit message>" --body "<filled-in template sections, in English>"
   ```
   Sans `gh`, donner à l'utilisateur le lien que `git push` affiche.
7. Attendre les vérifications (`gh pr checks`) :
   - **CI** : lint, contrôle du contenu, build ;
   - **Netlify** : une preview du site (lien `deploy-preview-<n>--code-troopers.netlify.app`). **Donne ce lien à l'utilisateur** pour qu'il relise avant publication.
8. Merge :
   - niveau 1, CI verte, preview validée par l'utilisateur : `gh pr merge --squash --delete-branch` ;
   - niveau 2 : ne pas merger, attendre l'approbation d'un membre de `@code-troopers/owners`.
9. Après le merge, la mise en ligne prend quelques minutes. Vérifier sur https://code-troopers.com.

Une PR = un sujet. Ne mélange pas une correction de typo et un nouvel article.

## 5. Où modifier quoi

| Élément du site | Fichier | Niveau |
| --- | --- | --- |
| Textes de l'accueil (L'Agence, introduction) | `site/content/_index.html` (HTML : ne modifier que le texte entre les balises) | 1 |
| Section Compétences (4 blocs) | `site/layouts/partials/skill.html` | 2 |
| Réalisations | `site/content/work/<Nom>/index.md` | 1 |
| Nuage de technologies | `site/data/cloud.json` | 1 |
| Équipe (membres) | `site/data/team.json` + photo dans `site/content/team/` | 1 |
| Équipe (texte de la page) | `site/content/team/_index.html` | 1 |
| Page Rejoindre (`/rejoindre/`) : présentation, valeurs, journée type, photos des bureaux | frontmatter de `site/content/rejoindre/_index.md` | 1 |
| Offres d'emploi, de stage, d'alternance | `site/content/rejoindre/<offre>/index.md` | 1 |
| Cartes de contact individuelles (QR code de carte de visite) | `site/content/<prenom-nom>/index.md` (`type: contact-card`) | 1 |
| Articles de blog | `site/content/blog/<slug>/index.md` | 1 |
| Page Navig' | `site/content/navig.html` (long fichier HTML, prudence) | 1 |
| Mentions légales | `site/content/legals.html` | 1 |
| Offres de stage, brochures PDF | `site/static/files/` | 1 |
| Résumé pour les IA (`/llms.txt`) | `site/static/llms.txt` | 1 |
| Menu | `site/data/menu.json` | 2 |
| Pied de page (contact, réseaux) | `site/layouts/partials/footer.html` | 2 |
| Couleurs, polices, espacements | `src/css/` (variables dans `src/css/_variables.scss`) | 2 |

Dans les fichiers HTML de `site/content/`, ne change **que le texte** : pas de balise, classe, `id` ou attribut ajouté, déplacé ou supprimé. Si la demande l'exige, c'est du niveau 2.

## 6. Recettes

### Ajouter un article de blog

1. Créer le dossier `site/content/blog/<slug>/` (slug en minuscules, mots séparés par des tirets, sans accents, par exemple `freelance-vs-agence`).
2. Y placer l'image de couverture `cover.jpg` et créer `index.md` :

```yaml
---
title: "Titre de l'article"
author: Prénom
url: /2026/11/09/mon-slug/
date: 2026-11-09
expirydate: ""
cover: cover.jpg
draft: false
tags:
  - Agence
description: "Résumé de 140 à 160 caractères, utilisé par Google et les réseaux sociaux."
aliases: /2026/11/09/monslug.html
---
*Phrase d'accroche affichée en exergue.*
{.lede}
<!--more-->

Corps de l'article…
```

Règles :

- `url` : `/AAAA/MM/JJ/<slug>/` avec **la même date** que `date`. `aliases` : même date + slug sans tirets + `.html` (convention historique, à conserver).
- `author` : prénom de l'auteur, écrit comme dans ses articles existants (vérifier le champ `author` des autres articles), ou `Troopers` pour un article collectif.
- `tags` : **réutiliser l'orthographe exacte d'un tag existant** (majuscules comprises). Liste des tags avec leur nombre d'utilisations : `yarn check:content --tags`. Un tag écrit de deux façons (`Javascript` / `JavaScript`) rend le titre de la page de tag aléatoire.
- `<!--more-->` sépare l'accroche (affichée dans les listes) du reste de l'article.
- `date` dans le futur : l'article n'apparaîtra **pas** tout seul à cette date (le site n'est reconstruit qu'à chaque merge). Publier à la date voulue, ou prévenir l'utilisateur qu'un nouveau merge sera nécessaire.
- `draft: true` : visible en local et dans la preview Netlify, absent du site en ligne.
- Titres internes à partir de `##` (le `#` est le titre de la page). Les tableaux Markdown s'adaptent tout seuls au mobile.
- Classes disponibles à placer sur la ligne sous un paragraphe : `{.lede}` (accroche), `{.cta}` et `{.cta-note}` (appel à l'action en fin d'article, voir `site/content/blog/developpeur-senior-7-signaux/index.md`).
- Images dans le texte : les déposer dans le dossier de l'article et les référencer avec un **chemin absolu** construit à partir de `url` (le site déclare `<base href="/">`, un chemin relatif pointerait vers la racine et l'image serait cassée ; le contrôle du contenu le refuse). Le texte alternatif est **obligatoire** (accessibilité, exigée par les acheteurs publics). Format habituel, avec agrandissement au clic :

  ```html
  <a style="display: inline" href="/2026/11/09/mon-slug/photo.jpg" data-lightbox="group-0" title="Description de l'image">
    <img class="medium" src="/2026/11/09/mon-slug/photo.jpg" alt="Description de l'image">
  </a>
  ```

  Version simple sans agrandissement : `![Description de l'image](/2026/11/09/mon-slug/photo.jpg)`.

### Ajouter une réalisation

Dossier `site/content/work/<Nom>/` avec l'image et `index.md` :

```yaml
---
title: Fizzer
weight: 75
url: /fizzer.html
date: 2017-12-15
cover: fizzer.png
draft: false
tags:
  - Android
  - Web
---
Paragraphe de présentation du projet et du client.

<!--more-->

**Défis**

…

**Solution :**

…

Technologies utilisées

* …

**Impact :**

…
```

- `url` : `/<nom-en-minuscules>.html` (convention des réalisations existantes).
- `weight` : ordre d'affichage, **le plus petit en premier**. Les 4 premières apparaissent sur l'accueil. Regarder les `weight` existants avant d'en choisir un.
- `tags` : plateformes (`Android`, `iOS`, `Web`…), même orthographe que les réalisations existantes.
- Ajouter aussi la réalisation dans `site/static/llms.txt`, section « Réalisations notables », au même format que les autres.

### Publier, modifier ou clore une offre d'emploi

Chaque offre est un dossier `site/content/rejoindre/<slug>/` avec un `index.md` (et ses images éventuelles) :

```yaml
---
title: Développeur (H/F)
tagline: À la recherche d'un nouveau Trooper
date: 2026-11-23
weight: 10
contract: CDI
location: Tours
profile: Min. 2-3 ans XP
salary: ≃ 47k
applyEmail: adresse-de-candidature@code-troopers.com
---
Texte de l'offre en Markdown (titres `##`, listes, tableaux)…
```

- `contract`, `location`, `profile`, `salary` s'affichent en tête de l'offre et sur sa carte dans `/rejoindre/`. `salary` est facultatif, les autres sont obligatoires (le contrôle du contenu le vérifie).
- `applyEmail` : adresse du bouton « Postuler ».
- `weight` : ordre d'affichage dans la liste, le plus petit en premier.
- **Clore une offre** : ajouter `expirydate: AAAA-MM-JJ` (une date passée). L'offre disparaît du site mais reste dans le dépôt pour l'historique. Ne pas supprimer le dossier.
- Une page liée depuis une offre mais qui ne doit pas apparaître dans la liste (comme `exemple-de-mission`) utilise `build: {list: never}`.
- Les textes de la page `/rejoindre/` (intro, chiffres clés, valeurs, témoignages, promesse, journée type, année, agence, photos) sont dans le frontmatter de `site/content/rejoindre/_index.md`. Les témoignages y sont écrits pour des candidats : ils sont volontairement distincts de ceux de `site/data/team.json`, écrits pour des clients.

### Ajouter ou modifier un membre de l'équipe

- Photo carrée en `.webp` de 150×150 px dans `site/content/team/` (même format que les photos existantes).
- Entrée dans `site/data/team.json` avec les mêmes champs que les autres (`name`, `title`, `photo`, `description`, `linkedin`, `github`, `gitlab`, `twitter`, `malt`, `steam`) ; laisser `""` pour un réseau absent.
- L'ordre d'affichage est aléatoire à chaque build : c'est voulu.
- Retirer un membre : demander confirmation explicite à l'utilisateur.

### Corriger une faute

- Trouver le texte : `grep -rn "texte exact" site/content site/layouts site/data`.
- Ne modifier que la faute. Ne pas reformuler le reste de la phrase ni du paragraphe.

## 7. Règles éditoriales

- Français, ton de l'agence : direct, concret, sans jargon marketing creux.
- Typographie française : espace insécable (U+00A0) avant `:` `;` `!` `?`. Pour les apostrophes (`'` ou `’`), suivre ce qu'utilise déjà le fichier modifié.
- Éviter les tics d'écriture d'IA : pas de tiret cadratin (—), pas de listes à puces partout, pas de formules creuses (« dans un monde en constante évolution »…).
- Ne jamais réécrire un texte existant sans demande explicite : une demande de mise en forme n'est pas une demande de réécriture.
- Chaque affirmation doit être vérifiable : client nommé, durée, chiffre fourni par l'utilisateur. Pas de témoignage, note, certification ou tarif inventé.

## 8. Images et fichiers

- Formats : `.jpg` pour les photos, `.png` pour les captures, `.webp` accepté. Pas de `.heic`, pas de `.tiff`.
- Poids : **moins de 1 Mo** par image (le contrôle du contenu avertit au-delà). Compresser avant d'ajouter (par exemple `sips -Z 1600 image.jpg` sur macOS pour limiter la largeur à 1600 px).
- Couverture d'article : paysage, au moins 1200×630 px (elle est recadrée pour les réseaux sociaux).
- Noms de fichiers : minuscules, chiffres, tirets. Pas d'espace, d'accent ni d'apostrophe.
- Ne jamais supprimer une image ou un PDF existant sans vérifier qu'il n'est plus référencé (`grep -rn "nom-du-fichier" site`).

## 9. Pour les tâches techniques (niveau 2)

À lire seulement si l'utilisateur demande une modification technique ; elle sera relue.

- Pipeline : Webpack compile `src/index.js` et `src/css/main.scss` vers `dist/` et écrit `site/data/webpack.json` (fichier généré, ignoré par Git), que Hugo lit pour insérer les bons noms de fichiers. Hugo génère ensuite les pages dans `dist/`.
- Gabarits dans `site/layouts/` (partials dans `site/layouts/partials/`). Le rendu Markdown autorise le HTML brut (`unsafe = true`).
- Styles : SCSS dans `src/css/`, couleurs et tailles dans `src/css/_variables.scss`. Réutiliser les variables existantes, ne pas introduire de nouvelles couleurs ni polices.
- **Hugo est figé en 0.164** : à partir de 0.165, le calcul des résumés automatiques (`.Truncated`) change et retire des liens sur les cartes d'articles. Ne pas monter Hugo sans adapter les gabarits et comparer le rendu.
- **Aucune nouvelle dépendance** sans accord explicite d'un membre de `@code-troopers/owners`. Le site n'embarque que `highlight.js` (coloration du code) et `lightbox2` (agrandissement des images).
- Éléments volontaires à ne pas « corriger » : thème Halloween en octobre et blague du 1er avril (`src/index.js`, `site/static/js/april.js`), ordre aléatoire de l'équipe et du nuage de technologies, mesure d'audience Matomo.
- Le cache d'images de Hugo (`site/resources/_gen`) est versionné pour accélérer le build : ne pas le modifier à la main.
- Une modification technique ne doit pas changer le rendu des pages non concernées. Comparer `dist/` avant et après quand c'est possible.

## 10. Garde-fous en place

- **CI** (`.github/workflows/ci.yml`) sur chaque PR : `yarn lint`, `yarn check:content` (frontmatter, image de couverture présente, URL unique et cohérente avec la date…), `yarn build` (qui échoue au moindre avertissement Hugo).
- **CODEOWNERS** : toute PR qui touche autre chose que du contenu exige l'approbation d'un membre de `@code-troopers/owners`.
- **HTML sûr dans le contenu** : le contrôle du contenu refuse dans `site/content/` et les dossiers d'images et de PDF tout ce qui exécute du code ou charge une ressource externe (`<script>`, `<iframe>`, `<style>`, `<link>`, `<form>`, attributs `on…=`, liens `javascript:`) ainsi que les types de fichiers autres que texte, images, PDF et vidéos. Les éléments déjà présents sont autorisés un par un dans `scripts/content-allowlist.json`. Ne lance jamais `yarn check:content --write-allowlist` : mettre à jour cette liste est une décision technique, à laisser aux relecteurs.
- **Preview Netlify** sur chaque PR, pour relire le rendu avant publication.

## 11. Comment rendre compte à l'utilisateur

À la fin de chaque tâche, en français simple :

1. ce qui a été modifié (pages du site, pas noms de fichiers techniques) ;
2. le niveau (contenu ou technique) et donc si une relecture est nécessaire ;
3. le lien de la PR et le lien de la preview Netlify ;
4. ce qui reste à faire de son côté (relire la preview, merger, attendre la relecture).

Si une vérification échoue et que tu ne sais pas la corriger sans toucher au niveau 2, arrête-toi et explique le problème au lieu de contourner.
