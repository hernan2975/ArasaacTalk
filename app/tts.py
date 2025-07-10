from gtts import gTTS
from flask import send_file
import tempfile

def generar_audio(frase: str):
    tts = gTTS(text=frase, lang="es")
    temp = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3")
    tts.save(temp.name)
    return send_file(temp.name, mimetype="audio/mpeg")
