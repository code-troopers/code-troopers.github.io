# Audit SEO / GEO / Marketing / Design / Conversion — Code-Troopers

> Audit complet du site code-troopers.com
> Objectif : **se faire trouver** (SEO/GEO) + **convertir les visiteurs en clients** (UX/CTA/Marketing)
> Date : 2026-02-27

---

## P0 — CRITIQUE (impact direct sur le référencement et la conversion)

### SEO Technique

- [x] **Pas de `robots.txt`** — (fait en amont sur la branche)

- [x] **Hiérarchie H1 cassée sur toutes les pages intérieures** — Les titres d'articles sont maintenant en `<h1>`, les noms de section remplacés par des breadcrumbs.

- [x] **Pas de H1 sur la page d'accueil** — H1 sr-only "Code-Troopers — Agence de développement web et mobile à Tours" ajouté.

- [x] **H1 "Casting" dans un partial inclus sur la homepage** — Changé en `<h2>`.

- [x] **`<meta name="description">` vide sur ~95% des pages** — Fallback vers `.Summary | plainify | htmlUnescape | truncate 160` ajouté.

- [x] **Pas de balise canonical** — `<link rel="canonical">` ajouté dans head.html.

- [x] **Pas de données structurées (JSON-LD / Schema.org)** — (fait en amont sur la branche : Organization, BlogPosting, Article)

### Conversion

- [x] **Aucun CTA dans le hero** — Bouton "Discutons de votre projet" ajouté pointant vers `#contact`.

- [x] **Pas de formulaire de contact fonctionnel** — Formulaire intégré avec Netlify Forms (`data-netlify="true"`) + honeypot anti-spam. Ajouté dans le footer de la homepage sous les coordonnées. Champs : Nom, E-mail, Message. Responsive (flex row desktop, stack mobile).

### Conformité légale

- [x] **Matomo en mode anonyme (sans cookies)** — `_paq.push(['disableCookies'])` ajouté. Pas de bandeau nécessaire (serveur interne, pas de cookies).

---

## P1 — HAUTE PRIORITE (impact SEO + UX significatif)

### Navigation mobile

- [x] **Navigation quasi inexistante sur mobile** — Menu hamburger ajouté avec bouton accessible (`aria-label`, `aria-expanded`), animation CSS (3 barres → X), JS toggle dans `src/index.js`. Fermeture auto au clic sur un lien. Testé sur 375x812.

### SEO Technique

- [x] **`baseurl = "/"`** — Changé en `baseurl = "https://code-troopers.com/"`.

- [x] **RSS et taxonomies désactivés** — `disableKinds` supprimé. RSS activé dans les outputs. Les pages de tags (`/tags/android/`, `/tags/web/`...) sont maintenant générées (327 pages au lieu de ~90).

- [x] **Sitemap pauvre** — Priorities différenciées (1.0 homepage, 0.9 work, 0.7 blog, 0.5 autres) et `changefreq` ajouté. Utilise `$siteUrl` au lieu d'URL codée en dur.

- [x] **Pas de `og:locale`** — `og:locale` fr_FR ajouté.

- [x] **Pas de `twitter:site` ni `twitter:creator`** — Code-Troopers n'a pas de compte Twitter/X (choix assumé). Les meta `twitter:card` et `twitter:title` sont conservées car utilisées par LinkedIn, Slack et Discord.

- [x] **Image OG fallback avec caractère spécial dans le nom** — Fichier renommé en `logo-code-troopers-tete-couleur.png` et référence mise à jour dans `hugo.toml`.

### Performance

- [x] **jQuery (87.5 kB) chargé en synchrone sur TOUTES les pages** — jQuery est maintenant chargé dynamiquement UNIQUEMENT le 1er avril. 0 impact le reste de l'année.

- [x] **Netlify Identity Widget chargé en synchrone** — `async` ajouté.

- [x] **Aucun `Cache-Control` dans `netlify.toml`** — Headers de cache ajoutés : immutable pour JS/CSS hashés, 30j pour images, must-revalidate pour HTML.

