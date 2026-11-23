# code-troopers.com

Website of [Code-Troopers](https://code-troopers.com), a web and mobile development agency based in Tours, France. The site itself is in French.

Static site built with [Hugo](https://gohugo.io) (Markdown content, templates) and Webpack (CSS and JavaScript), published on GitHub Pages.

## Getting started

Requirements: Node.js 24 (`.nvmrc`) and Corepack (`corepack enable`).

```bash
yarn install
yarn start     # http://localhost:3000, including drafts and future-dated posts
yarn verify    # lint + content checks + production build, same as CI
```

## Editing the site

Everything is described in [`AGENTS.md`](AGENTS.md) (in French), written for humans and AI agents alike: where each piece of text lives, how to add a blog post or a case study, conventions, Git workflow and what requires a technical review.

In short:

1. branch off `main`, open a PR against `main`;
2. CI checks the build and the content, Netlify publishes a preview of the PR;
3. content PRs (`site/content/`, images, PDFs, `team.json`, `cloud.json`) can be merged once everything is green; other PRs need approval from the code owners (`.github/CODEOWNERS`);
4. merging into `main` deploys the site automatically.

## Structure

```
site/content/   content: homepage, blog/, work/ (case studies), team/, HTML pages
site/layouts/   Hugo templates and partials
site/data/      data: team, technology cloud, menu
site/static/    files served as-is: images, PDFs, llms.txt
src/            CSS (SCSS) and JavaScript bundled by Webpack
scripts/        content checks run by CI
```
