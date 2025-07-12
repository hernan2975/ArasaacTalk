from flask import Flask
from app.routes import app_routes

def create_app():
    app = Flask(__name__)

    app.config["JSON_SORT_KEYS"] = False
    app.config["MAX_CONTENT_LENGTH"] = 2 * 1024 * 1024  # 2MB por request

    app.register_blueprint(app_routes)

    return app