- [x] **Images en qualité 100%** — Passées à q80 sur blog/single, blog/li, work/li et work/single.

- [x] **Pas d'images responsives (`srcset`)** — srcset ajouté sur blog/single (400w, 600w, 900w), blog/li (200w, 336w), et work/single (400w, 600w, full). Hugo génère les variantes automatiquement.

- [x] **Pas de `loading="lazy"` sur les images sous le fold** — Ajouté sur les images skills et team.

- [x] **CSS chargé avant `<meta charset>`** — `<meta charset>` est maintenant le premier élément du `<head>`.

- [x] **Pas de `<link rel="preconnect">`** — Preconnect et dns-prefetch ajoutés pour matomo.chapi.to. jQuery CDN n'est plus chargé globalement.

- [x] **Source maps en production** — `sourceMap: true` supprimé de TerserPlugin dans webpack.prod.js.

- [x] **`manifest.json` avec `name` vide** — `"name": "Code-Troopers"` et `"short_name"` ajoutés.

### Accessibilité (impacte aussi le SEO)

- [x] **Alt text vide sur les images de skills** — Alt texts descriptifs ajoutés sur les 4 images.

- [x] **Alt text vide sur les covers blog/work dans les listes** — Alt "Illustration de {titre}" ajouté.

- [x] **Alt text génériques "Photo d'équipe 0/1/2..."** — Remplacés par des descriptions contextuelles.

- [x] **Headings `<h2>` dans le footer** — Remplacés par `<p class="section-title">` avec les mêmes styles CSS.

- [x] **Pas de balise `<address>` pour les coordonnées** — Balise `<address>` ajoutée autour des infos de contact.

---

## P2 — PRIORITE MOYENNE (amélioration marketing et trust)

### Preuve sociale (Social Proof)

- [x] **Aucun témoignage client** — Choix délibéré de ne pas afficher de témoignages clients. Non applicable.

- [ ] **Pas de grille de logos clients** — Barrière, Criteo, Conseil Constitutionnel, DossierFacile, Soletanche... sont dans les réalisations mais pas mis en avant visuellement sur la homepage.
  - **ACTION** : Ajouter un partial `client-logos.html` entre skills et réalisations.

- [x] **Pas de badges/avis** — Badge Sortlist ajouté dans les liens sociaux du footer. Lien vers le profil Sortlist Code-Troopers.

### Contenu & SEO GEO (Generative Engine Optimization)

- [x] **Pas de page "Services" dédiée** — 4 pages service créées : `/services/developpement-web/`, `/services/developpement-mobile/`, `/services/conception-ux/`, `/services/maintenance/`. Chacune cible des requêtes longue traîne avec contenu détaillé et CTA.

- [x] **Pas de page "À propos" dédiée** — Page `/about/` créée avec : histoire, valeurs différenciantes, références clients, stack technique et CTA.

- [x] **Blog posts sans `description` frontmatter** — Description ajoutée aux 48 articles de blog (max 160 caractères, pertinentes pour le SEO).

- [ ] **Trou de contenu de 8 ans (2016-2024)** — Le blog passe de janvier 2016 à mars 2024. Maintenir une cadence régulière (1-2 articles/mois).

- [x] **Tips sans images de couverture** — Section tips abandonnée pour le moment. Non applicable.

- [x] **Le nuage de technologies est en JS pur (invisible pour les moteurs)** — Les tags sont maintenant rendus en HTML statique par Hugo (avec classes de poids `w1`-`w10` pour le styling). Le JS masque le fallback statique et lance l'animation. Crawlers et `noscript` voient le cloud complet.

### Marketing & Analytics

- [x] **Aucun tracking d'événements de conversion** — `trackEvent` Matomo ajouté pour : appels téléphoniques, emails, clics LinkedIn/GitHub, CTA hero, soumission du formulaire de contact.

- [x] **Pas de newsletter** — Choix de ne pas mettre en place de newsletter pour le moment. Non applicable.

