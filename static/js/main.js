let lang = 'es';
let dict = {};

document.addEventListener('DOMContentLoaded', async () => {
  await loadLanguage(lang);
  document.getElementById('language-select').addEventListener('change', async (e) => {
    lang = e.target.value;
    await loadLanguage(lang);
  });

  document.getElementById('btn-search').addEventListener('click', fetchPictogram);
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
  const existing = await getFromIndexedDB(id);
  if (existing) return render(existing, id);

  const res = await fetch(`https://api.arasaac.org/api/pictograms/${lang}/${id}`);
  const data = await res.json();
  await saveToIndexedDB(id, data);
  render(data, id);
}

function render(data, id) {
  const div = document.getElementById('pictogramDisplay');
  const keyword = data.keywords[0]?.keyword || 'Sin nombre';
  const imgUrl = `https://static.arasaac.org/pictograms/${id}/${id}_300.png`;
  div.innerHTML = `<h2>${keyword}</h2><img src="${imgUrl}" alt="${keyword}" />`;
}
