/* ------------------------------------------------------------------
 * Phương Phú Phát – static site generator
 * Chạy:  node tools/build.js
 * Nguồn nội dung: tools/data.json  (đã trích xuất từ website cũ)
 * Kết quả: các file .html tĩnh ở thư mục gốc dự án
 * ------------------------------------------------------------------ */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IMG_DIR = path.join(ROOT, 'images');
const DATA = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));
const SITE_URL = 'https://phuongphuphat.com';
const ZALO_URL = 'https://zalo.me/0902953318';

/* ============ SITE INFO ============ */
const SITE = {
  name: 'CÔNG TY TNHH SX TM DV PHƯƠNG PHÚ PHÁT',
  short: 'Phương Phú Phát',
  tagline: 'Vật tư đóng gói & đai kiện hàng hóa',
  hotline1: '0902 953 318',
  hotline1Label: '0902 95 33 18 (Ms Phương)',
  hotline2: '0908 825 471',
  hotline2Label: '0908 825 471 (Mr Phú)',
  email: 'phuongphuphat090620@gmail.com',
  address: 'Số 32, Tổ 14, Ấp 3, xã Tam An, Huyện Long Thành, Tỉnh Đồng Nai',
  addressShort: 'Số 32, Tổ 14, Ấp 3, xã Tam An, Long Thành, Đồng Nai',
  tax: '3603728556',
  logo: 'images/logo_final-1.png',
  logoIcon: 'images/logo-icon.png',
  map: 'https://www.google.com/maps?q=10.803359,106.910812&z=16&hl=vi&output=embed',
  geo: { lat: 10.803359, lng: 106.910812 },
};

/* ============ CATEGORY META ============ */
const CATS = {
  'mang-pe-bang-keo': {
    name: 'Màng PE – Băng Keo',
    short: 'Màng PE, túi PE, màng cuộn & băng keo đóng gói',
    desc: 'Màng PE, màng co, màng chít, túi nilon PE, màng cuộn 2 lớp và băng keo các loại phục vụ đóng gói, quấn pallet và bảo quản hàng hóa.',
    image: 'images/PE-2.jpg',
  },
  'day-dai': {
    name: 'Dây đai',
    short: 'Dây đai Composite, thép, nhựa PP & PET',
    desc: 'Các loại dây đai đóng gói: dây đai Composite, dây đai thép, dây đai nhựa PP, dây đai nhựa PET và dây PP đai tay, đáp ứng mọi trọng tải hàng hóa.',
    image: 'images/DAY-DAI-THEP-XOA-LOGO-2.jpg',
  },
  'khoa-dai': {
    name: 'Khóa đai',
    short: 'Khóa đai sắt & khóa đai Composite',
    desc: 'Khóa đai sắt và khóa đai Composite chất lượng cao, hỗ trợ cố định dây đai chắc chắn trong quá trình đai kiện hàng hóa.',
    image: 'images/KHOA-COMPOSITE-2.jpg',
  },
  'day-cap': {
    name: 'Dây cáp',
    short: 'Dây cáp thép, ốc cáp & tăng đưa',
    desc: 'Dây cáp thép chịu lực, ốc cáp thép và tăng đưa phục vụ tàu thuyền, máy xúc, ngành dầu khí, cáp dự ứng lực và cáp cẩu.',
    image: 'images/CAP-LOI-BO-6-X36-1.jpg',
  },
  'nep-goc': {
    name: 'Nẹp góc',
    short: 'Nẹp góc giấy & nẹp góc nhựa',
    desc: 'Nẹp góc giấy và nẹp góc nhựa giúp bảo vệ góc cạnh hàng hóa, chống va đập và cố định pallet trong vận chuyển.',
    image: 'images/f351a06b23b6dee887a7.jpg',
  },
  'bao-tay-phu-kien': {
    name: 'Bao tay – phụ kiện',
    short: 'Dụng cụ đóng đai, dây cẩu dù, bao tay len',
    desc: 'Dụng cụ đóng đai, dây tăng đơ vải, dây cẩu dù và bao tay len – các phụ kiện hỗ trợ đắc lực cho công tác đóng gói và vận chuyển.',
    image: 'images/0608ab6da8b455ea0ca5.jpg',
  },
};

const CAT_ORDER = Object.keys(CATS);

/* product slug -> category slug */
const PRODUCT_CAT = {};
CAT_ORDER.forEach((c) => DATA.categories[c].forEach((p) => { PRODUCT_CAT[p] = c; }));

/* ============ NAV ============ */
const NAV = [
  { label: 'Trang chủ', url: 'index.html', key: 'home', icon: 'home' },
  { label: 'Màng PE – Băng Keo', cat: 'mang-pe-bang-keo', icon: 'roll' },
  { label: 'Dây đai', cat: 'day-dai', icon: 'belt' },
  { label: 'Khóa đai', cat: 'khoa-dai', icon: 'lock' },
  { label: 'Dây cáp', cat: 'day-cap', icon: 'wave' },
  { label: 'Nẹp góc', cat: 'nep-goc', icon: 'corner' },
  { label: 'Bao tay – phụ kiện', cat: 'bao-tay-phu-kien', icon: 'shield' },
  { label: 'Giới thiệu', url: 'gioi-thieu.html', key: 'gioi-thieu', icon: 'users' },
  { label: 'Tin Tức', url: 'tin-tuc.html', key: 'tin-tuc', icon: 'news' },
];

const MENU_HIDDEN = new Set();
const SUB_LABELS = {
  'mang-pe': 'Màng PE',
  'tui-pe': 'Túi PE (Túi Nylon)',
  'mang-pe-cuon-2-lop': 'PE Cuộn',
  'bang-keo': 'Băng Keo',
};
const subLabel = (slug) => SUB_LABELS[slug] || DATA.products[slug].title;

