# 🧠 Instructivo de Uso – ARASAAC Talk

**ARASAAC Talk** es una aplicación web offline para comunicación aumentativa y alternativa (CAA), pensada para funcionar desde navegador o celular, incluso sin conexión.

---

## 🚀 Acceso a la aplicación

### Modo navegador
1. Clonar el proyecto: `git clone https://github.com/hernan2975/ArasaacTalk`
2. Instalar dependencias: `pip install -r requirements.txt`
3. Ejecutar: `bash start.sh`
4. Ingresar en `http://localhost:5000`

### Modo celular (como app)
1. Abrir la app en el navegador móvil
2. Instalar desde el menú: **Agregar a pantalla de inicio**
3. Usar como si fuera una app nativa PWA

---

## 🗣️ Cómo usar la app

1. **Tocar pictogramas**: se agregan a la frase construida.
2. **Reproducir frase**: botón 🔈 convierte la frase a voz.
3. **Limpiar frase**: botón 🧹 reinicia el área de construcción.
4. Funciona **offline** si los pictogramas están precargados en el navegador.

---

## 📁 Contenido precargado

- Categorías frecuentes en `preload/categorias.json`
- Pictogramas en `preload/pictos/`
- Lógica offline en `static/js/indexeddb.js`
- Service Worker en `static/js/service-worker.js`

---

## 👤 Usuario Ulises

La app funciona automáticamente como "Ulises", sin login.
Los datos se guardan en el navegador local.

---

## ✨ Recomendado para...

- Personas con discapacidad del habla
- Contextos con conectividad limitada
- Educadores, familiares y terapeutas

---


