import { cargarPictogramasOffline } from "./preload.js";
import { guardarFavorito, obtenerFavoritos, esFavorito, eliminarFavorito } from "./indexeddb.js";

export function construirBotonesCategoria(categorias) {
  const nav = document.getElementById("categorias");

  Object.entries(categorias).forEach(([nombre, lista], index) => {
    const btn = document.createElement("button");
    btn.classList.add("cat-btn");
    btn.textContent = `📁 ${nombre}`;
    btn.dataset.cat = nombre;

    btn.onclick = () => {
      document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      const board = document.getElementById("board");
      cargarPictogramasOffline(lista, board);
    };

    nav.appendChild(btn);

    if (index === 0) {
      btn.classList.add("selected");
      const board = document.getElementById("board");
      cargarPictogramasOffline(lista, board);
    }
  });
}

export async function construirFavoritos() {
  const favoritos = await obtenerFavoritos();
  if (!favoritos.length) return;

  const board = document.getElementById("board");
  const section = document.createElement("section");
  section.innerHTML = `<h2>⭐ Favoritos</h2>`;
  section.style.marginTop = "2rem";
  section.style.borderTop = "2px solid #ccc";
  section.style.paddingTop = "1rem";

  favoritos.forEach(picto => {
    const btn = document.createElement("button");
    btn.classList.add("picto");
    btn.innerHTML = `
      <img src="${picto.local}" alt="${picto.text}" />
      <span>${picto.text} ⭐</span>
    `;
    btn.onclick = () => {
      const output = document.getElementById("phrase-output");
      output.textContent += `${picto.text} `;
    };
    section.appendChild(btn);
  });

  board.parentNode.insertBefore(section, board.nextSibling);
}

export function limpiarFrase() {
  document.getElementById("phrase-output").textContent = "";
}
