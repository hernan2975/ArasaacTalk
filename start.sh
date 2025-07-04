#!/bin/bash

APP_DIR="/opt/arasaac-offline"

cd "$APP_DIR" || exit 1

# Crear entorno virtual si no existe
if [ ! -d "venv" ]; then
  python3 -m venv venv
fi

# Activar entorno virtual
source venv/bin/activate

# Instalar dependencias si es necesario
pip install --upgrade pip
pip install -r requirements.txt

# Lanzar la app Flask
python3 app.py
