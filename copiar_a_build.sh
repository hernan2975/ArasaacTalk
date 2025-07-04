#!/bin/bash

echo "📁 Creando estructura: build/opt/arasaac-offline/"
mkdir -p build/opt/arasaac-offline

echo "📂 Copiando carpetas..."
cp -r app/ build/opt/arasaac-offline/
cp -r static/ build/opt/arasaac-offline/
cp -r templates/ build/opt/arasaac-offline/
cp -r preload/ build/opt/arasaac-offline/
cp -r i18n/ build/opt/arasaac-offline/

echo "📄 Copiando archivos sueltos..."
cp app.py build/opt/arasaac-offline/
cp requirements.txt build/opt/arasaac-offline/
cp start.sh build/opt/arasaac-offline/
cp manifest.webmanifest build/opt/arasaac-offline/
cp LICENSE build/opt/arasaac-offline/
cp README.md build/opt/arasaac-offline/

echo "✅ Archivos copiados correctamente."

chmod +x build/opt/arasaac-offline/start.sh
