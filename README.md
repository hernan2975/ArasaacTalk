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
    
ArasaacTalk/
├── app/                  # Lógica de rutas Flask
├── templates/            # HTML con Jinja2
├── static/               # Estilos, JS, service worker, íconos
├── preload/              # Pictogramas y categorías precargadas
├── i18n/                 # Traducciones (solo español activo)
├── scripts/              # Script de carga inicial
├── manifest.webmanifest  # Configuración PWA
├── app.py                # Entrada principal Flask
├── start.sh              # Arranque rápido
├── build_deb.sh          # Empaquetado .deb

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

   
