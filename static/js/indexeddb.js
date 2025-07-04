const DB_NAME = 'ArasaacDB';
const STORE = 'pictos';
let db = null;

// 🔄 Abrir o inicializar la base de datos
function openDB() {
  return new Promise((resolve) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE);
      }
    };
    request.onsuccess = () => {
      db = request.result;
      resolve();
    };
  });
}

// 💾 Guardar datos de pictograma + imagen desde la API
async function saveToIndexedDB(id, data) {
  if (!db) await openDB();

  // Guardar metadatos (JSON)
  const txData = db.transaction(STORE, 'readwrite');
  txData.objectStore(STORE).put(data, id);

  // Guardar imagen como blob
  const imageUrl = `https://static.arasaac.org/pictograms/${id}/${id}_300.png`;
  try {
    const blob = await fetch(imageUrl).then(res => res.blob());
    await saveImageBlob(id, blob);
  } catch (err) {
    console.warn(`⚠️ No se pudo guardar imagen para ${id}`);
  }
}

// 🔍 Obtener datos o imagen desde IndexedDB
async function getFromIndexedDB(id) {
  if (!db) await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction(STORE, 'readonly');
    const req = tx.objectStore(STORE).get(id);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(null);
  });
}

// 📥 Guardar una imagen directamente como blob
async function saveImageBlob(id, blob) {
  if (!db) await openDB();
  const tx = db.transaction(STORE, 'readwrite');
  tx.objectStore(STORE).put(blob, `${id}-img`);
}
