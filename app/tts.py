from gtts import gTTS
from flask import send_file
import tempfile

def generar_audio(frase: str):
    tts = gTTS(text=frase, lang="es")
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3")
    tts.save(tmp.name)
    return send_file(tmp.name, mimetype="audio/mpeg")
