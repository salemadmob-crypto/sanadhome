const fs = require("fs");
const path = require("path");

const BASE_URL = "https://www.sanadhome.com";
const CONTENT_PATH = path.join(__dirname, "../content");
const OUTPUT_PATH = path.join(__dirname, "../public/sitemap.xml");

function getMarkdownSlugs(dirPath) {
  const langs = fs.readdirSync(dirPath);
  const result = [];

  langs.forEach((lang) => {
    const files = fs.readdirSync(path.join(dirPath, lang));
    files.forEach((file) => {
      if (file.endsWith(".md")) {
        const slug = file.replace(".md", "");
        result.push({ lang, slug });
      }
    });
  });

  return result;
}

const articles = getMarkdownSlugs(path.join(CONTENT_PATH, "articles"));
const services = getMarkdownSlugs(path.join(CONTENT_PATH, "services"));

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

const staticPages = [
  "",
  "about",
  "contact",
  "services",
  "articles",
  "faq",
  "privacy",
];

staticPages.forEach((slug) => {
  ["ar", "en"].forEach((lang) => {
    sitemap += `  <url>\n    <loc>${BASE_URL}/${lang}/${slug}</loc>\n    <priority>0.8</priority>\n  </url>\n`;
  });
});

articles.forEach(({ lang, slug }) => {
  sitemap += `  <url>\n    <loc>${BASE_URL}/${lang}/articles/${slug}</loc>\n    <priority>0.7</priority>\n  </url>\n`;
});

services.forEach(({ lang, slug }) => {
  sitemap += `  <url>\n    <loc>${BASE_URL}/${lang}/services/${slug}</loc>\n    <priority>0.7</priority>\n  </url>\n`;
});

sitemap += `</urlset>`;

fs.writeFileSync(OUTPUT_PATH, sitemap);
console.log("✅ Sitemap generated at: public/sitemap.xml");
