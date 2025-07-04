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
    console.log('🟢 Online');
  } else {
    console.log('🔴 Offline – modo local activado');
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
    } catch (e) {
      console.warn('🌐 Falló conexión online');
    }
  }

  if (!data) {
    try {
      const res = await fetch(`/preload/pictos/datos/${id}.json`);
      data = await res.json();
      const imgRes = await fetch(`/preload/pictos/imagenes/${id}.png`);
      imageBlob = await imgRes.blob();
    } catch (e) {
      document.getElementById('pictogramDisplay').innerHTML = `<p>⚠️ No se encontró el pictograma</p>`;
      return;
    }
  }

  render(data, imageBlob, id);
}

function render(data, imageBlob, id) {
  const keyword = data.keywords?.[0]?.keyword || 'Sin nombre';
  const imgURL = imageBlob ? URL.createObjectURL(imageBlob) : `https://static.arasaac.org/pictograms/${id}/${id}_300.png`;

  const div = document.getElementById('pictogramDisplay');
  div.innerHTML = `
    <h2>${keyword}</h2>
    <img src="${imgURL}" alt="${keyword}" />
  `;
}
