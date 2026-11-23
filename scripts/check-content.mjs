// Sanity checks on editable content, run in CI before the Hugo build.
// Errors fail the build; warnings are only printed.
// --tags lists existing tags with their usage count.
// --write-allowlist records the risky HTML currently in content (technical review only).
import {readdirSync, readFileSync, writeFileSync, existsSync, statSync} from "node:fs";
import {join, relative} from "node:path";
import {createHash} from "node:crypto";
import yaml from "js-yaml";

const CONTENT = "site/content";
const SECTIONS = ["blog", "work"];
const MAX_IMAGE_BYTES = 1024 * 1024;
const IMAGE_EXT = /\.(png|jpe?g|webp|gif)$/i;
// <base href="/"> makes relative image paths resolve from the site root
const RELATIVE_IMAGE = /(?:\]\(|src=")(?!\/|https?:|#)([^)"\s]+\.(?:png|jpe?g|webp|gif|svg))/gi;

// Folders without code owner: anything merged there skips technical review
const EDITABLE_DIRS = ["site/content", "site/static/files", "site/static/images", "site/static/img"];
const EDITABLE_FILE = /\.(md|html|png|jpe?g|webp|gif|svg|avif|pdf|webm|mp4)$/i;
const IGNORED_FILE = /^(\.keep|\.gitkeep|\.DS_Store)$/;
const ALLOWLIST = "scripts/content-allowlist.json";
// Markup that runs code or loads third-party resources
const RISKY_HTML = new RegExp([
  String.raw`<(script|style|iframe|object|embed|frameset|frame|form|foreignObject)\b[\s\S]*?<\/\1\s*>`,
  String.raw`<(?:script|style|iframe|object|embed|frameset|frame|form|foreignObject|link|meta|base)\b[^>]*>`,
  String.raw`\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)`,
  String.raw`javascript:[^"'\s>)]*`,
].join("|"), "gi");
// Code samples are rendered as text, not executed
const CODE_SAMPLE = /^(```|~~~)[\s\S]*?^\1[^\S\n]*$|`[^`\n]+`/gm;

const errors = [];
const warnings = [];
const urls = new Map();
const tags = new Map();

function parse(file) {
  const text = readFileSync(file, "utf8");
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error("missing YAML frontmatter (--- block at the top of the file)");
  return {fm: yaml.load(match[1]) || {}, body: text.slice(match[0].length)};
}

for (const section of SECTIONS) {
  const root = join(CONTENT, section);
  for (const entry of readdirSync(root, {withFileTypes: true})) {
    if (!entry.isDirectory()) continue;
    const dir = join(root, entry.name);
    const index = readdirSync(dir).find((f) => /^index\.(md|html)$/.test(f));
    if (!index) {
      warnings.push(`${dir}: folder without index.md, nothing in it is published`);
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
      if (!fm[key]) errors.push(`${file}: missing "${key}" field`);
    }
    if (fm.date && Number.isNaN(new Date(fm.date).getTime())) {
      errors.push(`${file}: invalid date "${fm.date}" (expected YYYY-MM-DD)`);
    }
    if ("draft" in fm && typeof fm.draft !== "boolean") {
      errors.push(`${file}: "draft" must be true or false`);
    }
    if (fm.tags && !Array.isArray(fm.tags)) {
      errors.push(`${file}: "tags" must be a list`);
    }
    if (fm.cover && !existsSync(join(dir, fm.cover))) {
      errors.push(`${file}: cover image "${fm.cover}" not found in the folder`);
    }
    if (section === "blog" && fm.url) {
      const iso = fm.date instanceof Date ? fm.date.toISOString() : String(fm.date);
      const day = /^\d{4}-\d{2}-\d{2}/.test(iso) ? iso.slice(0, 10).replaceAll("-", "/") : null;
      if (!/^\/\d{4}\/\d{2}\/\d{2}\/[\w-]+\/$/.test(fm.url)) {
        errors.push(`${file}: invalid url "${fm.url}" (expected /YYYY/MM/DD/slug/)`);
      } else if (day && !fm.url.startsWith(`/${day}/`)) {
        warnings.push(`${file}: url "${fm.url}" does not match the date field (${day})`);
      }
    }
    if (fm.url) {
      if (urls.has(fm.url)) errors.push(`${file}: url "${fm.url}" already used by ${urls.get(fm.url)}`);
      else urls.set(fm.url, file);
    }
    for (const tag of Array.isArray(fm.tags) ? fm.tags : []) {
      const key = String(tag).toLowerCase();
      if (!tags.has(key)) tags.set(key, new Map());
      const spellings = tags.get(key);
      spellings.set(String(tag), (spellings.get(String(tag)) || 0) + 1);
    }
    for (const [, src] of body.matchAll(RELATIVE_IMAGE)) {
      errors.push(`${file}: relative image path "${src}", use ${fm.url || "/<page url>/"}${src}`);
    }

    for (const f of readdirSync(dir)) {
      const size = statSync(join(dir, f)).size;
      if (IMAGE_EXT.test(f) && size > MAX_IMAGE_BYTES) {
        warnings.push(`${relative(".", join(dir, f))}: ${(size / 1048576).toFixed(1)} MB image, compress it (< 1 MB)`);
      }
    }
  }
}

if (process.argv.includes("--tags")) {
  const all = [...tags.values()].flatMap((spellings) => [...spellings]).sort((a, b) => b[1] - a[1]);
  for (const [tag, count] of all) console.log(`${String(count).padStart(3)}  ${tag}`);
  process.exit(0);
}

function* walk(dir) {
  for (const entry of readdirSync(dir, {withFileTypes: true})) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (!IGNORED_FILE.test(entry.name)) yield path;
  }
}

function riskyHtml(file) {
  let text = readFileSync(file, "utf8");
  if (file.endsWith(".md")) text = text.replace(CODE_SAMPLE, (m) => m.replace(/[^\n]/g, " "));
  return [...text.matchAll(RISKY_HTML)].map((m) => {
    const snippet = m[0].replace(/\s+/g, " ").trim();
    return {
      hash: createHash("sha256").update(snippet).digest("hex").slice(0, 16),
      line: text.slice(0, m.index).split("\n").length,
      label: snippet.length > 50 ? `${snippet.slice(0, 50)}…` : snippet,
    };
  });
}

const found = {};
for (const root of EDITABLE_DIRS) {
  for (const file of walk(root)) {
    if (!EDITABLE_FILE.test(file)) {
      errors.push(`${file}: file type not allowed in content folders (needs a technical review)`);
    } else if (/\.(md|html|svg)$/i.test(file)) {
      const items = riskyHtml(file);
      if (items.length) found[file] = items;
    }
  }
}

if (process.argv.includes("--write-allowlist")) {
  const allowlist = Object.fromEntries(Object.entries(found).sort().map(([f, items]) => [f, items.map((i) => i.hash)]));
  writeFileSync(ALLOWLIST, JSON.stringify(allowlist, null, 2) + "\n");
  console.log(`${ALLOWLIST} written`);
  process.exit(0);
}

const allowlist = existsSync(ALLOWLIST) ? JSON.parse(readFileSync(ALLOWLIST, "utf8")) : {};
for (const [file, items] of Object.entries(found)) {
  const allowed = [...(allowlist[file] || [])];
  for (const item of items) {
    const i = allowed.indexOf(item.hash);
    if (i >= 0) {
      allowed.splice(i, 1);
      continue;
    }
    errors.push(`${file}:${item.line}: "${item.label}" can run code or load third-party resources, ` +
      `content cannot contain it without a technical review (see ${ALLOWLIST})`);
  }
}

for (const spellings of tags.values()) {
  if (spellings.size > 1) {
    warnings.push(`tag spelled several ways: ${[...spellings.keys()].join(" / ")} (reuse the existing spelling)`);
  }
}

for (const w of warnings) console.warn(`⚠ ${w}`);
for (const e of errors) console.error(`✖ ${e}`);
console.log(`${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
