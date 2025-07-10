from flask import Blueprint, render_template, jsonify, request, send_file
from app.arasaac import buscar_pictogramas, obtener_url_imagen
from app.tts import generar_audio

app_routes = Blueprint("app_routes", __name__)

# 🌐 Página principal
@app_routes.route("/")
def index():
    return render_template("index.html")

# 🔧 Endpoint de prueba
@app_routes.route("/ping")
def ping():
    return "pong"

# 🔍 Buscar pictogramas por palabra
@app_routes.route("/buscar")
def buscar():
    palabra = request.args.get("q", "").strip().lower()
    pictos = buscar_pictogramas(palabra)
    resultados = []

    for p in pictos:
        keyword = next((k["keyword"] for k in p.get("keywords", []) if k.get("keyword")), None)
        if keyword:
            resultados.append({
                "id": p["id"],
                "url": obtener_url_imagen(p["id"]),
                "text": keyword
            })

    return jsonify(resultados)

# 🔈 Generar voz con gTTS
@app_routes.route("/tts")
def tts():
    frase = request.args.get("frase", "").strip()
    if not frase:
        return "Frase vacía", 400

    return generar_audio(frase)
