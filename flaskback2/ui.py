import os
import base64
import io
import google.generativeai as genai
import streamlit as st
from PIL import Image
import requests

# Load environment variables
genai.configure(api_key="AIzaSyB_uOqm6hXplx_aOH5azTWA2Zxfw2tcCQg")

# Function to get the Gemini model's response for animal injury detection
def get_gemini_response(input_image, prompt):
    model = genai.GenerativeModel('gemini-1.5-flash')

    # Preparing image data for the model
    img_byte_arr = io.BytesIO()
    input_image.save(img_byte_arr, format='JPEG')
    img_byte_arr = img_byte_arr.getvalue()
    
    # Create the input payload with the image, prompt, and location
    response = model.generate_content([input_image, prompt])
    
    return response.text

# Streamlit App
st.set_page_config(page_title="Animal Injury Detection", page_icon="🦁", initial_sidebar_state="collapsed")
st.header("🦁 Animal Injury Detection System")

# Upload Image Section
uploaded_file = st.file_uploader("Upload an Image of Animal", type=["png", "jpg", "jpeg"])

# Input prompt for Gemini Vision model
input_prompt = """
You are an experienced Animal Injury Detection Expert. Your job is to analyze images of animals to determine whether they are injured, what kind of injuries they have.

When analyzing the image, focus on detecting visible signs of injury such as wounds, broken limbs, lacerations, or other abnormalities. You should then classify whether the animal appears injured or not, providing a confidence percentage in your response. Additionally, describe the injury type .

For your response, follow the format below:

1. **Injured or Not**: A clear statement of whether the animal is injured, followed by the percentage confidence. For example: 
   - "Injured, 85% confidence"
   - "Not Injured, 92% confidence"
   
2. **Injury Details**: A description of the visible injuries or abnormalities, such as:
   - "There is a visible wound on the animal's right leg."
   - "The animal has a fractured limb and blood loss near the neck."

You should always provide a thorough and informative response. If the animal is not injured, provide a clear explanation of the reasons. If there is an injury, offer insights into the severity and potential medical actions that could be taken.

Respond in a structured and easy-to-read format short.
"""

# Check if image is uploaded
if uploaded_file is not None:
    # Display the uploaded image
    image = Image.open(uploaded_file)
    st.image(image, caption="Uploaded Animal Image", use_column_width=True)

    if st.button("Analyze Injury"):
        with st.spinner("Analyzing... Please wait."):
            # Get the response from the Gemini model
            response = get_gemini_response(image, input_prompt)
            
            # Display the response from Gemini
            st.subheader("Analysis Result:")
            st.write(response)
            st.write()
else:
    st.write("Please upload an animal image to analyze its injuries.")
