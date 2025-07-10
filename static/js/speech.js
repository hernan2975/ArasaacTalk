export function reproducirFrase() {
  const frase = document.getElementById("phrase-output").textContent.trim();
  if (!frase) return;

  const url = `/tts?frase=${encodeURIComponent(frase)}`;
  window.open(url, "_blank");
}

