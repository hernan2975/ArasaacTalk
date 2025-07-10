import requests

ARASAAC_API = "https://api.arasaac.org/api/pictograms/es/search"
ARASAAC_CDN = "https://static.arasaac.org/pictograms"

def buscar_pictogramas(palabra: str):
    url = f"{ARASAAC_API}/{palabra}"
    try:
        res = requests.get(url, timeout=4)
        if res.status_code == 200:
            return res.json()
    except requests.RequestException:
        pass
    return []

def obtener_url_imagen(id_picto: int, size: int = 300) -> str:
    return f"{ARASAAC_CDN}/{id_picto}/{id_picto}_{size}.png"
