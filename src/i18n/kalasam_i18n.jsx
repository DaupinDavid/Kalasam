import React, { useState, useContext, createContext, useCallback } from "react";
import { createPortal } from "react-dom";
import { Globe, Check, X, ChevronDown } from "lucide-react";

/* =========================================================
   KALASAM — Système d'internationalisation (i18n)
   ========================================================= */

// ─────────────────────────────────────────────
//  1. DICTIONNAIRE DES LANGUES
// ─────────────────────────────────────────────

export const LANGUAGES = {
  // ── Langues internationales ──────────────────
  fr: { code: "fr", flag: "🇫🇷", native: "Français", label: "Français", group: "international", dir: "ltr" },
  en: { code: "en", flag: "🇬🇧", native: "English", label: "Anglais", group: "international", dir: "ltr" },
  es: { code: "es", flag: "🇪🇸", native: "Español", label: "Espagnol", group: "international", dir: "ltr" },
  de: { code: "de", flag: "🇩🇪", native: "Deutsch", label: "Allemand", group: "international", dir: "ltr" },
  it: { code: "it", flag: "🇮🇹", native: "Italiano", label: "Italien", group: "international", dir: "ltr" },
  pt: { code: "pt", flag: "🇵🇹", native: "Português", label: "Portugais", group: "international", dir: "ltr" },
  zh: { code: "zh", flag: "🇨🇳", native: "中文", label: "Chinois", group: "international", dir: "ltr" },
  ja: { code: "ja", flag: "🇯🇵", native: "日本語", label: "Japonais", group: "international", dir: "ltr" },

  // ── Langues de l'héritage KALASAM ────────────
  tl: { code: "tl", flag: "🇵🇭", native: "Filipino", label: "Tagalog", group: "heritage", region: "Philippines", dir: "ltr" },
  ceb: { code: "ceb", flag: "🇵🇭", native: "Cebuano", label: "Cebuano", group: "heritage", region: "Philippines", dir: "ltr" },
  ar: { code: "ar", flag: "🇲🇦", native: "العربية", label: "Arabe", group: "heritage", region: "Maroc", dir: "rtl" },
  ber: { code: "ber", flag: "🇲🇦", native: "ⵜⴰⵎⴰⵣⵉⵖⵜ", label: "Tamazight", group: "heritage", region: "Maroc", dir: "ltr" },
  ta: { code: "ta", flag: "🇱🇰", native: "தமிழ்", label: "Tamoul", group: "heritage", region: "Sri Lanka", dir: "ltr" },
  si: { code: "si", flag: "🇱🇰", native: "සිංහල", label: "Cingalais", group: "heritage", region: "Sri Lanka", dir: "ltr" },
};

// ─────────────────────────────────────────────
//  2. TRADUCTIONS
// ─────────────────────────────────────────────

