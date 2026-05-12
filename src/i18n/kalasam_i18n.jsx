import React, { useState, useContext, createContext, useCallback } from "react";
import { Globe, Check, X, ChevronDown } from "lucide-react";

/* =========================================================
   KALASAM — Système d'internationalisation (i18n)
   
   FICHIERS À CRÉER / MODIFIER :
   1. Ce fichier  →  src/i18n/index.jsx
   2. Dans KalasamSite.jsx, importer LanguageProvider et
      envelopper l'app :  <LanguageProvider><KalasamSite/></LanguageProvider>
   3. Dans chaque page/composant : const { t, lang } = useTranslation();
      Remplacer les strings durs par t('clé')
   ========================================================= */

// ─────────────────────────────────────────────
//  1. DICTIONNAIRE DES LANGUES
// ─────────────────────────────────────────────

export const LANGUAGES = {
  // ── Langues internationales ──────────────────
  fr: {
    code: "fr",
    flag: "🇫🇷",
    native: "Français",
    label: "Français",
    group: "international",
    dir: "ltr",
  },
  en: {
    code: "en",
    flag: "🇬🇧",
    native: "English",
    label: "Anglais",
    group: "international",
    dir: "ltr",
  },
  es: {
    code: "es",
    flag: "🇪🇸",
    native: "Español",
    label: "Espagnol",
    group: "international",
    dir: "ltr",
  },
  de: {
    code: "de",
    flag: "🇩🇪",
    native: "Deutsch",
    label: "Allemand",
    group: "international",
    dir: "ltr",
  },
  it: {
    code: "it",
    flag: "🇮🇹",
    native: "Italiano",
    label: "Italien",
    group: "international",
    dir: "ltr",
  },
  pt: {
    code: "pt",
    flag: "🇵🇹",
    native: "Português",
    label: "Portugais",
    group: "international",
    dir: "ltr",
  },
  zh: {
    code: "zh",
    flag: "🇨🇳",
    native: "中文",
    label: "Chinois",
    group: "international",
    dir: "ltr",
  },
  ja: {
    code: "ja",
    flag: "🇯🇵",
    native: "日本語",
    label: "Japonais",
    group: "international",
    dir: "ltr",
  },

  // ── Langues de l'héritage KALASAM ────────────
  tl: {
    code: "tl",
    flag: "🇵🇭",
    native: "Filipino",
    label: "Tagalog",
    group: "heritage",
    region: "Philippines",
    dir: "ltr",
  },
  ceb: {
    code: "ceb",
    flag: "🇵🇭",
    native: "Cebuano",
    label: "Cebuano",
    group: "heritage",
    region: "Philippines",
    dir: "ltr",
  },
  ar: {
    code: "ar",
    flag: "🇲🇦",
    native: "العربية",
    label: "Arabe",
    group: "heritage",
    region: "Maroc",
    dir: "rtl",
  },
  ber: {
    code: "ber",
    flag: "🇲🇦",
    native: "ⵜⴰⵎⴰⵣⵉⵖⵜ",
    label: "Tamazight",
    group: "heritage",
    region: "Maroc",
    dir: "ltr",
  },
  ta: {
    code: "ta",
    flag: "🇱🇰",
    native: "தமிழ்",
    label: "Tamoul",
    group: "heritage",
    region: "Sri Lanka",
    dir: "ltr",
  },
  si: {
    code: "si",
    flag: "🇱🇰",
    native: "සිංහල",
    label: "Cingalais",
    group: "heritage",
    region: "Sri Lanka",
    dir: "ltr",
  },
};

// ─────────────────────────────────────────────
//  2. TRADUCTIONS
//  Structure : { clé: { fr: "...", en: "...", ... } }
//  Ajouter les langues manquantes au fur et à mesure
// ─────────────────────────────────────────────

