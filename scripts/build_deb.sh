#!/bin/bash
set -e

bash scripts/copiar_a_build.sh

echo "📦 Generando paquete .deb..."
fpm -s dir -t deb -n arasaac-offline -v 1.0.0 \
  --prefix /opt/arasaac-offline \
  -C build/opt/arasaac-offline

echo "✅ Paquete generado: arasaac-offline_1.0.0_amd64.deb"