const TRANSLATIONS = {
  "nav.search": {
    "fr": "Rechercher une pièce, une catégorie, un chapitre...",
    "en": "Search for a piece, category, chapter...",
    "es": "Buscar una pieza, categoría, capítulo...",
    "de": "Nach einem Stück, einer Kategorie, einem Kapitel suchen...",
    "it": "Cerca un pezzo, categoria, capitolo...",
    "pt": "Procurar uma peça, categoria, capítulo...",
    "zh": "搜索单品、类别、章节...",
    "ja": "アイテム、カテゴリー、チャプターを検索...",
    "tl": "Maghanap ng piraso, kategorya, kabanata...",
    "ceb": "Pangita og piraso, kategorya, kapitulo...",
    "ar": "ابحث عن قطعة، فئة، فصل...",
    "ber": "Nadi ɣef uḥric, tawsit, ixef...",
    "ta": "ஒரு துண்டு, வகை, அத்தியாயத்தைத் தேடுங்கள்...",
    "si": "කෑල්ලක්, වර්ගයක්, පරිච්ඡේදයක් සොයන්න..."
  },
  "nav.home": {
    "fr": "Accueil", "en": "Home", "es": "Inicio", "de": "Startseite",
    "it": "Home", "pt": "Início", "zh": "首页", "ja": "ホーム",
    "tl": "Bahay", "ceb": "Balay", "ar": "الرئيسية", "ber": "Axxam",
    "ta": "முகப்பு", "si": "මුල් පිටුව"
  },
  "nav.account": {
    "fr": "Mon compte", "en": "My Account", "es": "Mi cuenta", "de": "Mein Konto",
    "it": "Il mio account", "pt": "Minha conta", "zh": "我的账户", "ja": "マイアカウント",
    "tl": "Aking Account", "ceb": "Akong Account", "ar": "حسابي", "ber": "Amiḍan-iw",
    "ta": "என் கணக்கு", "si": "මගේ ගිණුම"
  },
  "nav.wishlist": {
    "fr": "Favoris", "en": "Wishlist", "es": "Favoritos", "de": "Wunschzettel",
    "it": "Preferiti", "pt": "Favoritos", "zh": "收藏夹", "ja": "お気に入り",
    "tl": "Mga Paborito", "ceb": "Paborito", "ar": "المفضلة", "ber": "Ismiliyen",
    "ta": "விருப்பப்பட்டியல்", "si": "ප්‍රියතම"
  },
  "nav.allPieces": {
    "fr": "Toutes les pièces", "en": "All pieces", "es": "Todas las piezas", "de": "Alle Stücke",
    "it": "Tutti i pezzi", "pt": "Todas as peças", "zh": "所有单品", "ja": "すべてのアイテム",
    "tl": "Lahat ng piraso", "ceb": "Tanan nga piraso", "ar": "كل القطع", "ber": "Akk ihricen",
    "ta": "அனைத்து துண்டுகளும்", "si": "සියලුම කෑලි"
  },
  "hero.cta.readStory": {
    "fr": "Lire l'histoire complète", "en": "Read the full story", "es": "Leer la historia completa",
    "de": "Ganze Geschichte lesen", "it": "Leggi la storia completa", "pt": "Ler a história completa",
    "zh": "阅读完整故事", "ja": "ストーリー全体を読む", "tl": "Basahin ang buong kwento",
    "ceb": "Basaha ang tibuok istorya", "ar": "اقرأ القصة كاملة", "ber": "Ɣer tanarrayt iweznen",
    "ta": "முழு கதையையும் படிக்கவும்", "si": "සම්පූර්ණ කතාව කියවන්න"
  },
  "shop.subtitle": {
    "fr": "La boutique", "en": "The Shop", "es": "La tienda", "de": "Der Shop",
    "it": "Il negozio", "pt": "A loja", "zh": "商店", "ja": "ショップ",
    "tl": "Ang tindahan", "ceb": "Ang tindahan", "ar": "المتجر", "ber": "Aḥanut",
    "ta": "கடை", "si": "සාප්පුව"
  },
  "shop.filters": {
    "fr": "Filtres", "en": "Filters", "es": "Filtros", "de": "Filter",
    "it": "Filtri", "pt": "Filtros", "zh": "筛选", "ja": "フィルター",
    "tl": "Mga Filter", "ceb": "Mga Filter", "ar": "تصفية", "ber": "Izwiyen",
    "ta": "வடிகட்டிகள்", "si": "පෙරහන්"
  },
  "shop.sort": {
    "fr": "Tri", "en": "Sort", "es": "Ordenar", "de": "Sortieren",
    "it": "Ordina", "pt": "Ordenar", "zh": "排序", "ja": "並べ替え",
    "tl": "Pag-uuri", "ceb": "Paghan-ay", "ar": "فرز", "ber": "Afran",
    "ta": "வரிசைப்படுத்து", "si": "වර්ග කරන්න"
  },
  "shop.sortNewest": {
    "fr": "Plus récents", "en": "Newest", "es": "Más recientes", "de": "Neueste",
    "it": "Più recenti", "pt": "Mais recentes", "zh": "最新", "ja": "新着順",
    "tl": "Pinakabago", "ceb": "Kinaulhian", "ar": "الأحدث", "ber": "Imaynuten",
    "ta": "புதியது", "si": "නවතම"
  },
  "shop.sortAsc": {
    "fr": "Prix croissant", "en": "Price: Low to High", "es": "Precio ascendente",
    "de": "Preis aufsteigend", "it": "Prezzo crescente", "pt": "Preço crescente",
    "zh": "价格由低到高", "ja": "価格の安い順", "tl": "Presyo pataas",
    "ceb": "Presyo pataas", "ar": "السعر تصاعدي", "ber": "Azal yessawen",
    "ta": "விலை ஏறுவரிசை", "si": "මිල ආරෝහණ"
  },
  "shop.sortDesc": {
    "fr": "Prix décroissant", "en": "Price: High to Low", "es": "Precio descendente",
    "de": "Preis absteigend", "it": "Prezzo decrescente", "pt": "Preço decrescente",
    "zh": "价格由高到低", "ja": "価格の高い順", "tl": "Presyo pababa",
    "ceb": "Presyo pababa", "ar": "السعر تنازلي", "ber": "Azal yader",
    "ta": "விலை இறங்குவரிசை", "si": "මිල අවරෝහණ"
  },
  "shop.empty": {
    "fr": "Aucune pièce trouvée", "en": "No pieces found", "es": "No se encontraron piezas",
    "de": "Keine Stücke gefunden", "it": "Nessun pezzo trovato", "pt": "Nenhuma peça encontrada",
    "zh": "未找到单品", "ja": "アイテムが見つかりません", "tl": "Walang nahanap na piraso",
    "ceb": "Walay nakit-an nga piraso", "ar": "لم يتم العثور على قطع", "ber": "Ulac aḥric",
    "ta": "எந்த துண்டுகளும் கிடைக்கவில்லை", "si": "කෑලි හමු නොවිණි"
  },
  "shop.seeAll": {
    "fr": "Tout voir", "en": "See all", "es": "Ver todo", "de": "Alles ansehen",
    "it": "Vedi tutto", "pt": "Ver tudo", "zh": "查看全部", "ja": "すべて見る",
    "tl": "Makita lahat", "ceb": "Tan-awa ang tanan", "ar": "رؤية الكل", "ber": "Wali akk",
    "ta": "அனைத்தையும் காண்க", "si": "සියල්ල බලන්න"
  },
  "product.backToShop": {
    "fr": "Retour à la boutique", "en": "Back to shop", "es": "Volver a la tienda",
    "de": "Zurück zum Shop", "it": "Torna al negozio", "pt": "Voltar à loja",
    "zh": "返回商店", "ja": "ショップに戻る", "tl": "Bumalik sa tindahan",
    "ceb": "Balik sa tindahan", "ar": "العودة إلى المتجر", "ber": "Uɣal ɣer tḥanut",
    "ta": "கடைக்குத் திரும்பு", "si": "සාප්පුව වෙත ආපසු"
  },
  "product.colorLabel": {
    "fr": "Coloris :", "en": "Color:", "es": "Color:", "de": "Farbe:",
    "it": "Colore:", "pt": "Cor:", "zh": "颜色:", "ja": "カラー:",
    "tl": "Kulay:", "ceb": "Kolor:", "ar": "اللون:", "ber": "Ini:",
    "ta": "நிறம்:", "si": "වර්ණය:"
  },
  "product.sizeGuide": {
    "fr": "Guide des tailles", "en": "Size guide", "es": "Guía de tallas",
    "de": "Größentabelle", "it": "Guida alle taglie", "pt": "Guia de tamanhos",
    "zh": "尺码指南", "ja": "サイズガイド", "tl": "Gabay sa sukat",
    "ceb": "Gihatagan og gidak-on", "ar": "دليل المقاسات", "ber": "Amanar n tɣezzi",
    "ta": "அளவு வழிகாட்டி", "si": "ප්‍රමාණ මාර්ගෝපදේශය"
  },
  "product.completeLook": {
    "fr": "Compléter la silhouette", "en": "Complete the look", "es": "Completa el look",
    "de": "Vervollständigen Sie den Look", "it": "Completa il look", "pt": "Completar o look",
    "zh": "完善造型", "ja": "ルックを完成させる", "tl": "Kumpletuhin ang hitsura",
    "ceb": "Kumpletaha ang porma", "ar": "أكمل الإطلالة", "ber": "Kfu tewliwt",
    "ta": "தோற்றத்தை நிறைவு செய்க", "si": "පෙනුම සම්පූර්ණ කරන්න"
  },
  "product.artOfSet": {
    "fr": "L'art de l'ensemble", "en": "The art of the ensemble", "es": "El arte del conjunto",
    "de": "Die Kunst des Ensembles", "it": "L'arte dell'insieme", "pt": "A arte do conjunto",
    "zh": "套装的艺术", "ja": "アンサンブルの芸術", "tl": "Ang sining ng ensemble",
    "ceb": "Ang arte sa set", "ar": "فن التنسيق", "ber": "Taẓuri n ugemmay",
    "ta": "தொகுப்பின் கலை", "si": "කට්ටලයේ කලාව"
  },
  "cart.shopNow": {
    "fr": "Voir la boutique", "en": "Go to shop", "es": "Ir a la tienda",
    "de": "Zum Shop", "it": "Vai al negozio", "pt": "Ir para a loja",
    "zh": "去商店", "ja": "ショップへ行く", "tl": "Pumunta sa tindahan",
    "ceb": "Adto sa tindahan", "ar": "الذهاب للمتجر", "ber": "Aḥanut",
    "ta": "கடைக்குச் செல்", "si": "සාප්පුවට යන්න"
  },
  "cart.securePayment": {
    "fr": "Paiement sécurisé · Livraison soignée", "en": "Secure payment · Careful shipping",
    "es": "Pago seguro · Envío cuidadoso", "de": "Sichere Zahlung · Sorgfältiger Versand",
    "it": "Pagamento sicuro · Spedizione accurata", "pt": "Pagamento seguro · Envio cuidadoso",
    "zh": "安全支付 · 细心配送", "ja": "安全な支払い · 丁寧な配送",
    "tl": "Ligtas na pagbabayad · Maingat na pagpapadala", "ceb": "Luwas nga pagbayad · Maayo nga pagpadala",
    "ar": "دفع آمن · شحن دقيق", "ber": "Afruy aɣelsan · Tawenza tazedgant",
    "ta": "பாதுகாப்பான கட்டணம் · கவனமான கப்பல்", "si": "ආරක්ෂිත ගෙවීම් · ප්‍රවේශම් සහගත නැව්ගත කිරීම"
  },
  "checkout.summary": {
    "fr": "Résumé de la commande", "en": "Order summary", "es": "Resumen del pedido",
    "de": "Bestellübersicht", "it": "Riepilogo ordine", "pt": "Resumo da encomenda",
    "zh": "订单摘要", "ja": "注文の概要", "tl": "Buod ng order",
    "ceb": "Katingbanan sa order", "ar": "ملخص الطلب", "ber": "Agzul n tladna",
    "ta": "ஆர்டர் சுருக்கம்", "si": "ඇණවුම් සාරාංශය"
  },
  "checkout.submit": {
    "fr": "Valider la Commande", "en": "Confirm Order", "es": "Confirmar pedido",
    "de": "Bestellung bestätigen", "it": "Conferma ordine", "pt": "Confirmar encomenda",
    "zh": "确认订单", "ja": "注文を確定", "tl": "Kumpirmahin ang Order",
    "ceb": "Kumpirma ang Order", "ar": "تأكيد الطلب", "ber": "Seɣbel taladna",
    "ta": "ஆர்டரை உறுதிப்படுத்து", "si": "ඇණවුම තහවුරු කරන්න"
  },
  "checkout.contact": {
    "fr": "1. Contact", "en": "1. Contact", "es": "1. Contacto", "de": "1. Kontakt",
    "it": "1. Contatto", "pt": "1. Contacto", "zh": "1. 联系方式", "ja": "1. 連絡先",
    "tl": "1. Makipag-ugnayan", "ceb": "1. Kontak", "ar": "١. الاتصال", "ber": "1. Anɣ-d-muqel",
    "ta": "1. தொடர்பு", "si": "1. සම්බන්ධ කරන්න"
  },
  "checkout.shipping": {
    "fr": "2. Livraison", "en": "2. Shipping", "es": "2. Envío", "de": "2. Versand",
    "it": "2. Spedizione", "pt": "2. Envio", "zh": "2. 配送", "ja": "2. 配送",
    "tl": "2. Pagpapadala", "ceb": "2. Pagpadala", "ar": "٢. الشحن", "ber": "2. Tawenza",
    "ta": "2. ஷிப்பிங்", "si": "2. නැව්ගත කිරීම"
  },
  "checkout.payment": {
    "fr": "3. Paiement", "en": "3. Payment", "es": "3. Pago", "de": "3. Zahlung",
    "it": "3. Pagamento", "pt": "3. Pagamento", "zh": "3. 支付", "ja": "3. 支払い",
    "tl": "3. Pagbabayad", "ceb": "3. Pagbayad", "ar": "٣. الدفع", "ber": "3. Afruy",
    "ta": "3. பணம் செலுத்துதல்", "si": "3. ගෙවීම"
  },
  "checkout.gift": {
    "fr": "L'Art d'Offrir (Cadeau)", "en": "The Art of Gifting", "es": "El arte de regalar",
    "de": "Die Kunst des Schenkens", "it": "L'arte di regalare", "pt": "A Arte de Oferecer",
    "zh": "赠礼的艺术", "ja": "贈る芸術", "tl": "Ang Sining ng Pagbibigay",
    "ceb": "Ang Arte sa Paghatag", "ar": "فن الإهداء", "ber": "Taẓuri n tukci",
    "ta": "பரிசளிக்கும் கலை", "si": "තෑගි දීමේ කලාව"
  },
  "checkout.confirmed": {
    "fr": "Commande confirmée", "en": "Order confirmed", "es": "Pedido confirmado",
    "de": "Bestellung bestätigt", "it": "Ordine confermato", "pt": "Encomenda confirmada",
    "zh": "订单已确认", "ja": "注文が確定しました", "tl": "Nakumpirma ang order",
    "ceb": "Kumpirmado ang order", "ar": "تم تأكيد الطلب", "ber": "Taladna tettwaseɣbel",
    "ta": "ஆர்டர் உறுதிப்படுத்தப்பட்டது", "si": "ඇණවුම තහවුරු කර ඇත"
  },
  "checkout.thanks": {
    "fr": "Merci pour votre confiance.", "en": "Thank you for your trust.", "es": "Gracias por su confianza.",
    "de": "Danke für Ihr Vertrauen.", "it": "Grazie per la tua fiducia.", "pt": "Obrigado pela sua confiança.",
    "zh": "感谢您的信任。", "ja": "ご信頼ありがとうございます。", "tl": "Salamat sa iyong tiwala.",
    "ceb": "Salamat sa imong pagsalig.", "ar": "شكرا لثقتكم.", "ber": "Tanemmirt ɣef laman-nwen.",
    "ta": "உங்கள் நம்பிக்கைக்கு நன்றி.", "si": "ඔබේ විශ්වාසයට ස්තූතියි."
  },
  "checkout.backHome": {
    "fr": "Retour à l'accueil", "en": "Back to home", "es": "Volver al inicio",
    "de": "Zurück zur Startseite", "it": "Torna alla home", "pt": "Voltar ao início",
    "zh": "返回首页", "ja": "ホームに戻る", "tl": "Bumalik sa bahay",
    "ceb": "Balik sa balay", "ar": "العودة للرئيسية", "ber": "Uɣal ɣer uxxam",
    "ta": "முகப்புக்குத் திரும்பு", "si": "මුල් පිටුවට ආපසු"
  },
  "form.firstname": {
    "fr": "Prénom", "en": "First name", "es": "Nombre", "de": "Vorname",
    "it": "Nome", "pt": "Nome", "zh": "名字", "ja": "名",
    "tl": "Pangalan", "ceb": "Ngalan", "ar": "الاسم", "ber": "Isem",
    "ta": "முதல் பெயர்", "si": "මුල් නම"
  },
  "form.lastname": {
    "fr": "Nom", "en": "Last name", "es": "Apellido", "de": "Nachname",
    "it": "Cognome", "pt": "Apelido", "zh": "姓氏", "ja": "姓",
    "tl": "Apelyido", "ceb": "Apelyido", "ar": "اللقب", "ber": "Isem n twacult",
    "ta": "கடைசி பெயர்", "si": "අවසාන නම"
  },
  "form.email": {
    "fr": "E-mail", "en": "Email", "es": "Correo electrónico", "de": "E-Mail",
    "it": "Email", "pt": "Email", "zh": "电子邮件", "ja": "メールアドレス",
    "tl": "Email", "ceb": "Email", "ar": "البريد الإلكتروني", "ber": "Imayl",
    "ta": "மின்னஞ்சல்", "si": "විද්‍යුත් තැපෑල"
  },
  "form.password": {
    "fr": "Mot de passe", "en": "Password", "es": "Contraseña", "de": "Passwort",
    "it": "Password", "pt": "Palavra-passe", "zh": "密码", "ja": "パスワード",
    "tl": "Password", "ceb": "Password", "ar": "كلمة المرور", "ber": "Awal n uɛeddi",
    "ta": "கடவுச்சொல்", "si": "මුරපදය"
  },
  "form.address": {
    "fr": "Adresse", "en": "Address", "es": "Dirección", "de": "Adresse",
    "it": "Indirizzo", "pt": "Endereço", "zh": "地址", "ja": "住所",
    "tl": "Address", "ceb": "Address", "ar": "العنوان", "ber": "Tansa",
    "ta": "முகவரி", "si": "ලිපිනය"
  },
  "form.zip": {
    "fr": "Code postal", "en": "Zip code", "es": "Código postal", "de": "Postleitzahl",
    "it": "Cap", "pt": "Código postal", "zh": "邮政编码", "ja": "郵便番号",
    "tl": "Zip code", "ceb": "Zip code", "ar": "الرمز البريدي", "ber": "Angal n tansa",
    "ta": "அஞ்சல் குறியீடு", "si": "තැපැල් කේතය"
  },
  "form.city": {
    "fr": "Ville", "en": "City", "es": "Ciudad", "de": "Stadt",
    "it": "Città", "pt": "Cidade", "zh": "城市", "ja": "市",
    "tl": "Lungsod", "ceb": "Siyudad", "ar": "المدينة", "ber": "Tamdint",
    "ta": "நகரம்", "si": "නගරය"
  },
  "form.cardName": {
    "fr": "Nom sur la carte", "en": "Name on card", "es": "Nombre en la tarjeta", "de": "Name auf der Karte",
    "it": "Nome sulla carta", "pt": "Nome no cartão", "zh": "持卡人姓名", "ja": "カード名義",
    "tl": "Pangalan sa card", "ceb": "Ngalan sa card", "ar": "الاسم على البطاقة", "ber": "Isem ɣef tkaṛṭat",
    "ta": "அட்டையில் பெயர்", "si": "කාඩ්පතේ නම"
  },
  "form.cardNumber": {
    "fr": "Numéro de carte", "en": "Card number", "es": "Número de tarjeta", "de": "Kartennummer",
    "it": "Numero di carta", "pt": "Número do cartão", "zh": "卡号", "ja": "カード番号",
    "tl": "Numero ng card", "ceb": "Numero sa card", "ar": "رقم البطاقة", "ber": "Uṭṭun n tkaṛṭat",
    "ta": "அட்டை எண்", "si": "කාඩ්පත් අංකය"
  },
  "form.confirm": {
    "fr": "Confirmer la demande", "en": "Confirm request", "es": "Confirmar solicitud", "de": "Anfrage bestätigen",
    "it": "Conferma richiesta", "pt": "Confirmar pedido", "zh": "确认请求", "ja": "リクエストを確定",
    "tl": "Kumpirmahin ang kahilingan", "ceb": "Kumpirma ang hangyo", "ar": "تأكيد الطلب", "ber": "Seɣbel asuter",
    "ta": "கோரிக்கையை உறுதிப்படுத்து", "si": "ඉල්ලීම තහවුරු කරන්න"
  },
  "account.logout": {
    "fr": "Se déconnecter", "en": "Log out", "es": "Cerrar sesión", "de": "Abmelden",
    "it": "Disconnetti", "pt": "Terminar sessão", "zh": "登出", "ja": "ログアウト",
    "tl": "Mag-logout", "ceb": "Pag-logout", "ar": "تسجيل الخروج", "ber": "Ffeɣ",
    "ta": "வெளியேறு", "si": "ඉවත් වන්න"
  },
  "account.history": {
    "fr": "Historique des commandes", "en": "Order history", "es": "Historial de pedidos", "de": "Bestellverlauf",
    "it": "Cronologia ordini", "pt": "Histórico de encomendas", "zh": "订单历史", "ja": "注文履歴",
    "tl": "Kasaysayan ng order", "ceb": "Kasaysayan sa order", "ar": "سجل الطلبات", "ber": "Amazray n tladniwin",
    "ta": "ஆர்டர் வரலாறு", "si": "ඇණවුම් ඉතිහාසය"
  },
  "account.login": {
    "fr": "Connexion", "en": "Log in", "es": "Iniciar sesión", "de": "Anmelden",
    "it": "Accedi", "pt": "Iniciar sessão", "zh": "登录", "ja": "ログイン",
    "tl": "Mag-login", "ceb": "Pag-login", "ar": "تسجيل الدخول", "ber": "Kcem",
    "ta": "உள்நுழைக", "si": "ඇතුල් වන්න"
  },
  "account.signup": {
    "fr": "Créer un compte", "en": "Create account", "es": "Crear cuenta", "de": "Konto erstellen",
    "it": "Crea account", "pt": "Criar conta", "zh": "创建账户", "ja": "アカウント作成",
    "tl": "Gumawa ng account", "ceb": "Paghimo og account", "ar": "إنشاء حساب", "ber": "Snulfu-d amiḍan",
    "ta": "கணக்கை உருவாக்கு", "si": "ගිණුමක් සාදන්න"
  },
  "account.loginAction": {
    "fr": "Se connecter", "en": "Log in", "es": "Iniciar sesión", "de": "Anmelden",
    "it": "Accedi", "pt": "Iniciar sessão", "zh": "登录", "ja": "ログイン",
    "tl": "Mag-login", "ceb": "Pag-login", "ar": "تسجيل الدخول", "ber": "Kcem",
    "ta": "உள்நுழைக", "si": "ඇතුල් වන්න"
  },
  "account.signupAction": {
    "fr": "Créer mon compte", "en": "Create my account", "es": "Crear mi cuenta", "de": "Mein Konto erstellen",
    "it": "Crea il mio account", "pt": "Criar a minha conta", "zh": "创建我的账户", "ja": "マイアカウントを作成",
    "tl": "Gumawa ng aking account", "ceb": "Paghimo sa akong account", "ar": "إنشاء حسابي", "ber": "Snulfu-d amiḍan-iw",
    "ta": "என் கணக்கை உருவாக்கு", "si": "මගේ ගිණුම සාදන්න"
  },
  "chat.advisor": {
    "fr": "Conseiller Privé", "en": "Private Advisor", "es": "Asesor privado", "de": "Privater Berater",
    "it": "Consulente privato", "pt": "Conselheiro Privado", "zh": "私人顾问", "ja": "プライベートアドバイザー",
    "tl": "Pribadong Tagapayo", "ceb": "Pribado nga Magtatambag", "ar": "مستشار خاص", "ber": "Amesnal abaḍni",
    "ta": "தனிப்பட்ட ஆலோசகர்", "si": "පෞද්ගලික උපදේශක"
  },
  "chat.advisorName": {
    "fr": "Conseiller KALASAM", "en": "KALASAM Advisor", "es": "Asesor KALASAM", "de": "KALASAM Berater",
    "it": "Consulente KALASAM", "pt": "Conselheiro KALASAM", "zh": "KALASAM顾问", "ja": "KALASAM アドバイザー",
    "tl": "Tagapayo ng KALASAM", "ceb": "KALASAM Advisor", "ar": "مستشار كالاسام", "ber": "Amesnal KALASAM",
    "ta": "கலசம் ஆலோசகர்", "si": "කලසම් උපදේශක"
  },
  "chat.online": {
    "fr": "En ligne", "en": "Online", "es": "En línea", "de": "Online",
    "it": "Online", "pt": "Online", "zh": "在线", "ja": "オンライン",
    "tl": "Online", "ceb": "Online", "ar": "متصل", "ber": "Srid",
    "ta": "ஆன்லைன்", "si": "මාර්ගගතව"
  },
  "chat.placeholder": {
    "fr": "Écrivez votre message...", "en": "Write your message...", "es": "Escribe tu mensaje...", "de": "Schreiben Sie Ihre Nachricht...",
    "it": "Scrivi il tuo messaggio...", "pt": "Escreva a sua mensagem...", "zh": "写下您的留言...", "ja": "メッセージを入力...",
    "tl": "Isulat ang iyong mensahe...", "ceb": "Isulat ang imong mensahe...", "ar": "اكتب رسالتك...", "ber": "Aru izen-nnek...",
    "ta": "உங்கள் செய்தியை எழுதவும்...", "si": "ඔබේ පණිවිඩය ලියන්න..."
  },
  "modal.bookingTitle": {
    "fr": "Essayage Privé", "en": "Private Fitting", "es": "Prueba privada", "de": "Private Anprobe",
    "it": "Prova privata", "pt": "Prova Privada", "zh": "私人试穿", "ja": "プライベート試着",
    "tl": "Pribadong Fitting", "ceb": "Pribado nga Fitting", "ar": "تجربة قياس خاصة", "ber": "Aɛraḍ abaḍni",
    "ta": "தனிப்பட்ட பொருத்தம்", "si": "පෞද්ගලික ෆිටිං"
  },
  "newsletter.subtitle": {
    "fr": "Lettre KALASAM", "en": "KALASAM Newsletter", "es": "Boletín KALASAM", "de": "KALASAM Newsletter",
    "it": "Newsletter KALASAM", "pt": "Newsletter KALASAM", "zh": "KALASAM 新闻通讯", "ja": "KALASAM ニュースレター",
    "tl": "Newsletter ng KALASAM", "ceb": "KALASAM Newsletter", "ar": "نشرة كالاسام", "ber": "Izen KALASAM",
    "ta": "கலசம் செய்திமடல்", "si": "කලසම් පුවත් පත්‍රිකාව"
  },
  "newsletter.title": {
    "fr": "Recevez nos chapitres avant tout le monde", "en": "Receive our chapters before everyone else", "es": "Recibe nuestros capítulos antes que nadie", "de": "Erhalten Sie unsere Kapitel als Erste",
    "it": "Ricevi i nostri capitoli prima di tutti", "pt": "Receba os nossos capítulos antes de todos", "zh": "第一时间收到我们的章节", "ja": "誰よりも先にチャプターを受け取る",
    "tl": "Makatanggap ng aming mga kabanata nang una", "ceb": "Makadawat sa among mga kapitulo una", "ar": "تلقَّ فصولنا قبل الجميع", "ber": "Aǧǧ-aɣ-d ifaṣṣalen-nneɣ",
    "ta": "எங்கள் அத்தியாயங்களை முதலில் பெறுங்கள்", "si": "අපගේ පරිච්ඡේද කලින්ම ලබාගන්න"
  },
  "newsletter.subscribe": {
    "fr": "S'inscrire", "en": "Subscribe", "es": "Suscribirse", "de": "Abonnieren",
    "it": "Iscriviti", "pt": "Subscrever", "zh": "订阅", "ja": "購読する",
    "tl": "Mag-subscribe", "ceb": "Mag-subscribe", "ar": "اشتراك", "ber": "Zemmem",
    "ta": "குழுசேர்", "si": "දායක වන්න"
  },
  "newsletter.success": {
    "fr": "Bienvenue. À très vite.", "en": "Welcome. See you soon.", "es": "Bienvenido. Hasta pronto.", "de": "Willkommen. Bis bald.",
    "it": "Benvenuto. A presto.", "pt": "Bem-vindo. Até breve.", "zh": "欢迎。回见。", "ja": "ようこそ。またお会いしましょう。",
    "tl": "Maligayang pagdating. Hanggang sa muli.", "ceb": "Welcome. Magkita ta unya.", "ar": "أهلاً بك. نراك قريباً.", "ber": "Ansuf. Ar timlilit.",
    "ta": "வரவேற்கிறோம். விரைவில் சந்திப்போம்.", "si": "සාදරයෙන් පිළිගනිමු. ඉක්මනින් හමුවෙමු."
  },
  "section.selection": {
    "fr": "La sélection", "en": "The selection", "es": "La selección", "de": "Die Auswahl",
    "it": "La selezione", "pt": "A seleção", "zh": "精选", "ja": "セレクション",
    "tl": "Ang seleksyon", "ceb": "Ang seleksyon", "ar": "التحديد", "ber": "Afernu",
    "ta": "தேர்வு", "si": "තේරීම"
  },
  "section.signatureItems": {
    "fr": "Pièces signature", "en": "Signature pieces", "es": "Piezas emblemáticas", "de": "Signaturstücke",
    "it": "Pezzi firma", "pt": "Peças assinatura", "zh": "标志性单品", "ja": "シグネチャーピース",
    "tl": "Mga signature na piraso", "ceb": "Mga signature nga piraso", "ar": "القطع المميزة", "ber": "Ilugan n tẓuri",
    "ta": "கையொப்ப ஆடைகள்", "si": "සිග්නේචර් කූලූ"
  },
  
};

