import { cargarCategorias } from "./preload.js";
import { reproducirFrase } from "./speech.js";
import { construirBotonesCategoria, limpiarFrase } from "./ui.js";

document.addEventListener("DOMContentLoaded", async () => {
  await cargarCategorias(construirBotonesCategoria);

  document.getElementById("play-btn").onclick = reproducirFrase;
  document.getElementById("clear-btn").onclick = limpiarFrase;
});
