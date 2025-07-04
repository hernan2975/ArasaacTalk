# 🇦🇷 ARASAACTalk Offline Python App

Aplicación educativa instalable, multilingüe y 100% funcional sin conexión a internet, pensada para su uso en instituciones argentinas.

## 🧩 Características

- Consulta y visualización de pictogramas de ARASAAC
- Funcionamiento **completamente offline** mediante IndexedDB + Service Worker
- Precarga de categorías utilizadas en entornos educativos argentinos
- Interfaz multilingüe (español, inglés, portugués)
- Accesible desde navegadores o instalable como aplicación PWA
- Compatible con sistemas GNU/Linux y Windows (.deb, .msi)
- Cumple con normas de UX/UI internacionales y buenas prácticas de seguridad web

## 🚀 Requisitos

- Python 3.10+
- Navegador moderno (Chrome, Edge, Firefox, etc.)
- Conexión inicial a internet para precarga opcional

## ⚙️ Instalación Local

```bash
git clone https://github.com/tu_usuario/arasaac-offline-pwa.git
cd arasaac-offline-pwa
python3 -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py

Accedé desde: http://localhost:5000

📥 Precarga Offline
La primera vez podés ejecutar un script para descargar pictogramas base por categoría (ver sección “Precarga”). La app también los guarda automáticamente cuando haces búsquedas.

🌍 Idiomas disponibles
🇪🇸 Español (Argentina)

🇬🇧 English

🇧🇷 Português

🧪 Seguridad y Buenas Prácticas
Headers CSP y anti-XSS

Sin cookies ni rastreo

Código abierto y auditable

Listo para distribución ética

📦 Instaladores
Archivos .deb para Ubuntu/Debian

Archivos .msi para Windows (mediante Nuitka + WiX)

Pronto encontrarás los instaladores en la sección Releases

🤝 Contribuciones
¡Son bienvenidas! Podés abrir un issue, pull request o sugerir mejoras de accesibilidad o diccionario.
