import { cargarCategorias, cargarPictogramasOffline } from "./preload.js";
import { reproducirFrase } from "./speech.js";
import {
  construirBotonesCategoria,
  limpiarFrase,
  renderizarPictograma,
  construirFavoritos
} from "./ui.js";

document.addEventListener("DOMContentLoaded", async () => {
  const board = document.getElementById("board");
  const output = document.getElementById("phrase-output");

  // 🚀 Cargar y renderizar categorías desde preload
  const categorias = await cargarCategorias();
  construirBotonesCategoria(categorias, async (lista) => {
    await cargarPictogramasOffline(lista, board, output);
  });

  // ⭐ Mostrar favoritos guardados
  await construirFavoritos(board, output);

  // 🔈 Reproducir frase construida
  document.getElementById("play-btn").onclick = () => reproducirFrase(output);

  // 🧹 Limpiar frase construida
  document.getElementById("clear-btn").onclick = () => limpiarFrase(output);
});
