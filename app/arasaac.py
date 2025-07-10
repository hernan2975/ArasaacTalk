
import requests

def buscar_pictogramas(palabra):
    url = f"https://api.arasaac.org/api/pictograms/es/search/{palabra}"
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            return response.json()
    except requests.RequestException:
        pass
    return []

def obtener_url_imagen(id_picto):
    return f"https://static.arasaac.org/pictograms/{id_picto}/{id_picto}_300.png"
