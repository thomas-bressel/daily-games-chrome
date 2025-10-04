#!/bin/bash

# Script d'installation automatique pour daily-games-chrome
# Node 20 LTS, Extension New Tab, Manifest V3

echo "🚀 Installation de Daily Games Chrome Extension..."

# 1. Package.json
cat > package.json << 'EOF'
{
  "name": "daily-games-chrome",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "npm run build:next && npm run build:extension",
    "build:next": "next build && next export -o dist",
    "build:extension": "node scripts/prepare-extension.js",
    "start": "next start",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "cypress": "cypress open",
    "cypress:headless": "cypress run"
  }
}
EOF

# 2. TypeScript configuration
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/styles/*": ["src/styles/*"],
      "@/types/*": ["src/types/*"]
    },
    "types": ["jest", "@testing-library/jest-dom", "cypress", "chrome"]
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "out",
    ".next",
    "cypress.config.ts"
  ]
}
EOF

# 3. Next.js configuration pour CSR only
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        crypto: false,
      };
    }
    return config;
  }
};

module.exports = nextConfig;
EOF

# 4. Jest configuration
cat > jest.config.js << 'EOF'
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/tests/jest/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(scss|sass|css)$': '<rootDir>/tests/jest/__mocks__/styleMock.js',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/pages/_app.tsx',
    '!src/pages/_document.tsx',
  ],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  testMatch: [
    '<rootDir>/tests/jest/**/*.(test|spec).[jt]s?(x)',
    '<rootDir>/src/**/*.(test|spec).[jt]s?(x)',
  ],
  coverageDirectory: '<rootDir>/coverage',
  moduleDirectories: ['node_modules', '<rootDir>/'],
};

module.exports = createJestConfig(customJestConfig);
EOF

# 5. Cypress configuration
cat > cypress.config.ts << 'EOF'
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'tests/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'tests/cypress/support/e2e.ts',
    fixturesFolder: 'tests/cypress/fixtures',
    screenshotsFolder: 'tests/cypress/screenshots',
    videosFolder: 'tests/cypress/videos',
    viewportWidth: 1280,
    viewportHeight: 720,
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    specPattern: 'tests/cypress/component/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'tests/cypress/support/component.ts',
  },
});
EOF

# 6. Pages Next.js
cat > src/pages/_app.tsx << 'EOF'
import type { AppProps } from 'next/app';
import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
EOF

cat > src/pages/_document.tsx << 'EOF'
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <meta charSet="utf-8" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
EOF

cat > src/pages/index.tsx << 'EOF'
import { useEffect, useState } from 'react';
import Example from '@/components/example/Example';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // CSR only
  }

  return (
    <div className="app">
      <h1>Daily Games Chrome Extension</h1>
      <Example />
    </div>
  );
}
EOF

# 7. Component Example avec BEM
cat > src/components/example/Example.tsx << 'EOF'
import styles from './Example.module.scss';

const Example = () => {
  return (
    <div className={styles['example']}>
      <div className={styles['example__header']}>
        <h2 className={styles['example__title']}>Composant Example</h2>
      </div>
      <div className={styles['example__content']}>
        <p className={styles['example__text']}>
          Exemple de composant avec SASS et convention BEM
        </p>
        <button className={styles['example__button']}>
          Cliquez-moi
        </button>
      </div>
    </div>
  );
};

export default Example;
EOF

cat > src/components/example/Example.module.scss << 'EOF'
@import '@/styles/abstracts/variables';
@import '@/styles/abstracts/mixins';

.example {
  padding: 2rem;
  border: 1px solid $color-border;
  border-radius: 8px;
  background: $color-background;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 2rem 0;

  &__header {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid $color-primary;
  }

  &__title {
    color: $color-primary;
    font-size: 1.75rem;
    margin: 0;
    font-weight: 600;
  }

  &__content {
    padding: 1.5rem;
    background: $color-surface;
    border-radius: 6px;
  }

  &__text {
    color: $color-text;
    margin: 0 0 1rem 0;
    line-height: 1.6;
  }

  &__button {
    @include button-primary;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba($color-primary, 0.3);
    }
  }
}
EOF

