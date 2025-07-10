document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const output = document.getElementById("phrase-output");

  async function cargarPictogramas(palabra = "comida") {
    const res = await fetch(`/buscar?q=${palabra}`);
    const pictos = await res.json();
    board.innerHTML = "";

    pictos.forEach(p => {
      const btn = document.createElement("button");
      btn.classList.add("picto");
      btn.innerHTML = `<img src="${p.url}" alt="${p.text}" /><br>${p.text}`;
      btn.onclick = () => {
        output.textContent += `${p.text} `;
      };
      board.appendChild(btn);
    });
  }

  document.querySelectorAll(".cat-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      const tema = btn.textContent.trim().split(" ")[1];
      cargarPictogramas(tema.toLowerCase());
    });
  });

  document.getElementById("clear-btn").onclick = () => output.textContent = "";
  document.getElementById("play-btn").onclick = () => {
    const frase = output.textContent;
    if (frase.trim()) {
      window.open(`/tts?frase=${encodeURIComponent(frase)}`, "_blank");
    }
  };

  cargarPictogramas();
});