const TRANSLATIONS = {
  // ── Barre utilitaire ─────────────────────────
  "banner.shipping": {
    fr: "✦ Livraison offerte dès 200€",
    en: "✦ Free shipping from €200",
    es: "✦ Envío gratis desde 200€",
    de: "✦ Kostenloser Versand ab 200€",
    it: "✦ Spedizione gratuita da 200€",
    pt: "✦ Envio grátis a partir de 200€",
    zh: "✦ 满200欧免费配送",
    ja: "✦ 200€以上で送料無料",
    tl: "✦ Libreng shipping mula 200€",
    ceb: "✦ Libre nga shipping gikan 200€",
    ar: "✦ شحن مجاني من 200€",
    ber: "✦ Tawenza tuqqna seg 200€",
    ta: "✦ €200 முதல் இலவச டெலிவரி",
    si: "✦ €200 සිට නොමිලේ නැව්ගත කිරීම",
  },
  "banner.edition": {
    fr: "✦ Édition limitée — Chapitre I disponible",
    en: "✦ Limited edition — Chapter I available",
    es: "✦ Edición limitada — Capítulo I disponible",
    de: "✦ Limitierte Edition — Kapitel I verfügbar",
    it: "✦ Edizione limitata — Capitolo I disponibile",
    pt: "✦ Edição limitada — Capítulo I disponível",
    zh: "✦ 限量版 — 第一章现已发售",
    ja: "✦ 限定版 — チャプターI 発売中",
    tl: "✦ Limitadong edisyon — Kabanata I available na",
    ceb: "✦ Limitado nga edisyon — Kapitulo I",
    ar: "✦ إصدار محدود — الفصل الأول متاح",
    ber: "✦ Ticraḍ imḍulen — Afaṣṣel amezwaru",
    ta: "✦ வரையறுக்கப்பட்ட பதிப்பு — அத்தியாயம் I",
    si: "✦ සීමිත සංස්කරණය — පරිච්ඡේදය I",
  },
  "banner.madeinfrance": {
    fr: "✦ Made in France",
    en: "✦ Made in France",
    es: "✦ Hecho en Francia",
    de: "✦ Hergestellt in Frankreich",
    it: "✦ Fatto in Francia",
    pt: "✦ Feito em França",
    zh: "✦ 法国制造",
    ja: "✦ フランス製",
    tl: "✦ Gawa sa France",
    ceb: "✦ Gihimo sa France",
    ar: "✦ صُنع في فرنسا",
    ber: "✦ Yettwagem di Fransa",
    ta: "✦ பிரான்சில் தயாரிக்கப்பட்டது",
    si: "✦ ප්‍රංශයේ නිෂ්පාදිත",
  },
  "banner.exile": {
    fr: "✦ De l'exil à l'identité",
    en: "✦ From exile to identity",
    es: "✦ Del exilio a la identidad",
    de: "✦ Vom Exil zur Identität",
    it: "✦ Dall'esilio all'identità",
    pt: "✦ Do exílio à identidade",
    zh: "✦ 从流亡到身份认同",
    ja: "✦ 亡命から、アイデンティティへ",
    tl: "✦ Mula sa pagpapatapon tungo sa pagkakakilanlan",
    ceb: "✦ Gikan sa pagpapatapon ngadto sa pagkatawo",
    ar: "✦ من المنفى إلى الهوية",
    ber: "✦ Seg uɣref ar tɣuri",
    ta: "✦ நாடுகடத்தலில் இருந்து அடையாளத்திற்கு",
    si: "✦ පිටුවහලෙන් අනන්‍යතාවයට",
  },

  // ── Navigation ──────────────────────────────
  "nav.shop": {
    fr: "Boutique",
    en: "Shop",
    es: "Tienda",
    de: "Shop",
    it: "Boutique",
    pt: "Loja",
    zh: "商店",
    ja: "ショップ",
    tl: "Tindahan",
    ceb: "Tindahan",
    ar: "المتجر",
    ber: "Aḥanut",
    ta: "கடை",
    si: "සාප්පුව",
  },
  "nav.story": {
    fr: "Notre Histoire",
    en: "Our Story",
    es: "Nuestra Historia",
    de: "Unsere Geschichte",
    it: "La Nostra Storia",
    pt: "A Nossa História",
    zh: "我们的故事",
    ja: "ブランドストーリー",
    tl: "Aming Kwento",
    ceb: "Atong Istorya",
    ar: "قصتنا",
    ber: "Tanarrayt-nneɣ",
    ta: "எங்கள் கதை",
    si: "අපගේ කතාව",
  },
  "nav.chapters": {
    fr: "Chapitres",
    en: "Chapters",
    es: "Capítulos",
    de: "Kapitel",
    it: "Capitoli",
    pt: "Capítulos",
    zh: "章节",
    ja: "チャプター",
    tl: "Mga Kabanata",
    ceb: "Mga Kapitulo",
    ar: "الفصول",
    ber: "Ifaṣṣalen",
    ta: "அத்தியாயங்கள்",
    si: "පරිච්ඡේද",
  },
  "nav.contact": {
    fr: "Contact",
    en: "Contact",
    es: "Contacto",
    de: "Kontakt",
    it: "Contatto",
    pt: "Contato",
    zh: "联系",
    ja: "お問い合わせ",
    tl: "Makipag-ugnayan",
    ceb: "Kontak",
    ar: "اتصل بنا",
    ber: "Anɣ-d-muqel",
    ta: "தொடர்பு",
    si: "සම්බන්ධ කරන්න",
  },

  // ── Hero ────────────────────────────────────
  "hero.headline1": {
    fr: "De l'exil",
    en: "From exile",
    es: "Del exilio",
    de: "Vom Exil",
    it: "Dall'esilio",
    pt: "Do exílio",
    zh: "从流亡",
    ja: "亡命から",
    tl: "Mula sa pagpapatapon",
    ceb: "Gikan sa pagpapatapon",
    ar: "من المنفى",
    ber: "Seg uɣref",
    ta: "நாடுகடத்தலில் இருந்து",
    si: "පිටුවහලෙන්",
  },
  "hero.headline2": {
    fr: "à l'identité.",
    en: "to identity.",
    es: "a la identidad.",
    de: "zur Identität.",
    it: "all'identità.",
    pt: "à identidade.",
    zh: "到身份认同。",
    ja: "アイデンティティへ。",
    tl: "tungo sa pagkakakilanlan.",
    ceb: "ngadto sa pagkatawo.",
    ar: "إلى الهوية.",
    ber: "ar tɣuri.",
    ta: "அடையாளத்திற்கு.",
    si: "අනන්‍යතාවයට.",
  },
  "hero.cta.discover": {
    fr: "Découvrir la collection",
    en: "Discover the collection",
    es: "Descubrir la colección",
    de: "Kollektion entdecken",
    it: "Scopri la collezione",
    pt: "Descobrir a coleção",
    zh: "发现系列",
    ja: "コレクションを見る",
    tl: "Tuklasin ang koleksyon",
    ceb: "Tuklasin ang koleksyon",
    ar: "اكتشف المجموعة",
    ber: "Aɣ-d-lmed tagrumma",
    ta: "தொகுப்பை கண்டுபிடிக்கவும்",
    si: "එකතුව සොයාගන්න",
  },
  "hero.cta.story": {
    fr: "Notre histoire",
    en: "Our story",
    es: "Nuestra historia",
    de: "Unsere Geschichte",
    it: "La nostra storia",
    pt: "A nossa história",
    zh: "我们的故事",
    ja: "ブランドストーリー",
    tl: "Aming kwento",
    ceb: "Atong istorya",
    ar: "قصتنا",
    ber: "Tanarrayt-nneɣ",
    ta: "எங்கள் கதை",
    si: "අපගේ කතාව",
  },

  // ── Produits ────────────────────────────────
  "product.addToCart": {
    fr: "Ajouter au panier",
    en: "Add to cart",
    es: "Añadir al carrito",
    de: "In den Warenkorb",
    it: "Aggiungi al carrello",
    pt: "Adicionar ao carrinho",
    zh: "加入购物车",
    ja: "カートに追加",
    tl: "Idagdag sa cart",
    ceb: "Idugang sa cart",
    ar: "أضف إلى السلة",
    ber: "Azen ɣer takaṛt",
    ta: "கார்ட்டில் சேர்க்கவும்",
    si: "කරත්තයට එකතු කරන්න",
  },
  "product.size": {
    fr: "Taille",
    en: "Size",
    es: "Talla",
    de: "Größe",
    it: "Taglia",
    pt: "Tamanho",
    zh: "尺寸",
    ja: "サイズ",
    tl: "Sukat",
    ceb: "Gidak-on",
    ar: "المقاس",
    ber: "Teɣzi",
    ta: "அளவு",
    si: "ප්‍රමාණය",
  },
  "product.color": {
    fr: "Coloris",
    en: "Color",
    es: "Color",
    de: "Farbe",
    it: "Colore",
    pt: "Cor",
    zh: "颜色",
    ja: "カラー",
    tl: "Kulay",
    ceb: "Kolor",
    ar: "اللون",
    ber: "Ini",
    ta: "நிறம்",
    si: "වර්ණය",
  },
  "product.booking": {
    fr: "Réserver un essayage privé",
    en: "Book a private fitting",
    es: "Reservar un probador privado",
    de: "Private Anprobe buchen",
    it: "Prenota una prova privata",
    pt: "Reservar prova privada",
    zh: "预约私人试穿",
    ja: "プライベート試着を予約",
    tl: "Mag-book ng pribadong fitting",
    ceb: "Mag-reserve ug fitting",
    ar: "احجز تجربة خاصة",
    ber: "Ales aẓṭaṭ abaḍni",
    ta: "தனிப்பட்ட அளவு முயற்சிக்க முன்பதிவு",
    si: "පෞද්ගලික ෆිටිං වෙන් කරන්න",
  },
  "product.madeInFrance": {
    fr: "Made in France",
    en: "Made in France",
    es: "Hecho en Francia",
    de: "Made in France",
    it: "Made in France",
    pt: "Feito em França",
    zh: "法国制造",
    ja: "フランス製",
    tl: "Gawa sa France",
    ceb: "Gihimo sa France",
    ar: "صُنع في فرنسا",
    ber: "Yettwagem di Fransa",
    ta: "பிரான்சில் தயாரிக்கப்பட்டது",
    si: "ප්‍රංශයේ නිෂ්පාදිත",
  },
  "product.limitedSeries": {
    fr: "Série limitée & numérotée",
    en: "Limited & numbered series",
    es: "Serie limitada y numerada",
    de: "Limitierte & nummerierte Serie",
    it: "Serie limitata e numerata",
    pt: "Série limitada e numerada",
    zh: "限量编号系列",
    ja: "限定ナンバリングシリーズ",
    tl: "Limitado at may bilang na serye",
    ceb: "Limitado ug numerado",
    ar: "سلسلة محدودة ومرقمة",
    ber: "Asali ameḥbus d umiḍanen",
    ta: "வரையறுக்கப்பட்ட & எண்ணிட்ட தொடர்",
    si: "සීමිත සහ අංකිත මාලාව",
  },

  // ── Panier ──────────────────────────────────
  "cart.title": {
    fr: "Votre panier",
    en: "Your cart",
    es: "Tu carrito",
    de: "Ihr Warenkorb",
    it: "Il tuo carrello",
    pt: "O seu carrinho",
    zh: "您的购物车",
    ja: "ショッピングカート",
    tl: "Ang iyong cart",
    ceb: "Imong cart",
    ar: "سلتك",
    ber: "Takaṛt-nnek",
    ta: "உங்கள் கார்ட்",
    si: "ඔබේ කරත්තය",
  },
  "cart.empty": {
    fr: "Votre panier est vide",
    en: "Your cart is empty",
    es: "Tu carrito está vacío",
    de: "Ihr Warenkorb ist leer",
    it: "Il tuo carrello è vuoto",
    pt: "O seu carrinho está vazio",
    zh: "您的购物车是空的",
    ja: "カートは空です",
    tl: "Walang laman ang iyong cart",
    ceb: "Walay sulod ang imong cart",
    ar: "سلتك فارغة",
    ber: "Takaṛt-nnek d tuffɣa",
    ta: "உங்கள் கார்ட் காலியாக உள்ளது",
    si: "ඔබේ කරත්තය හිස්ය",
  },
  "cart.subtotal": {
    fr: "Sous-total",
    en: "Subtotal",
    es: "Subtotal",
    de: "Zwischensumme",
    it: "Subtotale",
    pt: "Subtotal",
    zh: "小计",
    ja: "小計",
    tl: "Subtotal",
    ceb: "Subtotal",
    ar: "المجموع الفرعي",
    ber: "Amalas",
    ta: "துணை மொத்தம்",
    si: "උප එකතුව",
  },
  "cart.total": {
    fr: "Total",
    en: "Total",
    es: "Total",
    de: "Gesamt",
    it: "Totale",
    pt: "Total",
    zh: "合计",
    ja: "合計",
    tl: "Kabuuan",
    ceb: "Kabuon",
    ar: "المجموع",
    ber: "Akk",
    ta: "மொத்தம்",
    si: "සම්පූර්ණය",
  },
  "cart.checkout": {
    fr: "Passer au paiement",
    en: "Proceed to checkout",
    es: "Ir a pagar",
    de: "Zur Kasse",
    it: "Procedi al pagamento",
    pt: "Finalizar compra",
    zh: "去结账",
    ja: "お会計へ",
    tl: "Magbayad na",
    ceb: "Magbayad na",
    ar: "المتابعة للدفع",
    ber: "Ǧǧen i leḥsab",
    ta: "செலுத்துதலுக்கு செல்க",
    si: "ගෙවීමට ඉදිරියට යන්න",
  },
  "cart.shipping": {
    fr: "Livraison",
    en: "Shipping",
    es: "Envío",
    de: "Versand",
    it: "Spedizione",
    pt: "Envio",
    zh: "运费",
    ja: "送料",
    tl: "Pagpapadala",
    ceb: "Pagpadala",
    ar: "الشحن",
    ber: "Tawenza",
    ta: "ஷிப்பிங்",
    si: "නැව්ගත කිරීම",
  },
  "cart.shippingFree": {
    fr: "Offerte",
    en: "Free",
    es: "Gratis",
    de: "Kostenlos",
    it: "Gratuita",
    pt: "Grátis",
    zh: "免费",
    ja: "無料",
    tl: "Libre",
    ceb: "Libre",
    ar: "مجاني",
    ber: "Imayen",
    ta: "இலவசம்",
    si: "නොමිලේ",
  },

  // ── Footer ──────────────────────────────────
  "footer.tagline": {
    fr: "From exile to identity.",
    en: "From exile to identity.",
    es: "Del exilio a la identidad.",
    de: "Vom Exil zur Identität.",
    it: "Dall'esilio all'identità.",
    pt: "Do exílio à identidade.",
    zh: "从流亡到身份认同。",
    ja: "亡命から、アイデンティティへ。",
    tl: "Mula sa pagpapatapon tungo sa pagkakakilanlan.",
    ceb: "Gikan sa pagpapatapon ngadto sa pagkatawo.",
    ar: "من المنفى إلى الهوية.",
    ber: "Seg uɣref ar tɣuri.",
    ta: "நாடுகடத்தலில் இருந்து அடையாளத்திற்கு.",
    si: "පිටුවහලෙන් අනන්‍යතාවයට.",
  },
  "footer.newsletter.title": {
    fr: "Recevez nos chapitres avant tout le monde",
    en: "Receive our chapters before everyone else",
    es: "Recibe nuestros capítulos antes que nadie",
    de: "Erhalten Sie unsere Kapitel als Erste",
    it: "Ricevi i nostri capitoli prima di tutti",
    pt: "Receba os nossos capítulos antes de todos",
    zh: "第一时间收到我们的章节",
    ja: "誰よりも先にチャプターを受け取る",
    tl: "Makatanggap ng aming mga kabanata nang una",
    ceb: "Makadawat sa among mga kapitulo una",
    ar: "تلقَّ فصولنا قبل الجميع",
    ber: "Aǧǧ-aɣ-d ifaṣṣalen-nneɣ",
    ta: "எங்கள் அத்தியாயங்களை முதலில் பெறுங்கள்",
    si: "අපගේ පරිච්ඡේද කලින්ම ලබාගන්න",
  },

  // ── Sections ────────────────────────────────
  "section.selection": {
    fr: "La sélection",
    en: "The selection",
    es: "La selección",
    de: "Die Auswahl",
    it: "La selezione",
    pt: "A seleção",
    zh: "精选",
    ja: "セレクション",
    tl: "Ang seleksyon",
    ceb: "Ang seleksyon",
    ar: "التحديد",
    ber: "Afernu",
    ta: "தேர்வு",
    si: "තේරීම",
  },
  "section.signatureItems": {
    fr: "Pièces signature",
    en: "Signature pieces",
    es: "Piezas emblemáticas",
    de: "Signaturstücke",
    it: "Pezzi firma",
    pt: "Peças assinatura",
    zh: "标志性单品",
    ja: "シグネチャーピース",
    tl: "Mga signature na piraso",
    ceb: "Mga signature nga piraso",
    ar: "القطع المميزة",
    ber: "Ilugan n tẓuri",
    ta: "கையொப்ப ஆடைகள்",
    si: "සිග්නේචර් කූලූ",
  },
  "ma.nouvelle.cle": {
    fr: "Texte en français",
    en: "Text in English",
    tl: "Teksto sa Filipino",
    ta: "தமிழ் உரை",
  },
};

