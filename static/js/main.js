import { cargarCategorias } from "./preload.js";
import { reproducirFrase } from "./speech.js";
import { construirBotonesCategoria, limpiarFrase, construirFavoritos } from "./ui.js";

document.addEventListener("DOMContentLoaded", async () => {
  await cargarCategorias(construirBotonesCategoria);
  await construirFavoritos();

  document.getElementById("play-btn").onclick = reproducirFrase;
  document.getElementById("clear-btn").onclick = limpiarFrase;
});
