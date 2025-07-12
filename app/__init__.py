import os
from flask import Flask
from app.routes import app_routes

def create_app():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    templates_dir = os.path.join(base_dir, "..", "templates")

    app = Flask(__name__, template_folder=templates_dir)

    app.config["JSON_SORT_KEYS"] = False
    app.config["MAX_CONTENT_LENGTH"] = 2 * 1024 * 1024

    app.register_blueprint(app_routes)
    return app
