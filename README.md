# 🧴 SKINALYZER - Skin Disease Detection and AI Assistance

SKINALYZER is a smart skin health analysis tool that uses Convolutional Neural Networks (CNNs) to detect skin conditions from images. It provides users with instant visual feedback, condition details, and AI-powered tips. An integrated (but currently placeholder) AI chat system is available for health-related queries.

---

## 🚀 Features

- 🖼 Upload and analyze skin images (JPG, PNG, WebP)
- 🔍 Detect conditions like Acne, Eczema, Fungal Infection, and Healthy
- 📊 Get confidence levels and probabilities for each prediction
- 💡 Receive AI-generated skincare tips based on analysis
- 💬 Chat interface for asking questions (placeholder response for now)
- 📱 Responsive and modern UI with smooth UX

---

## 🛠 Tech Stack

### Frontend
- *React.js* (with TypeScript or JS)
- *Tailwind CSS* for styling
- *React Dropzone* for drag & drop uploads
- *Shadcn UI* and *Lucide Icons* for sleek components

### Backend
- *Python* with *Flask*
- *TensorFlow / Keras* for the CNN model
- *OpenCV / PIL* for image preprocessing
- *Gemini / GPT-based API integration (planned)*

---

# Screenshots

![Screenshot 2025-06-28 161959](https://github.com/user-attachments/assets/de13c79d-f39a-44eb-97fa-70e397a636a7)

![Screenshot 2025-06-28 162042](https://github.com/user-attachments/assets/b5fa9e08-87b7-413e-a094-d100172ab747)

![Screenshot 2025-06-28 162339](https://github.com/user-attachments/assets/d310246d-07a0-4c1e-8859-1386301567ad)

---

## 💡 How It Works

1. *Upload an Image:* The user uploads a clear image of the skin.
2. *Backend Processing:*
   - The image is preprocessed (resized, normalized).
   - Passed through the CNN model to predict the skin condition.
3. *Frontend Display:*
   - Displays predicted condition and confidence.
   - Shows progress bars for all class probabilities.
   - Provides basic skincare tips using mapped suggestions.

4. *AI Chat (WIP):*
   - 💬 AI-Powered Chatbot
   - The app includes an integrated AI chatbot powered by Together AI, allowing users to ask questions related to skin diseases. Once an image is analyzed, users can chat with the assistant for further clarification, tips, and general skin health advice.

---

## Prerequisites

- Python 3.8
- Node.js (v16+ recommended)
- pip / npm or yarn

## 🧠 Planned Features

- 🔌 AI Chat integration using Gemini Pro / OpenAI GPT-4 API
- 💾 User profile & history tracking
- 📱 Android PWA build
- 🌐 Multilingual support

## 🛡 License

- This project is licensed under the GNU GPL 3.0.
- Feel free to modify, distribute, and contribute under the same license.
