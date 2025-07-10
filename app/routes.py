from flask import Blueprint, render_template, jsonify, request, send_file
from app.arasaac import buscar_pictogramas, obtener_url_imagen
from gtts import gTTS
import tempfile

app_routes = Blueprint("app_routes", __name__)

# Página principal
@app_routes.route("/")
def index():
    return render_template("index.html")

# Endpoint de prueba
@app_routes.route("/ping")
def ping():
    return "pong"

# Buscar pictogramas desde la API oficial de ARASAAC
@app_routes.route("/buscar", methods=["GET"])
def buscar():
    palabra = request.args.get("q", "")
    pictos = buscar_pictogramas(palabra)
    resultados = []

    for p in pictos:
        if "keywords" in p and p["keywords"]:
            texto = p["keywords"][0]["keyword"]
            url = obtener_url_imagen(p["id"])
            resultados.append({
                "id": p["id"],
                "url": url,
                "text": texto
            })

    return jsonify(resultados)

# Reproducir frase en voz con gTTS
@app_routes.route("/tts")
def tts():
    frase = request.args.get("frase", "").strip()
    if not frase:
        return "Frase vacía", 400

    tts = gTTS(text=frase, lang="es")
    temp = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3")
    tts.save(temp.name)
    return send_file(temp.name, mimetype="audio/mpeg")
