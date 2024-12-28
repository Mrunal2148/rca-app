from flask import Flask, request, send_from_directory, jsonify
from fpdf import FPDF
from flask_cors import CORS
import os
import openai
import json
from utils.pdf_utils import extract_text_from_pdf

app = Flask(__name__)
CORS(app)  

openai.api_key = 'to be added'

#directory to save PDFs
PDF_SAVE_DIR = os.path.join(app.root_path, 'RCA')
if not os.path.exists(PDF_SAVE_DIR):
    os.makedirs(PDF_SAVE_DIR)


@app.route("/save-pdf", methods=["POST"])
def save_pdf():
    data = request.json
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    logo_path = "../frontend/public/ASU-logo.png"
    pdf.image(logo_path, x=10, y=8, w=33)

    pdf.set_xy(10, 40)
    pdf.cell(200, 10, txt="Root Cause Analysis", ln=True, align="C")
    pdf.ln(10)

    fields = {
        "Incident Number": data.get('incident_number', 'N/A'),
        "Time of Occurence": data.get('occurrence_time', 'N/A'),
        "Short Description": data.get('short_description', 'N/A'),
        "Applications Impacted": data.get('applications_impacted', 'N/A'),
        "Incident Description": data.get('incident_description', 'N/A'),
        "Time of Mitigation": data.get('mitigation_time', 'N/A'),
        "Root Cause": data.get('root_cause', 'N/A'),
        "Incident Resolution": data.get('incident_resolution', 'N/A'),
        "Time of Resolution": data.get('resolution_time', 'N/A'),
        "Future Action Items": data.get('future_items', 'N/A'),
        "Dev Representative": data.get('dev_representative', 'N/A'),
        "RCA Owner": data.get('rca_owner', 'N/A')
    }

    for field, value in fields.items():
        pdf.set_x(10)
        pdf.multi_cell(0, 10, f"{field}: {value}")

    incident_number = data.get('incident_number', 'N/A')
    pdf_filename = f"RCA_{incident_number}.pdf"
    pdf_path = os.path.join(PDF_SAVE_DIR, pdf_filename)
    pdf.output(pdf_path)

    return jsonify({"filename": pdf_filename}), 201


@app.route("/download-pdf/<filename>", methods=["GET"])
def download_pdf(filename):
    return send_from_directory(PDF_SAVE_DIR, filename, as_attachment=True)

@app.route("/list-pdfs", methods=["GET"])
def list_pdfs():
    try:
        pdf_files = [f for f in os.listdir(PDF_SAVE_DIR) if f.endswith('.pdf')]
        return jsonify(pdf_files)
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Could not list PDFs"}), 500


@app.route('/process-pdf', methods=['POST'])
def process_pdf():
    try:
        print('Received request for process-pdf')

        if 'file' in request.files:
            file = request.files['file']
            text = extract_text_from_pdf(file)
            print('Text extracted from PDF')
        else:
            # Load data from rca_data.json
            json_path = os.path.join(app.root_path, 'rca_data.json')
            with open(json_path, 'r') as json_file:
                json_data = json.load(json_file)
                text = json.dumps(json_data, indent=2)
                print('Using data from rca_data.json')

        question = request.form.get('question')
        print('Question received:', question)

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": f"Based on the following text: {text}\n\n{question}"}
            ],
            max_tokens=150
        )
        print('OpenAI response received')

        answer = response.choices[0].message['content'].strip()
        print('Answer generated')

        return jsonify({"answer": answer})
    except Exception as e:
        print(f'Error: {e}')
        return jsonify({"error": str(e)}), 500

@app.route('/save-json', methods=['POST'])
def save_json():
    form_data = request.json
    incident_number = form_data.get('incident_number')
    file_path = 'rca_data.json'
    
    if os.path.exists(file_path):
        with open(file_path, 'r') as file:
            data = json.load(file)
    else:
        data = []

    for i, entry in enumerate(data):
        if entry.get('incident_number') == incident_number:
            data[i] = form_data  
            break
    else:
        data.append(form_data)
    
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)
    
    return jsonify({"message": "Data saved successfully"}), 200

if __name__ == "__main__":
    app.run(debug=True)