/* ============ ICONS ============ */
const ICONS = {
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  map: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  box: '<path d="M21 8 12 3 3 8v8l9 5 9-5V8z"/><path d="m3 8 9 5 9-5"/><path d="M12 13v8"/>',
  layers: '<path d="m12 2 9 5-9 5-9-5 9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
  tag: '<path d="M20.59 13.41 12 22l-9-9V3h10l7.59 7.59a2 2 0 0 1 0 2.82z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  headset: '<path d="M3 14v-3a9 9 0 0 1 18 0v3"/><path d="M21 16a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2z"/><path d="M3 16a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2z"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  truck: '<path d="M14 17V5a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1"/><path d="M14 9h4l3 3v4a1 1 0 0 1-1 1h-1"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><path d="M9 18h6"/>',
  factory: '<path d="M2 20h20"/><path d="M4 20V9l5 3V9l5 3V9l5 3v8"/><path d="M8 20v-4h4v4"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9.5" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  zalo: '<path d="M12 2a10 10 0 1 0 4.6 18.9L21 22l-1.1-4.4A10 10 0 0 0 12 2z"/><path d="M9.2 9.6h5.4l-5.4 4.8h5.4"/>',
  youtube: '<path d="M22 8.6a3 3 0 0 0-2.1-2.1C18.2 6 12 6 12 6s-6.2 0-7.9.5A3 3 0 0 0 2 8.6 31 31 0 0 0 2 12a31 31 0 0 0 .1 3.4 3 3 0 0 0 2.1 2.1C5.8 18 12 18 12 18s6.2 0 7.9-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.1-3.4z"/><path d="m10 15 5-3-5-3z"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  quote: '<path d="M10 11H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6a6 6 0 0 1-6 6"/><path d="M22 11h-4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6a6 6 0 0 1-6 6"/>',
  ract: '<path d="M4 4h16v16H4z"/><path d="m4 9 8 5 8-5"/>',
  price: '<line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  star: '<path d="m12 2 3 6.5 7 .9-5 4.8 1.2 7L12 18l-6.2 3.2L7 13.2 2 8.4l7-.9z"/>',
  zap: '<path d="M13 2 3 14h8l-1 8 10-12h-8z"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  roll: '<rect x="5" y="4" width="14" height="16" rx="3"/><path d="M12 4v16"/><path d="M9 9h.5M15 9h-.5M9 15h.5M15 15h-.5"/>',
  belt: '<rect x="3" y="9" width="18" height="6" rx="1.5"/><path d="M8 9v6M13 9v6M18 9v6"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  wave: '<path d="M3 9c3 0 3 6 6 6s3-6 6-6 3 6 6 6"/><path d="M3 15c3 0 3-6 6-6"/>',
  corner: '<path d="M6 3v14a1 1 0 0 0 1 1h14"/><path d="M6 7h4M10 18v-4"/>',
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
  news: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h6"/><path d="M15 8h2"/><path d="M7 12h10"/><path d="M7 16h10"/>',
};
function icon(name, cls) {
  const p = ICONS[name] || '';
  return `<svg class="${cls || ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
}

/* ============ HELPERS ============ */
function esc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function imgExists(name) { return fs.existsSync(path.join(IMG_DIR, name)); }

/* Drop broken image tags and empty paragraphs left over from the old site */
function cleanContent(html) {
  if (!html) return '';
  let out = html.replace(/\s(?:data-)?srcset="[^"]*"/g, '').replace(/\ssizes="[^"]*"/g, '');
  // remove old theme share widget + leftover icon-only blocks
  out = out.replace(/<div class="blog-share[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, '');
  out = out.replace(/<div class="blog-share[\s\S]*$/g, '');
  // unwrap anchors pointing at images that no longer exist
  out = out.replace(/<a\b[^>]*href="images\/([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, (m, img, inner) => (imgExists(img) ? m : inner));
  // drop broken image tags
  out = out.replace(/<img\b[^>]*>/g, (tag) => {
    const m = tag.match(/src="images\/([^"]+)"/);
    if (!m || !imgExists(m[1])) return '';
    return tag.replace(/\s*\/?>$/, ' />');
  });
  out = out.replace(/<figure[^>]*>\s*<\/figure>/g, '');
  out = out.replace(/<p>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/g, '');
  out = out.replace(/\s{2,}/g, ' ');
  return out.trim();
}

/* prefix image paths inside stored content according to page depth */
function contentHtml(html, depth, defaultAlt) {
  const p = depth ? '../'.repeat(depth) : '';
  let out = String(html || '').replace(/(src|data-full)="images\//g, `$1="${p}images/`);
  if (defaultAlt) {
    out = out.replace(/<img\b(?![^>]*\balt=)[^>]*>/g, (tag) => tag.replace(/^(<img\b)/, `$1 alt="${esc(defaultAlt)}"`));
  }
  return out;
}

/* plain text excerpt */
function excerpt(html, len) {
  return String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/gi, ' ')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, len || 150) + '…';
}

/* Title tag: keep between 30 and 60 characters, dropping least important parts */
function seoTitle(parts) {
  const clean = parts.filter(Boolean);
  const full = clean.join(' – ');
  if (full.length <= 60) {
    if (full.length >= 30) return full;
    const withKeyword = `${full} – Vật tư đóng gói`;
    return withKeyword.length <= 60 ? withKeyword : full;
  }
  for (let i = clean.length - 1; i >= 1; i--) {
    const cand = clean.slice(0, i).join(' – ');
    if (cand.length >= 30 && cand.length <= 60) return cand;
  }
  const head = clean[0];
  return `${head.slice(0, 57).replace(/\s\S*$/, '')}…`;
}

const VI_MONTHS = { 'Một': 1, 'Hai': 2, 'Ba': 3, 'Tư': 4, 'Năm': 5, 'Sáu': 6, 'Bảy': 7, 'Tám': 8, 'Chín': 9, 'Mười': 10, 'Mười Một': 11, 'Mười Hai': 12 };

/* "27 Tháng Sáu, 2020" -> "2020-06-27" (ISO 8601 cho schema) */
function viDateToIso(s) {
  const m = String(s || '').match(/(\d{1,2})\s*Tháng\s*(Mười Hai|Mười Một|Mười|Một|Hai|Ba|Tư|Năm|Sáu|Bảy|Tám|Chín)\s*,?\s*(\d{4})/);
  if (!m) return null;
  const mo = VI_MONTHS[m[2]];
  if (!mo) return null;
  return `${m[3]}-${String(mo).padStart(2, '0')}-${String(m[1]).padStart(2, '0')}`;
}

const written = [];
function writePage(relPath, html) {
  const full = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html);
  written.push(relPath);
}

/* BreadcrumbList schema from the same crumbs used by the visible breadcrumb */
function breadcrumbSchema(activeCat, crumbs, canonical) {
  const items = [{ name: 'Trang chủ', url: `${SITE_URL}/` }];
  if (activeCat && CATS[activeCat]) items.push({ name: CATS[activeCat].name, url: `${SITE_URL}/san-pham/${activeCat}.html` });
  crumbs.forEach((c) => {
    const url = c.url ? `${SITE_URL}/${c.url}` : `${SITE_URL}/${canonical || ''}`;
    if (items.some((i) => i.name === c.label)) return;
    items.push({ name: c.label, url });
  });
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((i, idx) => ({ '@type': 'ListItem', position: idx + 1, name: i.name, item: i.url })),
  };
}

/* ============ LAYOUT ============ */
function head({ title, desc, canonical, depth, image, type, schema, activeCat, crumbs }) {
  const p = depth ? '../'.repeat(depth) : '';
  const img = image || SITE.logo;
  const url = `${SITE_URL}/${canonical || ''}`;
  const schemas = [{
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE.name,
    alternateName: SITE.short,
    image: SITE_URL + '/' + SITE.logo,
    url: `${SITE_URL}/`,
    telephone: [SITE.hotline1, SITE.hotline2],
    email: SITE.email,
    taxID: SITE.tax,
    sameAs: [ZALO_URL],
    address: { '@type': 'PostalAddress', streetAddress: 'Số 32, Tổ 14, Ấp 3, xã Tam An', addressLocality: 'Long Thành', addressRegion: 'Đồng Nai', addressCountry: 'VN' },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '07:30', closes: '17:30' },
  }];
  if (crumbs && crumbs.length) schemas.push(breadcrumbSchema(activeCat, crumbs, canonical));
  if (schema) (Array.isArray(schema) ? schema : [schema]).forEach((s) => schemas.push(s));
  const jsonLd = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas, null, 2);
  return `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="keywords" content="Phương Phú Phát, màng PE, dây đai, khóa đai, dây cáp thép, nẹp góc, băng keo, vật tư đóng gói, đai kiện hàng hóa">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="author" content="${esc(SITE.short)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="vi" href="${url}">
<meta property="og:type" content="${type || 'website'}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${SITE_URL}/${img}">
<meta property="og:image:alt" content="${esc(title)}">
<meta property="og:locale" content="vi_VN">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${SITE_URL}/${img}">
<meta name="twitter:image:alt" content="${esc(title)}">
<link rel="icon" type="image/png" href="${p}${SITE.logoIcon}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${p}css/style.css">
<script type="application/ld+json">
${jsonLd}
</script>
</head>
<body>`;
}

