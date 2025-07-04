import os
import json
import requests

# Configuración
API_URL = "https://api.arasaac.org/api/pictograms"
IDIOMA = "es"
MAX_PICTOS = 5
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(BASE_DIR, "..", "preload")
DATOS_DIR = os.path.join(ROOT, "pictos", "datos")
IMG_DIR = os.path.join(ROOT, "pictos", "imagenes")

# Asegurar carpetas
os.makedirs(DATOS_DIR, exist_ok=True)
os.makedirs(IMG_DIR, exist_ok=True)

# Cargar categorías
with open(os.path.join(ROOT, "categorias.json"), "r", encoding="utf-8") as f:
    categorias = json.load(f)["categorias"]

descargados = 0
for categoria in categorias:
    print(f"\n🔍 Descargando pictogramas para: {categoria}")
    resp = requests.get(f"{API_URL}/{IDIOMA}/search/{categoria}")
    if resp.status_code != 200:
        print(f"❌ Error en la búsqueda de: {categoria}")
        continue

    pictos = resp.json()[:MAX_PICTOS]
    for picto in pictos:
        pid = str(picto["_id"])
        json_path = os.path.join(DATOS_DIR, f"{pid}.json")
        img_path = os.path.join(IMG_DIR, f"{pid}.png")

        # Guardar JSON
        with open(json_path, "w", encoding="utf-8") as jf:
            json.dump(picto, jf, ensure_ascii=False, indent=2)

        # Descargar imagen
        img_url = f"https://static.arasaac.org/pictograms/{pid}/{pid}_300.png"
        try:
            img_data = requests.get(img_url).content
            with open(img_path, "wb") as imgf:
                imgf.write(img_data)
        except:
            print(f"⚠️  No se pudo guardar imagen {pid}")
            continue

        descargados += 1
        print(f"✅ {pid} - OK")

print(f"\n🎉 Descarga finalizada. Total pictogramas guardados: {descargados}")
