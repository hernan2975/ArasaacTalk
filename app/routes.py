from flask import Blueprint, render_template, jsonify, request
from app.arasaac import buscar_pictogramas, obtener_url_imagen

app_routes = Blueprint("app_routes", __name__)

@app_routes.route("/")
def index():
    return render_template("index.html")

@app_routes.route("/ping")
def ping():
    return "pong"

@app_routes.route("/buscar", methods=["GET"])
def buscar():
    palabra = request.args.get("q", "")
    pictos = buscar_pictogramas(palabra)
    resultados = [
        {
            "id": p["id"],
            "url": obtener_url_imagen(p["id"]),
            "text": p["keywords"][0]["keyword"]
        }
        for p in pictos if "keywords" in p and p["keywords"]
    ]
    return jsonify(resultados)