function navItems(depth, active) {
  const p = depth ? '../'.repeat(depth) : '';
  return NAV.map((item) => {
    if (item.cat) {
      const url = p + 'san-pham/' + item.cat + '.html';
      const activeCls = active === item.cat ? ' is-active' : '';
      const badge = item.badge ? `<span class="nav-badge">${esc(item.badge)}</span>` : '';
      const ico = item.icon ? `<span class="nav-ico">${icon(item.icon)}</span>` : '';
      const subs = DATA.categories[item.cat].filter((slug) => !MENU_HIDDEN.has(slug)).map((slug) =>
        `<li><a class="with-thumb" href="${p}san-pham/${slug}.html"><img src="${p}${productImage(slug)}" alt="" loading="lazy"><span>${esc(subLabel(slug))}</span></a></li>`).join('');
      return `<li class="nav-item">
        <a class="nav-link${activeCls}" href="${url}" aria-haspopup="true">${ico}${esc(item.label)}${badge}</a>
        <ul class="dropdown">
          ${subs}
        </ul>
      </li>`;
    }
    const activeCls = active === item.key ? ' is-active' : '';
    const ico = item.icon ? `<span class="nav-ico">${icon(item.icon)}</span>` : '';
    return `<li class="nav-item"><a class="nav-link${activeCls}" href="${p}${item.url}">${ico}${esc(item.label)}</a></li>`;
  }).join('\n');
}

function header(depth, active) {
  const p = depth ? '../'.repeat(depth) : '';
  return `<div class="header-topbar">
  <div class="container header-top-inner">
    <a class="brand-top" href="${p}index.html" aria-label="${esc(SITE.name)}">
      <img src="${p}${SITE.logo}" alt="${esc(SITE.name)}">
      <span class="brand-text"><b>PHƯƠNG PHÚ PHÁT</b><span>Sản xuất – Thương mại – Dịch vụ</span></span>
    </a>
    <div class="header-top-cta">
      <a class="header-link" href="${p}lien-he.html" aria-label="Liên hệ">
        <span class="ico">${icon('mail')}</span>
        <span><small>Liên hệ</small><b>Liên hệ báo giá</b></span>
      </a>
      <a class="header-phone" href="tel:${SITE.hotline1.replace(/\s/g, '')}">
        <span class="ico">${icon('phone')}</span>
        <span><small>Hotline Ms Phương</small><b>${SITE.hotline1}</b></span>
      </a>
      <a class="header-phone header-phone--sm" href="tel:${SITE.hotline2.replace(/\s/g, '')}">
        <span class="ico">${icon('phone')}</span>
        <span><small>Hotline Mr Phú</small><b>${SITE.hotline2}</b></span>
      </a>
      <button class="nav-toggle" type="button" aria-label="Mở menu">${icon('menu')}</button>
    </div>
  </div>
</div>
<header class="site-header">
  <div class="container header-inner">
    <nav class="nav" aria-label="Menu chính">
      <span class="nav-indicator" aria-hidden="true"></span>
      <ul class="nav-list">
${navItems(depth, active)}
      </ul>
    </nav>
  </div>
</header>`;
}

function mobileNav(depth, active) {
  const p = depth ? '../'.repeat(depth) : '';
  return `<div class="overlay" data-close-nav></div>
<aside class="mobile-nav" aria-label="Menu di động">
  <div class="mobile-nav-head">
    <img src="${p}${SITE.logo}" alt="${esc(SITE.name)}">
    <button class="mobile-nav-close" type="button" data-close-nav aria-label="Đóng menu">${icon('x')}</button>
  </div>
  <div class="mobile-nav-body">
    <a href="${p}index.html"><span class="nav-ico">${icon('home')}</span>Trang chủ</a>
${NAV.filter((i) => i.cat).map((item) => {
    const subs = DATA.categories[item.cat].filter((slug) => !MENU_HIDDEN.has(slug)).map((slug) =>
      `<a class="with-thumb" href="${p}san-pham/${slug}.html"><img src="${p}${productImage(slug)}" alt="" loading="lazy"><span>${esc(subLabel(slug))}</span></a>`).join('');
    const ico = item.icon ? `<span class="nav-ico">${icon(item.icon)}</span>` : '';
    const badge = item.badge ? `<span class="nav-badge">${esc(item.badge)}</span>` : '';
    return `<div class="m-group">
      <a href="${p}san-pham/${item.cat}.html">${ico}${esc(item.label)}${badge}${icon('chevron', 'chev')}</a>
      <div class="m-sub">${subs}</div>
    </div>`;
  }).join('\n')}
    <a href="${p}gioi-thieu.html"><span class="nav-ico">${icon('users')}</span>Giới thiệu</a>
    <a href="${p}tin-tuc.html"><span class="nav-ico">${icon('news')}</span>Tin Tức</a>
  </div>
  <div class="mobile-nav-cta">
    <a class="btn btn--accent btn--block" href="tel:${SITE.hotline1.replace(/\s/g, '')}">${icon('phone')} Gọi ${SITE.hotline1}</a>
    <a class="btn btn--outline btn--block" href="${p}lien-he.html">Nhận báo giá</a>
  </div>
</aside>`;
}

function footer(depth) {
  const p = depth ? '../'.repeat(depth) : '';
  const catLinks = CAT_ORDER.map((c) =>
    `<a href="${p}san-pham/${c}.html">${esc(CATS[c].name)}</a>`).join('');
  return `<footer class="site-footer">
  <div class="container footer-top">
    <div class="footer-col footer-about">
      <div class="footer-brand">
        <img src="${p}${SITE.logo}" alt="${esc(SITE.name)}">
        <span><b>PHƯƠNG PHÚ PHÁT</b><span>Sản xuất – TM – DV</span></span>
      </div>
      <p>Chuyên cung cấp vật tư đóng gói, dây đai, khóa đai, cáp thép và phụ kiện đai kiện hàng hóa cho mọi ngành sản xuất – vận tải.</p>
      <ul class="footer-contact">
        <li>${icon('map')}<span>${esc(SITE.address)}</span></li>
        <li>${icon('phone')}<span><a href="tel:${SITE.hotline1.replace(/\s/g, '')}">${SITE.hotline1}</a> (Ms Phương) – <a href="tel:${SITE.hotline2.replace(/\s/g, '')}">${SITE.hotline2}</a> (Mr Phú)</span></li>
        <li>${icon('mail')}<a href="mailto:${SITE.email}">${SITE.email}</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Danh mục sản phẩm</h4>
      <div class="footer-links">${catLinks}</div>
    </div>
    <div class="footer-col">
      <h4>Thông tin liên hệ</h4>
      <ul class="footer-hours">
        <li><span>Thứ 2 – Thứ 7</span><b>07:30 – 17:30</b></li>
        <li><span>Chủ nhật</span><b>Theo yêu cầu</b></li>
        <li><span>Hỗ trợ kỹ thuật</span><b>24/7</b></li>
        <li><span>MST</span><b>${SITE.tax}</b></li>
      </ul>
      <div class="footer-cert"><span>Uy tín</span><span>Chất lượng</span><span>Giá tốt</span></div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container">
      <span>© <span data-year>2024</span> ${esc(SITE.name)}. Tất cả quyền được bảo lưu.</span>
    </div>
  </div>
</footer>`;
}

function floating() {
  return `<div class="fab-stack">
  <a class="fab fab--zalo" href="https://zalo.me/0902953318" target="_blank" rel="noopener" aria-label="Chat Zalo">${icon('zalo')}</a>
  <a class="fab fab--phone" href="tel:${SITE.hotline1.replace(/\s/g, '')}" aria-label="Gọi điện">${icon('phone')}</a>
  <button class="fab fab--top" type="button" aria-label="Lên đầu trang">${icon('chevron')}</button>
</div>`;
}

function scripts(depth) {
  const p = depth ? '../'.repeat(depth) : '';
  return `<script src="${p}js/main.js"></script>
</body>
</html>`;
}

