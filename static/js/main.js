const textoInput = document.getElementById("texto");
const idiomaSelect = document.getElementById("idioma");
const leerBtn = document.getElementById("leer-btn");
const recomendarBtn = document.getElementById("recomendar-btn");
const pictoIdInput = document.getElementById("picto-id");
const buscarBtn = document.getElementById("buscar-btn");
const status = document.getElementById("status");
const resultado = document.getElementById("resultado");
const sugerencias = document.getElementById("sugerencias");

// 🗣️ Leer texto en voz alta
leerBtn.addEventListener("click", () => {
  const texto = textoInput.value.trim();
  if (!texto) return;

  const voz = new SpeechSynthesisUtterance(texto);
  voz.lang = idiomaSelect.value || "es";
  window.speechSynthesis.speak(voz);
});

// 🤖 Recomendar pictogramas por palabras clave
recomendarBtn.addEventListener("click", async () => {
  const texto = textoInput.value.trim();
  const idioma = idiomaSelect.value || "es";
  if (!texto) return;

  status.textContent = "🔍 Buscando pictogramas…";
  sugerencias.innerHTML = "";
  const palabras = texto.toLowerCase().split(/\s+/);
  const usados = new Set();

  for (const palabra of palabras) {
    try {
      const res = await fetch(`https://api.arasaac.org/api/pictograms/${idioma}/search/${encodeURIComponent(palabra)}?limit=1`);
      const pictos = await res.json();
      const picto = pictos[0];

      if (picto && !usados.has(picto._id)) {
        const img = document.createElement("img");
        img.src = `https://static.arasaac.org/pictograms/${picto._id}/${picto._id}_500.png`;
        img.alt = picto.keywords?.[0]?.keyword || palabra;
        sugerencias.appendChild(img);
        usados.add(picto._id);
      }
    } catch (e) {
      console.warn(`Sin resultados para: ${palabra}`);
    }
  }

  status.textContent = usados.size > 0 ? "✅ Recomendaciones listas" : "⚠️ No se encontraron pictogramas";
});

// 🔎 Buscar pictograma por ID
buscarBtn.addEventListener("click", async () => {
  const id = pictoIdInput.value.trim();
  const idioma = idiomaSelect.value || "es";

  if (!id) return;

  resultado.innerHTML = "";
  status.textContent = "🔄 Buscando...";

  try {
    const meta = await fetch(`https://api.arasaac.org/api/pictograms/${idioma}/${id}`).then(r => r.json());
    const img = document.createElement("img");
    img.src = `https://static.arasaac.org/pictograms/${id}/${id}_500.png`;
    img.alt = meta.keywords?.[0]?.keyword || "Pictograma";
    resultado.appendChild(img);
    status.textContent = "✅ Pictograma encontrado";
  } catch (e) {
    console.error(e);
    status.textContent = "❌ Error al buscar pictograma";
  }
});
