from pydantic import BaseModel

class TextToSpeechRequest(BaseModel):
    text: str
    voice_name: str 