/* ============ COMPONENTS ============ */
function productImage(slug) {
  const pr = DATA.products[slug];
  if (pr.main && imgExists(pr.main)) return 'images/' + pr.main;
  const g = pr.gallery.find((x) => imgExists(x.name));
  if (g) return 'images/' + g.name;
  const c = CATS[PRODUCT_CAT[slug]];
  return (c && imgExists(c.image.replace('images/', ''))) ? c.image : 'images/logo_final-1.png';
}

function productCard(slug, depth) {
  const p = depth ? '../'.repeat(depth) : '';
  const pr = DATA.products[slug];
  const cat = CATS[PRODUCT_CAT[slug]];
  return `<article class="product-card reveal">
  <a class="product-card-media" href="${p}san-pham/${slug}.html">
    <img src="${p}${productImage(slug)}" alt="${esc(pr.title)}" loading="lazy">
    <span class="product-card-badge">Sẵn hàng</span>
  </a>
  <div class="product-card-body">
    <span class="product-card-cat">${esc(cat.name)}</span>
    <h3><a href="${p}san-pham/${slug}.html">${esc(pr.title)}</a></h3>
    <p>${esc(excerpt(pr.short || pr.desc, 90))}</p>
    <div class="product-card-foot">
      <span class="product-card-price">Liên hệ báo giá</span>
      <span class="product-card-more">${icon('arrow')}</span>
    </div>
  </div>
</article>`;
}

function catCard(catSlug, depth) {
  const p = depth ? '../'.repeat(depth) : '';
  const c = CATS[catSlug];
  const slugs = DATA.categories[catSlug];
  const tags = slugs.slice(0, 3).map((s) => `<a href="${p}san-pham/${s}.html">${esc(DATA.products[s].title)}</a>`).join('');
  return `<article class="cat-card reveal">
  <a class="cat-card-media" href="${p}san-pham/${catSlug}.html">
    <img src="${p}${c.image}" alt="${esc(c.name)}" loading="lazy">
    <span class="cat-card-count">${slugs.length} sản phẩm</span>
    <span class="cat-card-title">${esc(c.name)}</span>
  </a>
  <div class="cat-card-body">
    <p>${esc(c.desc)}</p>
    <div class="cat-card-tags">${tags}</div>
    <a class="cat-card-link" href="${p}san-pham/${catSlug}.html">Xem danh mục ${icon('arrow')}</a>
  </div>
</article>`;
}

function newsCard(post, depth) {
  const p = depth ? '../'.repeat(depth) : '';
  return `<article class="news-card reveal">
  <a class="news-card-media" href="${p}tin-tuc/${post.slug}.html">
    <img src="${p}${post.image}" alt="${esc(post.title)}" loading="lazy">
  </a>
  <div class="news-card-body">
    <span class="news-date">${icon('calendar')} ${esc(post.date)}</span>
    <h3><a href="${p}tin-tuc/${post.slug}.html">${esc(post.title)}</a></h3>
    <p>${esc(excerpt(post.excerpt, 130))}</p>
    <a class="news-read" href="${p}tin-tuc/${post.slug}.html">Đọc tiếp ${icon('arrow')}</a>
  </div>
</article>`;
}

function ctaBand(depth) {
  const p = depth ? '../'.repeat(depth) : '';
  return `<section class="cta-band section section--tight" style="--cta-img:url('${p}images/footer.jpg')">
  <div class="container cta-inner">
    <div>
      <h2>Bạn cần báo giá vật tư đóng gói?</h2>
      <p>Gửi yêu cầu cho Phương Phú Phát – chúng tôi tư vấn đúng chủng loại, báo giá nhanh và hỗ trợ giao nhận tận nơi.</p>
    </div>
    <div class="cta-actions">
      <a class="btn btn--accent btn--lg" href="tel:${SITE.hotline1.replace(/\s/g, '')}">${icon('phone')} ${SITE.hotline1}</a>
      <a class="btn btn--ghost btn--lg" href="${p}lien-he.html">Gửi yêu cầu</a>
    </div>
  </div>
</section>`;
}

function sidebar(depth, activeCat, activeSlug) {
  const p = depth ? '../'.repeat(depth) : '';
  const items = CAT_ORDER.map((c) => {
    const isActive = c === activeCat;
    const subs = isActive ? `<div class="subcat">${DATA.categories[c].map((s) => {
      const current = s === activeSlug;
      return `<a class="${current ? 'is-current' : ''}" href="${p}san-pham/${s}.html"${current ? ' aria-current="page"' : ''}>${esc(subLabel(s))}</a>`;
    }).join('')}</div>` : '';
    return `<li>
      <a class="${isActive ? 'is-active' : ''}" href="${p}san-pham/${c}.html">${esc(CATS[c].name)}${icon('chevron', 'cm-chev')}</a>
      ${subs}
    </li>`;
  }).join('');
  return `<aside class="sidebar">
    <div class="widget widget--cats">
      <div class="widget-title">${icon('layers')} Danh mục sản phẩm</div>
      <ul class="widget-body cat-menu">${items}</ul>
    </div>
    <div class="sidebar-cta">
      <span class="ico">${icon('headset')}</span>
      <b>Cần tư vấn sản phẩm?</b>
      <p>Gọi ngay để được hỗ trợ chọn đúng chủng loại & báo giá.</p>
      <span class="sidebar-phone">${SITE.hotline1}</span>
      <a class="btn btn--accent btn--block" href="${p}lien-he.html">Nhận báo giá</a>
    </div>
  </aside>`;
}

function breadcrumb(depth, activeCat, items) {
  const p = depth ? '../'.repeat(depth) : '';
  const parts = [`<a href="${p}index.html">Trang chủ</a>`];
  if (activeCat) parts.push(`<a href="${p}san-pham/${activeCat}.html">${esc(CATS[activeCat].name)}</a>`);
  (items || []).forEach((it) => {
    if (it.url) parts.push(`<a href="${p}${it.url}">${esc(it.label)}</a>`);
    else parts.push(`<span class="current">${esc(it.label)}</span>`);
  });
  return `<nav class="breadcrumb" aria-label="Breadcrumb">${parts.join(`<span class="sep">/</span>`)}</nav>`;
}

function pageHero(depth, { activeCat, crumbs, title }) {
  return `<section class="page-hero${title ? '' : ' page-hero--slim'}">
    <div class="container page-hero-inner">
      <div class="page-hero-text${title ? '' : ' page-hero-text--plain'}">
        ${breadcrumb(depth, activeCat, crumbs)}
        ${title ? `<h1>${esc(title)}</h1>` : ''}
      </div>
    </div>
  </section>`;
}

