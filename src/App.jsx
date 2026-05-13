import React, { useState, useEffect, useMemo, useContext, createContext, useCallback } from "react";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  User,
  Heart,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  ArrowRight,
  ArrowUpRight,
  Mail,
  Truck,
  Package,
  Award,
  Globe,
  Check,
  Star,
  Filter,
  ChevronDown,
  MapPin,
  Phone,
  Play,
  MessageCircle,
  Calendar,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import { LanguageProvider, useTranslation, LanguageSelector } from "./i18n/kalasam_i18n";

/* =========================================================
   KALASAM — From exile to identity
   ========================================================= */

const SunMark = ({ size = 160, className = "", strokeWidth = 2.2 }) => (
  <img
    src="/favicon_kalasam.png"
    alt="Logo KALASAM"
    className={`${className} object-contain`}
    style={{ width: size, height: "auto" }}
  />
);

const Wordmark = ({ size = "lg", light = false }) => {
  const sizes = { sm: "text-lg", md: "text-2xl", lg: "text-4xl", xl: "text-6xl", xxl: "text-8xl" };
  return (
    <span
      className={`${sizes[size]} font-display tracking-[0.35em] font-light ${light ? "text-cream" : "text-petrol"}`}
      style={{ fontFamily: '"Cormorant Garamond", serif' }}
    >
      KALASAM
    </span>
  );
};

