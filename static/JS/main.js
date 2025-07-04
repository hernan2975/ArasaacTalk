async function preloadCategories() {
  const res = await fetch('/preload/categorias.json');
  const data = await res.json();
  const categorias = data.categorias;

  for (const cat of categorias) {
    const pictos = await fetch(`https://api.arasaac.org/api/pictograms/${lang}/search/${encodeURIComponent(cat)}`)
      .then(res => res.json())
      .catch(() => []);
    
    for (const picto of pictos.slice(0, 5)) { // precargamos solo 5 por categoría (ajustable)
      const exists = await getFromIndexedDB(picto._id);
      if (!exists) {
        await saveToIndexedDB(picto._id, picto);
        console.log(`Precargado pictograma ID: ${picto._id} de categoría ${cat}`);
      }
    }
  }
}

// Iniciar precarga solo si hay conexión
if (navigator.onLine) {
  preloadCategories();
}
