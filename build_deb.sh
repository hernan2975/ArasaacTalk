#!/bin/bash

# Detener si ocurre algún error
set -e

echo "🚀 Iniciando copia de archivos..."
bash copiar_a_build.sh

echo "📦 Generando paquete .deb con fpm..."
fpm -s dir -t deb \
  -n arasaac-offline \
  -v 1.0.0 \
  --prefix / \
  --description "App educativa offline con pictogramas de ARASAAC" \
  --maintainer "hernan@ejemplo.com" \
  --license "MIT" \
  -C build .

echo "✅ Paquete .deb generado exitosamente."
