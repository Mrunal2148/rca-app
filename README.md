# SmartRCA

SmartRCA is a web application designed to streamline the process of Root Cause Analysis (RCA). The application allows users to upload PDF files, ask questions related to RCA data, and receive insightful answers using OpenAI's API.

## Features

- Upload RCA data in PDF format.
- Ask questions about the RCA data.
- Download RCA reports.
- View previews of RCA PDF files.
- Automatically use pre-stored RCA data if no PDF file is attached.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Flask
- **PDF Generation:** FPDF
- **Text Extraction:** pdfplumber
- **AI Processing:** OpenAI GPT-4

## Prerequisites

- Node.js and npm installed
- Python 3.6+ installed
- Virtual environment (optional but recommended)

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/SmartRCA.git
    cd SmartRCA
    ```

2. **Setup the Backend:**

    a. Navigate to the backend directory:
    ```bash
    cd backend
    ```

    b. Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate   # On Windows use `venv\Scripts\activate`
    ```

    c. Install the required Python packages:
    ```bash
    pip install -r requirements.txt
    ```

    d. Add your OpenAI API key in `app.py`:
    ```python
    openai.api_key = 'your-openai-api-key'
    ```

    e. Run the Flask server:
    ```bash
    python app.py
    ```

3. **Setup the Frontend:**

    a. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

    b. Install the required npm packages:
    ```bash
    npm install
    ```

    c. Start the React development server:
    ```bash
    npm start
    ```

## Usage

1. **Access the Application:**
    Open your web browser and go to `http://localhost:3000`.

2. **Upload PDF:**
    - Click on "Upload PDF" to select and upload a PDF file containing RCA data.

3. **Ask Questions:**
    - Enter your question related to the RCA data and click "Submit" to receive an answer.

4. **Download Reports:**
    - Navigate to the list of available PDFs and click the download icon to download the RCA reports.

5. **Preview Reports:**
    - Click on the name of a PDF to preview the RCA report in a new window.


## Troubleshooting

- **CORS Issues:** Ensure `flask_cors` is properly configured in `app.py`.
- **Module Not Found:** Make sure all required Python and npm packages are installed.
- **API Key Issues:** Verify that the OpenAI API key is correctly set in `app.py`.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Troubleshooting
Mrunal Kapure