/* ============ PAGES ============ */
function buildHome() {
  const depth = 0;
  const banners = [
    { file: 'Slide_PPP1-4.png', alt: 'Phương Phú Phát – Màng PE, băng keo, dây đai, cáp thép' },
    { file: 'Slide_PPP2.png', alt: 'Phương Phú Phát – Vật tư đóng gói & đai kiện hàng hóa' },
  ].filter((b) => imgExists(b.file));
  const slides = banners.map((b, i) =>
    `<a class="hero-slide${i === 0 ? ' is-active' : ''}" href="#san-pham" aria-label="${esc(b.alt)}">` +
    `<img src="images/${b.file}" alt="${esc(b.alt)}"${i === 0 ? ' fetchpriority="high"' : ' loading="lazy"'}></a>`).join('');
  const dots = banners.map((_, i) =>
    `<button type="button" class="${i === 0 ? 'is-active' : ''}" aria-label="Banner ${i + 1}"></button>`).join('');

  const catSections = CAT_ORDER.map((c, idx) => {
    const items = (DATA.categories[c] || []).filter((s) => DATA.products[s]);
    if (!items.length) return '';
    const cards = items.map((s) => productCard(s, depth)).join('\n');
    return `
<section class="section section--tight home-cat${idx % 2 === 0 ? ' section--tint' : ''}">
  <div class="container">
    <div class="home-cat-head reveal">
      <h2 class="home-cat-title"><a href="san-pham/${c}.html">${esc(CATS[c].name)}</a></h2>
      <a class="home-cat-all" href="san-pham/${c}.html">Xem tất cả ${icon('arrow')}</a>
    </div>
    <div class="product-grid${items.length === 5 ? ' product-grid--5' : ''}">
${cards}
    </div>
  </div>
</section>`;
  }).join('\n');

  const features = [
    { icon: 'box', t: 'Sản phẩm đa dạng', s: 'Đầy đủ chủng loại, kích cỡ' },
    { icon: 'tag', t: 'Giá cả hợp lý', s: 'Cạnh tranh, linh hoạt' },
    { icon: 'headset', t: 'Chăm sóc khách hàng', s: 'Chu đáo, tận tình 24/7' },
    { icon: 'shield', t: 'Tư vấn tận tâm', s: 'Chọn đúng – dùng hiệu quả' },
  ].map((f, i) => `<div class="feature" style="animation-delay:${i * 90}ms"><span class="feature-ico">${icon(f.icon)}</span><div class="feature-body"><b>${f.t}</b><span>${f.s}</span></div></div>`).join('');

  const body = `
${header(depth, 'home')}
${mobileNav(depth, 'home')}
<main>
<section class="hero" aria-label="Banner Phương Phú Phát">
  <div class="container">
    <div class="hero-slides">${slides}</div>
    <div class="hero-dots">${dots}</div>
  </div>
  <h1 class="sr-only">Giải pháp vật tư đóng gói &amp; đai kiện hàng hóa toàn diện</h1>
</section>

<section class="feature-strip">
  <div class="container">${features}</div>
</section>

<section class="section section--tight" id="san-pham">
  <div class="container">
    <div class="section-head reveal">
      <span class="eyebrow">Sản phẩm theo danh mục</span>
      <h2>Tất cả sản phẩm <span class="section-accent">theo từng nhóm</span></h2>
      <p>Sản phẩm được sắp xếp theo đúng trình tự danh mục trong menu.</p>
    </div>
  </div>
</section>
${catSections}

<section class="section">
  <div class="container about-split">
    <div class="about-media reveal">
      <img src="images/PE-2.jpg" alt="Sản phẩm Phương Phú Phát" loading="lazy">
    </div>
    <div class="about-content reveal">
      <span class="eyebrow">Về chúng tôi</span>
      <h2>Đối tác tin cậy cho mọi nhu cầu đóng gói</h2>
      <p>CÔNG TY TNHH SX TM DV PHƯƠNG PHÚ PHÁT hoạt động trong lĩnh vực cung cấp vật tư đóng gói, đai kiện và cáp thép. Chúng tôi mang đến giải pháp bảo vệ hàng hóa an toàn, hiệu quả và tiết kiệm chi phí cho khách hàng.</p>
      <ul class="about-list">
        <li><span class="tick">${icon('check')}</span><span><b>Cung cấp các loại dây đai</b><span>Giải pháp đóng gói, đai kiện bảo vệ hàng hóa khi lưu kho và vận chuyển.</span></span></li>
        <li><span class="tick">${icon('check')}</span><span><b>Khóa đai &amp; dụng cụ đóng đai</b><span>Hỗ trợ tối đa cho quá trình đai kiện hàng hóa nhanh chóng, chắc chắn.</span></span></li>
        <li><span class="tick">${icon('check')}</span><span><b>Cáp thép &amp; xích mạ chất lượng cao</b><span>Ứng dụng cho tàu thuyền, máy xúc, ngành dầu khí, cáp cẩu, tháp cẩu…</span></span></li>
      </ul>
      <a class="btn btn--primary" href="gioi-thieu.html">Tìm hiểu thêm ${icon('arrow')}</a>
    </div>
  </div>
</section>

<section class="stats section--tight">
  <div class="container stats-grid">
    <div class="stat reveal"><b><em>20</em>+</b><span>Sản phẩm các loại</span></div>
    <div class="stat reveal"><b><em>6</em></b><span>Danh mục sản phẩm</span></div>
    <div class="stat reveal"><b>24/7</b><span>Hỗ trợ khách hàng</span></div>
    <div class="stat reveal"><b><em>100</em>%</b><span>Tận tâm phục vụ</span></div>
  </div>
</section>

<section class="section section--tint">
  <div class="container">
    <div class="section-head reveal">
      <span class="eyebrow">Vì sao chọn chúng tôi</span>
      <h2>Cam kết mang đến <span class="section-accent">giá trị bền vững</span></h2>
    </div>
    <div class="value-grid">
      <div class="value-card reveal"><span class="value-ico">${icon('shield')}</span><h3>Chất lượng đảm bảo</h3><p>Sản phẩm được kiểm chọn kỹ lưỡng, đáp ứng tiêu chuẩn về độ bền và khả năng chịu lực.</p></div>
      <div class="value-card reveal"><span class="value-ico">${icon('price')}</span><h3>Giá thành cạnh tranh</h3><p>Không ngừng tối ưu chi phí để mang đến mức giá hợp lý nhất cho khách hàng.</p></div>
      <div class="value-card reveal"><span class="value-ico">${icon('headset')}</span><h3>Tư vấn tận tình</h3><p>Đội ngũ hỗ trợ tư vấn đúng chủng loại, đúng nhu cầu, giúp tiết kiệm thời gian và chi phí.</p></div>
      <div class="value-card reveal"><span class="value-ico">${icon('truck')}</span><h3>Giao nhận thuận tiện</h3><p>Hỗ trợ cung ứng nhanh chóng, đảm bảo tiến độ sản xuất và vận chuyển của khách hàng.</p></div>
      <div class="value-card reveal"><span class="value-ico">${icon('box')}</span><h3>Đa dạng sản phẩm</h3><p>Đầy đủ chủng loại, kích cỡ từ màng PE, dây đai đến cáp thép và phụ kiện.</p></div>
      <div class="value-card reveal"><span class="value-ico">${icon('award')}</span><h3>Uy tín lâu dài</h3><p>Được khách hàng tín nhiệm nhờ sự ổn định về chất lượng và dịch vụ.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head reveal">
      <span class="eyebrow">Tin tức</span>
      <h2>Bài viết &amp; <span class="section-accent">kiến thức hữu ích</span></h2>
      <p>Chia sẻ thông tin về sản phẩm, ứng dụng và kinh nghiệm trong ngành đóng gói.</p>
    </div>
    <div class="news-grid">
${DATA.posts.map((post) => newsCard(post, depth)).join('\n')}
    </div>
    <div class="section-foot"><a class="btn btn--outline btn--lg" href="tin-tuc.html">Xem tất cả tin tức ${icon('arrow')}</a></div>
  </div>
</section>

${ctaBand(depth)}
</main>
${footer(depth)}
${floating()}`;

  return head({
    title: seoTitle(['Phương Phú Phát', 'Vật tư đóng gói, dây đai, cáp thép']),
    desc: 'CÔNG TY TNHH SX TM DV PHƯƠNG PHÚ PHÁT chuyên cung cấp màng PE, băng keo, dây đai, khóa đai, dây cáp thép, nẹp góc và phụ kiện đóng gói. Hotline 0902 953 318.',
    canonical: '',
    depth,
    image: 'images/PE-2.jpg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.short,
      alternateName: SITE.name,
      inLanguage: 'vi-VN',
      url: `${SITE_URL}/`,
    },
  }) + body + scripts(depth);
}

