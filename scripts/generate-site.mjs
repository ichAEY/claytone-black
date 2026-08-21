import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import site from "../site-data.mjs";

const root = process.cwd();

function readCommitted(path) {
  try {
    return execFileSync("git", ["show", `HEAD:${path}`], { cwd: root, encoding: "utf8" });
  } catch (error) {
    throw new Error(`Cannot read committed template ${path}. Run this inside the cloned Git repository.\n${error.message}`);
  }
}

function replaceRequired(source, from, to, label = from) {
  if (!source.includes(from)) {
    throw new Error(`Template marker not found: ${label}`);
  }
  return source.split(from).join(to);
}

function replaceRequiredRegex(source, pattern, replacement, label) {
  if (!pattern.test(source)) {
    throw new Error(`Template block not found: ${label}`);
  }
  pattern.lastIndex = 0;
  return source.replace(pattern, replacement);
}

const ts = (value) => JSON.stringify(value, null, 2);
const brand = site.brand.name;
const name = site.master.name;
const dative = site.master.dative || name;
const genitive = site.master.genitive || name;
const profession = site.master.profession.replace(/^мастер\s+/i, "");
const city = site.location.city;
const metro = site.location.metro;
const scheduleMatch = site.location.schedule.match(/(\d{1,2}):(\d{2}).*?(\d{1,2}):(\d{2})/);
const openMinutes = scheduleMatch ? Number(scheduleMatch[1]) * 60 + Number(scheduleMatch[2]) : 10 * 60;
const closeMinutes = scheduleMatch ? Number(scheduleMatch[3]) * 60 + Number(scheduleMatch[4]) : 22 * 60;
const openLabel = scheduleMatch ? `${scheduleMatch[1].padStart(2, "0")}:${scheduleMatch[2]}` : "10:00";
const closeLabel = scheduleMatch ? `${scheduleMatch[3].padStart(2, "0")}:${scheduleMatch[4]}` : "22:00";

