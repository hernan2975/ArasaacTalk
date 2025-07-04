# 🇦🇷 ARASAACTalk Offline Python App

Aplicación educativa instalable, multilingüe y **100% funcional sin conexión a internet**, pensada para su uso en escuelas e instituciones argentinas.

---

## 🧩 Características

- ✅ Consulta y visualización de pictogramas de ARASAAC
- ✅ Modo offline real (IndexedDB + Service Worker)
- ✅ Precarga de categorías educativas frecuentes
- ✅ Interfaz en 🇪🇸 Español, 🇬🇧 Inglés y 🇧🇷 Portugués
- ✅ Compatible con Linux (.deb) y Windows (.msi)
- ✅ Accesible desde navegador o instalable como PWA
- ✅ Listo para aulas sin conexión, netbooks escolares y gabinetes digitales

---

## 🚀 Requisitos

- Python 3.10 o superior
- Navegador moderno (Chrome, Edge, Firefox)
- Conexión inicial opcional para precarga automática

---

## ⚙️ Instalación local para desarrollo

```bash
git clone https://github.com/tu_usuario/arasaac-offline-pwa.git
cd arasaac-offline-pwa
python3 -m venv venv
source venv/bin/activate         # En Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Luego abrí la app en [http://localhost:5000](http://localhost:5000)

---

## 📥 Precarga Offline

- Podés precargar pictogramas por categorías usando el botón en la interfaz.
- También podés usar el script opcional `scripts/preload_pictograms.py` para preparar una versión completamente offline antes de empaquetar.

---

## 🎨 Idiomas disponibles

- 🇪🇸 Español (Argentina)
- 🇬🇧 English
- 🇧🇷 Português

---

## 🧪 Seguridad y accesibilidad

- Encabezados CSP y protección contra XSS
- Interfaz accesible, responsive y con soporte de teclado
- No utiliza cookies, rastreo ni scripts de terceros
- Tema claro/oscuro conmutables desde el navegador

---

## 📦 Empaquetado como `.deb` (Linux)

La app puede instalarse como `.deb` usando los siguientes scripts incluidos en el repositorio:

### 1. `copiar_a_build.sh`

Copia automáticamente los archivos necesarios a la carpeta `build/opt/arasaac-offline/` para el empaquetado.

```bash
bash copiar_a_build.sh
```

### 2. `build_deb.sh`

Ejecuta `copiar_a_build.sh` y luego genera el archivo `.deb` utilizando `fpm`:

```bash
sudo gem install --no-document fpm   # Si no lo tenés
bash build_deb.sh
```

Esto generará un archivo como:

```
arasaac-offline_1.0.0_amd64.deb
```

Que podés instalar con:

```bash
sudo dpkg -i arasaac-offline_1.0.0_amd64.deb
```

La app se instalará en `/opt/arasaac-offline/` y se ejecuta con:

```bash
bash /opt/arasaac-offline/start.sh
```

---

## 🖥️ Empaquetado `.msi` (Windows)

Se puede crear un `.msi` utilizando:

- [Nuitka](https://nuitka.net/) para compilar a ejecutable
- [WiX Toolset](https://wixtoolset.org/) para generar el instalador

El proceso está explicado en la documentación técnica del proyecto.

---

## 🤝 Contribuciones

¡Toda contribución es bienvenida!

- Podés sugerir nuevas funciones, mejoras en accesibilidad, pictogramas o idiomas
- Abrí un issue o un Pull Request

---

## 🪪 Licencia

Este proyecto utiliza la licencia MIT. Es libre, gratuito y pensado para facilitar el acceso a pictogramas educativos en entornos con bajos recursos o sin conectividad.

---

## 👩‍🏫 Pensado para el aula

Diseñado para funcionar:

- En aulas rurales o sin conexión
- En netbooks escolares (Conectar Igualdad, Juana Manso)
- En gabinetes informáticos con Linux o Windows
- Como parte de un recurso didáctico accesible

---

> Desarrollado con ❤️ en Argentina para inclusión, lenguaje y autonomía.