function buildCategory(catSlug) {
  const depth = 1;
  const c = CATS[catSlug];
  const slugs = DATA.categories[catSlug];
  const p = '../';
  const cards = slugs.map((s) => productCard(s, depth)).join('\n');
  const body = `
${header(depth, catSlug)}
${mobileNav(depth, catSlug)}
<main>
${pageHero(depth, { crumbs: [{ label: c.name }], title: c.name })}
<section class="section">
  <div class="container shop-layout">
    ${sidebar(depth, catSlug)}
    <div class="shop-content">
      <div class="shop-toolbar">
        <span class="count">Hiển thị <b>${slugs.length}</b> sản phẩm trong danh mục <b>${esc(c.name)}</b></span>
        <div class="toolbar-actions">
          <a class="chip" href="${p}index.html">${icon('box')} Tất cả danh mục</a>
          <a class="chip is-active" href="tel:${SITE.hotline1.replace(/\s/g, '')}">${icon('phone')} Báo giá nhanh</a>
        </div>
      </div>
      <div class="product-grid">${cards}</div>
    </div>
  </div>
</section>
${ctaBand(depth)}
</main>
${footer(depth)}
${floating()}`;
  return head({
    title: seoTitle([c.name, SITE.short]),
    desc: c.desc,
    canonical: `san-pham/${catSlug}.html`,
    depth,
    image: c.image,
    crumbs: [{ label: c.name }],
  }) + body + scripts(depth);
}

function buildProduct(slug) {
  const depth = 1;
  const p = '../';
  const pr = DATA.products[slug];
  const catSlug = PRODUCT_CAT[slug];
  const c = CATS[catSlug];
  const gallery = pr.gallery.filter((g) => imgExists(g.name));
  const mainImg = gallery.length ? 'images/' + gallery[0].name : productImage(slug);
  const thumbs = gallery.slice(0, 5).map((g, i) =>
    `<button type="button" class="${i === 0 ? 'is-active' : ''}" data-full="${p}images/${g.name}"><img src="${p}images/${g.name}" alt="${esc(pr.title)} ${i + 1}"></button>`).join('');

  const related = DATA.categories[catSlug].filter((s) => s !== slug).slice(0, 4);
  const relatedHtml = related.length
    ? `<section class="section section--tint">
  <div class="container">
    <div class="section-head reveal">
      <span class="eyebrow">Sản phẩm liên quan</span>
      <h2>Cùng danh mục <span class="section-accent">${esc(c.name)}</span></h2>
    </div>
    <div class="product-grid product-grid--center">${related.map((s) => productCard(s, depth)).join('\n')}</div>
  </div>
</section>`
    : '';

  const shortHtml = pr.short ? `<div class="lead">${contentHtml(pr.short, depth, pr.title)}</div>` : '';

  const body = `
${header(depth, catSlug)}
${mobileNav(depth, catSlug)}
<main>
${pageHero(depth, { activeCat: catSlug, crumbs: [{ label: pr.title }] })}
<section class="section">
  <div class="container shop-layout">
    ${sidebar(depth, catSlug, slug)}
    <div class="shop-main">
    <div class="product-main-grid">
      <div class="gallery">
      <div class="gallery-stage"><img id="gallery-main" src="${p}${mainImg}" alt="${esc(pr.title)}"></div>
      ${thumbs ? `<div class="gallery-thumbs">${thumbs}</div>` : ''}
    </div>
    <div class="product-info">
      <span class="product-cat-tag">${icon('layers')} ${esc(c.name)}</span>
      <h1 class="product-title">${esc(pr.title)}</h1>
      ${shortHtml}
      <ul class="product-highlights">
        <li><span class="tick">${icon('check')}</span> Chất lượng cao, đáp ứng tiêu chuẩn đóng gói công nghiệp.</li>
        <li><span class="tick">${icon('check')}</span> Đa dạng quy cách, kích thước theo yêu cầu.</li>
        <li><span class="tick">${icon('check')}</span> Giá cạnh tranh, hỗ trợ báo giá nhanh chóng.</li>
        <li><span class="tick">${icon('check')}</span> Tư vấn chọn đúng chủng loại, tiết kiệm chi phí.</li>
      </ul>
      <div class="product-cta-box">
        <b>Liên hệ để nhận báo giá tốt nhất</b>
        <p>Gọi ngay hotline hoặc gửi yêu cầu – chúng tôi phản hồi trong thời gian sớm nhất.</p>
        <div class="product-cta-actions">
          <a class="btn btn--accent" href="tel:${SITE.hotline1.replace(/\s/g, '')}">${icon('phone')} ${SITE.hotline1}</a>
          <a class="btn btn--outline" href="${p}lien-he.html">Gửi yêu cầu</a>
        </div>
      </div>
      <div class="product-meta">
        <span>${icon('phone')} Hotline: <b>${SITE.hotline1}</b> (Ms Phương) – <b>${SITE.hotline2}</b> (Mr Phú)</span>
        <span>${icon('mail')} Email: <b>${SITE.email}</b></span>
        <span>${icon('layers')} Danh mục: <b>${esc(c.name)}</b></span>
      </div>
    </div>
  </div>

  <div class="product-content">
    <div class="tabs-head">
      <button class="tab-btn is-active" type="button" data-tab="tab-desc">Mô tả sản phẩm</button>
      <button class="tab-btn" type="button" data-tab="tab-info">Chính sách &amp; báo giá</button>
    </div>
    <div class="tab-panel is-active" id="tab-desc">
      <div class="prose">${contentHtml(pr.desc, depth, pr.title) || '<p>Thông tin chi tiết sản phẩm đang được cập nhật. Quý khách vui lòng liên hệ hotline để được tư vấn.</p>'}</div>
    </div>
    <div class="tab-panel" id="tab-info">
      <div class="prose">
        <p><strong>Phương Phú Phát</strong> cung cấp sản phẩm <strong>${esc(pr.title)}</strong> với đầy đủ quy cách, đáp ứng nhu cầu đóng gói và vận chuyển hàng hóa.</p>
        <ul>
          <li>Báo giá nhanh theo số lượng và quy cách yêu cầu.</li>
          <li>Hỗ trợ tư vấn lựa chọn sản phẩm phù hợp với từng loại hàng hóa.</li>
          <li>Cung ứng số lượng lớn, đảm bảo tiến độ giao hàng.</li>
          <li>Ưu đãi giá tốt cho khách hàng đặt số lượng lớn, hợp tác lâu dài.</li>
        </ul>
        <p>Liên hệ hotline <strong>${SITE.hotline1}</strong> (Ms Phương) – <strong>${SITE.hotline2}</strong> (Mr Phú) hoặc email <strong>${SITE.email}</strong> để được phục vụ.</p>
      </div>
    </div>
    </div>
  </div>
</div>
</section>
${relatedHtml}
${ctaBand(depth)}
</main>
${footer(depth)}
${floating()}`;
  return head({
    title: seoTitle([pr.title, c.name, SITE.short]),
    desc: excerpt(pr.short || pr.desc, 155),
    canonical: `san-pham/${slug}.html`,
    depth,
    image: mainImg,
    activeCat: catSlug,
    crumbs: [{ label: pr.title }],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: pr.title,
      url: `${SITE_URL}/san-pham/${slug}.html`,
      sku: slug,
      image: `${SITE_URL}/${mainImg}`,
      description: excerpt(pr.short || pr.desc, 155),
      category: c.name,
      brand: { '@type': 'Organization', name: SITE.short, url: `${SITE_URL}/` },
      manufacturer: { '@type': 'Organization', name: SITE.name, url: `${SITE_URL}/` },
    },
  }) + body + scripts(depth);
}

