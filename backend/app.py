from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
import os
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
from together import Together  # ✅ Together AI client

# Load environment variables
load_dotenv()
TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")

client = Together(api_key=TOGETHER_API_KEY)  # ✅ Setup Together client

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Load the trained CNN model
model = tf.keras.models.load_model('model/skin_4class_model.h5')
class_names = ['Acne', 'Eczema', 'Fungal Infection', 'Healthy']

# Store latest prediction for chatbot
latest_diagnosis = {"condition": None}


def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_tensor = image.img_to_array(img)
    img_tensor = np.expand_dims(img_tensor, axis=0)
    img_tensor = img_tensor / 255.0
    return img_tensor


@app.route('/analyze', methods=['POST'])
def analyze():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    file = request.files['image']
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    img_tensor = preprocess_image(filepath)
    prediction = model.predict(img_tensor)[0]
    confidence = float(np.max(prediction)) * 100
    predicted_class = class_names[np.argmax(prediction)]

    # Store latest diagnosis for chatbot
    latest_diagnosis["condition"] = predicted_class

    tips = {
        'Acne': "Use non-comedogenic products and wash your face twice a day.",
        'Eczema': "Use gentle moisturizers and avoid irritants.",
        'Fungal Infection': "Keep the area dry and use antifungal creams.",
        'Healthy': "Maintain a balanced diet and moisturize regularly."
    }

    result = {
        'disease': predicted_class,
        'confidence': round(confidence, 2),
        'probabilities': {name: round(float(prob)*100, 2) for name, prob in zip(class_names, prediction)},
        'tips': tips.get(predicted_class, "")
    }

    return jsonify(result)


@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get("message", "").strip()
    condition = latest_diagnosis.get("condition")

    if not user_input:
        return jsonify({"reply": "Please enter a question."})

    # Optional: if "this" is used, replace with latest detected condition
    if "this" in user_input.lower() and condition:
        user_input = user_input.lower().replace("this", condition)

    try:
        response = client.chat.completions.create(
            model="meta-llama/Llama-3-8b-chat-hf",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a medical assistant specialized in skin conditions. "
                        "Answer any skin-related question with helpful, reliable, and beginner-friendly advice. "
                        "If the user says 'this', they may be referring to their recent condition: "
                        f"'{condition}'." if condition else ""
                    )
                },
                {"role": "user", "content": user_input}
            ]
        )
        reply = response.choices[0].message.content
    except Exception as e:
        reply = f"Error: {str(e)}"

    return jsonify({"reply": reply})


if __name__ == '__main__':
    app.run(debug=True)
