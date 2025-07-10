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

def descargar(id_picto):
    url = f"{CDN}/{id_picto}/{id_picto}_300.png"
    ruta = CARPETA / f"{id_picto}.png"
    if not ruta.exists():
        res = requests.get(url)
        if res.status_code == 200:
            with open(ruta, "wb") as f:
                f.write(res.content)
    return str(ruta)

def main():
    CARPETA.mkdir(parents=True, exist_ok=True)
    pictos = {}
    metadata = {}

    for categoria, palabras in CATEGORIAS.items():
        for palabra in palabras:
            res = requests.get(f"{BASE_API}/{palabra}")
            if res.status_code != 200: continue
            data = res.json()
            if not data: continue
            p = data[0]
            id_picto = p["id"]
            ruta_local = descargar(id_picto)
            text = palabra.capitalize()

            pictos[palabra] = {
                "id": id_picto,
                "local": ruta_local,
                "text": text
            }

            metadata[str(id_picto)] = {
                "text": text,
                "altText": p.get("meaning", f"Imagen de {text}"),
                "tags": [categoria],
                "contrast": "alto",
                "recommendedFor": ["niño", "TEA"],
                "local": ruta_local
            }

    with open("preload/pictogramas.json", "w", encoding="utf-8") as f:
        json.dump(pictos, f, ensure_ascii=False, indent=2)

    with open("preload/metadata.json", "w", encoding="utf-8") as f:
        json.dump(metadata, f, ensure_ascii=False, indent=2)

    with open("preload/categorias.json", "w", encoding="utf-8") as f:
        json.dump(CATEGORIAS, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()