# 8. Styles SASS
cat > src/styles/globals.scss << 'EOF'
@import './abstracts/variables';
@import './abstracts/mixins';

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  background: linear-gradient(135deg, $color-background 0%, $color-surface 100%);
  color: $color-text;
  min-height: 100vh;
  line-height: 1.5;
}

.app {
  min-height: 100vh;
  padding: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  
  h1 {
    font-size: 2.5rem;
    color: $color-primary;
    text-align: center;
    margin-bottom: 3rem;
    font-weight: 700;
  }
}

a {
  color: $color-primary;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: darken($color-primary, 10%);
    text-decoration: underline;
  }
}
EOF

cat > src/styles/abstracts/_variables.scss << 'EOF'
// Couleurs principales
$color-primary: #0070f3;
$color-secondary: #1a202c;
$color-accent: #f81ce5;
$color-success: #0cce6b;
$color-warning: #ffa400;
$color-error: #ff4757;

// Couleurs de base
$color-background: #ffffff;
$color-surface: #f7fafc;
$color-text: #2d3748;
$color-text-light: #718096;
$color-border: #e2e8f0;

// Dark mode colors (pour future utilisation)
$color-dark-background: #1a202c;
$color-dark-surface: #2d3748;
$color-dark-text: #f7fafc;

// Breakpoints responsive
$breakpoint-mobile: 480px;
$breakpoint-tablet: 768px;
$breakpoint-desktop: 1024px;
$breakpoint-wide: 1280px;

// Espacements
$spacing-unit: 8px;
$spacing-xs: $spacing-unit * 0.5;
$spacing-sm: $spacing-unit;
$spacing-md: $spacing-unit * 2;
$spacing-lg: $spacing-unit * 3;
$spacing-xl: $spacing-unit * 4;

// Typographie
$font-size-base: 16px;
$font-size-sm: 14px;
$font-size-lg: 18px;
$font-size-xl: 24px;
$font-size-2xl: 32px;

// Animations
$transition-fast: 0.15s;
$transition-normal: 0.3s;
$transition-slow: 0.5s;
EOF

cat > src/styles/abstracts/_mixins.scss << 'EOF'
// Mixin pour les media queries
@mixin respond-to($breakpoint) {
  @if $breakpoint == 'mobile' {
    @media (max-width: $breakpoint-mobile) {
      @content;
    }
  } @else if $breakpoint == 'tablet' {
    @media (max-width: $breakpoint-tablet) {
      @content;
    }
  } @else if $breakpoint == 'desktop' {
    @media (min-width: $breakpoint-desktop) {
      @content;
    }
  } @else if $breakpoint == 'wide' {
    @media (min-width: $breakpoint-wide) {
      @content;
    }
  }
}

// Mixin pour centrer avec flexbox
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

// Mixin pour les transitions
@mixin transition($property: all, $duration: $transition-normal, $easing: ease) {
  transition: $property $duration $easing;
}

