import pytest
from app.arasaac import buscar_pictogramas, obtener_url_imagen

def test_buscar_pictogramas():
    resultados = buscar_pictogramas("comer")
    assert isinstance(resultados, list)
    assert all("id" in p for p in resultados if isinstance(p, dict))

def test_obtener_url_imagen():
    url = obtener_url_imagen(1234)
    assert url == "https://static.arasaac.org/pictograms/1234/1234_300.png"