function buildMobileSource() {
  let source = readCommitted("app/mobile-claytone.tsx");

  const dataBlock = `const bookingUrl = ${ts(site.links.bookingUrl)};
const reviewsUrl = ${ts(site.links.reviewsUrl)};
const mapUrl = ${ts(site.links.mapUrl)};
const routeUrl = ${ts(site.links.routeUrl)};
const mobileMapEmbedUrl = ${ts(site.links.mobileMapEmbedUrl)};
const desktopMapEmbedUrl = ${ts(site.links.desktopMapEmbedUrl)};
const personalTelegramUrl = ${ts(site.contacts.personalTelegramUrl)};
const channelTelegramUrl = ${ts(site.contacts.channelTelegramUrl)};

const manicure: Service[] = ${ts(site.services.manicure)};

const pedicure: Service[] = ${ts(site.services.pedicure)};

const beforeAfter = ${ts(site.images.beforeAfter)};

const galleryWorks = ${ts(site.images.gallery)};

const desktopGalleryModules = [galleryWorks.slice(0, 4), galleryWorks.slice(4, 8), galleryWorks.slice(8)];
const desktopGallerySetCount = 3;

const featuredWorks = galleryWorks.slice(0, 3);
const lightboxItems = [...beforeAfter, ...galleryWorks];

const reviews = ${ts(site.reviews)};

const reviewSetCount = 5;

const promotions = ${ts(site.promotions)};
`;

  source = replaceRequiredRegex(
    source,
    /const bookingUrl = [\s\S]*?(?=const paletteSamples = \[)/,
    `${dataBlock}\n`,
    "customer data block",
  );

  source = replaceRequired(source, 'label: "Ежедневно 10:00–22:00"', `label: ${ts(site.location.scheduleCapitalized)}`, "default working hours");
  source = replaceRequired(source, "const isOpen = minuteOfDay >= 10 * 60 && minuteOfDay < 22 * 60;", `const isOpen = minuteOfDay >= ${openMinutes} && minuteOfDay < ${closeMinutes};`, "open/closed calculation");
  source = replaceRequired(source, 'label: isOpen ? "Открыто до 22:00" : "Закрыто до 10:00"', `label: isOpen ? ${ts(`Открыто до ${closeLabel}`)} : ${ts(`Закрыто до ${openLabel}`)}`, "open/closed labels");

  const replacements = [
    ["<span>ClayTone</span>", `<span>${brand}</span>`],
    ["<small>Nail studio</small>", `<small>${site.brand.subtitle}</small>`],
    ['aria-label="ClayTone, наверх">ClayTone</a>', `aria-label="${brand}, наверх">${brand}</a>`],
    ['aria-label="Быстрые способы связи с ClayTone"', `aria-label="Быстрые способы связи с ${brand}"`],
    ['href="tel:+79054141088" aria-label="Позвонить Нонне по номеру +7 905 414-10-88"', `href="${site.contacts.phoneHref}" aria-label="Позвонить ${dative} по номеру ${site.contacts.phoneDisplay}"`],
    ["<strong>+7 905 414-10-88</strong>", `<strong>${site.contacts.phoneDisplay}</strong>`],
    ['aria-label="Написать Нонне в Telegram"', `aria-label="Написать ${dative} в Telegram"`],
    ['aria-label="Открыть ClayTone в Яндекс Картах"', `aria-label="Открыть ${brand} в Яндекс Картах"`],
    ["<span>Москва · м. Спортивная</span>", `<span>${site.location.cityMetro}</span>`],
    ["<span>+7 905 414-10-88</span>", `<span>${site.contacts.phoneDisplay}</span>`],
    ["<h1>Нонна — мастер <em>ногтевого сервиса</em></h1>", `<h1>${name} — мастер <em>${profession}</em></h1>`],
    ['<p className="mct-hero-copy">Маникюр, педикюр и наращивание с аккуратной обработкой, стерильными инструментами и вниманием к форме.</p>', `<p className="mct-hero-copy">${site.master.heroCopy}</p>`],
    ['<img src="/assets/nonna-portrait.jpeg" alt="Нонна, мастер ногтевого сервиса ClayTone" />', `<img src="${site.images.portrait}" alt="${name}, ${site.master.profession} ${brand}" />`],
    ['<div className="mct-stat"><strong>8</strong><span>лет опыта</span></div>', `<div className="mct-stat"><strong>${site.master.experienceYears}</strong><span>лет опыта</span></div>`],
    ['<div className="mct-stat"><strong>5,0 <i className="mct-stat-star">★</i></strong><span>рейтинг</span></div>', `<div className="mct-stat"><strong>${site.reputation.rating} <i className="mct-stat-star">★</i></strong><span>рейтинг</span></div>`],
    ['<div className="mct-stat"><strong>95</strong><span>оценок</span></div>', `<div className="mct-stat"><strong>${site.reputation.reviewCount}</strong><span>оценок</span></div>`],
    ['<div><p className="mct-section-kicker">Акции ClayTone</p>', `<div><p className="mct-section-kicker">Акции ${brand}</p>`],
    ["акции ClayTone. Листайте горизонтально.", `акции ${brand}. Листайте горизонтально.`],
    ['<div><p className="mct-section-kicker">О мастере</p><h2>Нонна — мастер<br />ClayTone</h2></div>', `<div><p className="mct-section-kicker">О мастере</p><h2>${name} — мастер<br />${brand}</h2></div>`],
    ['<span className="mct-about-monogram" aria-hidden="true">N</span>', `<span className="mct-about-monogram" aria-hidden="true">${site.master.monogram}</span>`],
    ['<img src="/assets/nonna-about.webp" alt="Нонна, мастер маникюра и педикюра ClayTone" loading="lazy" />', `<img src="${site.images.about}" alt="${name}, мастер маникюра и педикюра ${brand}" loading="lazy" />`],
    ['<div className="mct-about-experience" aria-label="Восемь лет опыта">', `<div className="mct-about-experience" aria-label="${site.master.experienceAria}">`],
    ["<strong>8</strong>", `<strong>${site.master.experienceYears}</strong>`],
    ['<p className="mct-about-lead">Я Нонна — дипломированный мастер маникюра и педикюра.</p>', `<p className="mct-about-lead">${site.master.aboutLead}</p>`],
    ["<p>Более восьми лет я работаю с разной длиной и формой ногтей: выполняю аккуратный маникюр, педикюр, укрепление и наращивание.</p>", `<p>${site.master.aboutParagraphs[0] || ""}</p>`],
    ["<p>Перед процедурой мы обсуждаем желаемый результат, подбираем форму и покрытие. Инструменты проходят обязательную стерилизацию, а работа строится без спешки и лишних процедур.</p>", `<p>${site.master.aboutParagraphs[1] || ""}</p>`],
    ['<ul className="mct-about-list"><li>Маникюр и педикюр</li><li>Наращивание и коррекция</li><li>Стерильные инструменты</li></ul>', `<ul className="mct-about-list">${site.master.skills.map((skill) => `<li>${skill}</li>`).join("")}</ul>`],
    ['aria-label="Удобства для визита в ClayTone"', `aria-label="Удобства для визита в ${brand}"`],
    ['<div className="mct-amenities-grid">\n              <article><strong>Наращивание</strong><span>Наращивание и коррекция ногтей</span></article>\n              <article><strong>Wi‑Fi</strong><span>Доступен во время процедуры</span></article>\n              <article><strong>Парковка рядом</strong><span>Можно приехать на автомобиле</span></article>\n            </div>', `<div className="mct-amenities-grid">\n              ${site.amenities.map((item) => `<article><strong>${item.title}</strong><span>${item.text}</span></article>`).join("\n              ")}\n            </div>`],
    ['<a className="mct-review-summary" href={reviewsUrl} target="_blank" rel="noopener noreferrer"><strong>5,0</strong><span>95 оценок<br />Все отзывы на Яндексе →</span></a>', `<a className="mct-review-summary" href={reviewsUrl} target="_blank" rel="noopener noreferrer"><strong>${site.reputation.rating}</strong><span>${site.reputation.reviewCount} оценок<br />Все отзывы на Яндексе →</span></a>`],
    ["Настоящие отзывы клиентов ClayTone.", `Настоящие отзывы клиентов ${brand}.`],
    ["напишите Нонне напрямую.", `напишите ${dative} напрямую.`],
    ['aria-label="Все способы связи с ClayTone"', `aria-label="Все способы связи с ${brand}"`],
    ['href="tel:+79054141088"', `href="${site.contacts.phoneHref}"`],
    ["<small>Нонне · +7 905 414-10-88</small>", `<small>${dative} · ${site.contacts.phoneDisplay}</small>`],
    ["<small>Написать Нонне</small>", `<small>Написать ${dative}</small>`],
    ['<p className="mct-visit-address">Москва, Кооперативная улица, 4, корп. 9<span>м. Спортивная · ежедневно 10:00–22:00</span></p>', `<p className="mct-visit-address">${site.location.address}<span>${metro} · ${site.location.schedule}</span></p>`],
    ['title="ClayTone на Яндекс Картах"', `title="${brand} на Яндекс Картах"`],
    ['title="Точка ClayTone на Яндекс Картах"', `title="Точка ${brand} на Яндекс Картах"`],
    ['aria-label="Построить маршрут до ClayTone в Яндекс Картах"', `aria-label="Построить маршрут до ${brand} в Яндекс Картах"`],
    ['aria-label="ClayTone, вернуться наверх">ClayTone</a>', `aria-label="${brand}, вернуться наверх">${brand}</a>`],
    ["<span>Маникюр и педикюр от Нонны · Москва</span>", `<span>Маникюр и педикюр от ${genitive} · ${city}</span>`],
    ['<span className="mct-sticky-icon dct-sticky-mobile-mark">C</span>', `<span className="mct-sticky-icon dct-sticky-mobile-mark">${site.brand.monogram}</span>`],
    ['aria-label="Галерея ClayTone"', `aria-label="Галерея ${brand}"`],
  ];

  for (const [from, to] of replacements) {
    source = replaceRequired(source, from, to);
  }

  return source;
}

function buildLayoutSource() {
  let source = readCommitted("app/layout.tsx");

  const metadata = `export const metadata: Metadata = {
  title: ${ts(site.seo.title)},
  description: ${ts(site.seo.description)},
  keywords: ${ts(site.seo.keywords)},
  alternates: { canonical: "/" },
  openGraph: {
    title: ${ts(site.seo.title)},
    description: ${ts(site.seo.description)},
    type: "website",
    locale: ${ts(site.seo.locale)},
    images: [${ts(site.images.portrait)}],
  },
  icons: {
    icon: ${ts(site.images.favicon)},
    shortcut: ${ts(site.images.favicon)},
  },
  other: { "codex-preview": "development" },
};`;

  source = replaceRequiredRegex(
    source,
    /export const metadata: Metadata = \{[\s\S]*?\n\};/,
    metadata,
    "metadata block",
  );

  source = source.split("111558185").join(site.analytics.yandexMetrikaId);
  source = replaceRequired(source, "Кооперативная улица, 4, корп. 9\\\\A Москва · м. Спортивная   ↗", `${site.location.mapCardAddress}\\\\A ${site.location.cityMetro}   ↗`, "map card address");
  source = replaceRequired(source, "yandex.ru/maps/org/claytone", site.links.yandexMapHrefMatch, "map selector");
  source = replaceRequired(source, 'content: "Москва · м. Спортивная";', `content: ${ts(site.location.cityMetro)};`, "map compact location");
  source = replaceRequired(
    source,
    'data-url="https://n962951.yclients.com/company/894717/personal/select-time"',
    `data-url="${site.links.bookingUrl}"`,
    "booking proxy URL",
  );
  source = replaceRequired(
    source,
    'src="//w962951.yclients.com/widgetJS"',
    `src="${site.links.bookingWidgetScriptUrl}"`,
    "booking widget script",
  );

  return source;
}

function buildEnhancementsSource() {
  let source = readCommitted("public/claytone-enhancements.js");
  source = replaceRequired(
    source,
    "    enhanceGalleryPhotos();\n    observeGalleryPhotos();\n    enhancePromotions();\n",
    "    // Visible customer photos are controlled by site-data.mjs.\n",
    "legacy runtime image overrides",
  );
  return source;
}

const mobile = buildMobileSource();
const layout = buildLayoutSource();
const enhancements = buildEnhancementsSource();

writeFileSync(resolve(root, "app/mobile-claytone.tsx"), mobile, "utf8");
writeFileSync(resolve(root, "app/layout.tsx"), layout, "utf8");
writeFileSync(resolve(root, "public/claytone-enhancements.js"), enhancements, "utf8");

console.log(`TANEM site data applied: ${site.master.name} / ${site.brand.name}`);
