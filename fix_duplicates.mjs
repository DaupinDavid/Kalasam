import fs from 'fs';

const appPath = 'src/App.jsx';
let content = fs.readFileSync(appPath, 'utf-8');

// Replace 2 or more consecutive useTranslation declarations with a single one
content = content.replace(/(const\s+\{\s*t\s*\}\s*=\s*useTranslation\(\);\s*){2,}/g, 'const { t } = useTranslation();\n  ');

fs.writeFileSync(appPath, content, 'utf-8');
console.log('Fixed duplicate useTranslation declarations.');
