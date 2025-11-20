# earth_model_runner.py
#
# Uses your trained ResNet18 flood/no-flood model from Colab.
# Expects: flood_model_best.pth in the same folder as this file.

from PIL import Image
import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import models, transforms
import os

# Global model (loaded once)
_model = None
_DEVICE = torch.device("cpu")  # you can switch to "cuda" if you want and if available


def _load_model():
    global _model
    if _model is not None:
        return _model

    ckpt_path = os.path.join(os.path.dirname(__file__), "flood_model_best.pth")
    if not os.path.exists(ckpt_path):
        raise FileNotFoundError(
            f"Checkpoint 'flood_model_best.pth' not found at {ckpt_path}. "
            "Make sure you downloaded it from Colab and placed it in the backend folder."
        )

    # Same architecture as in your Colab
    model = models.resnet18(pretrained=False)
    model.fc = nn.Linear(model.fc.in_features, 2)

    state_dict = torch.load(ckpt_path, map_location=_DEVICE)
    model.load_state_dict(state_dict)
    model.to(_DEVICE)
    model.eval()

    _model = model
    return _model


# Match Colab preprocessing: Resize(224,224) + ToTensor()
_tf = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])


def _preprocess(image: Image.Image) -> torch.Tensor:
    img = image.convert("RGB")
    x = _tf(img).unsqueeze(0)  # shape: (1, 3, 224, 224)
    return x.to(_DEVICE)


def predict_earth(image: Image.Image) -> str:
    """
    Runs your flood model and returns 'Flood' or 'No Flood'
    """
    model = _load_model()
    x = _preprocess(image)

    with torch.no_grad():
        out = model(x)                       # shape: (1, 2)
        probs = F.softmax(out, dim=1)[0]     # shape: (2,)
        label_idx = int(torch.argmax(probs).item())
        labels = {0: "No Flood", 1: "Flood"}
        label = labels.get(label_idx, "Unknown")
        conf = float(probs[label_idx].item())

    return f"{label} (confidence {conf:.3f})"
