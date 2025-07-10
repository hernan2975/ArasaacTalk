document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const output = document.getElementById("phrase-output");

  async function cargarPictogramas(palabra = "comida") {
    try {
      const res = await fetch(`/buscar?q=${palabra}`);
      const pictos = await res.json();
      board.innerHTML = "";

      pictos.forEach(p => {
        const btn = document.createElement("button");
        btn.classList.add("picto");
        btn.innerHTML = `<img src="${p.url}" alt="${p.text}"/><span>${p.text}</span>`;
        btn.onclick = () => {
          output.textContent += `${p.text} `;
        };
        board.appendChild(btn);
      });
    } catch (error) {
      board.innerHTML = `<p>Error al cargar pictogramas</p>`;
    }
  }

  document.querySelectorAll(".cat-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      const categoria = btn.dataset.cat;
      cargarPictogramas(categoria);
    });
  });

  document.getElementById("clear-btn").onclick = () => output.textContent = "";
  document.getElementById("play-btn").onclick = () => {
    const frase = output.textContent.trim();
    if (frase) {
      window.open(`/tts?frase=${encodeURIComponent(frase)}`, "_blank");
    }
  };

  cargarPictogramas(); // carga inicial
});
