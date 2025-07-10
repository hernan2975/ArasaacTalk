export async function cargarCategorias(callback) {
  try {
    const res = await fetch("/preload/categorias.json");
    const categorias = await res.json();
    callback(categorias);
  } catch (error) {
    console.error("Error cargando categorías:", error);
  }
}

export async function cargarPictogramasOffline(lista, board) {
  try {
    const res = await fetch("/preload/pictogramas.json");
    const diccionario = await res.json();
    board.innerHTML = "";

    lista.forEach(palabra => {
      const picto = diccionario[palabra];
      if (picto) {
        const btn = document.createElement("button");
        btn.classList.add("picto");
        btn.innerHTML = `
          <img src="${picto.local}" alt="${picto.text}" />
          <span>${picto.text}</span>
        `;
        btn.onclick = () => {
          const output = document.getElementById("phrase-output");
          output.textContent += `${picto.text} `;
        };
        board.appendChild(btn);
      }
    });
  } catch (error) {
    console.error("Error cargando pictogramas:", error);
    board.innerHTML = "<p>Error al cargar pictogramas.</p>";
  }
}

