const DB_NAME = 'ArasaacDB';
const STORE = 'pictos';
let db = null;

function openDB() {
  return new Promise((resolve) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE);
    };
    request.onsuccess = () => {
      db = request.result;
      resolve();
    };
  });
}

async function saveToIndexedDB(id, data) {
  if (!db) await openDB();
  const tx = db.transaction(STORE, 'readwrite');
  tx.objectStore(STORE).put(data, id);
}

async function getFromIndexedDB(id) {
  if (!db) await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction(STORE, 'readonly');
    const request = tx.objectStore(STORE).get(id);
    request.onsuccess = () => resolve(request.result);
  });
}
