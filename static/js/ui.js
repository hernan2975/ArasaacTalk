
import { cargarPictogramasOffline } from "./preload.js";

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

export function limpiarFrase() {
  const output = document.getElementById("phrase-output");
  output.textContent = "";
}
