#!/bin/bash

echo "🛑 Arrêt des services système..."
sudo systemctl stop apache2 2>/dev/null || true
sudo systemctl stop redis-server 2>/dev/null || true  
sudo systemctl stop mysql 2>/dev/null || true
sudo systemctl stop mongod 2>/dev/null || true

echo "🐳 Démarrage Docker Compose..."
sudo docker compose -f docker-compose.yml down
# sudo docker compose -f docker-compose.yml up
sudo docker compose -f docker-compose.yml up -d --build
sudo docker compose -f docker-compose.yml ps
echo "✅ Services démarrés !"


