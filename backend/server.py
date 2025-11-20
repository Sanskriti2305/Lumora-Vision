from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from PIL import Image

# 👇 we will create these files next
from earth_model_runner import predict_earth
from space_model_runner import predict_space
from anomaly_model_runner import predict_anomaly

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/predict")
async def predict(mode: str = Form(...), file: UploadFile = File(...)):
    # read image into PIL.Image
    contents = await file.read()
    image = Image.open(BytesIO(contents)).convert("RGB")

    # call the correct model based on mode
    if mode == "earth":
        # Flood / No Flood
        prediction = predict_earth(image)

    elif mode == "space":
        # Galaxy / No Galaxy
        prediction = predict_space(image)

    elif mode == "anomaly":
        # Anomaly model output
        prediction = predict_anomaly(image)

    else:
        prediction = "Unknown mode"

    return {
        "mode": mode,
        "prediction": prediction,
    }
