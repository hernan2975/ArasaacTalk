const textoInput = document.getElementById("texto");
const idiomaSelect = document.getElementById("idioma");
const leerBtn = document.getElementById("leer-btn");
const recomendarBtn = document.getElementById("recomendar-btn");
const pictoIdInput = document.getElementById("picto-id");
const buscarBtn = document.getElementById("buscar-btn");
const status = document.getElementById("status");
const resultado = document.getElementById("resultado");
const sugerencias = document.getElementById("sugerencias");

// 🗣️ Leer texto con síntesis de voz
leerBtn.addEventListener("click", () => {
  const texto = textoInput.value.trim();
  if (!texto) return;

  const voz = new SpeechSynthesisUtterance(texto);
  voz.lang = idiomaSelect.value || "es";
  voz.rate = 1;
  window.speechSynthesis.speak(voz);
});

// 🎯 Recomendar pictogramas según texto
recomendarBtn.addEventListener("click", async () => {
  const texto = textoInput.value.trim();
  const idioma = idiomaSelect.value || "es";

  if (!texto) return;

  status.textContent = "🔄 Buscando pictogramas relacionados...";
  sugerencias.innerHTML = "";

  const palabras = texto.toLowerCase().split(/\s+/);
  const encontrados = new Set();

  for (const palabra of palabras) {
    try {
      const res = await fetch(`https://api.arasaac.org/api/pictograms/${idioma}/search/${encodeURIComponent(palabra)}?limit=1`);
      const data = await res.json();
      const picto = data[0];

      if (picto && !encontrados.has(picto._id)) {
        const img = document.createElement("img");
        img.src = `https://static.arasaac.org/pictograms/${picto._id}/${picto._id}_500.png`;
        img.alt = picto.keywords?.[0]?.keyword || palabra;
        img.title = picto.keywords?.[0]?.keyword || palabra;
        sugerencias.appendChild(img);
        encontrados.add(picto._id);
      }
    } catch (error) {
      console.warn(`Error con la palabra "${palabra}"`, error);
    }
  }

  status.textContent = encontrados.size > 0
    ? "✅ Recomendaciones listas"
    : "⚠️ No se encontraron pictogramas para el texto";
});

// 🔎 Buscar pictograma por ID
buscarBtn.addEventListener("click", async () => {
  const id = pictoIdInput.value.trim();
  const idioma = idiomaSelect.value || "es";

  if (!id) return;

  resultado.innerHTML = "";
  status.textContent = "🔄 Buscando pictograma...";

  try {
    const res = await fetch(`https://api.arasaac.org/api/pictograms/${idioma}/${id}`);
    const meta = await res.json();

    const img = document.createElement("img");
    img.src = `https://static.arasaac.org/pictograms/${id}/${id}_500.png`;
    img.alt = meta.keywords?.[0]?.keyword || `Pictograma ${id}`;
    img.title = meta.keywords?.[0]?.keyword || `Pictograma ${id}`;
    resultado.appendChild(img);

    status.textContent = "✅ Pictograma encontrado";
  } catch (e) {
    console.error(e);
    status.textContent = "❌ No se encontró el pictograma";
  }
});
