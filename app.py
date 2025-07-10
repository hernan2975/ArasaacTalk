import os
from flask import Flask
from app.routes import app_routes

app = Flask(__name__)  # ⬅️ ¡Esta línea debe estar afuera!

app.register_blueprint(app_routes)

# Este bloque es solo para correr con flask directamente (opcional)
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