function buildAbout() {
  const depth = 0;
  const body = `
${header(depth, 'gioi-thieu')}
${mobileNav(depth, 'gioi-thieu')}
<main>
${pageHero(depth, { crumbs: [{ label: 'Giới thiệu' }], title: 'Giới thiệu về Phương Phú Phát' })}
<section class="section">
  <div class="container about-split">
    <div class="about-media reveal">
      <img src="images/PE-2.jpg" alt="Công ty Phương Phú Phát" loading="lazy">
    </div>
    <div class="about-content reveal">
      <span class="eyebrow">Về chúng tôi</span>
      <h2>CÔNG TY TNHH SX TM DV PHƯƠNG PHÚ PHÁT</h2>
      <p>Chúng tôi chuyên hoạt động trong lĩnh vực cung cấp vật tư đóng gói, đai kiện và cáp thép phục vụ nhu cầu lưu kho, vận chuyển hàng hóa của các doanh nghiệp sản xuất, thương mại và dịch vụ.</p>
      <ul class="about-list">
        <li><span class="tick">${icon('check')}</span><span><b>Cung cấp các loại dây đai</b><span>Giải pháp đóng gói, đai kiện bảo vệ an toàn cho hàng hóa khi lưu kho và vận chuyển đi nơi khác.</span></span></li>
        <li><span class="tick">${icon('check')}</span><span><b>Cung cấp khóa đai &amp; dụng cụ đóng đai</b><span>Hỗ trợ cho quá trình đai kiện hàng hóa, giúp thao tác nhanh và chắc chắn.</span></span></li>
        <li><span class="tick">${icon('check')}</span><span><b>Cung cấp cáp thép &amp; xích mạ</b><span>Cáp thép chuyên dụng cho tàu thuyền, đường cao tốc, máy xúc, ngành dầu khí, cáp dự ứng lực, cáp xe cẩu, tháp cẩu…</span></span></li>
      </ul>
      <a class="btn btn--primary" href="lien-he.html">Liên hệ hợp tác ${icon('arrow')}</a>
    </div>
  </div>
</section>

<section class="section section--tint">
  <div class="container">
    <div class="section-head reveal">
      <h2>Ba lĩnh vực <span class="section-accent">hoạt động</span></h2>
    </div>
    <div class="value-grid">
      <div class="value-card reveal"><span class="value-ico">${icon('layers')}</span><h3>1. Cung cấp các loại dây đai</h3><p>Sản phẩm đóng gói, đai kiện bảo vệ an toàn cho các loại sản phẩm và hàng hóa cần lưu kho, vận chuyển. Bao gồm dây đai nhựa PET, dây đai thép và công cụ, dụng cụ trợ giúp.</p></div>
      <div class="value-card reveal"><span class="value-ico">${icon('target')}</span><h3>2. Khóa đai &amp; dụng cụ đóng đai</h3><p>Chuyên cung cấp các loại khóa đai và dụng cụ đóng đai hỗ trợ cho quá trình đai kiện hàng hóa, giúp công việc nhanh chóng và chắc chắn.</p></div>
      <div class="value-card reveal"><span class="value-ico">${icon('shield')}</span><h3>3. Cáp thép &amp; xích mạ</h3><p>Cáp thép chuyên dụng chất lượng cao sử dụng cho lĩnh vực tàu thuyền, làm đường cao tốc, máy xúc, ngành dầu khí, cáp dự ứng lực, cáp xe cẩu, tháp cẩu…</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head reveal">
      <span class="eyebrow">Cam kết của chúng tôi</span>
      <h2>Vì sao khách hàng <span class="section-accent">tin chọn Phương Phú Phát</span></h2>
    </div>
    <div class="value-grid">
      <div class="value-card reveal"><span class="value-ico">${icon('award')}</span><h3>Chất lượng tín nhiệm</h3><p>Sản phẩm được khách hàng tín nhiệm về tính hiệu quả cũng như chất lượng trong quá trình vận chuyển hàng hóa.</p></div>
      <div class="value-card reveal"><span class="value-ico">${icon('price')}</span><h3>Giá cả hợp lý</h3><p>Không ngừng cạnh tranh về giá, mang đến giải pháp tiết kiệm và hiệu quả cho doanh nghiệp.</p></div>
      <div class="value-card reveal"><span class="value-ico">${icon('headset')}</span><h3>Chăm sóc chu đáo</h3><p>Đội ngũ tư vấn tận tình, hỗ trợ khách hàng 24/7, giải đáp mọi thắc mắc về sản phẩm.</p></div>
    </div>
  </div>
</section>
${ctaBand(depth)}
</main>
${footer(depth)}
${floating()}`;
  return head({
    title: `Giới thiệu – ${SITE.name}`,
    desc: 'CÔNG TY TNHH SX TM DV PHƯƠNG PHÚ PHÁT chuyên cung cấp dây đai, khóa đai, dụng cụ đóng đai, cáp thép và xích mạ chất lượng cao.',
    canonical: 'gioi-thieu.html',
    depth,
    image: 'images/PE-2.jpg',
    crumbs: [{ label: 'Giới thiệu' }],
  }) + body + scripts(depth);
}

function buildNews() {
  const depth = 0;
  const cards = DATA.posts.map((post) => newsCard(post, depth)).join('\n');
  const body = `
${header(depth, 'tin-tuc')}
${mobileNav(depth, 'tin-tuc')}
<main>
${pageHero(depth, { crumbs: [{ label: 'Tin tức' }], title: 'Tin tức & kiến thức' })}
<section class="section">
  <div class="container">
    <div class="news-grid">${cards}</div>
  </div>
</section>
${ctaBand(depth)}
</main>
${footer(depth)}
${floating()}`;
  return head({
    title: `Tin tức – ${SITE.name}`,
    desc: 'Tin tức, bài viết và kiến thức hữu ích về sản phẩm màng PE, dây đai, nẹp góc và vật tư đóng gói từ Phương Phú Phát.',
    canonical: 'tin-tuc.html',
    depth,
    crumbs: [{ label: 'Tin tức' }],
  }) + body + scripts(depth);
}

