from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import os

app = FastAPI()

# Create directories for storing files
os.makedirs("models", exist_ok=True)
os.makedirs("temp", exist_ok=True)

class TextToSpeechRequest(BaseModel):
    text: str
    voice_name: str

@app.get("/")
async def root():
    return {"message": "Voice Clone API is running"}

@app.post("/api/clone-voice")
async def clone_voice(audio_file: UploadFile = File(...), voice_name: str = None):
    try:
        # Save the uploaded file
        file_location = f"temp/{audio_file.filename}"
        with open(file_location, "wb+") as file_object:
            file_object.write(await audio_file.read())
        
        return {
            "status": "success",
            "message": f"File uploaded successfully as {audio_file.filename}",
            "model_path": f"models/{voice_name}_model.pth"
        }
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"status": "error", "message": str(e)}
        )

@app.post("/api/generate-speech")
async def generate_speech(request: TextToSpeechRequest):
    try:
        return {
            "status": "success",
            "message": f"Would generate speech for text: {request.text}",
            "audio_path": f"temp/{request.voice_name}_output.wav"
        }
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"status": "error", "message": str(e)}
        ) 