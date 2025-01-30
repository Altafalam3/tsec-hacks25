import os
import cv2
import torch
import requests
import numpy as np
from flask import Flask, request, jsonify, send_file, send_from_directory
from ultralytics import YOLO
from PIL import Image
from io import BytesIO
from flask_cors import CORS
import cloudinary
import cloudinary.uploader
import cloudinary.api

app = Flask(__name__)
CORS(app)

# Configure Cloudinary
cloudinary.config(
    cloud_name="duyviohu0",
    api_key="494881381265894",
    api_secret="Ptt_NriRWsZiowYjUa8P6VEM9gQ"
)

# Directories for uploaded images/videos
UPLOAD_FOLDER_IMAGES = "uploads/images"
UPLOAD_FOLDER_VIDEOS = "uploads/videos"
os.makedirs(UPLOAD_FOLDER_IMAGES, exist_ok=True)
os.makedirs(UPLOAD_FOLDER_VIDEOS, exist_ok=True)

# Load the YOLO model
MODEL_PATH = "fire-models/fire_m.pt"  # Change this if needed
model = YOLO(MODEL_PATH)

# Function to process image
def detect_fire_in_image(image):
    results = model.predict(image, conf=0.25, iou=0.5)
    res_image = results[0].plot()
    res_image = cv2.cvtColor(res_image, cv2.COLOR_BGR2RGB)
    
    # Convert result image to PIL format for returning
    res_pil = Image.fromarray(res_image)
    
    # Count detected classes
    class_names = model.model.names
    class_counts = {class_names[int(c)]: 0 for c in results[0].boxes.cls}
    for c in results[0].boxes.cls:
        class_counts[class_names[int(c)]] += 1
    
    return res_pil, class_counts

# Route for image detection (File Upload)
@app.route('/detect/image', methods=['POST'])
def detect_fire_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400
    
    image = Image.open(file)
    result_image, detected_objects = detect_fire_in_image(image)

    # Save the processed image in memory
    img_io = BytesIO()
    result_image.save(img_io, format='PNG')
    img_io.seek(0)

    # Upload image to Cloudinary
    upload_result = cloudinary.uploader.upload(img_io, folder="wildfire_detection")

    return jsonify({
        "message": "Detection completed",
        "detected_objects": detected_objects if detected_objects else "No fire / smoke detected",
        "image_url": upload_result["secure_url"]  # Cloudinary URL
    })


# Route for video detection
@app.route('/detect/video', methods=['POST'])
def detect_fire_video():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    video_path = os.path.join(UPLOAD_FOLDER_VIDEOS, file.filename)
    file.save(video_path)

    # Process Video Frame by Frame
    cap = cv2.VideoCapture(video_path)
    frame_width = int(cap.get(3))
    frame_height = int(cap.get(4))
    output_path = os.path.join(UPLOAD_FOLDER_VIDEOS, "result_" + file.filename)

    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, 20.0, (frame_width, frame_height))

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        results = model.predict(frame, conf=0.25, iou=0.5)
        result_frame = results[0].plot()
        out.write(result_frame)

    cap.release()
    out.release()


    return jsonify({
        "message": "Video processing completed",
        "video_url": f"/uploads/videos/result_{file.filename}"
    })

# Route for serving static files (processed images/videos)
@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('uploads', filename)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
