from flask import Flask
from app.routes import app_routes

def create_app():
    app = Flask(__name__)

    # Configuraciones base (extensibles)
    app.config["JSON_SORT_KEYS"] = False
    app.config["MAX_CONTENT_LENGTH"] = 2 * 1024 * 1024  # 2MB por request

    # Registro de rutas como blueprint
    app.register_blueprint(app_routes)

    # Posible lugar para inicializar extensiones futuras (DB, cache, etc.)
    # e.g. db.init_app(app), login_manager.init_app(app)

    return app