function buildArticle(post) {
  const depth = 1;
  const others = DATA.posts.filter((x) => x.id !== post.id).slice(0, 4);
  const related = others.map((o) => `<a class="related-item" href="${o.slug}.html">
    <img src="../${o.image}" alt="${esc(o.title)}" loading="lazy">
    <span><b>${esc(o.title)}</b><span>${esc(o.date)}</span></span>
  </a>`).join('');
  const body = `
${header(depth, 'tin-tuc')}
${mobileNav(depth, 'tin-tuc')}
<main>
${pageHero(depth, { crumbs: [{ label: 'Tin tức', url: 'tin-tuc.html' }, { label: post.title }], title: post.title })}
<section class="section">
  <div class="container article-layout">
    <article>
      <div class="article-head">
        <div class="article-meta">
          <span>${icon('calendar')} ${esc(post.date)}</span>
          <span>${icon('user')} Phương Phú Phát</span>
          <span>${icon('tag')} Tin tức</span>
        </div>
      </div>
      <div class="prose">${contentHtml(post.content, depth, post.title)}</div>
      <div class="article-share">
        <a href="https://www.facebook.com/sharer/sharer.php?u=${SITE_URL}/tin-tuc/${post.slug}.html" target="_blank" rel="noopener" aria-label="Chia sẻ Facebook">${icon('facebook')}</a>
        <a href="mailto:?subject=${encodeURIComponent(post.title)}" aria-label="Chia sẻ Email">${icon('mail')}</a>
        <a href="tel:${SITE.hotline1.replace(/\s/g, '')}" aria-label="Gọi tư vấn">${icon('phone')}</a>
      </div>
    </article>
    <aside class="sidebar">
      <div class="widget">
        <div class="widget-title">${icon('layers')} Danh mục sản phẩm</div>
        <ul class="widget-body cat-menu">
${CAT_ORDER.map((c) => `<li><a href="../san-pham/${c}.html">${esc(CATS[c].name)}${icon('chevron', 'cm-chev')}</a></li>`).join('')}
        </ul>
      </div>
      <div class="widget">
        <div class="widget-title">${icon('quote')} Bài viết mới</div>
        <div class="widget-body related-list">${related}</div>
      </div>
      <div class="sidebar-cta">
        <span class="ico">${icon('headset')}</span>
        <b>Cần tư vấn sản phẩm?</b>
        <p>Gọi ngay để được hỗ trợ nhanh nhất.</p>
        <span class="sidebar-phone">${SITE.hotline1}</span>
        <a class="btn btn--accent btn--block" href="../lien-he.html">Nhận báo giá</a>
      </div>
    </aside>
  </div>
</section>
${ctaBand(depth)}
</main>
${footer(depth)}
${floating()}`;
  const published = viDateToIso(post.date);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: excerpt(post.excerpt, 155),
    image: `${SITE_URL}/${post.image}`,
    inLanguage: 'vi-VN',
    articleSection: 'Tin tức',
    mainEntityOfPage: `${SITE_URL}/tin-tuc/${post.slug}.html`,
    author: { '@type': 'Organization', name: SITE.short, url: `${SITE_URL}/` },
    publisher: { '@type': 'Organization', name: SITE.name, url: `${SITE_URL}/`, logo: { '@type': 'ImageObject', url: `${SITE_URL}/${SITE.logo}` } },
  };
  if (published) {
    articleSchema.datePublished = published;
    articleSchema.dateModified = published;
  }
  return head({
    title: seoTitle([post.title, SITE.short]),
    desc: excerpt(post.excerpt, 155),
    canonical: `tin-tuc/${post.slug}.html`,
    depth,
    image: post.image,
    type: 'article',
    crumbs: [{ label: 'Tin tức', url: 'tin-tuc.html' }, { label: post.title }],
    schema: articleSchema,
  }) + body + scripts(depth);
}

function buildContact() {
  const depth = 0;
  const cards = [
    { icon: 'map', t: 'Địa chỉ', v: SITE.address },
    { icon: 'phone', t: 'Hotline', v: `${SITE.hotline1} (Ms Phương) – ${SITE.hotline2} (Mr Phú)`, href: `tel:${SITE.hotline1.replace(/\s/g, '')}` },
    { icon: 'mail', t: 'Email', v: SITE.email, href: `mailto:${SITE.email}` },
    { icon: 'clock', t: 'Giờ làm việc', v: 'Thứ 2 – Thứ 7: 07:30 – 17:30' },
  ].map((c) => `<div class="contact-card reveal">
    <span class="ico">${icon(c.icon)}</span>
    <div><b>${c.t}</b>${c.href ? `<a href="${c.href}">${esc(c.v)}</a>` : `<p>${esc(c.v)}</p>`}</div>
  </div>`).join('');
  const body = `
${header(depth, 'lien-he')}
${mobileNav(depth, 'lien-he')}
<main>
${pageHero(depth, { crumbs: [{ label: 'Liên hệ' }], title: 'Liên hệ với chúng tôi' })}
<section class="section">
  <div class="container contact-grid">
    <div>
      <div class="contact-cards">${cards}</div>
      <div style="margin-top:24px" class="map-wrap">
        <iframe src="${SITE.map}" title="Bản đồ Phương Phú Phát" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
      </div>
    </div>
    <div class="form-card reveal">
      <h2 style="font-size:1.4rem;margin-bottom:8px">Gửi yêu cầu báo giá</h2>
      <p style="color:var(--muted);margin-bottom:22px">Điền thông tin dưới đây, chúng tôi sẽ phản hồi trong thời gian sớm nhất.</p>
      <form id="contact-form" novalidate>
        <div class="form-grid">
          <div class="field"><label for="name">Họ và tên *</label><input id="name" name="name" type="text" required placeholder="Nguyễn Văn A"></div>
          <div class="field"><label for="phone">Số điện thoại *</label><input id="phone" name="phone" type="tel" required placeholder="09xx xxx xxx"></div>
          <div class="field"><label for="email">Email</label><input id="email" name="email" type="email" placeholder="email@congty.com"></div>
          <div class="field"><label for="subject">Sản phẩm quan tâm</label><input id="subject" name="subject" type="text" placeholder="VD: Dây đai thép"></div>
          <div class="field full"><label for="message">Nội dung yêu cầu *</label><textarea id="message" name="message" required placeholder="Mô tả chủng loại, số lượng và quy cách sản phẩm bạn cần..."></textarea></div>
        </div>
        <div style="margin-top:20px"><button class="btn btn--primary btn--lg btn--block" type="submit">${icon('mail')} Gửi yêu cầu</button></div>
        <p class="form-note">Hoặc gọi trực tiếp hotline <b>${SITE.hotline1}</b> để được hỗ trợ nhanh chóng.</p>
        <div class="form-alert" role="status"></div>
      </form>
    </div>
  </div>
</section>
${ctaBand(depth)}
</main>
${footer(depth)}
${floating()}`;
  return head({
    title: `Liên hệ – ${SITE.name}`,
    desc: `Địa chỉ: ${SITE.address}. Hotline ${SITE.hotline1} – ${SITE.hotline2}. Email ${SITE.email}.`,
    canonical: 'lien-he.html',
    depth,
    crumbs: [{ label: 'Liên hệ' }],
  }) + body + scripts(depth);
}

/* ============ RUN ============ */
// Đặt lại slug đẹp cho bài viết
const POST_SLUGS = {
  832: 'vai-tro-cua-mang-pe-doi-voi-san-xuat-va-doi-song',
  827: 'tui-nilon-pe-duoc-su-dung-nhu-the-nao',
  822: 'thanh-nep-giay-duoc-su-dung-nhu-the-nao',
  808: 'mang-pe-su-dung-de-lam-gi',
};
DATA.posts.forEach((post) => { post.slug = POST_SLUGS[post.id] || post.slug; });

// sanitize content once
DATA.posts.forEach((post) => { post.content = cleanContent(post.content); });
Object.keys(DATA.products).forEach((slug) => {
  DATA.products[slug].short = cleanContent(DATA.products[slug].short);
  DATA.products[slug].desc = cleanContent(DATA.products[slug].desc);
});
DATA.posts.forEach((post) => { post.image = post.image && imgExists(post.image.replace('images/', '')) ? post.image : 'images/logo_final-1.png'; });

writePage('index.html', buildHome());
CAT_ORDER.forEach((c) => writePage(`san-pham/${c}.html`, buildCategory(c)));
Object.keys(DATA.products).forEach((s) => writePage(`san-pham/${s}.html`, buildProduct(s)));
writePage('gioi-thieu.html', buildAbout());
writePage('tin-tuc.html', buildNews());
DATA.posts.forEach((post) => writePage(`tin-tuc/${post.slug}.html`, buildArticle(post)));
writePage('lien-he.html', buildContact());

/* ============ SEO: robots.txt + sitemap.xml ============ */
const lastmod = new Date().toISOString().slice(0, 10);
const sitemapUrls = written.map((f) => {
  const loc = f === 'index.html' ? `${SITE_URL}/` : `${SITE_URL}/${f}`;
  const priority = f === 'index.html' ? '1.0' : f.startsWith('tin-tuc/') ? '0.6' : '0.8';
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${f === 'index.html' ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}).join('\n');
fs.writeFileSync(
  path.join(ROOT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`
);
fs.writeFileSync(
  path.join(ROOT, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
);
console.log(`Đã tạo robots.txt + sitemap.xml (${written.length} URL)`);

console.log(`Đã tạo ${written.length} trang:`);
written.forEach((f) => console.log('  ' + f));
