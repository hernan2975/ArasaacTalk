const DB_NAME = 'ArasaacDB';
const STORE = 'pictos';
let db = null;

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

async function saveToIndexedDB(id, data) {
  if (!db) await openDB();

  // Guarda JSON
  const txData = db.transaction(STORE, 'readwrite');
  txData.objectStore(STORE).put(data, id);

  // Guarda imagen como blob
  const imgUrl = `https://static.arasaac.org/pictograms/${id}/${id}_300.png`;
  try {
    const blob = await fetch(imgUrl).then(res => res.blob());
    const txBlob = db.transaction(STORE, 'readwrite');
    txBlob.objectStore(STORE).put(blob, `${id}-img`);
  } catch (e) {
    console.warn('No se pudo guardar imagen de pictograma:', id);
  }
}

async function getFromIndexedDB(id) {
  if (!db) await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction(STORE, 'readonly');
    const request = tx.objectStore(STORE).get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
  });
}
