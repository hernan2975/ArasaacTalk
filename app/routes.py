from flask import Blueprint, render_template, send_file, abort
import os
import re

main = Blueprint('main', __name__)
BASE_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

@main.route("/")
def home():
    return render_template("index.html")

@main.route("/preload/pictos/datos/<picto_id>.json")
def serve_picto_data(picto_id):
    if not re.fullmatch(r"\d+", picto_id):
        abort(400, description="ID inválido")
    
    path = os.path.join(BASE_PATH, "preload", "pictos", "datos", f"{picto_id}.json")
    if not os.path.exists(path):
        abort(404, description="Archivo no encontrado")
    
    return send_file(path, mimetype="application/json")

@main.route("/preload/pictos/imagenes/<picto_id>.png")
def serve_picto_image(picto_id):
    if not re.fullmatch(r"\d+", picto_id):
        abort(400, description="ID inválido")

    path = os.path.join(BASE_PATH, "preload", "pictos", "imagenes", f"{picto_id}.png")
    if not os.path.exists(path):
        abort(404, description="Imagen no encontrada")

    return send_file(path, mimetype="image/png")
