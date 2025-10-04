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
