import requests, os, json
from pathlib import Path

BASE_API = "https://api.arasaac.org/api/pictograms/es/search"
CDN = "https://static.arasaac.org/pictograms"
CARPETA = Path("preload/pictos/")
CATEGORIAS = {
  "comida": ["comer", "beber", "desayuno"],
  "acciones": ["caminar", "correr", "leer"],
  "emociones": ["feliz", "triste", "enojado"]
}

def descargar_pictograma(id_picto):
    url = f"{CDN}/{id_picto}/{id_picto}_300.png"
    ruta = CARPETA / f"{id_picto}.png"
    if not ruta.exists():
        img = requests.get(url)
        if img.status_code == 200:
            with open(ruta, "wb") as f:
                f.write(img.content)
    return str(ruta)

def main():
    CARPETA.mkdir(parents=True, exist_ok=True)
    diccionario = {}
    metadatos = {}

    for categoria, palabras in CATEGORIAS.items():
        for palabra in palabras:
            res = requests.get(f"{BASE_API}/{palabra}")
            if res.status_code != 200: continue
            data = res.json()
            if not data: continue
            p = data[0]
            id_picto = p["id"]
            ruta_local = descargar_pictograma(id_picto)
            text = palabra.capitalize()

            diccionario[palabra] = {
                "id": id_picto,
                "local": ruta_local,
                "text": text
            }

            metadatos[str(id_picto)] = {
                "text": text,
                "altText": p.get("meaning", "Imagen de " + text),
                "tags": [categoria],
                "contrast": "alto",
                "recommendedFor": ["niño", "TEA"],
                "local": ruta_local
            }

    # Guardar JSONs
    with open("preload/pictogramas.json", "w", encoding="utf-8") as f:
        json.dump(diccionario, f, ensure_ascii=False, indent=2)

    with open("preload/metadata.json", "w", encoding="utf-8") as f:
        json.dump(metadatos, f, ensure_ascii=False, indent=2)

    with open("preload/categorias.json", "w", encoding="utf-8") as f:
        json.dump(CATEGORIAS, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()