- [x] **Liens sociaux du footer s'ouvrent dans le même onglet** — `target="_blank" rel="noopener"` ajouté.

- [ ] **Pas de page tarifs / "Demander un devis"** — Aucune indication de pricing.
  - **ACTION** : Créer au minimum un formulaire de demande de devis.

### Design & UX

- [x] **Page 404 minimaliste** — Améliorée avec liens vers réalisations, blog et contact.

- [x] **Section "L'Agence" (hero) : texte dense sans respiration** — Texte raccourci et aéré. Ajout de 3 chiffres clés visuels (+10 ans, 15 développeurs, +50 projets) avec styling dédié en `lightblue`.

- [x] **Page équipe : section "Pourquoi choisir Code-Troopers ?" peu lisible** — Restructurée en bullet points concis avec des titres forts. Texte d'introduction raccourci et plus direct. Meta description ajoutée.

- [x] **Carousel de l'équipe (page team) : flèches identiques** — Bouton précédent : `&#10094;` (‹), bouton suivant : `&#10095;` (›).

- [x] **Pas de fil d'ariane (breadcrumb)** — Breadcrumbs ajoutés sur les pages blog, work et tips (single).

- [ ] **Contact section sans variation contextuelle** — Le footer contact est identique sur toutes les pages.
  - **ACTION** : Adapter le message selon la section (ex: "Vous avez un projet mobile ?" sur une page de réalisation mobile).

### SEO Local / GEO

- [ ] **Pas de Google Business Profile optimisé** — Pas de lien vers le profil Google Business, pas d'embed Google Maps.
  - **ACTION** : Ajouter un lien Google Business et éventuellement une carte.

- [x] **Adresse structurée sémantiquement** — Balise `<address>` ajoutée dans le footer.

- [x] **Pas de page "Agence web Tours"** — Landing page `/agence-web-tours/` créée, ciblant "agence développement web Tours". Contenu : proximité, écosystème French Tech, services, références clients, coordonnées avec adresse structurée.

---

## P3 — AMELIORATIONS (polish & optimisation)

### Technique

- [x] **GitHub Actions utilise Node 20, le projet requiert Node 24** — Workflow mis à jour : `node-version-file: '.nvmrc'`, actions checkout/setup-node en v4, Ruby 3.1.

- [x] **Stratégie de chargement des fonts absente** — Montserrat supprimé et remplacé par un stack de fonts système (`system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif`). Plus de FOIT, chargement instantané.

- [ ] **CSS d'avril/halloween chargé globalement** — `april.css` et `navig.css` sont importés dans le bundle global.
  - **ACTION** : Les charger conditionnellement ou les supprimer si inutiles.

- [x] **Hero background en CSS `background-image`** — `role="img" aria-label` ajouté sur la section `#company`.

- [x] **Bug template tips** — La condition `.Params.tags` / `.Params.tipstags` est corrigée.

### Contenu

- [x] **Réalisations sans description frontmatter** — Description ajoutée aux 26 réalisations (max 160 caractères, en français, pertinentes pour le SEO).

- [x] **Le Matomo est hébergé sur `matomo.chapi.to`** — Pas de migration prévue pour le moment. Non applicable.

---

## Récapitulatif

| Priorité | Fait | Reste |
|----------|------|-------|
| **P0 - Critique** | **8/8** | 0 |
| **P1 - Haute** | **20/20** | 0 |
| **P2 - Moyenne** | **13/18** | 5 |
| **P3 - Améliorations** | **5/6** | 1 |
| **TOTAL** | **55/61** | **6** |

### Items restants (non implémentables sans décision ou contenu externe)

1. **Grille de logos clients** — Nécessite les logos en haute résolution
2. **Trou de contenu 2016-2024** — Éditorial, dépend de la rédaction d'articles
3. **Page tarifs / demande de devis** — Nécessite une décision business
4. **Contact section contextuelle** — Amélioration optionnelle
5. **Google Business Profile** — Lien non disponible
6. **CSS april/halloween chargé globalement** — Optimisation mineure
