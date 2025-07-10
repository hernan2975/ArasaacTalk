from flask import Flask
from app.routes import app_routes

def create_app():
    app = Flask(__name__)

    # Configuraciones base (extensibles para producción)
    app.config["JSON_SORT_KEYS"] = False
    app.config["MAX_CONTENT_LENGTH"] = 2 * 1024 * 1024  # 2MB máximo por request

    # Registro del blueprint principal
    app.register_blueprint(app_routes)

    # Preparado para registrar otros módulos si se amplía
    # e.g. db.init_app(app), cache.init_app(app), auth.init_app(app)

    return app