// ─────────────────────────────────────────────
//  3. CONTEXTE REACT
// ─────────────────────────────────────────────

const LanguageContext = createContext({ lang: "fr", setLang: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem("kalasam-lang") || "fr"
  );

  const changeLang = useCallback((code) => {
    setLang(code);
    localStorage.setItem("kalasam-lang", code);
    // Direction RTL pour l'arabe
    document.documentElement.setAttribute(
      "dir",
      LANGUAGES[code]?.dir || "ltr"
    );
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
    [lang]
  );

  return { t, lang, setLang, langInfo: LANGUAGES[lang] };
}

// ─────────────────────────────────────────────
//  5. COMPOSANT SÉLECTEUR DE LANGUE
// ─────────────────────────────────────────────

export function LanguageSelector() {
  const { lang, setLang } = useContext(LanguageContext);
  const [open, setOpen] = useState(false);

  const intlLangs = Object.values(LANGUAGES).filter(
    (l) => l.group === "international"
  );
  const heritageLangs = Object.values(LANGUAGES).filter(
    (l) => l.group === "heritage"
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

      {/* ── Panneau de sélection propulsé dans le body ── */}
      {open && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-petrol/60 backdrop-blur-sm animate-fadeIn"
            onClick={() => setOpen(false)}
          />

          {/* Panel (Modale scrollable) */}
          <div
            className="relative bg-cream w-full max-w-2xl max-h-[85vh] overflow-y-auto animate-fadeUp shadow-2xl border border-petrol/10"
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
                      onSelect={() => { setLang(l.code); setOpen(false); }}
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
                {Array.from(new Set(heritageLangs.map(l => l.region).filter(Boolean))).map((region) => {
                  const regionLangs = heritageLangs.filter(
                    (l) => l.region === region
                  );
                  const regionFlag = regionLangs[0]?.flag || "🌐";
                  return (
                    <div key={region} className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-base">{regionFlag}</span>
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
                            onSelect={() => { setLang(l.code); setOpen(false); }}
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
                Les traductions sont en cours d'amélioration continue.
                Certaines langues peuvent être partiellement traduites.
              </p>
            </div>
          </div>
        </div>,
        document.body
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
        ${isActive
          ? "border-gold bg-gold/8 text-petrol"
          : isHeritage
            ? "border-gold/25 bg-gold/3 hover:border-gold/50 hover:bg-gold/6"
            : "border-petrol/15 hover:border-petrol/30 hover:bg-petrol/3"
        }
      `}
    >
      {isActive && (
        <Check
          size={10}
          className="absolute top-1.5 right-1.5 text-gold"
        />
      )}
      <span className="text-lg leading-none flex-shrink-0">{l.flag}</span>
      <span className="flex flex-col gap-0.5 min-w-0">
        <span className="text-[12px] font-medium text-petrol truncate">
          {l.native}
        </span>
        <span className="text-[10px] text-petrol/50 truncate">
          {l.label}
        </span>
      </span>
    </button>
  );
}