// ─────────────────────────────────────────────
//  3. CONTEXTE REACT
// ─────────────────────────────────────────────

const LanguageContext = createContext({ lang: "fr", setLang: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem("kalasam-lang") || "fr",
  );

  const changeLang = useCallback((code) => {
    setLang(code);
    localStorage.setItem("kalasam-lang", code);
    // Direction RTL pour l'arabe
    document.documentElement.setAttribute("dir", LANGUAGES[code]?.dir || "ltr");
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ─────────────────────────────────────────────
//  4. HOOK useTranslation
// ─────────────────────────────────────────────

export function useTranslation() {
  const { lang, setLang } = useContext(LanguageContext);

  const t = useCallback(
    (key) => {
      const entry = TRANSLATIONS[key];
      if (!entry) return key; // retourne la clé si non trouvée
      return entry[lang] || entry["fr"] || key; // fallback → français
    },
    [lang],
  );

  return { t, lang, setLang, langInfo: LANGUAGES[lang] };
}

// ─────────────────────────────────────────────
//  5. COMPOSANT SÉLECTEUR DE LANGUE
//  Utilisation dans le header :
//  <LanguageSelector />
// ─────────────────────────────────────────────

export function LanguageSelector() {
  const { lang, setLang } = useContext(LanguageContext);
  const [open, setOpen] = useState(false);

  const intlLangs = Object.values(LANGUAGES).filter(
    (l) => l.group === "international",
  );
  const heritageLangs = Object.values(LANGUAGES).filter(
    (l) => l.group === "heritage",
  );
  const current = LANGUAGES[lang] || LANGUAGES["fr"];

  return (
    <>
      {/* ── Bouton déclencheur ── */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 hover:text-gold transition-colors"
        aria-label="Changer de langue"
      >
        <Globe size={18} />
        <span className="hidden lg:inline text-[10px] tracking-[0.2em] uppercase">
          {current.code.toUpperCase()}
        </span>
        <ChevronDown size={11} className="hidden lg:inline" />
      </button>

      {/* ── Panneau de sélection ── */}
      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-petrol/50 backdrop-blur-sm animate-fadeIn"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div
            className="relative bg-cream w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fadeUp shadow-2xl border border-petrol/10"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            {/* Header du panel */}
            <div className="sticky top-0 bg-cream/95 backdrop-blur px-8 py-6 border-b border-petrol/10 flex items-center justify-between z-10">
              <div>
                <p className="text-[9px] tracking-[0.4em] uppercase text-gold mb-1">
                  KALASAM
                </p>
                <h2
                  className="font-display text-2xl text-petrol"
                  style={{ fontFamily: '"Cormorant Garamond", serif' }}
                >
                  Choisir la langue
                </h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-petrol/40 hover:text-petrol transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-8 py-8 space-y-10">
              {/* ── Langues internationales ── */}
              <div>
                <p className="text-[9px] tracking-[0.4em] uppercase text-petrol/40 mb-4">
                  Langues internationales
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {intlLangs.map((l) => (
                    <LangButton
                      key={l.code}
                      lang={l}
                      isActive={lang === l.code}
                      onSelect={() => {
                        setLang(l.code);
                        setOpen(false);
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* ── Langues de l'héritage ── */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <p className="text-[9px] tracking-[0.4em] uppercase text-petrol/40">
                    Langues de l'héritage KALASAM
                  </p>
                  <div className="h-px flex-1 bg-gold/30" />
                </div>

                {/* Regroupées par région */}
                {["Philippines", "Maroc", "Sri Lanka"].map((region) => {
                  const regionLangs = heritageLangs.filter(
                    (l) => l.region === region,
                  );
                  const regionFlags = {
                    Philippines: "🇵🇭",
                    Maroc: "🇲🇦",
                    "Sri Lanka": "🇱🇰",
                  };
                  return (
                    <div key={region} className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-base">{regionFlags[region]}</span>
                        <span className="text-[9px] tracking-[0.3em] uppercase text-petrol/50 font-medium">
                          {region}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pl-6">
                        {regionLangs.map((l) => (
                          <LangButton
                            key={l.code}
                            lang={l}
                            isActive={lang === l.code}
                            onSelect={() => {
                              setLang(l.code);
                              setOpen(false);
                            }}
                            isHeritage
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer du panel */}
            <div className="px-8 py-5 border-t border-petrol/10 bg-sand-light/20">
              <p className="text-[10px] text-petrol/50 font-light text-center">
                Les traductions sont en cours d'amélioration continue. Certaines
                langues peuvent être partiellement traduites.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─────────────────────────────────────────────
//  6. BOUTON DE LANGUE (sous-composant)
// ─────────────────────────────────────────────

function LangButton({ lang: l, isActive, onSelect, isHeritage = false }) {
  return (
    <button
      onClick={onSelect}
      className={`
        relative flex items-center gap-2.5 px-3 py-2.5 text-left
        border transition-all duration-200
        ${
          isActive
            ? "border-gold bg-gold/8 text-petrol"
            : isHeritage
              ? "border-gold/25 bg-gold/3 hover:border-gold/50 hover:bg-gold/6"
              : "border-petrol/15 hover:border-petrol/30 hover:bg-petrol/3"
        }
      `}
    >
      {isActive && (
        <Check size={10} className="absolute top-1.5 right-1.5 text-gold" />
      )}
      <span className="text-lg leading-none flex-shrink-0">{l.flag}</span>
      <span className="flex flex-col gap-0.5 min-w-0">
        <span className="text-[12px] font-medium text-petrol truncate">
          {l.native}
        </span>
        <span className="text-[10px] text-petrol/50 truncate">{l.label}</span>
      </span>
    </button>
  );
}

/* =========================================================
   GUIDE D'INTÉGRATION
   ──────────────────────────────────────────────────────────

   ÉTAPE 1 — Envelopper l'app
   ──────────────────────────
   Dans main.jsx ou index.jsx :

     import { LanguageProvider } from './i18n';

     root.render(
       <LanguageProvider>
         <KalasamSite />
       </LanguageProvider>
     );

   ÉTAPE 2 — Ajouter le sélecteur dans le Header
   ─────────────────────────────────────────────
   Dans le bloc "Droite : Utilitaires" de KalasamSite :

     import { LanguageSelector } from './i18n';

     // Après le bouton Search, avant User :
     <LanguageSelector />

   ÉTAPE 3 — Utiliser les traductions dans les composants
   ──────────────────────────────────────────────────────
   Dans n'importe quel composant :

     import { useTranslation } from './i18n';

     function MonComposant() {
       const { t } = useTranslation();
       return <h1>{t('hero.headline1')} <em>{t('hero.headline2')}</em></h1>;
     }

   ÉTAPE 4 — Ajouter une nouvelle clé de traduction
   ──────────────────────────────────────────────────
   Dans TRANSLATIONS, ajouter :

     "ma.nouvelle.cle": {
       fr: "Texte en français",
       en: "Text in English",
       tl: "Teksto sa Filipino",
       ta: "தமிழ் உரை",
       // ... autres langues
     },

   ========================================================= */
