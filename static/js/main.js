let lang = 'es';
let dict = {};

document.addEventListener('DOMContentLoaded', async () => {
  await loadLanguage(lang);
  initCategorySelection();

  // 🔘 Cambio de idioma
  document.getElementById('language-select').addEventListener('change', async (e) => {
    lang = e.target.value;
    await loadLanguage(lang);
  });

  // 🔎 Buscar pictograma
  document.getElementById('btn-search').addEventListener('click', fetchPictogram);

  // 🌗 Botón de tema claro/oscuro
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const darkMode = document.body.classList.contains('dark');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    themeToggle.textContent = darkMode ? '🌙' : '🌞';
  });

  // Aplicar tema al cargar
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '🌙';
  }

  console.log(navigator.onLine ? '🟢 Online' : '🔴 Offline');
});

// 🌐 Cargar archivo de idioma
async function loadLanguage(code) {
  const res = await fetch(`/i18n/${code}.json`);
  dict = await res.json();
  document.getElementById('title').textContent = dict.title;
  document.getElementById('pictogramId').placeholder = dict.placeholder;
  document.getElementById('btn-search').textContent = dict.button;
}

// 🔍 Buscar pictograma por ID
async function fetchPictogram() {
  const id = document.getElementById('pictogramId').value.trim();
  if (!id) return;

  let data = await getFromIndexedDB(id);
  let imageBlob = await getFromIndexedDB(`${id}-img`);

  if (!data && navigator.onLine) {
    try {
      const res = await fetch(`https://api.arasaac.org/api/pictograms/${lang}/${id}`);
      data = await res.json();
      await saveToIndexedDB(id, data);

      const imgBlob = await fetch(`https://static.arasaac.org/pictograms/${id}/${id}_300.png`).then(r => r.blob());
      await saveImageBlob(id, imgBlob);
      imageBlob = imgBlob;
    } catch {
      console.warn('No se pudo obtener el pictograma desde la API');
    }
  }

  if (!data) {
    try {
      const res = await fetch(`/preload/pictos/datos/${id}.json`);
      data = await res.json();
      const imgRes = await fetch(`/preload/pictos/imagenes/${id}.png`);
      imageBlob = await imgRes.blob();
    } catch {
      document.getElementById('pictogramDisplay').innerHTML = `<p>⚠️ No se encontró el pictograma</p>`;
      return;
    }
  }

  render(data, imageBlob, id);
}

// 🖼️ Renderizar el pictograma
function render(data, imageBlob, id) {
  const keyword = data.keywords?.[0]?.keyword || 'Sin nombre';
  const imgURL = imageBlob ? URL.createObjectURL(imageBlob) : `https://static.arasaac.org/pictograms/${id}/${id}_300.png`;

  document.getElementById('pictogramDisplay').innerHTML = `
    <h2>${keyword}</h2>
    <img src="${imgURL}" alt="${keyword}" />
  `;
}

// ✅ Precarga por categorías seleccionadas
async function initCategorySelection() {
  const res = await fetch('/preload/categorias.json');
  const { categorias } = await res.json();
  const container = document.getElementById('categoriasCheckboxes');

  categorias.forEach(cat => {
    const label = document.createElement('label');
    label.innerHTML = `<input type="checkbox" value="${cat}" checked /> ${cat}`;
    container.appendChild(label);
  });

  document.getElementById('btnPreloadSelected').addEventListener('click', () => {
    const seleccionadas = Array.from(container.querySelectorAll('input:checked')).map(el => el.value);
    preloadSelected(seleccionadas);
  });
}

// ⬇️ Precargar pictogramas por categorías
async function preloadSelected(categorias) {
  const progress = document.getElementById('preloadProgress');
  const status = document.getElementById('preloadStatus');
  let total = categorias.length * 5;
  let loaded = 0;

  for (const cat of categorias) {
    const pictos = await fetch(`https://api.arasaac.org/api/pictograms/${lang}/search/${encodeURIComponent(cat)}`)
      .then(res => res.json())
      .catch(() => []);

    for (const picto of pictos.slice(0, 5)) {
      const exists = await getFromIndexedDB(picto._id);
      if (!exists) {
        await saveToIndexedDB(picto._id, picto);
      }
      loaded++;
      progress.value = (loaded / total) * 100;
      status.textContent = `Precargando ${loaded}/${total}...`;
    }
  }

  status.textContent = '✅ Precarga completa';
}