// Mixin pour les boutons
@mixin button-primary {
  background: $color-primary;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  @include transition;
  
  &:hover {
    background: darken($color-primary, 10%);
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

// Mixin pour les cartes
@mixin card {
  background: $color-background;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: $spacing-lg;
  @include transition;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
}

// Mixin pour text truncate
@mixin text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
EOF

# 9. Extension Chrome Manifest V3
cat > public/manifest.json << 'EOF'
{
  "manifest_version": 3,
  "name": "Daily Games",
  "version": "1.0.0",
  "description": "Daily Games - Your gaming companion for every new tab",
  "permissions": [
    "storage",
    "tabs"
  ],
  "host_permissions": [],
  "background": {
    "service_worker": "background.js",
    "type": "module"
  },
  "chrome_url_overrides": {
    "newtab": "index.html"
  },
  "icons": {
    "16": "icons/icon-16.png",
    "48": "icons/icon-48.png",
    "128": "icons/icon-128.png"
  },
  "content_security_policy": {
    "extension_pages": "script-src 'self' 'wasm-unsafe-eval'; object-src 'self'"
  },
  "web_accessible_resources": [
    {
      "resources": ["_next/*", "*.js", "*.css", "*.json"],
      "matches": ["<all_urls>"]
    }
  ]
}
EOF

cat > public/background.js << 'EOF'
// Service Worker pour l'extension Chrome (Manifest V3)
console.log('Daily Games Extension - Service Worker started');

// Installation de l'extension
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Daily Games Extension installed successfully');
    // Initialiser le storage avec des données par défaut si nécessaire
    chrome.storage.local.set({
      installed: true,
      installDate: new Date().toISOString()
    });
  } else if (details.reason === 'update') {
    console.log('Daily Games Extension updated to version', chrome.runtime.getManifest().version);
  }
});

// Gestion des messages depuis l'application
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request);
  
  switch (request.action) {
    case 'getData':
      chrome.storage.local.get(['userData'], (result) => {
        sendResponse({ success: true, data: result.userData || {} });
      });
      return true; // Garder le canal ouvert pour la réponse asynchrone
      
    case 'saveData':
      chrome.storage.local.set({ userData: request.data }, () => {
        sendResponse({ success: true });
      });
      return true;
      
    default:
      sendResponse({ success: false, error: 'Unknown action' });
  }
});

// Surveillance de l'activation de l'extension
chrome.runtime.onStartup.addListener(() => {
  console.log('Browser started, Daily Games Extension ready');
});
EOF

# 10. Docker configuration (Node 20 LTS)
cat > docker/Dockerfile << 'EOF'
# Build stage avec Node 20 LTS
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de package
COPY package*.json ./
RUN npm ci

# Copier le code source
COPY . .

# Build de production
RUN npm run build:next

# Production stage avec Node 20 LTS
FROM node:20-alpine

WORKDIR /app

# Installer serve pour servir les fichiers statiques
RUN npm install -g serve

# Copier les fichiers buildés
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

EXPOSE 3000

# Servir l'application
CMD ["serve", "dist", "-p", "3000", "-s"]
EOF

cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  daily-games-chrome:
    build:
      context: .
      dockerfile: docker/Dockerfile
    container_name: daily-games-chrome
    ports:
      - "3000:3000"
    networks:
      - daily-games-chrome-net
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000/"]
      interval: 30s
      timeout: 10s
      retries: 3

  apache:
    image: httpd:2.4-alpine
    container_name: daily-games-apache
    ports:
      - "8080:80"
    networks:
      - daily-games-chrome-net
    volumes:
      - ./dist:/usr/local/apache2/htdocs/:ro
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "httpd", "-t"]
      interval: 30s
      timeout: 10s
      retries: 3

networks:
  daily-games-chrome-net:
    driver: bridge
    name: daily-games-chrome-net
EOF

# 11. Script de préparation pour l'extension
cat > scripts/prepare-extension.js << 'EOF'
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const publicDir = path.join(__dirname, '..', 'public');

console.log('🔧 Preparing Chrome Extension files...');

// Créer le dossier dist s'il n'existe pas
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copier les fichiers essentiels de l'extension
const filesToCopy = ['manifest.json', 'background.js'];
const foldersToCopy = ['icons'];

