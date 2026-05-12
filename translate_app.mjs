import fs from 'fs';
import path from 'path';

const appPath = 'src/App.jsx';
const i18nPath = 'src/i18n/kalasam_i18n.jsx';

let appContent = fs.readFileSync(appPath, 'utf-8');

// Array of replacements: [regex or string, replacement]
const replacements = [
  // Header / Menu
  [/>Boutique</g, ">{t('nav.shop')}<"],
  [/>Notre Histoire</g, ">{t('nav.story')}<"],
  [/>Chapitres</g, ">{t('nav.chapters')}<"],
  [/>Contact</g, ">{t('nav.contact')}<"],
  [/>Accueil</g, ">{t('nav.home')}<"],
  [/>L'Histoire</g, ">{t('nav.story')}<"],
  [/>Mon compte</g, ">{t('nav.account')}<"],
  [/>Favoris</g, ">{t('nav.wishlist')}<"],
  [/placeholder="Rechercher une pièce, une catégorie, un chapitre..."/g, "placeholder={t('nav.search')}"],

  // Buttons & CTAs
  [/>Ajouter au panier</g, ">{t('product.addToCart')}<"],
  [/>Retour à la boutique</g, ">{t('product.backToShop')}<"],
  [/>Découvrir la collection</g, ">{t('hero.cta.discover')}<"],
  [/>Lire l'histoire complète</g, ">{t('hero.cta.readStory')}<"],
  [/>Tout voir</g, ">{t('shop.seeAll')}<"],
  [/>Toute la boutique</g, ">{t('section.allShop')}<"],
  [/>Voir la boutique</g, ">{t('cart.shopNow')}<"],
  [/>Découvrir la boutique</g, ">{t('cart.shopNow')}<"],

  // Footer
  [/>Livraison</g, ">{t('footer.shipping')}<"],
  [/>Retours</g, ">{t('footer.returns')}<"],
  [/>Guide des tailles</g, ">{t('footer.sizeGuide')}<"],
  [/>Entretien</g, ">{t('footer.care')}<"],
  [/>Mentions légales</g, ">{t('footer.legal')}<"],
  [/>Confidentialité</g, ">{t('footer.privacy')}<"],
  [/>Cookies</g, ">{t('footer.cookies')}<"],
  [/>Tous droits réservés.</g, ">{t('footer.rights')}<"],
  [/>Retours sous 30 jours</g, ">{t('footer.returns30')}<"],
  [/>Expédition mondiale</g, ">{t('footer.worldwide')}<"],

  // Cart / Checkout
  [/>Votre panier</g, ">{t('cart.title')}<"],
  [/>Votre panier est vide</g, ">{t('cart.empty')}<"],
  [/>Sous-total</g, ">{t('cart.subtotal')}<"],
  [/>Total</g, ">{t('cart.total')}<"],
  [/>Passer au paiement</g, ">{t('cart.checkout')}<"],
  [/>Paiement sécurisé · Livraison soignée</g, ">{t('cart.securePayment')}<"],
  [/>Offerte</g, ">{t('cart.shippingFree')}<"],
  [/>Résumé de la commande</g, ">{t('checkout.summary')}<"],
  [/>Valider la Commande</g, ">{t('checkout.submit')}<"],
  [/>1\. Contact</g, ">{t('checkout.contact')}<"],
  [/>2\. Livraison</g, ">{t('checkout.shipping')}<"],
  [/>3\. Paiement</g, ">{t('checkout.payment')}<"],
  [/>L'Art d'Offrir \(Cadeau\)</g, ">{t('checkout.gift')}<"],

  // Forms
  [/placeholder="Prénom"/g, "placeholder={t('form.firstname')}"],
  [/placeholder="Nom"/g, "placeholder={t('form.lastname')}"],
  [/placeholder="E-mail"/g, "placeholder={t('form.email')}"],
  [/placeholder="Adresse e-mail"/g, "placeholder={t('form.email')}"],
  [/placeholder="Votre adresse e-mail"/g, "placeholder={t('form.email')}"],
  [/placeholder="Mot de passe"/g, "placeholder={t('form.password')}"],
  [/placeholder="Adresse"/g, "placeholder={t('form.address')}"],
  [/placeholder="Code postal"/g, "placeholder={t('form.zip')}"],
  [/placeholder="Ville"/g, "placeholder={t('form.city')}"],
  [/placeholder="Nom sur la carte"/g, "placeholder={t('form.cardName')}"],
  [/placeholder="Numéro de carte"/g, "placeholder={t('form.cardNumber')}"],

  // Account
  [/>Se déconnecter</g, ">{t('account.logout')}<"],
  [/>Historique des commandes</g, ">{t('account.history')}<"],
  [/>Connexion</g, ">{t('account.login')}<"],
  [/>Créer un compte</g, ">{t('account.signup')}<"],
  [/>Se connecter</g, ">{t('account.loginAction')}<"],
  [/>Créer mon compte</g, ">{t('account.signupAction')}<"],

  // Shop
  [/>La boutique</g, ">{t('shop.subtitle')}<"],
  [/>Filtres</g, ">{t('shop.filters')}<"],
  [/>Tri</g, ">{t('shop.sort')}<"],
  [/>Plus récents</g, ">{t('shop.sortNewest')}<"],
  [/>Prix croissant</g, ">{t('shop.sortAsc')}<"],
  [/>Prix décroissant</g, ">{t('shop.sortDesc')}<"],
  [/>Aucune pièce trouvée</g, ">{t('shop.empty')}<"],

  // Product
  [/>Coloris :/g, ">{t('product.colorLabel')}<"],
  [/>Taille</g, ">{t('product.size')}<"],
  [/>Guide des tailles</g, ">{t('product.sizeGuide')}<"],
  [/>Compléter la silhouette</g, ">{t('product.completeLook')}<"],
  [/>L'art de l'ensemble</g, ">{t('product.artOfSet')}<"],

  // Chat
  [/>Conseiller Privé</g, ">{t('chat.advisor')}<"],
  [/>Conseiller KALASAM</g, ">{t('chat.advisorName')}<"],
  [/>En ligne</g, ">{t('chat.online')}<"],
  [/placeholder="Écrivez votre message..."/g, "placeholder={t('chat.placeholder')}"],

  // Modal
  [/>Essayage Privé</g, ">{t('modal.bookingTitle')}<"],
  [/>Confirmer la demande</g, ">{t('form.confirm')}<"],

  // Success
  [/>Commande confirmée</g, ">{t('checkout.confirmed')}<"],
  [/>Merci pour votre confiance\.</g, ">{t('checkout.thanks')}<"],
  [/>Retour à l'accueil</g, ">{t('checkout.backHome')}<"],

  // Newsletter
  [/>Lettre KALASAM</g, ">{t('newsletter.subtitle')}<"],
  [/>Recevez nos chapitres avant tout le monde</g, ">{t('newsletter.title')}<"],
  [/>S'inscrire</g, ">{t('newsletter.subscribe')}<"],

  // Home sections
  [/>La sélection</g, ">{t('section.selection')}<"],
  [/>Pièces signature</g, ">{t('section.signatureItems')}<"],
  [/>Notre ADN</g, ">{t('section.dna')}<"],
  [/>Les codes de la maison</g, ">{t('section.codes')}<"],
  [/>Nouvelles arrivées</g, ">{t('section.newArrivals')}<"],
  [/>Cette semaine</g, ">{t('section.thisWeek')}<"],
  [/>Lookbook</g, ">{t('section.lookbook')}<"],
  [/>Mémoire</g, ">{t('section.memory')}<"],
  [/>en mouvement</g, ">{t('section.inMotion')}<"],

  // Wishlist
  [/>Mes favoris</g, ">{t('wishlist.subtitle')}<"],
  [/>Votre wishlist est vide</g, ">{t('wishlist.empty')}<"],

  // Categories
  [/>Vestes</g, ">{t('cat.jackets')}<"],
  [/>Robes</g, ">{t('cat.dresses')}<"],
  [/>Hauts</g, ">{t('cat.tops')}<"],
  [/>Pantalons</g, ">{t('cat.pants')}<"],
  [/>Jupes</g, ">{t('cat.skirts')}<"],
  [/>Toutes les pièces</g, ">{t('nav.allPieces')}<"],
  [/>Tout</g, ">{t('cat.all')}<"],
];

for (const [search, replace] of replacements) {
  appContent = appContent.replace(search, replace);
}

fs.writeFileSync(appPath, appContent, 'utf-8');
console.log('App.jsx updated.');
