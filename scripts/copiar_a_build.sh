#!/bin/bash
set -e

DEST="build/opt/arasaac-offline"
mkdir -p "$DEST"

echo "🧱 Copiando archivos a $DEST..."
cp -r app static templates preload requirements.txt app.py "$DEST"
cp manifest.webmanifest "$DEST"
echo "✅ Archivos copiados correctamente."
