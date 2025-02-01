from TTS.api import TTS
import os

class VoiceProcessor:
    def __init__(self):
        self.tts = TTS()
        self.models_dir = "models"
        os.makedirs(self.models_dir, exist_ok=True)
    
    def clone_voice(self, audio_path: str, voice_name: str) -> str:
        """Clone a voice from an audio file and save the model"""
        try:
            model_path = os.path.join(self.models_dir, f"{voice_name}.pth")
            self.tts.tts.train_speaker_from_audio(audio_path, model_path)
            return model_path
        except Exception as e:
            raise Exception(f"Voice cloning failed: {str(e)}")
    
    def generate_speech(self, text: str, voice_name: str) -> str:
        """Generate speech using a cloned voice"""
        try:
            model_path = os.path.join(self.models_dir, f"{voice_name}.pth")
            if not os.path.exists(model_path):
                raise Exception("Voice model not found")
            
            output_path = f"output/{voice_name}_{hash(text)}.wav"
            os.makedirs("output", exist_ok=True)
            
            self.tts.tts_with_speaker_model(text, model_path, output_path)
            return output_path
        except Exception as e:
            raise Exception(f"Speech generation failed: {str(e)}") 