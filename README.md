# 🗣️ ARASAAC Talk

**ARASAAC Talk** es una aplicación web offline basada en pictogramas para facilitar la comunicación aumentativa y alternativa (CAA), especialmente pensada para personas con discapacidad. Utiliza recursos de ARASAAC, texto a voz (TTS) y almacenamiento local para funcionar sin conexión y adaptarse a cada usuario.

---

## 📦 Características principales

- ✅ Uso de pictogramas más frecuentes desde la base de datos de ARASAAC
- 🗣️ Generación de frases con salida de voz (Google TTS)
- 📶 Funciona completamente **offline** mediante IndexedDB y Service Worker
- 👤 Usuario base “Ulises” sin login, con frases favoritas
- 📁 Precarga de pictogramas y categorías más usadas
- 🎨 Interfaz táctil, clara y accesible para celulares y tablets

---

## 🚀 Instalación

### 💻 Desde navegador (modo desarrollador)

1. Cloná el proyecto:

   ```bash
   
   git clone https://github.com/hernan2975/ArasaacTalk.git

2. Instalá dependencias (si usás consola local):

pip install -r requirements.txt

3. Ejecutá el servidor:

bash start.sh

4. Accedé desde http://localhost:5000
   
📱 Desde celular (como PWA)

1. Abrí el sitio en el navegador móvil
2. Agregá a pantalla de inicio (opción "Instalar app")
3. Usá la app como si fuera nativa, incluso sin conexión

🧰 Estructura del proyecto
bash
    
ARASAAC-Talk/
├── app/                    # Backend Flask modular
│   ├── __init__.py
│   ├── routes.py
│   ├── arasaac.py
│   └── tts.py
│
├── static/                 # Frontend: CSS, JS, icons
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── main.js
│   │   ├── preload.js
│   │   ├── speech.js
│   │   ├── ui.js
│   │   ├── indexeddb.js
│   │   └── sw-init.js
│   │   └── service-worker.js
│   └── icons/
│       ├── icon-192.png
│       ├── icon-512.png
│       ├── maskable-512.png
│       ├── shortcut-frase.png
│       └── shortcut-star.png
│
├── templates/              # HTML base
│   └── index.html
│
├── preload/                # Pictogramas precargados
│   ├── pictos/             # Archivos PNG descargados
│   ├── categorias.json
│   ├── pictogramas.json
│   ├── metadata.json
│   └── preload.py
│
├── scripts/                # Herramientas externas
│   ├── preload_pictograms.py
│   ├── copiar_a_build.sh
│   ├── build_deb.sh
│   └── start.sh
│
├── manifest.webmanifest    # PWA config
├── app.py                  # Entrada principal de la app
├── requirements.txt        # Dependencias Python
├── README.md               # Documentación del proyecto
├── .gitignore              # Exclusión de archivos sensibles
├── .gitattributes          # Control de formato y binarios
          # Empaquetado .deb

Créditos
Pictogramas: ARASAAC

Voz: Google TTS

🧠 ¿Para quién está pensada?
. Personas con discapacidad del habla, autismo o parálisis
. Educadores y terapeutas que necesiten tableros offline
. Contextos con conectividad limitada (rural, crisis)

📄 Licencia
MIT — Libre para usar, modificar y compartir.

🤝 Contribuciones
Este proyecto está abierto a mejoras. Si querés sumar, podés:

. Crear nuevos tableros o pictogramas
. Optimizar la carga offline
. Mejorar accesibilidad
. Traducir o añadir funcionalidades

   
