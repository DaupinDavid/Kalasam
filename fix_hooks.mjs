import fs from 'fs';

const appPath = 'src/App.jsx';
let content = fs.readFileSync(appPath, 'utf-8');

// The components that need it: KalasamSite, HomePage, ShopPage, ProductPage, StoryPage, ChaptersPage, WishlistPage, AccountPage, CheckoutPage, ManifestoPage, AtelierPage
const components = [
  "KalasamSite",
  "HomePage",
  "ShopPage",
  "ProductPage",
  "StoryPage",
  "ChaptersPage",
  "WishlistPage",
  "AccountPage",
  "CheckoutPage",
  "ManifestoPage",
  "AtelierPage"
];

components.forEach(comp => {
  // Find the function definition
  const regex = new RegExp(`(function ${comp}\\([^)]*\\)\\s*\\{)`);
  
  content = content.replace(regex, (match) => {
    return match + `\n  const { t } = useTranslation();`;
  });
});

fs.writeFileSync(appPath, content, 'utf-8');
console.log('Injected useTranslation into components.');
