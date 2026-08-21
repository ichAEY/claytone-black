import fs from "node:fs";
import path from "node:path";

const siteDir = path.resolve(process.argv[2] || "site");
const repository = process.env.GITHUB_REPOSITORY || "ichAEY/claytone-black";
const repoName = repository.split("/").pop() || "claytone-black";
const customDomain = process.env.CLAYTONE_CUSTOM_DOMAIN === "true";
const basePath = customDomain ? "" : `/${repoName}`;

function walk(dir, visitor) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, visitor);
    else visitor(fullPath);
  }
}

const layoutPath = path.join(siteDir, "app", "layout.tsx");
let layout = fs.readFileSync(layoutPath, "utf8");
let layoutChanged = false;

const darkImport = 'import "./dark-theme.css";';
const polishImport = 'import "./dark-theme-polish.css";';

if (!layout.includes(darkImport)) {
  const anchor = 'import "./android-scroll-safety.css";';
  if (!layout.includes(anchor)) {
    throw new Error("Could not find the final production CSS import in app/layout.tsx");
  }
  layout = layout.replace(anchor, `${anchor}\n${darkImport}`);
  layoutChanged = true;
}

if (!layout.includes(polishImport)) {
  if (!layout.includes(darkImport)) {
    throw new Error("Could not find dark-theme.css import in app/layout.tsx");
  }
  layout = layout.replace(darkImport, `${darkImport}\n${polishImport}`);
  layoutChanged = true;
}

if (layoutChanged) fs.writeFileSync(layoutPath, layout);

const nextConfigPath = path.join(siteDir, "next.config.ts");
const nextConfig = `import type { NextConfig } from "next";\n\nconst basePath = ${JSON.stringify(basePath)};\n\nconst nextConfig: NextConfig = {\n  output: "export",\n  trailingSlash: true,\n  images: { unoptimized: true },\n  ...(basePath ? { basePath, assetPrefix: basePath } : {}),\n};\n\nexport default nextConfig;\n`;
fs.writeFileSync(nextConfigPath, nextConfig);

if (basePath) {
  const appDir = path.join(siteDir, "app");
  const textExtensions = new Set([".tsx", ".ts", ".css", ".js", ".mjs"]);

  walk(appDir, (filePath) => {
    if (!textExtensions.has(path.extname(filePath))) return;
    if (filePath.endsWith("dark-theme.css") || filePath.endsWith("dark-theme-polish.css")) return;

    const original = fs.readFileSync(filePath, "utf8");
    let updated = original
      .replace(/(["'`])\/assets\//g, `$1${basePath}/assets/`)
      .replace(/url\((['"]?)\/assets\//g, `url($1${basePath}/assets/`);

    if (updated !== original) fs.writeFileSync(filePath, updated);
  });
}

console.log(`Prepared ClayTone Black with basePath: ${basePath || "/"}`);