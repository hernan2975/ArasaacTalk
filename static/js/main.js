let lang = 'es';
let dict = {};

document.addEventListener('DOMContentLoaded', async () => {
  await loadLanguage(lang);
  initCategorySelection();

  document.getElementById('language-select').addEventListener('change', async (e) => {
    lang = e.target.value;
    await loadLanguage(lang);
  });

  document.getElementById('btn-search').addEventListener('click', fetchPictogram);

  if (navigator.onLine) {
    console.log('Precarga disponible (en línea)');
  }
});

async function loadLanguage(code) {
  const res = await fetch(`/i18n/${code}.json`);
  dict = await res.json();
  document.getElementById('title').textContent = dict.title;
  document.getElementById('pictogramId').placeholder = dict.placeholder;
  document.getElementById('btn-search').textContent = dict.button;
}

async function fetchPictogram() {
  const id = document.getElementById('pictogramId').value;
  const data = await getFromIndexedDB(id) || await fetchPictogramFromAPI(id);
  if (data) render(data, id);
}

async function fetchPictogramFromAPI(id) {
  const res = await fetch(`https://api.arasaac.org/api/pictograms/${lang}/${id}`);
  const data = await res.json();
  await saveToIndexedDB(id, data);
  return data;
}

async function render(data, id) {
  const blob = await getFromIndexedDB(`${id}-img`);
  const imgUrl = blob ? URL.createObjectURL(blob) : `https://static.arasaac.org/pictograms/${id}/${id}_300.png`;
  const keyword = data.keywords[0]?.keyword || 'Sin nombre';

  const div = document.getElementById('pictogramDisplay');
  div.innerHTML = `<h2>${keyword}</h2><img src="${imgUrl}" alt="${keyword}" />`;
}

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
    const seleccionadas = Array.from(container.querySelectorAll('input:checked')).map(input => input.value);
    preloadSelected(seleccionadas);
  });
}

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
      status.textContent = `Precargando (${loaded}/${total})...`;
    }
  }

  status.textContent = `✅ Precarga personalizada completa`;
}
