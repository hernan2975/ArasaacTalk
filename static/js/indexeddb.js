const DB_NAME = "ArasaacTalk";
const STORE = "favoritos";
const VERSION = 1;

export function abrirDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, VERSION);

    request.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "id" });
      }
    };

    request.onsuccess = e => resolve(e.target.result);
    request.onerror = e => reject(e);
  });
}

export async function guardarFavorito(picto) {
  const db = await abrirDB();
  const tx = db.transaction(STORE, "readwrite");
  tx.objectStore(STORE).put(picto);
  tx.oncomplete = () => console.log("✅ Favorito guardado:", picto.text);
}

export async function obtenerFavoritos() {
  const db = await abrirDB();
  const tx = db.transaction(STORE, "readonly");
  const store = tx.objectStore(STORE);
  return new Promise(resolve => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
  });
}

export async function borrarFavorito(id) {
  const db = await abrirDB();
  const tx = db.transaction(STORE, "readwrite");
  tx.objectStore(STORE).delete(id);
  tx.oncomplete = () => console.log("🗑️ Favorito eliminado:", id);
}