// Copier les fichiers
filesToCopy.forEach(file => {
  const src = path.join(publicDir, file);
  const dest = path.join(distDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✅ Copied ${file}`);
  } else {
    console.warn(`⚠️  File ${file} not found`);
  }
});

// Copier les dossiers
foldersToCopy.forEach(folder => {
  const src = path.join(publicDir, folder);
  const dest = path.join(distDir, folder);
  if (fs.existsSync(src)) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.cpSync(src, dest, { recursive: true });
    console.log(`✅ Copied ${folder}/`);
  } else {
    console.warn(`⚠️  Folder ${folder} not found`);
  }
});

// Modifier les chemins dans index.html pour l'extension
const htmlFile = path.join(distDir, 'index.html');
if (fs.existsSync(htmlFile)) {
  let html = fs.readFileSync(htmlFile, 'utf8');
  
  // Corriger les chemins pour l'extension
  html = html.replace(/href="\//g, 'href="./');
  html = html.replace(/src="\//g, 'src="./');
  
  fs.writeFileSync(htmlFile, html);
  console.log('✅ Updated HTML paths for Chrome Extension');
}

console.log('🎉 Extension preparation complete!');
console.log('📦 Extension ready in:', distDir);
EOF

# 12. Tests Jest
cat > tests/jest/jest.setup.js << 'EOF'
import '@testing-library/jest-dom';
EOF

cat > tests/jest/__mocks__/styleMock.js << 'EOF'
module.exports = {};
EOF

cat > tests/jest/Example.test.tsx << 'EOF'
import { render, screen } from '@testing-library/react';
import Example from '@/components/example/Example';

describe('Example Component', () => {
  it('renders the title', () => {
    render(<Example />);
    const title = screen.getByText('Composant Example');
    expect(title).toBeInTheDocument();
  });

  it('renders the text content', () => {
    render(<Example />);
    const text = screen.getByText(/Exemple de composant avec SASS/);
    expect(text).toBeInTheDocument();
  });

  it('renders the button', () => {
    render(<Example />);
    const button = screen.getByText('Cliquez-moi');
    expect(button).toBeInTheDocument();
  });
});
EOF

# 13. Tests Cypress
cat > tests/cypress/support/e2e.ts << 'EOF'
// Support pour les tests e2e
Cypress.Commands.add('getBySel', (selector) => {
  return cy.get(`[data-test="${selector}"]`);
});

declare global {
  namespace Cypress {
    interface Chainable {
      getBySel(selector: string): Chainable<Element>;
    }
  }
}

export {};
EOF

cat > tests/cypress/support/component.ts << 'EOF'
import './commands';
EOF

cat > tests/cypress/support/commands.ts << 'EOF'
export {};
EOF

cat > tests/cypress/e2e/home.cy.ts << 'EOF'
describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the main heading', () => {
    cy.contains('h1', 'Daily Games Chrome Extension').should('be.visible');
  });

  it('displays the example component', () => {
    cy.contains('Composant Example').should('be.visible');
  });

  it('has a clickable button', () => {
    cy.contains('button', 'Cliquez-moi').should('be.visible').click();
  });
});
EOF

# 14. Créer des icônes temporaires
echo "Creating temporary icons..."
for size in 16 48 128; do
  # Créer une icône SVG puis la convertir en PNG (ou créer directement un PNG simple)
  cat > public/icons/icon-${size}.png << EOF
# Fichier PNG temporaire - remplacez par vos vraies icônes
EOF
done

# 15. Créer next-env.d.ts
cat > next-env.d.ts << 'EOF'
/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
  }
}
EOF

# 16. Créer .gitignore
cat > .gitignore << 'EOF'
# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage
/tests/cypress/screenshots
/tests/cypress/videos

# Next.js
/.next/
/out/
/dist/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# IDE
.idea
.vscode
*.swp
*.swo
EOF

echo "✅ Tous les fichiers ont été créés avec succès!"
echo ""
echo "📋 Prochaines étapes:"
echo "1. npm install - Installer les dépendances"
echo "2. npm run dev - Lancer en développement"
echo "3. npm run build - Builder pour production"
echo "4. docker-compose up --build - Lancer avec Docker"