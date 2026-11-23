// Sanity checks on blog and work entries, run in CI before the Hugo build.
// Errors fail the build; warnings are only printed.
// --tags lists existing tags with their usage count.
import {readdirSync, readFileSync, existsSync, statSync} from "node:fs";
import {join, relative} from "node:path";
import yaml from "js-yaml";

const CONTENT = "site/content";
const SECTIONS = ["blog", "work"];
const MAX_IMAGE_BYTES = 1024 * 1024;
const IMAGE_EXT = /\.(png|jpe?g|webp|gif)$/i;
// <base href="/"> makes relative image paths resolve from the site root
const RELATIVE_IMAGE = /(?:\]\(|src=")(?!\/|https?:|#)([^)"\s]+\.(?:png|jpe?g|webp|gif|svg))/gi;

const errors = [];
const warnings = [];
const urls = new Map();
const tags = new Map();

function parse(file) {
  const text = readFileSync(file, "utf8");
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error("frontmatter YAML manquant (bloc --- en tête de fichier)");
  return {fm: yaml.load(match[1]) || {}, body: text.slice(match[0].length)};
}

for (const section of SECTIONS) {
  const root = join(CONTENT, section);
  for (const entry of readdirSync(root, {withFileTypes: true})) {
    if (!entry.isDirectory()) continue;
    const dir = join(root, entry.name);
    const index = readdirSync(dir).find((f) => /^index\.(md|html)$/.test(f));
    if (!index) {
      warnings.push(`${dir}: dossier sans index.md, rien n'y est publié`);
      continue;
    }
    const file = join(dir, index);

    let fm, body;
    try {
      ({fm, body} = parse(file));
    } catch (e) {
      errors.push(`${file}: ${e.message}`);
      continue;
    }
    // Expired entries are not built by Hugo
    if (fm.expirydate && new Date(fm.expirydate) < new Date()) continue;

    for (const key of ["title", "date", "url"]) {
      if (!fm[key]) errors.push(`${file}: champ « ${key} » manquant`);
    }
    if (fm.date && Number.isNaN(new Date(fm.date).getTime())) {
      errors.push(`${file}: date invalide « ${fm.date} » (format attendu : AAAA-MM-JJ)`);
    }
    if ("draft" in fm && typeof fm.draft !== "boolean") {
      errors.push(`${file}: « draft » doit valoir true ou false`);
    }
    if (fm.tags && !Array.isArray(fm.tags)) {
      errors.push(`${file}: « tags » doit être une liste`);
    }
    if (fm.cover && !existsSync(join(dir, fm.cover))) {
      errors.push(`${file}: image de couverture « ${fm.cover} » absente du dossier`);
    }
    if (section === "blog" && fm.url) {
      const iso = fm.date instanceof Date ? fm.date.toISOString() : String(fm.date);
      const day = /^\d{4}-\d{2}-\d{2}/.test(iso) ? iso.slice(0, 10).replaceAll("-", "/") : null;
      if (!/^\/\d{4}\/\d{2}\/\d{2}\/[\w-]+\/$/.test(fm.url)) {
        errors.push(`${file}: url « ${fm.url} » invalide (format attendu : /AAAA/MM/JJ/slug/)`);
      } else if (day && !fm.url.startsWith(`/${day}/`)) {
        warnings.push(`${file}: la date de l'url « ${fm.url} » ne correspond pas au champ date (${day})`);
      }
    }
    if (fm.url) {
      if (urls.has(fm.url)) errors.push(`${file}: url « ${fm.url} » déjà utilisée par ${urls.get(fm.url)}`);
      else urls.set(fm.url, file);
    }
    for (const tag of Array.isArray(fm.tags) ? fm.tags : []) {
      const key = String(tag).toLowerCase();
      if (!tags.has(key)) tags.set(key, new Map());
      const spellings = tags.get(key);
      spellings.set(String(tag), (spellings.get(String(tag)) || 0) + 1);
    }
    for (const [, src] of body.matchAll(RELATIVE_IMAGE)) {
      errors.push(`${file}: image « ${src} » en chemin relatif, utiliser ${fm.url || "/<url de la page>/"}${src}`);
    }

    for (const f of readdirSync(dir)) {
      const size = statSync(join(dir, f)).size;
      if (IMAGE_EXT.test(f) && size > MAX_IMAGE_BYTES) {
        warnings.push(`${relative(".", join(dir, f))}: image de ${(size / 1048576).toFixed(1)} Mo, à compresser (< 1 Mo)`);
      }
    }
  }
}

if (process.argv.includes("--tags")) {
  const all = [...tags.values()].flatMap((spellings) => [...spellings]).sort((a, b) => b[1] - a[1]);
  for (const [tag, count] of all) console.log(`${String(count).padStart(3)}  ${tag}`);
  process.exit(0);
}

for (const spellings of tags.values()) {
  if (spellings.size > 1) {
    warnings.push(`tag écrit de plusieurs façons : ${[...spellings.keys()].join(" / ")} (réutiliser l'orthographe existante)`);
  }
}

for (const w of warnings) console.warn(`⚠ ${w}`);
for (const e of errors) console.error(`✖ ${e}`);
console.log(`${errors.length} erreur(s), ${warnings.length} avertissement(s)`);
process.exit(errors.length ? 1 : 0);