const PRODUCTS =[
  {
    id: 1,
    name: "Horizon",
    category: "Robes",
    price: 7800,
    colors:[
      {
        name: "Pétrole",
        hex: "#1E3F52",
        gallery:[
          { type: "image", src: "leader.jpeg" },
          { type: "image", src: "Image1.png" },
          { type: "image", src: "Image2.png" },
          { type: "image", src: "Image3.png" },
          { type: "video", src: "robe_video.mp4" },
        ],
      },
      {
        name: "Sable",
        hex: "#D2BD9C",
        gallery:[
          { type: "image", src: "leader_beige.png" },
          { type: "image", src: "leader_beige.png" },
          { type: "image", src: "leader_beige.png" },
          { type: "image", src: "leader_beige.png" },
          { type: "image", src: "leader_beige.png" },
        ],
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "Nouveauté",
    chapter: "Chapitre I — Origines",
    description: "Robe longue fluide aux drapés naturels. Une silhouette qui voyage, qui s'adapte, qui regarde vers l'avenir sans oublier d'où elle vient.",
    img: "leader.jpeg",
  },
  {
    id: 2,
    name: "Diaspora",
    category: "Hauts",
    price: 1200,
    colors: [
      { name: "Crème", hex: "#F4ECDB" },
      { name: "Noir", hex: "#000000" },
      { name: "Rouge", hex: "#B22222" },
    ],
    sizes: ["XS", "S", "M", "L"],
    badge: "Nouveauté",
    chapter: "Chapitre I — Origines",
    description: "Top en soie à coupe asymétrique. Inspiré des marchés colorés de Manille, transformé en une pièce précieuse qui raconte l'histoire d'un voyage.",
    img: "appel.jpeg",
    gallery: [
      { type: "image", src: "appel.jpeg" },
      { type: "image", src: "appel.jpeg" },
      { type: "image", src: "appel.jpeg" },
      { type: "image", src: "appel.jpeg" },
      { type: "video", src: "appel.mp4" },
    ],
  },
  {
    id: 3,
    name: "Héritage",
    category: "Pantalons",
    price: 2300,
    colors: [
      { name: "Ivoire", hex: "#F8F4ED" },
      { name: "Turquoise", hex: "#51B0AD" },
      { name: "Blanc", hex: "#FFFFFF" },
      { name: "Noir", hex: "#000000" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "Nouveauté",
    chapter: "Chapitre I — Origines",
    description: "Pantalon ample en lin lourd. Référence aux terres du nord du Sri Lanka, une coupe pensée pour ce qui reste quand on est obligé de partir, alliant confort et dignité.",
    img: "regulateur.jpeg",
    gallery:[
      { type: "image", src: "regulateur.jpeg" },
      { type: "image", src: "pantalon_dos.png" },
      { type: "image", src: "pantalon_droite.png" },
      { type: "image", src: "regulateur.jpeg" },
      { type: "video", src: "pantalon_video.mp4" },
    ],
  },
  {
    id: 4,
    name: "Vague",
    category: "Jupes",
    price: 2800,
    colors: [
      { name: "Sable", hex: "#D2BD9C" },
      { name: "Blanc", hex: "#FFFFFF" },
    ],
    sizes: ["XS", "S", "M", "L"],
    badge: "Nouveauté",
    chapter: "Chapitre I — Origines",
    description: "Jupe mi-longue aux ondulations subtiles. Un hommage aux mouvements de la mer et aux rivages qu'il a fallu traverser pour écrire une nouvelle histoire.",
    img: "tactique.jpeg",
    gallery:[
      { type: "image", src: "tactique.jpeg" },
      { type: "image", src: "vague_dos.png" },
      { type: "image", src: "vague_gauche.png" },
      { type: "image", src: "tactique.jpeg" },
      { type: "video", src: "Croctop_Jupe.mp4" },
    ],
  },
  {
    id: 5,
    name: "Aube",
    category: "Vestes",
    price: 5200,
    colors: [
      { name: "Sable", hex: "#D2BD9C" },
      { name: "Ivoire", hex: "#F8F4ED" },
      { name: "Turquoise", hex: "#51B0AD" },
      { name: "Noir", hex: "#000000" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "Nouveauté",
    chapter: "Chapitre I — Origines",
    description: "Veste tailleur structurée à l'épaule construite. Hommage à Bernadette, qui quitta sa province pour rejoindre Boulogne-Billancourt à une époque où peu de femmes osaient franchir ce seuil seules.",
    img: "avenir.jpeg",
    gallery:[
      { type: "image", src: "avenir.jpeg" },
      { type: "image", src: "blazzer_dos.png" },
      { type: "image", src: "blazzer_gauche.png" },
      { type: "image", src: "avenir.jpeg" },
      { type: "video", src: "blazzer_video.mp4" },
    ],
  },
];

const CATEGORIES = ["Tout", "Vestes", "Robes", "Hauts", "Pantalons", "Jupes"];

const ZoomableImage = ({ src, alt, className = "" }) => {
  const [position, setPosition] = useState("50% 50%");
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition(`${x}% ${y}%`);
  };

  return (
    <div
      className={`relative overflow-hidden cursor-zoom-in ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 ease-out"
        style={{
          transform: isHovered ? "scale(2)" : "scale(1)",
          transformOrigin: position,
        }}
      />
    </div>
  );
};

const ProductImage = ({ src, alt, name, className = "" }) => {
  const [errored, setErrored] = useState(false);
  useEffect(() => setErrored(false), [src]);

  return (
    <div className={`relative overflow-hidden bg-sand ${className}`}>
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #E8DBC2 0%, #D2BD9C 50%, #B8A076 100%)",
        }}
      >
        <div className="text-center px-4">
          <SunMark size={42} className="opacity-60 mx-auto mb-2" />
          <span
            className="font-display text-petrol/70 tracking-[0.3em] text-xs uppercase"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            {name}
          </span>
        </div>
      </div>
      {!errored && (
        <img
          src={src}
          alt={alt}
          onError={() => setErrored(true)}
          className="relative w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          loading="lazy"
        />
      )}
    </div>
  );
};

const ProductCard = ({ product, onOpen, onAdd, onWish }) => {
  const { t } = useTranslation();
  return (
    <div className="group cursor-pointer flex flex-col">
      <div
        className="relative aspect-[3/4] overflow-hidden mb-4"
        onClick={() => onOpen(product)}
      >
        <ProductImage src={product.img} alt={product.name} name={product.name} className="absolute inset-0" />
        {product.badge && (
          <span className="absolute top-4 left-4 bg-cream/90 backdrop-blur px-3 py-1 text-[10px] tracking-[0.25em] uppercase text-petrol font-light">
            {product.badge}
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onWish(product); }}
          className="absolute top-4 right-4 w-9 h-9 bg-cream/90 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-cream"
          aria-label="Ajouter à la wishlist"
        >
          <Heart size={15} className="text-petrol" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onAdd(product); }}
          className="absolute bottom-0 left-0 right-0 bg-petrol text-cream py-4 text-[11px] tracking-[0.3em] uppercase font-light translate-y-full group-hover:translate-y-0 transition-transform duration-500 hover:bg-petrol-dark"
        >
          {t("product.addToCart")}
        </button>
      </div>
      <div className="flex items-start justify-between gap-4 px-1" onClick={() => onOpen(product)}>
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-petrol/50 mb-1.5 font-light">
            {product.category}
          </p>
          <h3
            className="font-display text-petrol text-xl tracking-wide"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            {product.name}
          </h3>
        </div>
        <span
          className="font-display text-petrol text-lg tracking-wider mt-3"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          {product.price}€
        </span>
      </div>
    </div>
  );
};

function KalasamApp() {
  const { t } = useTranslation();
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [shopFilter, setShopFilter] = useState("Tout");
  const [shopSort, setShopSort] = useState("newest");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [emailDone, setEmailDone] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page, activeProduct]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  const addToCart = (product, size = product.sizes[Math.floor(product.sizes.length / 2)], color = product.colors[0]) => {
    setCart((prev) => {
      const existing = prev.find(i => i.id === product.id && i.size === size && i.color.name === color.name);
      if (existing) {
        return prev.map((i) => (i === existing ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, size, color, qty: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (idx) => setCart((prev) => prev.filter((_, i) => i !== idx));
  const updateQty = (idx, delta) =>
    setCart((prev) => prev.map((item, i) => i === idx ? { ...item, qty: Math.max(1, item.qty + delta) } : item));

  const toggleWish = (product) => {
    setWishlist((prev) => prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]);
    showToast(wishlist.includes(product.id) ? "Retiré des favoris" : "Ajouté aux favoris");
  };

  const openProduct = (p) => {
    setActiveProduct(p);
    setPage("product");
  };

  const handleCheckoutComplete = () => {
    const newOrder = {
      id: "CMD-" + Math.floor(Math.random() * 1000000),
      date: new Date().toLocaleDateString("fr-FR"),
      items: cart,
      total: cartTotal + (cartTotal >= 200 ? 0 : 12),
      status: "En cours de préparation",
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setPage("success");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const filteredProducts = useMemo(() => {
    let p = shopFilter === "Tout" ? PRODUCTS : PRODUCTS.filter((p) => p.category === shopFilter);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      p = p.filter((x) => x.name.toLowerCase().includes(q) || x.category.toLowerCase().includes(q) || x.description.toLowerCase().includes(q));
    }
    if (shopSort === "price-asc") p = [...p].sort((a, b) => a.price - b.price);
    if (shopSort === "price-desc") p = [...p].sort((a, b) => b.price - a.price);
    return p;
  }, [shopFilter, shopSort, searchQuery]);

  const goto = (newPage) => {
    setPage(newPage);
    setMenuOpen(false);
    setSearchOpen(false);
    window.scrollTo(0, 0);
    if (newPage !== "product") setActiveProduct(null);
  };

  return (
    <div className="kalasam-app min-h-screen bg-cream text-petrol antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');

        .kalasam-app { font-family: 'Jost', system-ui, sans-serif; font-weight: 300; }
        .font-display { font-family: 'Cormorant Garamond', serif !important; }

        .text-cream { color: #FAF6EE; }
        .text-petrol { color: #1E3F52; }
        .text-petrol\\/50 { color: rgba(30,63,82,0.5); }
        .text-petrol\\/60 { color: rgba(30,63,82,0.6); }
        .text-petrol\\/70 { color: rgba(30,63,82,0.7); }
        .text-petrol\\/80 { color: rgba(30,63,82,0.8); }
        .text-gold { color: #C89E4E; }
        .text-turquoise { color: #51B0AD; }
        .text-sand { color: #D2BD9C; }

        .bg-cream { background-color: #FAF6EE; }
        .bg-cream\\/90 { background-color: rgba(250,246,238,0.9); }
        .bg-cream\\/95 { background-color: rgba(250,246,238,0.95); }
        .bg-petrol { background-color: #1E3F52; }
        .bg-petrol\\/90 { background-color: rgba(30,63,82,0.9); }
        .bg-petrol-dark { background-color: #152A38; }
        .bg-sand { background-color: #D2BD9C; }
        .bg-sand-light { background-color: #E8DBC2; }
        .bg-gold { background-color: #C89E4E; }
        .bg-turquoise { background-color: #51B0AD; }

        .border-petrol { border-color: #1E3F52; }
        .border-petrol\\/10 { border-color: rgba(30,63,82,0.1); }
        .border-petrol\\/20 { border-color: rgba(30,63,82,0.2); }
        .border-petrol\\/30 { border-color: rgba(30,63,82,0.3); }
        .border-cream\\/20 { border-color: rgba(250,246,238,0.2); }
        .border-cream\\/30 { border-color: rgba(250,246,238,0.3); }
        .border-gold { border-color: #C89E4E; }
        .border-sand { border-color: #D2BD9C; }

        .ring-gold { --tw-ring-color: #C89E4E; }
        .ring-petrol { --tw-ring-color: #1E3F52; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes slowPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.03); }
        }
        .animate-fadeUp { animation: fadeUp 1.1s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .animate-fadeIn { animation: fadeIn 0.6s ease both; }
        .animate-slide-right { animation: slideRight 0.45s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .animate-slow-pulse { animation: slowPulse 6s ease-in-out infinite; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }

        .marquee { display: flex; animation: marquee 38s linear infinite; }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        ::selection { background: #C89E4E; color: #1E3F52; }

        input:focus, button:focus, textarea:focus { outline: none; }
        input::placeholder, textarea::placeholder { color: rgba(30,63,82,0.4); }
        .newsletter-input::placeholder { color: rgba(250,246,238,0.5) !important; }

        .hero-grain {
          background-image: radial-gradient(rgba(30,63,82,0.05) 1px, transparent 1px);
          background-size: 4px 4px;
        }

        .deco-rule {
          background: linear-gradient(90deg, transparent, #C89E4E 20%, #C89E4E 80%, transparent);
          height: 1px;
        }
      `}</style>
      
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-[60] bg-petrol text-cream p-4 rounded-full shadow-2xl hover:bg-gold hover:text-petrol transition-all duration-300 group flex items-center justify-center"
          aria-label="Contacter un conseiller VIP"
        >
          <MessageCircle size={22} />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap text-[10px] tracking-[0.2em] uppercase font-medium group-hover:ml-3 group-hover:mr-1">
            Conseiller Privé
          </span>
        </button>
      )}

      <div className="bg-petrol text-cream/90 text-[10px] tracking-[0.25em] uppercase">
        <div className="overflow-hidden whitespace-nowrap py-2.5">
          <div className="marquee">
            <div className="flex gap-12 px-6">
              <span>✦ Livraison offerte dès 200€</span>
              <span>✦ Édition limitée — Chapitre I disponible</span>
              <span>✦ Made in France</span>
              <span>✦ Pièces conçues en série courte</span>
              <span>✦ De l'exil à l'identité</span>
            </div>
            <div className="flex gap-12 px-6" aria-hidden>
              <span>✦ Livraison offerte dès 200€</span>
              <span>✦ Édition limitée — Chapitre I disponible</span>
              <span>✦ Made in France</span>
              <span>✦ Pièces conçues en série courte</span>
              <span>✦ De l'exil à l'identité</span>
            </div>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 bg-cream/95 backdrop-blur-md ${page !== "home" ? "border-b border-petrol/10" : ""}`}
      >
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4 w-1/3 justify-start">
            <button onClick={() => setMenuOpen(true)} className="md:hidden" aria-label="Menu">
              <Menu size={20} />
            </button>
            <button onClick={() => goto("home")} className="group flex items-center">
              <img
                src="logonom_kalasam.png"
                alt="KALASAM"
                className="h-8 md:h-[38px] w-auto object-contain transition-opacity duration-300 group-hover:opacity-60 -translate-y-1.5"
              />
            </button>
          </div>

          <nav className="hidden md:flex items-center justify-self-center gap-8 text-sm tracking-[0.25em] uppercase">
            <button onClick={() => goto("shop")} className={`hover:text-gold transition-colors ${page === "shop" ? "text-gold" : ""}`}>
              {t("nav.shop")}
            </button>
            <button onClick={() => goto("story")} className={`hover:text-gold transition-colors ${page === "story" ? "text-gold" : ""}`}>
              Notre Histoire
            </button>
            <button onClick={() => goto("chapters")} className={`hover:text-gold transition-colors ${page === "chapters" ? "text-gold" : ""}`}>
              Chapitres
            </button>
            <button onClick={() => goto("contact")} className={`hover:text-gold transition-colors ${page === "contact" ? "text-gold" : ""}`}>
              Contact
            </button>
          </nav>

          <div className="flex w-1/3 items-center gap-5 justify-end">
            <button onClick={() => setSearchOpen((s) => !s)} className="hover:text-gold transition-colors" aria-label="Rechercher">
              <Search size={18} />
            </button>
            <LanguageSelector />
            <button onClick={() => goto("account")} className="hidden sm:block hover:text-gold transition-colors" aria-label="Compte">
              <User size={18} />
            </button>
            <button onClick={() => goto("wishlist")} className="hidden sm:block relative hover:text-gold transition-colors" aria-label="Favoris">
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gold text-cream text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button onClick={() => setCartOpen(true)} className="relative hover:text-gold transition-colors" aria-label="Panier">
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gold text-cream text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-petrol/10 bg-cream animate-fadeIn">
            <div className="max-w-[1500px] mx-auto px-6 lg:px-12 py-6 flex items-center gap-4">
              <Search size={20} className="text-petrol/60" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("nav.search")}
                className="flex-1 bg-transparent border-0 text-petrol font-display text-2xl tracking-wide"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSearchOpen(false);
                    goto("shop");
                  }
                }}
              />
              <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
                <X size={20} />
              </button>
            </div>
          </div>
        )}
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-cream animate-fadeIn">
          <div className="flex items-center justify-between px-6 py-5 border-b border-petrol/10">
            <img src="logonom_kalasam.png" alt="KALASAM" className="h-7 w-auto object-contain" />
            <button onClick={() => setMenuOpen(false)}>
              <X size={22} />
            </button>
          </div>
          <nav className="px-6 py-12 flex flex-col gap-6">
            {[
              { key: "home", label: "Accueil" },
              { key: "shop", label: "Boutique" },
              { key: "story", label: "L'Histoire" },
              { key: "chapters", label: "Chapitres" },
              { key: "account", label: "Mon compte" },
              { key: "wishlist", label: "Favoris" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => goto(item.key)}
                className="text-left font-display text-4xl tracking-wide text-petrol hover:text-gold transition-colors"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {appointmentOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto p-4 pt-12 sm:items-center">
          <div
            className="absolute inset-0 bg-petrol/60 backdrop-blur-sm animate-fadeIn"
            onClick={() => setAppointmentOpen(false)}
          ></div>
          <div className="relative bg-cream w-full max-w-lg p-10 animate-fadeUp shadow-2xl border border-petrol/10 my-8 sm:my-0">
            <button
              onClick={() => setAppointmentOpen(false)}
              className="absolute top-4 right-4 text-petrol/50 hover:text-petrol transition-colors"
            >
              <X size={20} />
            </button>
            <h2
              className="font-display text-4xl mb-2 text-petrol"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Essayage Privé
            </h2>
            <p className="text-sm text-petrol/70 mb-8 font-light">
              Sélectionnez une date pour votre venue à l'Atelier parisien. Un
              conseiller vous recontactera pour finaliser l'horaire.
            </p>
            <div className="space-y-4 mb-8">
              <input
                type="text"
                placeholder="Nom complet"
                className="w-full border-b border-petrol/30 bg-transparent py-3 text-sm focus:border-gold outline-none"
              />
              <input
                type="email"
                placeholder={t("form.email")}
                className="w-full border-b border-petrol/30 bg-transparent py-3 text-sm focus:border-gold outline-none"
              />
              <input
                type="date"
                className="w-full border-b border-petrol/30 bg-transparent py-3 text-sm focus:border-gold outline-none text-petrol/70"
              />
            </div>
            <button
              onClick={() => {
                showToast("Demande envoyée. Nous vous recontacterons vite.");
                setAppointmentOpen(false);
              }}
              className="w-full bg-petrol text-cream py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-gold transition-colors"
            >
              Confirmer la demande
            </button>
          </div>
        </div>
      )}

      {chatOpen && (
        <div className="fixed inset-0 z-[50] flex justify-end">
          <div
            className="absolute inset-0 bg-petrol/40 backdrop-blur-sm animate-fadeIn"
            onClick={() => setChatOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-cream h-full flex flex-col animate-slide-right shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-petrol/10 bg-petrol text-cream">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-petrol">
                    <User size={16} />
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-petrol rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-sm tracking-wider font-medium">
                    Conseiller KALASAM
                  </h3>
                  <p className="text-[9px] tracking-widest uppercase opacity-70">
                    En ligne
                  </p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="hover:text-gold transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 bg-sand-light/20 flex flex-col gap-4">
              <div className="bg-cream border border-petrol/10 p-4 text-sm font-light text-petrol/80 rounded-tr-xl rounded-bl-xl rounded-br-xl shadow-sm self-start max-w-[85%] animate-fadeUp">
                Bonjour ! Je suis à votre disposition pour vous accompagner dans votre commande ou réserver un essayage privé. Comment puis-je vous aider ?
              </div>
            </div>
            <div className="p-4 bg-cream border-t border-petrol/10">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t("chat.placeholder")}
                  className="w-full bg-sand-light/30 border border-petrol/20 px-4 py-3 text-sm focus:border-gold outline-none rounded-full pr-12"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-petrol text-cream rounded-full flex items-center justify-center hover:bg-gold hover:text-petrol transition-colors">
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main>
        {page === "home" && (
          <HomePage
            onShop={() => goto("shop")}
            onStory={() => goto("story")}
            onProduct={openProduct}
            onAdd={addToCart}
            onWish={toggleWish}
          />
        )}
        {page === "shop" && (
          <ShopPage
            products={filteredProducts}
            filter={shopFilter}
            setFilter={setShopFilter}
            sort={shopSort}
            setSort={setShopSort}
            onProduct={openProduct}
            onAdd={addToCart}
            onWish={toggleWish}
          />
        )}
        {page === "product" && activeProduct && (
          <ProductPage
            product={activeProduct}
            onAdd={addToCart}
            onWish={toggleWish}
            onBack={() => goto("shop")}
            onProduct={openProduct}
            onBookAppointment={() => setAppointmentOpen(true)}
          />
        )}
        {page === "story" && <StoryPage onShop={() => goto("shop")} />}
        {page === "chapters" && (
          <ChaptersPage
            onProduct={openProduct}
            onAdd={addToCart}
            onWish={toggleWish}
          />
        )}
        {page === "contact" && (
          <ContactPage
            onBookAppointment={() => setAppointmentOpen(true)}
            onChatOpen={() => setChatOpen(true)}
          />
        )}
        {page === "account" && (
          <AccountPage
            user={user}
            setUser={setUser}
            orders={orders}
            onShop={() => goto("shop")}
          />
        )}
        {page === "wishlist" && (
          <WishlistPage
            products={PRODUCTS.filter((p) => wishlist.includes(p.id))}
            onProduct={openProduct}
            onAdd={addToCart}
            onWish={toggleWish}
            onShop={() => goto("shop")}
          />
        )}
        {page === "checkout" && (
          <CheckoutPage
            cart={cart}
            cartTotal={cartTotal}
            onBack={() => goto("shop")}
            onComplete={handleCheckoutComplete}
          />
        )}
        {page === "manifesto" && <ManifestoPage />}
        {page === "atelier" && <AtelierPage />}
        {page.startsWith("service") && (
          <ServicePage initialTab={page.split("-")[1]} onShop={() => goto("shop")} />
        )}
        {page.startsWith("legal") && (
          <LegalPage initialTab={page.split("-")[1]} />
        )}
        {page === "success" && (
          <div className="bg-cream min-h-[70vh] flex flex-col items-center justify-center py-24 px-6 text-center animate-fadeIn">
            <SunMark size={80} className="mb-8 opacity-80" />
            <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">
              Commande confirmée
            </p>
            <h1
              className="font-display text-5xl md:text-6xl mb-6 font-light"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Merci pour votre confiance.
            </h1>
            <p className="text-petrol/70 font-light max-w-md mx-auto mb-10">
              Un e-mail de confirmation contenant votre numéro de suivi vous sera
              envoyé d'ici peu. Bienvenue dans l'histoire KALASAM.
            </p>
            <button
              onClick={() => goto("home")}
              className="border border-petrol px-10 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-petrol hover:text-cream transition-all"
            >
              Retour à l'accueil
            </button>
          </div>
        )}
      </main>

      <section
        id="newsletter"
        className="bg-petrol text-cream py-24 px-6 lg:px-12 relative overflow-hidden min-h-[60vh] flex flex-col justify-center"
      >
        <div className="absolute -top-20 -right-20 opacity-20">
          <SunMark size={400} />
        </div>
        <div className="max-w-3xl mx-auto text-center relative">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6">
            Lettre KALASAM
          </p>
          <h2
            className="font-display text-5xl md:text-6xl leading-[1.1] mb-6 italic font-light"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            Recevez nos chapitres avant tout le monde
          </h2>
          <p className="text-cream/70 max-w-xl mx-auto mb-10 leading-relaxed font-light">
            Drops confidentiels, histoires d'atelier, et avant-premières. Une lettre par mois — jamais plus, jamais moins.
          </p>
          {!emailDone ? (
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                placeholder={t("form.email")}
                className="flex-1 bg-transparent border border-cream/30 px-5 py-4 text-cream newsletter-input text-sm tracking-wider focus:border-gold outline-none transition-colors"
                style={{ color: "#FAF6EE" }}
              />
              <button
                onClick={() => {
                  if (emailValue.includes("@")) {
                    setEmailDone(true);
                    setEmailValue("");
                  }
                }}
                className="bg-gold text-petrol px-8 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-cream transition-colors font-medium"
              >
                S'inscrire
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3 text-gold animate-fadeIn">
              <Check size={18} />
              <span className="text-sm tracking-wider">Bienvenue. À très vite.</span>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-cream border-t border-petrol/10">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12 py-20">
          <div className="grid md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-4">
              <div className="flex items-center gap-3 mb-5">
                <SunMark size={32} />
                <Wordmark size="md" />
              </div>
              <p
                className="italic text-petrol/70 font-display text-xl mb-6 leading-snug"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                From exile to identity.
              </p>
              <p className="text-sm text-petrol/60 leading-relaxed font-light max-w-xs">
                Maison de prêt-à-porter féminin née de deux héritages diasporiques. Pièces conçues en France, en série courte, avec patience.
              </p>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-petrol mb-5 font-medium">
                Maison
              </h4>
              <ul className="space-y-3 text-sm font-light">
                <li><button onClick={() => goto("story")} className="hover:text-gold transition-colors">L'histoire</button></li>
                <li><button onClick={() => goto("chapters")} className="hover:text-gold transition-colors">Les chapitres</button></li>
                <li><button onClick={() => goto("manifesto")} className="hover:text-gold transition-colors">Le manifeste</button></li>
                <li><button onClick={() => goto("atelier")} className="hover:text-gold transition-colors">L'atelier</button></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-petrol mb-5 font-medium">
                Boutique
              </h4>
              <ul className="space-y-3 text-sm font-light">
                <li><button onClick={() => { setShopFilter("Tout"); goto("shop"); }} className="hover:text-gold transition-colors">Toutes les pièces</button></li>
                <li><button onClick={() => { setShopFilter("Vestes"); goto("shop"); }} className="hover:text-gold transition-colors">Vestes</button></li>
                <li><button onClick={() => { setShopFilter("Robes"); goto("shop"); }} className="hover:text-gold transition-colors">Robes</button></li>
                <li><button onClick={() => { setShopFilter("Hauts"); goto("shop"); }} className="hover:text-gold transition-colors">Hauts</button></li>
                <li><button onClick={() => { setShopFilter("Pantalons"); goto("shop"); }} className="hover:text-gold transition-colors">Pantalons</button></li>
                <li><button onClick={() => { setShopFilter("Jupes"); goto("shop"); }} className="hover:text-gold transition-colors">Jupes</button></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-petrol mb-5 font-medium">
                Service
              </h4>
              <ul className="space-y-3 text-sm font-light">
                <li><button onClick={() => goto("service-livraison")} className="hover:text-gold transition-colors">Livraison</button></li>
                <li><button onClick={() => goto("service-retours")} className="hover:text-gold transition-colors">Retours</button></li>
                <li><button onClick={() => goto("service-tailles")} className="hover:text-gold transition-colors">Guide des tailles</button></li>
                <li><button onClick={() => goto("service-entretien")} className="hover:text-gold transition-colors">Entretien</button></li>
                <li><button onClick={() => goto("contact")} className="hover:text-gold transition-colors">Contact</button></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-petrol mb-5 font-medium">
                Contact
              </h4>
              <ul className="space-y-3 text-sm font-light text-petrol/70">
                <li className="flex items-start gap-2"><MapPin size={13} className="mt-0.5 shrink-0" /> Atelier Paris XIe</li>
                <li><a href="mailto:bonjour@kalasam.fr" className="flex items-start gap-2 hover:text-gold transition-colors"><Mail size={13} className="mt-0.5 shrink-0" /> bonjour@kalasam.fr</a></li>
                <li><a href="tel:+33184602211" className="flex items-start gap-2 hover:text-gold transition-colors"><Phone size={13} className="mt-0.5 shrink-0" /> +33 1 84 60 22 11</a></li>
              </ul>
              <div className="flex gap-3 mt-5">
                <a href="#" className="w-9 h-9 border border-petrol/20 rounded-full flex items-center justify-center hover:bg-petrol hover:text-cream transition-all" aria-label="Instagram">
                  <span className="text-[10px]">IG</span>
                </a>
                <a href="mailto:bonjour@kalasam.fr" className="w-9 h-9 border border-petrol/20 rounded-full flex items-center justify-center hover:bg-petrol hover:text-cream transition-all" aria-label="E-mail">
                  <Mail size={14} />
                </a>
              </div>
            </div>
          </div>

          <div className="deco-rule mb-10" />

          <div className="grid md:grid-cols-4 gap-6 text-center md:text-left mb-10">
            {[
              { icon: Truck, label: "Livraison offerte dès 200€" },
              { icon: Package, label: "Retours sous 30 jours" },
              { icon: Award, label: "Made in France" },
              { icon: Globe, label: "Expédition mondiale" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 justify-center md:justify-start">
                <item.icon size={18} className="text-gold shrink-0" />
                <span className="text-xs tracking-wider font-light">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-petrol/10 text-xs text-petrol/50 font-light">
            <p>© 2026 KALASAM — Tous droits réservés.</p>
            <div className="flex gap-6">
              <button onClick={() => goto("legal-mentions")} className="hover:text-gold transition-colors">Mentions légales</button>
              <button onClick={() => goto("legal-cgv")} className="hover:text-gold transition-colors">CGV</button>
              <button onClick={() => goto("legal-confidentialite")} className="hover:text-gold transition-colors">Confidentialité</button>
              <button onClick={() => goto("legal-cookies")} className="hover:text-gold transition-colors">Cookies</button>
            </div>
          </div>
        </div>
      </footer>

      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-petrol/40 backdrop-blur-sm animate-fadeIn" onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-md bg-cream h-full flex flex-col animate-slide-right shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-petrol/10">
              <h3 className="font-display text-2xl tracking-wider" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Votre panier</h3>
              <button onClick={() => setCartOpen(false)}><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="p-12 text-center">
                  <SunMark size={64} className="mx-auto mb-6 opacity-50" />
                  <p className="font-display text-2xl mb-3 italic" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Votre panier est vide</p>
                  <p className="text-sm text-petrol/60 font-light mb-8">Découvrez nos pièces, chaque création raconte une histoire.</p>
                  <button onClick={() => { setCartOpen(false); goto("shop"); }} className="border border-petrol px-8 py-3 text-[11px] tracking-[0.3em] uppercase hover:bg-petrol hover:text-cream transition-colors">
                    Voir la boutique
                  </button>
                </div>
              ) : (
                <div className="p-6 space-y-6">
                  {cart.map((item, i) => (
                    <div key={i} className="flex gap-4 pb-6 border-b border-petrol/10 last:border-0">
                      <div className="w-24 h-32 shrink-0">
                        <ProductImage src={item.img} alt={item.name} name={item.name} className="w-full h-full" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h4 className="font-display text-lg" style={{ fontFamily: '"Cormorant Garamond", serif' }}>{item.name}</h4>
                          <button onClick={() => removeFromCart(i)} className="text-petrol/40 hover:text-petrol"><X size={14} /></button>
                        </div>
                        <p className="text-xs text-petrol/60 mb-1 font-light">{item.category}</p>
                        <p className="text-xs text-petrol/60 mb-3 font-light">Taille {item.size} · {item.color.name}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center border border-petrol/20">
                            <button onClick={() => updateQty(i, -1)} className="w-7 h-7 flex items-center justify-center hover:bg-petrol/5"><Minus size={12} /></button>
                            <span className="w-8 text-center text-xs">{item.qty}</span>
                            <button onClick={() => updateQty(i, 1)} className="w-7 h-7 flex items-center justify-center hover:bg-petrol/5"><Plus size={12} /></button>
                          </div>
                          <span className="font-display text-lg" style={{ fontFamily: '"Cormorant Garamond", serif' }}>{item.price * item.qty}€</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="border-t border-petrol/10 p-6 space-y-4 bg-sand-light/40">
                <div className="flex justify-between text-sm font-light"><span>{t("cart.subtotal")}</span><span>{cartTotal}€</span></div>
                <div className="flex justify-between text-sm font-light"><span>{t("footer.shipping")}</span><span className="text-gold">{cartTotal >= 200 ? "Offerte" : "12€"}</span></div>
                <div className="flex justify-between font-display text-2xl pt-3 border-t border-petrol/10" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                  <span>{t("cart.total")}</span><span>{cartTotal + (cartTotal >= 200 ? 0 : 12)}€</span>
                </div>
                <button onClick={() => { setCartOpen(false); goto("checkout"); }} className="w-full bg-petrol text-cream py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-petrol-dark transition-colors mt-4">
                  Passer au paiement
                </button>
                <p className="text-[10px] text-petrol/50 text-center font-light tracking-wider">Paiement sécurisé · Livraison soignée</p>
              </div>
            )}
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] bg-petrol text-cream px-6 py-3 text-xs tracking-wider animate-fadeIn shadow-lg flex items-center gap-2">
          <Check size={14} className="text-gold" />
          {toast}
        </div>
      )}
    </div>
  );
}
export default function KalasamSite() {
  return (
    <LanguageProvider>
      <KalasamApp />
    </LanguageProvider>
  );
}
function HomePage({ onShop, onStory, onProduct, onAdd, onWish }) {
  const { t } = useTranslation();
  const featured = PRODUCTS.slice(0, 3);
  const newest = PRODUCTS.slice(1, 5);

  return (
    <>
      <section className="relative h-[calc(100vh-115px)] min-h-[500px] w-full flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0 bg-petrol">
          <video src="./FILMKALASAM.mp4" autoPlay loop muted={true} playsInline controls className="w-full h-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-petrol/90 via-petrol/30 to-transparent pointer-events-none md:bg-gradient-to-tr"></div>
        </div>
        <div className="relative z-10 max-w-[1500px] w-full mx-auto px-4 lg:px-6 pb-[56px] lg:pb-[75px] pointer-events-none flex flex-col items-start">
          <h1
            className="font-display font-light text-4xl md:text-5xl leading-[0.9] mb-4 text-cream animate-fadeUp delay-100 pointer-events-auto w-fit"
            style={{ fontFamily: '"Cormorant Garamond", serif', letterSpacing: "-0.02em" }}
          >
            {t("hero.headline1")} <span className="italic opacity-90">{t("hero.headline2")}</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 animate-fadeUp delay-300 pointer-events-auto w-fit">
            <button onClick={onShop} className="group bg-cream text-petrol px-6 py-2.5 text-[9px] tracking-[0.2em] uppercase hover:bg-gold hover:text-cream transition-all flex items-center justify-center gap-2 shadow-sm w-fit">
              {t("hero.cta.discover")} <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={onStory} className="border border-cream/50 text-cream px-6 py-2.5 text-[9px] tracking-[0.2em] uppercase hover:bg-cream hover:text-petrol transition-all backdrop-blur-sm flex items-center justify-center w-fit">
              {t("hero.cta.story")}
            </button>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">La sélection</p>
              <h2 className="font-display text-petrol text-5xl md:text-7xl leading-tight font-light" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                Pièces signature
              </h2>
            </div>
            <button onClick={onShop} className="self-start md:self-auto group flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase hover:text-gold transition-colors">
              Toute la boutique <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={onProduct} onAdd={onAdd} onWish={onWish} />
            ))}
          </div>
        </div>
      </section>

      <section
        className="bg-petrol text-cream py-32 px-6 lg:px-12 relative overflow-hidden bg-fixed bg-center bg-cover"
        style={{ backgroundImage: 'linear-gradient(rgba(30, 63, 82, 0.9), rgba(30, 63, 82, 0.9)), url("https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1600&q=80&auto=format&fit=crop")' }}
      >
        <div className="absolute -bottom-40 -left-40 opacity-15"><SunMark size={500} /></div>
        <div className="max-w-[1500px] mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="aspect-[4/5] max-w-md shadow-2xl">
            <ProductImage src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&q=80&auto=format&fit=crop" name="Diaspora" alt="Story" className="w-full h-full" />
          </div>
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6">Notre histoire</p>
            <h2 className="font-display text-5xl md:text-6xl leading-[1.05] mb-8 italic font-light" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              Deux héritages.<br />Une seule maison.
            </h2>
            <p className="text-cream/70 text-lg leading-relaxed mb-6 font-light">
              D'un côté, la France et les Philippines. De l'autre, le Sri Lanka. Deux trajectoires que tout opposait, tissées par le même fil : celui de familles qui ont tout sacrifié pour un futur différent.
            </p>
            <p className="text-cream/70 text-lg leading-relaxed mb-10 font-light">
              KALASAM est née sur les bancs d'une école, du croisement de ces mémoires. Une maison qui transforme l'héritage en création, et l'invisibilité en présence.
            </p>
            <button onClick={onStory} className="group flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase border-b border-gold pb-2 hover:text-gold transition-colors">
              Lire l'histoire complète <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 lg:px-12 bg-cream">
        <div className="max-w-[1500px] mx-auto">
          <div className="text-center mb-20">
            <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">Notre ADN</p>
            <h2 className="font-display text-petrol text-5xl md:text-6xl leading-tight font-light" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              Les codes de la maison
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              { num: "01", title: "Luxe silencieux", body: "Matières épaisses, finitions précises, prestige sans bruit. Ce que l'on porte n'a pas besoin de crier." },
              { num: "02", title: "Pensée en France", body: "Conception et fabrication dans nos ateliers parisiens. Séries courtes, rotations rares." },
              { num: "03", title: "Héritage actif", body: "Chaque pièce est un chapitre. Chaque chapitre est une mémoire transformée en mouvement." },
              { num: "04", title: "Identité plurielle", body: "Quatre territoires, une seule voix : France, Philippines, Sri Lanka, Maroc." },
            ].map((v, i) => (
              <div key={i} className="border-t border-petrol/20 pt-8">
                <p className="font-display text-gold text-3xl mb-6" style={{ fontFamily: '"Cormorant Garamond", serif' }}>{v.num}</p>
                <h3 className="font-display text-2xl mb-4" style={{ fontFamily: '"Cormorant Garamond", serif' }}>{v.title}</h3>
                <p className="text-sm text-petrol/70 leading-relaxed font-light">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 lg:px-12 bg-sand-light/40">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">Nouvelles arrivées</p>
              <h2 className="font-display text-petrol text-5xl md:text-7xl leading-tight font-light italic" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                Cette semaine
              </h2>
            </div>
            <button onClick={onShop} className="self-start md:self-auto group flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase hover:text-gold transition-colors">
              Tout voir <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {newest.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={onProduct} onAdd={onAdd} onWish={onWish} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 lg:px-12 bg-cream">
        <div className="max-w-[1500px] mx-auto">
          <div className="grid md:grid-cols-12 gap-6 mb-20">
            <div className="md:col-span-5 md:pt-12">
              <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6">Lookbook</p>
              <h2 className="font-display text-petrol text-5xl md:text-6xl leading-[1.05] mb-6 font-light" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                <span className="italic">{t("section.memory")}</span><br />en mouvement
              </h2>
              <p className="text-petrol/70 leading-relaxed font-light text-lg">
                Une éditorial pensée comme un voyage à travers les territoires qui nous ont fondés. Lumière du matin, silhouettes droites, temps suspendu.
              </p>
            </div>
            <div className="md:col-span-7 grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] mt-12"><ProductImage src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80&auto=format&fit=crop" name="Édito 1" alt="Editorial" className="w-full h-full" /></div>
              <div className="aspect-[3/4]"><ProductImage src="https://images.unsplash.com/photo-1485518882345-15568b007407?w=900&q=80&auto=format&fit=crop" name="Édito 2" alt="Editorial" className="w-full h-full" /></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ShopPage({ products, filter, setFilter, sort, setSort, onProduct, onAdd, onWish }) {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 pt-16 pb-32">
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4 animate-fadeUp">La boutique</p>
          <h1 className="font-display text-petrol text-6xl md:text-8xl leading-tight font-light animate-fadeUp delay-100" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
            Toutes les <span className="italic">pièces</span>
          </h1>
          <p className="text-petrol/60 mt-6 max-w-xl mx-auto font-light animate-fadeUp delay-200">
            {products.length} pièces — chaque création est un chapitre. Sélectionnez une catégorie pour explorer.
          </p>
        </div>
        <div className="border-y border-petrol/10 py-5 mb-12 flex flex-wrap items-center justify-between gap-4">
          <div className="hidden md:flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-5 py-2 text-[11px] tracking-[0.25em] uppercase border transition-all ${filter === cat ? "bg-petrol text-cream border-petrol" : "border-petrol/20 hover:border-petrol"}`}>
                {cat}
              </button>
            ))}
          </div>
          <button onClick={() => setShowFilters((s) => !s)} className="md:hidden flex items-center gap-2 px-4 py-2 text-[11px] tracking-[0.25em] uppercase border border-petrol/20">
            <Filter size={13} /> Filtres ({filter})
          </button>
          <div className="flex items-center gap-3">
            <span className="text-[11px] tracking-[0.25em] uppercase text-petrol/60">Tri</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-transparent border border-petrol/20 px-3 py-2 text-xs tracking-wider cursor-pointer">
              <option value="newest">{t("shop.sortNewest")}</option>
              <option value="price-asc">{t("shop.sortAsc")}</option>
              <option value="price-desc">{t("shop.sortDesc")}</option>
            </select>
          </div>
        </div>
        {showFilters && (
          <div className="md:hidden mb-8 flex flex-wrap gap-2 animate-fadeIn">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => { setFilter(cat); setShowFilters(false); }} className={`px-4 py-2 text-[11px] tracking-[0.2em] uppercase border ${filter === cat ? "bg-petrol text-cream border-petrol" : "border-petrol/20"}`}>
                {cat}
              </button>
            ))}
          </div>
        )}
        {products.length === 0 ? (
          <div className="text-center py-32">
            <SunMark size={80} className="mx-auto mb-6 opacity-50" />
            <p className="font-display text-3xl italic mb-3" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Aucune pièce trouvée</p>
            <p className="text-petrol/60 text-sm font-light">Essayez une autre catégorie.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-10">
            {products.map((p, i) => (
              <div key={p.id} className="animate-fadeUp" style={{ animationDelay: `${i * 60}ms` }}>
                <ProductCard product={p} onOpen={onProduct} onAdd={onAdd} onWish={onWish} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductPage({ product, onAdd, onWish, onBack, onProduct, onBookAppointment }) {
  const { t } = useTranslation();
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [activeMedia, setActiveMedia] = useState(0);
  const [accordion, setAccordion] = useState("story");
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => { setSize(null); setColor(product.colors[0]); setQty(1); setActiveMedia(0); setAccordion("story"); window.scrollTo({ top: 0, behavior: "instant" }); }, [product]);
  useEffect(() => { const handleScroll = () => setShowSticky(window.scrollY > 500); window.addEventListener("scroll", handleScroll); return () => window.removeEventListener("scroll", handleScroll); },[]);

  const handleAdd = () => { for (let i = 0; i < qty; i++) onAdd(product, size || product.sizes[0], color); };
  const mediaList = color.gallery || product.gallery || [{ type: "image", src: product.img }];
  const related = PRODUCTS.filter((p) => p.chapter === product.chapter && p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-cream relative pb-16">
      {showSticky && (
        <div className="fixed bottom-0 left-0 w-full bg-cream/95 backdrop-blur-md border-t border-petrol/10 z-[45] p-4 flex justify-between items-center animate-fadeUp shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="hidden sm:block w-10 h-14 bg-sand"><img src={product.img} alt={product.name} className="w-full h-full object-cover" /></div>
            <div>
              <h4 className="font-display text-xl leading-none" style={{ fontFamily: '"Cormorant Garamond", serif' }}>{product.name}</h4>
              <p className="text-[10px] tracking-[0.2em] uppercase text-petrol/60 mt-1">{product.price}€</p>
            </div>
          </div>
          <button onClick={handleAdd} className="bg-petrol text-cream px-8 py-3 text-[10px] tracking-[0.3em] uppercase hover:bg-gold transition-colors flex items-center gap-2">
            <ShoppingBag size={14} /> <span className="hidden sm:inline">{t("product.addToCart")}</span>
          </button>
        </div>
      )}
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 pt-8 pb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase hover:text-gold transition-colors">
          <ChevronLeft size={14} /> Retour à la boutique
        </button>
      </div>
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 pb-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 lg:sticky lg:top-32 lg:self-start z-10 flex gap-4 h-[60vh] lg:h-[calc(100vh-160px)]">
            <div className="hidden md:flex flex-col gap-3 w-20 overflow-y-auto pb-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {mediaList.map((m, i) => (
                <button key={i} type="button" onClick={(e) => { e.preventDefault(); setActiveMedia(i); }} className={`relative z-20 shrink-0 aspect-[3/4] border-2 transition-all ${activeMedia === i ? "border-gold opacity-100" : "border-transparent opacity-60 hover:opacity-100"}`}>
                  <img src={m.type === "video" ? product.img : m.src} alt="" className="w-full h-full object-cover pointer-events-none" />
                  {m.type === "video" && <div className="absolute inset-0 flex items-center justify-center bg-petrol/20 pointer-events-none"><Play size={16} fill="currentColor" className="text-cream" /></div>}
                </button>
              ))}
            </div>
            <div className="flex-1 flex justify-start items-center relative">
              <div className="h-full aspect-[3/4] relative bg-sand/10 border border-petrol/10 overflow-hidden">
                {mediaList[activeMedia].type === "video" ? (
                  <video src={mediaList[activeMedia].src} autoPlay loop muted playsInline className="w-full h-full object-cover animate-fadeIn" />
                ) : (
                  <ZoomableImage src={mediaList[activeMedia].src} alt={product.name} className="w-full h-full animate-fadeIn" />
                )}
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 pt-4">
            <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-2">{product.chapter}</p>
            <h1 className="font-display text-5xl md:text-6xl mb-3 font-light" style={{ fontFamily: '"Cormorant Garamond", serif' }}>{product.name}</h1>
            <p className="text-[11px] tracking-[0.3em] uppercase text-petrol/50 mb-6">{product.category}</p>
            <p className="font-display text-3xl mb-8" style={{ fontFamily: '"Cormorant Garamond", serif' }}>{product.price}€</p>
            <p className="text-petrol/80 leading-relaxed mb-10 font-light text-lg">{product.description}</p>
            <div className="mb-8">
              <p className="text-[10px] tracking-[0.3em] uppercase mb-4 text-petrol/70">Coloris : <span className="text-petrol font-medium">{color.name}</span></p>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button key={c.name} onClick={() => { setColor(c); setActiveMedia(0); }} className={`relative w-10 h-10 rounded-full border-2 transition-all ${color.name === c.name ? "border-petrol scale-110" : "border-petrol/20 hover:border-petrol/50"}`} style={{ backgroundColor: c.hex }}>
                    {color.name === c.name && <Check size={14} className="absolute inset-0 m-auto" style={{ color: c.hex === "#FFFFFF" || c.hex === "#F4ECDB" ? "#1E3F52" : "#FFFFFF" }} />}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-[10px] tracking-[0.3em] uppercase text-petrol/70">Taille</p>
                <button className="text-[10px] tracking-[0.25em] uppercase underline text-petrol/60 hover:text-gold transition-colors">Guide des tailles</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)} className={`py-3 text-xs tracking-wider border transition-all ${size === s ? "bg-petrol text-cream border-petrol" : "border-petrol/20 hover:border-petrol text-petrol/80"}`}>{s}</button>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex items-center border border-petrol/20 bg-transparent shrink-0">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-12 h-14 flex items-center justify-center hover:bg-petrol/5 text-petrol/60 hover:text-petrol"><Minus size={14} /></button>
                <span className="w-10 text-center text-sm font-medium">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="w-12 h-14 flex items-center justify-center hover:bg-petrol/5 text-petrol/60 hover:text-petrol"><Plus size={14} /></button>
              </div>
              <button onClick={handleAdd} className="flex-1 bg-petrol text-cream h-14 text-[11px] tracking-[0.3em] uppercase hover:bg-petrol-dark transition-colors flex items-center justify-center gap-3"><ShoppingBag size={14} /> Ajouter au panier</button>
              <button onClick={() => onWish(product)} className="w-14 h-14 border border-petrol/30 shrink-0 flex items-center justify-center hover:bg-petrol hover:text-cream transition-all"><Heart size={16} /></button>
            </div>
            <button onClick={onBookAppointment} className="w-full flex items-center justify-center gap-3 border border-gold/40 text-petrol bg-sand-light/10 h-12 text-[10px] tracking-[0.2em] uppercase hover:bg-gold hover:text-cream transition-colors mb-10 group">
              <Calendar size={14} className="text-gold group-hover:text-cream transition-colors" /> Réserver un essayage privé
            </button>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-10 py-8 border-y border-petrol/10">
              <div className="flex items-center gap-3"><Truck size={18} className="text-gold shrink-0" /><span className="text-xs font-light">Livraison offerte dès 200€</span></div>
              <div className="flex items-center gap-3"><Package size={18} className="text-gold shrink-0" /><span className="text-xs font-light">Retours sous 30 jours</span></div>
              <div className="flex items-center gap-3"><Award size={18} className="text-gold shrink-0" /><span className="text-xs font-light">Made in France</span></div>
              <div className="flex items-center gap-3"><Star size={18} className="text-gold shrink-0" /><span className="text-xs font-light">Série limitée & numérotée</span></div>
            </div>
            <div className="space-y-1">
              {[
                { key: "story", title: "L'histoire de la pièce", body: product.description + " Cette pièce s'inscrit dans le " + product.chapter + ", un moment du récit familial transformé en présence textile." },
                { key: "mat", title: "Composition & entretien", body: "Tissu principal : 100% matières naturelles. Nettoyage à sec recommandé." },
              ].map((item) => (
                <div key={item.key} className="border-b border-petrol/10">
                  <button onClick={() => setAccordion(accordion === item.key ? null : item.key)} className="w-full flex justify-between items-center py-5 text-[11px] tracking-[0.3em] uppercase hover:text-gold transition-colors">
                    {item.title} <ChevronDown size={14} className={`transition-transform duration-300 ${accordion === item.key ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${accordion === item.key ? "max-h-40 opacity-100 mb-5" : "max-h-0 opacity-0"}`}>
                    <p className="text-sm text-petrol/70 font-light leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {related.length > 0 && (
          <div className="mt-40 border-t border-petrol/10 pt-20">
            <div className="text-center mb-16">
              <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">Compléter la silhouette</p>
              <h2 className="font-display text-petrol text-4xl md:text-5xl font-light italic" style={{ fontFamily: '"Cormorant Garamond", serif' }}>L'art de l'ensemble</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
              {related.map((p) => <ProductCard key={p.id} product={p} onOpen={onProduct} onAdd={onAdd} onWish={onWish} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StoryPage({ onShop }) {
  return (
    <div className="bg-cream">
      <section className="relative min-h-[80vh] flex items-center px-6 lg:px-12 py-24 overflow-hidden bg-fixed bg-center bg-cover" style={{ backgroundImage: 'linear-gradient(rgba(250, 246, 238, 0.8), rgba(250, 246, 238, 0.9)), url("https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1600&q=80&auto=format&fit=crop")' }}>
        <div className="absolute -top-20 -right-20 opacity-20 animate-slow-pulse"><SunMark size={520} /></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-[10px] tracking-[0.5em] uppercase text-gold mb-8 animate-fadeUp">Notre histoire</p>
          <h1 className="font-display text-petrol text-6xl md:text-9xl leading-[0.9] mb-10 font-light animate-fadeUp delay-100" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Deux héritages.<br /><span className="italic">Une seule maison.</span></h1>
          <p className="text-xl text-petrol/80 leading-relaxed font-light max-w-2xl mx-auto animate-fadeUp delay-200">KALASAM est née de la rencontre de deux trajectoires que tout semblait opposer, et que pourtant tout reliait : la diaspora.</p>
        </div>
      </section>
      <section className="py-32 px-6 lg:px-12 bg-sand-light/20">
        <div className="max-w-[1300px] mx-auto grid md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-5"><div className="aspect-[3/4] shadow-xl"><ProductImage src="https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=900&q=80&auto=format&fit=crop" name="Bernadette" alt="Justin" className="w-full h-full" /></div></div>
          <div className="md:col-span-7 md:pl-10">
            <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6">Première lignée</p>
            <h2 className="font-display text-5xl md:text-6xl leading-tight mb-10 font-light" style={{ fontFamily: '"Cormorant Garamond", serif' }}><span className="italic">Justin</span> — la France, les Philippines, le Maroc.</h2>
            <div className="space-y-6 text-petrol/80 font-light leading-relaxed text-lg">
              <p>Une grand-mère française, Bernadette, née à Scorbé-Clairvaux, qui quitte très jeune sa province pour Boulogne-Billancourt en pleine époque des Trente Glorieuses. À une période où peu de femmes osaient franchir ce cap seules, elle choisit de s'imposer chez Renault.</p>
              <p>De l'autre côté, les Philippines. Une mère grandie dans la précarité, marquée à 10 ans par la perte de la sienne. Elle apprend très tôt qu'avancer est une nécessité. En 1990, elle arrive en France. L'arrivée n'est pas une fin, seulement le début d'un nouveau combat.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-32 px-6 lg:px-12 bg-cream">
        <div className="max-w-[1300px] mx-auto grid md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-7 md:order-1 order-2 md:pr-10">
            <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6">Seconde lignée</p>
            <h2 className="font-display text-5xl md:text-6xl leading-tight mb-10 font-light" style={{ fontFamily: '"Cormorant Garamond", serif' }}><span className="italic">Thikana</span> — le Sri Lanka, l'exil, la reconstruction.</h2>
            <div className="space-y-6 text-petrol/80 font-light leading-relaxed text-lg">
              <p>Une histoire enracinée dans la communauté tamoule du nord de l'île, profondément marquée par la guerre civile. Un père voit sa jeunesse bouleversée brutalement : à 15 ans, il fuit avec sa famille vers des camps de réfugiés en India.</p>
              <p>Mais rester n'est pas une option. Il part seul. D'abord vers l'Allemagne, puis vers la France à 18 ans. Sans repères, sans réseau, il doit tout reconstruire. Une lutte silencieuse, une preuve de <em className="italic text-gold">résilience</em>.</p>
            </div>
          </div>
          <div className="md:col-span-5 md:order-2 order-1"><div className="aspect-[3/4] shadow-xl"><ProductImage src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&q=80&auto=format&fit=crop" name="Migration" alt="Thikana" className="w-full h-full" /></div></div>
        </div>
      </section>
    </div>
  );
}

function ChaptersPage({ onProduct, onAdd, onWish }) {
  const { t } = useTranslation();
  const chapters =[
    { num: "I", season: "Printemps/Été 2027", title: "Origines", subtitle: "La terre, la lignée, ce qui fonde", desc: "Les racines françaises et lointaines. Bernadette, l'usine, le premier ancrage.", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80&auto=format&fit=crop" },
    { num: "II", season: "Automne/Hiver 2027-2028", title: "Traversée", subtitle: "Le mouvement comme acte fondateur", desc: "La diaspora. Quitter pour exister. Les océans, les avions, les nouvelles villes.", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&q=80&auto=format&fit=crop", isComingSoon: true },
  ];

  return (
    <div className="bg-cream min-h-screen">
      <section className="text-center pt-24 pb-16 px-6">
        <p className="text-[10px] tracking-[0.5em] uppercase text-gold mb-6 animate-fadeUp">Notre récit</p>
        <h1 className="font-display text-petrol text-6xl md:text-8xl leading-tight font-light animate-fadeUp delay-100" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Les <span className="italic">{t("nav.chapters")}</span></h1>
      </section>
      <section className="px-6 lg:px-12 pb-32">
        <div className="max-w-[1500px] mx-auto space-y-32">
          {chapters.map((c, i) => {
            const products = PRODUCTS.filter((p) => p.chapter.includes(c.title));
            const isReverse = i % 2 === 1;
            return (
              <div key={c.num} className={`grid md:grid-cols-12 gap-10 lg:gap-20 items-center ${isReverse ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className="md:col-span-5"><div className="aspect-[4/5] overflow-hidden"><img src={c.img} alt={c.title} className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-110" /></div></div>
                <div className="md:col-span-7 md:px-8">
                  <p className="font-display text-gold text-7xl mb-2 font-light" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Chapitre {c.num}</p>
                  <h2 className="font-display text-5xl md:text-7xl leading-tight mb-4 italic font-light" style={{ fontFamily: '"Cormorant Garamond", serif' }}>{c.title}</h2>
                  <p className="text-[11px] tracking-[0.3em] uppercase text-petrol/60 mb-6">{c.subtitle}</p>
                  <p className="text-petrol/80 text-lg leading-relaxed font-light mb-8">{c.desc}</p>
                  {c.isComingSoon ? (
                    <div className="inline-flex items-center gap-3 bg-sand-light/30 border border-gold/40 px-5 py-3 mt-4">
                      <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                      <span className="text-[11px] tracking-[0.3em] uppercase text-petrol font-medium">Nouvelle collection à venir</span>
                    </div>
                  ) : (products.length > 0 && (
                    <div>
                      <p className="text-[10px] tracking-[0.3em] uppercase text-petrol/50 mb-4">Pièces du chapitre</p>
                      <div className="flex flex-wrap gap-3">
                        {products.map((p) => (
                          <button key={p.id} onClick={() => onProduct(p)} className="border border-petrol/20 px-4 py-2 text-xs tracking-wider hover:bg-petrol hover:text-cream transition-all">{p.name} · {p.price}€</button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function WishlistPage({ products, onProduct, onAdd, onWish, onShop }) {
  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 pt-16 pb-32">
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4 animate-fadeUp">Mes favoris</p>
          <h1 className="font-display text-petrol text-6xl md:text-8xl leading-tight font-light animate-fadeUp delay-100" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Ma <span className="italic">wishlist</span></h1>
        </div>
        {products.length === 0 ? (
          <div className="text-center py-32">
            <Heart size={48} className="mx-auto mb-6 text-petrol/30" />
            <p className="font-display text-3xl italic mb-3" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Votre wishlist est vide</p>
            <p className="text-petrol/60 text-sm font-light mb-10">Ajoutez vos pièces préférées en cliquant sur le cœur.</p>
            <button onClick={onShop} className="border border-petrol px-10 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-petrol hover:text-cream transition-all">Découvrir la boutique</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-10">
            {products.map((p, i) => (<div key={p.id} className="animate-fadeUp" style={{ animationDelay: `${i * 60}ms` }}><ProductCard product={p} onOpen={onProduct} onAdd={onAdd} onWish={onWish} /></div>))}
          </div>
        )}
      </div>
    </div>
  );
}

function AccountPage({ user, setUser, orders, onShop }) {
  const { t } = useTranslation();
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleAuth = () => {
    if (!email || !password) return;
    if (tab === "signup" && (!firstName || !lastName)) return;
    setUser({ email, name: tab === "signup" ? `${firstName} ${lastName}` : email.split("@")[0] });
  };

  if (user) {
    return (
      <div className="bg-cream min-h-[70vh] py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h1 className="font-display text-petrol text-5xl mb-2 font-light" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Bonjour, {user.name}</h1>
              <p className="text-petrol/60 text-sm font-light">Bienvenue dans votre espace KALASAM.</p>
            </div>
            <button onClick={() => setUser(null)} className="border border-petrol/20 px-6 py-2 text-[10px] tracking-[0.3em] uppercase hover:bg-petrol hover:text-cream transition-colors">Se déconnecter</button>
          </div>
          <div className="bg-sand-light/30 p-8 border border-petrol/10">
            <h2 className="font-display text-3xl mb-8" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Historique des commandes</h2>
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <Package size={32} className="mx-auto mb-4 text-petrol/30" />
                <p className="text-sm text-petrol/60 mb-6">Vous n'avez passé aucune commande pour le moment.</p>
                <button onClick={onShop} className="bg-petrol text-cream px-8 py-3 text-[10px] tracking-[0.3em] uppercase hover:bg-petrol-dark transition-colors">Découvrir la boutique</button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="border border-petrol/10 bg-cream p-6 flex flex-col md:flex-row justify-between md:items-center gap-6">
                    <div>
                      <p className="text-[11px] tracking-[0.2em] uppercase text-petrol/60 mb-1">Commande {order.id}</p>
                      <p className="font-display text-xl mb-1" style={{ fontFamily: '"Cormorant Garamond", serif' }}>{order.date}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-gold text-sm mb-1">{order.status}</p>
                      <p className="font-display text-2xl" style={{ fontFamily: '"Cormorant Garamond", serif' }}>{order.total}€</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-[70vh] py-24 px-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-12">
          <SunMark size={50} className="mx-auto mb-6" />
          <h1 className="font-display text-petrol text-5xl mb-3 font-light" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Mon compte</h1>
        </div>
        <div className="flex border-b border-petrol/20 mb-10">
          {["login", "signup"].map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`flex-1 pb-4 text-[11px] tracking-[0.3em] uppercase border-b-2 transition-colors ${tab === t ? "border-petrol text-petrol" : "border-transparent text-petrol/40"}`}>
              {t === "login" ? "Connexion" : "Créer un compte"}
            </button>
          ))}
        </div>
        <div className="space-y-5 animate-fadeIn">
          {tab === "signup" && (
            <>
              <input type="text" placeholder={t("form.firstname")} value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full bg-transparent border-b border-petrol/30 py-3 text-sm focus:border-gold transition-colors" />
              <input type="text" placeholder={t("form.lastname")} value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full bg-transparent border-b border-petrol/30 py-3 text-sm focus:border-gold transition-colors" />
            </>
          )}
          <input type="email" placeholder={t("form.email")} value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent border-b border-petrol/30 py-3 text-sm focus:border-gold transition-colors" />
          <input type="password" placeholder={t("form.password")} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent border-b border-petrol/30 py-3 text-sm focus:border-gold transition-colors" />
          <button onClick={handleAuth} className="w-full bg-petrol text-cream py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-petrol-dark transition-colors mt-8">
            {tab === "login" ? "Se connecter" : "Créer mon compte"}
          </button>
        </div>
      </div>
    </div>
  );
}

function CheckoutPage({ cart, cartTotal, onBack, onComplete }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isGift, setIsGift] = useState(false);
  const [formData, setFormData] = useState({ email: "", firstName: "", lastName: "", address: "", zip: "", city: "", cardName: "", cardNumber: "", cardExp: "", cardCvc: "", giftMessage: "" });

  const shippingCost = cartTotal >= 200 ? 0 : 12;
  const finalTotal = cartTotal + shippingCost;
  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => { setLoading(true); setTimeout(() => { setLoading(false); onComplete(); }, 2000); };

  if (cart.length === 0) {
    return (
      <div className="bg-cream min-h-[70vh] flex flex-col items-center justify-center py-24 px-6 text-center">
        <h2 className="font-display text-4xl mb-4 italic" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Votre panier est empty</h2>
        <button onClick={onBack} className="bg-petrol text-cream px-8 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-petrol-dark transition-colors mt-6">Retour à la boutique</button>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 py-12 lg:py-24">
        <div className="mb-12">
          <button onClick={onBack} className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-petrol/60 hover:text-gold transition-colors mb-6"><ChevronLeft size={14} /> Retour au panier</button>
          <h1 className="font-display text-petrol text-5xl font-light" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Paiement sécurisé</h1>
        </div>
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 space-y-12">
            <section>
              <h2 className="text-[11px] tracking-[0.3em] uppercase text-petrol mb-6 border-b border-petrol/10 pb-3">1. Contact</h2>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t("form.email")} className="w-full bg-transparent border border-petrol/20 px-4 py-3 text-sm focus:border-gold transition-colors" />
            </section>
            <section>
              <h2 className="text-[11px] tracking-[0.3em] uppercase text-petrol mb-6 border-b border-petrol/10 pb-3">2. Livraison</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder={t("form.firstname")} className="w-full bg-transparent border border-petrol/20 px-4 py-3 text-sm focus:border-gold transition-colors" />
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder={t("form.lastname")} className="w-full bg-transparent border border-petrol/20 px-4 py-3 text-sm focus:border-gold transition-colors" />
              </div>
              <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder={t("form.address")} className="w-full bg-transparent border border-petrol/20 px-4 py-3 text-sm focus:border-gold transition-colors mb-4" />
              <div className="grid grid-cols-3 gap-4 mb-4">
                <input type="text" name="zip" value={formData.zip} onChange={handleChange} placeholder={t("form.zip")} className="w-full bg-transparent border border-petrol/20 px-4 py-3 text-sm focus:border-gold transition-colors" />
                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder={t("form.city")} className="col-span-2 w-full bg-transparent border border-petrol/20 px-4 py-3 text-sm focus:border-gold transition-colors" />
              </div>
            </section>
            <section className="bg-sand-light/20 p-6 border border-petrol/10">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 border border-petrol flex items-center justify-center transition-colors ${isGift ? "bg-petrol text-gold" : "bg-transparent"}`}>{isGift && <Check size={14} />}</div>
                <input type="checkbox" className="hidden" checked={isGift} onChange={() => setIsGift(!isGift)} />
                <span className="font-display text-2xl tracking-wide group-hover:text-gold transition-colors" style={{ fontFamily: '"Cormorant Garamond", serif' }}>L'Art d'Offrir (Cadeau)</span>
              </label>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isGift ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
                <p className="text-sm text-petrol/70 font-light mb-4">Votre commande sera préparée dans l'écrin signature KALASAM sans facture.</p>
                <textarea name="giftMessage" value={formData.giftMessage} onChange={handleChange} placeholder="Ajouter un mot personnalisé..." rows={2} className="w-full bg-white/50 border border-petrol/20 px-4 py-3 text-sm focus:border-gold transition-colors resize-none" />
              </div>
            </section>
            <section>
              <h2 className="text-[11px] tracking-[0.3em] uppercase text-petrol mb-6 border-b border-petrol/10 pb-3">3. Paiement</h2>
              <div className="bg-white p-6 border border-petrol/10 shadow-sm">
                <input type="text" name="cardName" value={formData.cardName} onChange={handleChange} placeholder={t("form.cardName")} className="w-full bg-transparent border border-petrol/20 px-4 py-3 text-sm focus:border-gold transition-colors mb-4" />
                <div className="relative mb-4">
                  <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder={t("form.cardNumber")} className="w-full bg-transparent border border-petrol/20 px-4 py-3 text-sm focus:border-gold transition-colors pl-12" />
                  <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-petrol/40" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="cardExp" value={formData.cardExp} onChange={handleChange} placeholder="MM/AA" className="w-full bg-transparent border border-petrol/20 px-4 py-3 text-sm focus:border-gold transition-colors" />
                  <input type="text" name="cardCvc" value={formData.cardCvc} onChange={handleChange} placeholder="CVC" className="w-full bg-transparent border border-petrol/20 px-4 py-3 text-sm focus:border-gold transition-colors" />
                </div>
              </div>
            </section>
            <div>
              <button onClick={handleSubmit} disabled={loading} className="w-full bg-petrol text-cream py-5 text-[12px] tracking-[0.3em] uppercase hover:bg-petrol-dark transition-colors disabled:opacity-70 flex justify-center items-center gap-3 shadow-lg">
                {loading ? <><span className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin"></span> Traitement...</> : "Valider la Commande"}
              </button>
              <div className="mt-6 flex flex-col items-center gap-3 text-petrol/40">
                <div className="flex items-center gap-2 text-[10px] tracking-wider uppercase font-medium"><ShieldCheck size={14} className="text-gold" /> Paiement 100% Sécurisé SSL</div>
                <div className="flex gap-4">
                  <span className="border border-petrol/20 px-2 py-1 rounded text-xs font-semibold tracking-wider">VISA</span>
                  <span className="border border-petrol/20 px-2 py-1 rounded text-xs font-semibold tracking-wider">MASTERCARD</span>
                  <span className="border border-petrol/20 px-2 py-1 rounded text-xs font-semibold tracking-wider">AMEX</span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="bg-sand-light/40 p-8 sticky top-32 shadow-sm border border-petrol/5">
              <h3 className="font-display text-2xl mb-6 border-b border-petrol/10 pb-4" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Résumé de la commande</h3>
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {cart.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-16 h-20 shrink-0 bg-sand"><img src={item.img} className="w-full h-full object-cover" /></div>
                    <div className="flex-1 text-sm font-light">
                      <div className="flex justify-between"><span className="font-medium text-petrol">{item.name}</span><span>{item.price * item.qty}€</span></div>
                      <p className="text-petrol/60 text-xs mt-1">{item.color.name} · Taille {item.size}</p>
                      <p className="text-petrol/60 text-xs">Qté : {item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-petrol/10 pt-4 space-y-3 text-sm font-light">
                <div className="flex justify-between"><span>{t("cart.subtotal")}</span><span>{cartTotal}€</span></div>
                <div className="flex justify-between"><span>{t("footer.shipping")}</span><span className={shippingCost === 0 ? "text-gold" : ""}>{shippingCost === 0 ? "Offerte" : `${shippingCost}€`}</span></div>
              </div>
              <div className="border-t border-petrol/10 pt-4 mt-4 flex justify-between items-end">
                <span className="text-[11px] tracking-[0.2em] uppercase text-petrol/60">Total (TTC)</span>
                <span className="font-display text-3xl text-petrol" style={{ fontFamily: '"Cormorant Garamond", serif' }}>{finalTotal}€</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ManifestoPage() {
  return (
    <div className="bg-cream py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[10px] tracking-[0.5em] uppercase text-gold mb-8 animate-fadeUp">Le manifeste</p>
        <h1 className="font-display text-petrol text-5xl md:text-7xl leading-[1.1] mb-12 font-light animate-fadeUp delay-100" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
          Créer pour <span className="italic">honorer</span>.
        </h1>
        <div className="space-y-6 text-petrol/80 font-light leading-relaxed text-lg animate-fadeUp delay-200">
          <p>KALASAM n'est pas qu'une simple marque de vêtements. C'est une démarche. Une volonté de transformer l'exil, le silence et l'invisibilité en présence.</p>
          <p>Nos vêtements ne cachent pas, ils révèlent. Ils racontent des histoires d'ancrage et de mouvement. Ils honorent celles et ceux qui ont dû tout quitter pour que nous puissions créer aujourd'hui.</p>
        </div>
      </div>
    </div>
  );
}

function AtelierPage() {
  return (
    <div className="bg-cream pb-32">
      <section className="relative h-[60vh] flex items-center justify-center bg-fixed bg-center bg-cover" style={{ backgroundImage: 'linear-gradient(rgba(30, 63, 82, 0.4), rgba(30, 63, 82, 0.6)), url("https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?w=1600&q=80&auto=format&fit=crop")' }}>
        <h1 className="font-display text-cream text-6xl md:text-8xl font-light text-center z-10 animate-fadeUp" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Le Savoir-Faire</h1>
      </section>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 mt-24">
        <div className="text-center mb-24">
          <p className="text-[10px] tracking-[0.5em] uppercase text-gold mb-6">L'Atelier Parisien</p>
          <h2 className="font-display text-petrol text-4xl md:text-5xl leading-tight font-light max-w-3xl mx-auto" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
            La main transforme l'idée en <span className="italic">matière</span>.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <div className="order-2 md:order-1 space-y-6 text-petrol/80 font-light leading-relaxed text-lg">
            <p>Tout commence dans notre atelier situé au cœur du XIe arrondissement de Paris. C'est ici que les mémoires se traduisent en croquis, que les premiers toiles prennent vie.</p>
            <p>Nous sourçons exclusivement des matières naturelles — lin lourd, soie grège, laine vierge — sélectionnées auprès des meilleurs tisseurs français et italiens.</p>
          </div>
          <div className="order-1 md:order-2 aspect-[4/3] bg-sand">
            <img src="https://images.unsplash.com/photo-1556228578-8d89cb35b2e6?w=900&q=80&auto=format&fit=crop" alt="Atelier Couture" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/3] bg-sand">
            <img src="https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=900&q=80&auto=format&fit=crop" alt="Détails" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-6 text-petrol/80 font-light leading-relaxed text-lg">
            <h3 className="font-display text-3xl text-petrol mb-4" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Le temps long.</h3>
            <p>Nos pièces sont montées de façon traditionnelle. Les intérieurs sont aussi beaux que les extérieurs : coutures gansées, entoilage rigoureux des cols, finitions à la main.</p>
            <p>Nous produisons en séries très courtes pour éviter toute surproduction. Ce temps long est un refus de la précipitation, un hommage à la patience.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicePage({ initialTab = "livraison", onShop }) {
  const { t } = useTranslation();
  const [tab, setTab] = useState(initialTab);
  useEffect(() => setTab(initialTab), [initialTab]);

  return (
    <div className="bg-cream min-h-[70vh] py-24 px-6 lg:px-12">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="font-display text-petrol text-5xl mb-12 font-light text-center" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Service Client</h1>
        <div className="flex flex-wrap justify-center gap-4 mb-16 border-b border-petrol/20 pb-4">
          {[
            { id: "livraison", label: "Livraison" },
            { id: "retours", label: "Retours" },
            { id: "tailles", label: "Guide des tailles" },
            { id: "entretien", label: "Entretien" },
          ].map((tItem) => (
            <button key={tItem.id} onClick={() => setTab(tItem.id)} className={`px-4 py-2 text-[11px] tracking-[0.3em] uppercase transition-colors ${tab === tItem.id ? "bg-petrol text-cream" : "text-petrol/60 hover:text-petrol"}`}>
              {tItem.label}
            </button>
          ))}
        </div>
        <div className="animate-fadeIn">
          {tab === "livraison" && (
            <div className="space-y-4 text-petrol/80 font-light">
              <h2 className="font-display text-3xl mb-6">Informations de livraison</h2>
              <p>Livraison standard (3 à 5 jours ouvrés) : 12€ ou offerte dès 200€ d'achats.</p>
            </div>
          )}
          {tab === "retours" && (
            <div className="space-y-4 text-petrol/80 font-light">
              <h2 className="font-display text-3xl mb-6">Politique de retours</h2>
              <p>Vous disposez d'un délai de 30 jours après réception pour retourner vos articles dans leur écrin.</p>
            </div>
          )}
          {tab === "tailles" && (
            <div className="space-y-4 text-petrol/80 font-light">
              <h2 className="font-display text-3xl mb-6">{t("footer.sizeGuide")}</h2>
              <p>Nos vêtements taillent normalement. Nous vous recommandons de prendre votre taille habituelle.</p>
            </div>
          )}
          {tab === "entretien" && (
            <div className="space-y-4 text-petrol/80 font-light">
              <h2 className="font-display text-3xl mb-6">Conseils d'entretien</h2>
              <p>Privilégiez le nettoyage à sec pour préserver la structure de vos vestes et manteaux.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LegalPage({ initialTab = "mentions" }) {
  const { t } = useTranslation();
  const [tab, setTab] = useState(initialTab);
  useEffect(() => setTab(initialTab), [initialTab]);

  return (
    <div className="bg-cream min-h-[70vh] py-24 px-6 lg:px-12">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="font-display text-petrol text-5xl mb-12 font-light text-center" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Informations Légales</h1>
        <div className="flex flex-wrap justify-center gap-4 mb-16 border-b border-petrol/20 pb-4">
          {[
            { id: "mentions", label: "Mentions légales" },
            { id: "cgv", label: "CGV" },
            { id: "confidentialite", label: "Confidentialité" },
            { id: "cookies", label: "Cookies" },
          ].map((tItem) => (
            <button key={tItem.id} onClick={() => setTab(tItem.id)} className={`px-4 py-2 text-[11px] tracking-[0.3em] uppercase transition-colors ${tab === tItem.id ? "bg-petrol text-cream" : "text-petrol/60 hover:text-petrol"}`}>
              {tItem.label}
            </button>
          ))}
        </div>
        <div className="animate-fadeIn space-y-4 text-petrol/80 font-light">
          {tab === "mentions" && (
            <><h2 className="font-display text-3xl mb-6">{t("footer.legal")}</h2><p>KALASAM SAS au capital de 10 000€</p></>
          )}
          {tab === "cgv" && (
            <><h2 className="font-display text-3xl mb-6">Conditions Générales de Vente</h2><p>L'achat de nos produits implique l'acceptation pleine et entière de nos conditions générales de vente.</p></>
          )}
          {tab === "confidentialite" && (
            <><h2 className="font-display text-3xl mb-6">Politique de confidentialité</h2><p>Vos données personnelles sont traitées dans le strict respect de la réglementation RGPD.</p></>
          )}
          {tab === "cookies" && (
            <><h2 className="font-display text-3xl mb-6">Gestion des Cookies</h2><p>Notre site utilise des cookies essentiels au bon fonctionnement du panier et du compte utilisateur.</p></>
          )}
        </div>
      </div>
    </div>
  );
}

function ContactPage({ onBookAppointment, onChatOpen }) {
  const { t } = useTranslation();
  const [status, setStatus] = useState("idle");
  const handleSubmit = () => { setStatus("sending"); setTimeout(() => setStatus("sent"), 1200); };

  return (
    <div className="bg-cream py-32 px-6 min-h-[70vh]" id="footer-contact">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <div className="mb-12">
            <p className="text-[10px] tracking-[0.5em] uppercase text-gold mb-4">Nous écrire</p>
            <h1 className="font-display text-petrol text-5xl font-light" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Contact</h1>
          </div>
          {status === "sent" ? (
            <div className="p-8 bg-sand-light/30 border border-petrol/10 animate-fadeIn text-center">
              <Check size={32} className="mx-auto mb-4 text-gold" />
              <h2 className="font-display text-2xl mb-2" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Message envoyé</h2>
              <p className="text-petrol/60 font-light text-sm">Nous vous répondrons dans les plus brefs délais.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <input type="text" placeholder={t("form.firstname")} className="w-full bg-transparent border-b border-petrol/30 py-3 text-sm focus:border-gold transition-colors" />
                <input type="text" placeholder={t("form.lastname")} className="w-full bg-transparent border-b border-petrol/30 py-3 text-sm focus:border-gold transition-colors" />
              </div>
              <input type="email" placeholder={t("form.email")} className="w-full bg-transparent border-b border-petrol/30 py-3 text-sm focus:border-gold transition-colors" />
              <textarea placeholder="Votre message" rows={5} className="w-full bg-transparent border-b border-petrol/30 py-3 text-sm focus:border-gold transition-colors resize-none" />
              <button onClick={handleSubmit} disabled={status === "sending"} className="w-full bg-petrol text-cream py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-petrol-dark transition-colors disabled:opacity-70 flex justify-center items-center gap-3">
                {status === "sending" ? "Envoi en cours..." : "Envoyer"}
              </button>
            </div>
          )}
        </div>
        <div className="bg-sand-light/30 p-10 border border-petrol/10 flex flex-col justify-center h-full">
          <h2 className="font-display text-4xl mb-4 italic text-petrol" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Rencontrons-nous.</h2>
          <p className="text-petrol/80 font-light leading-relaxed mb-8">
            Parce que nos pièces nécessitent de prendre le temps, nous vous accueillons sur rendez-vous dans notre atelier parisien pour un essayage privé, une mise à taille, ou une simple découverte de nos matières.
          </p>
          <div className="space-y-4">
            <button onClick={onBookAppointment} className="w-full flex items-center justify-center gap-3 border border-petrol text-petrol py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-petrol hover:text-cream transition-colors group">
              <Calendar size={14} className="text-gold group-hover:text-cream transition-colors" /> Réserver un essayage
            </button>
            <button onClick={onChatOpen} className="w-full flex items-center justify-center gap-3 bg-petrol text-cream py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-gold hover:text-petrol transition-colors group">
              <MessageCircle size={14} /> Contacter un conseiller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}