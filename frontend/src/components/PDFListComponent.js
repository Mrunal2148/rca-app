import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa"; 
import PDFPreviewComponent from "./PDFPreviewComponent"; 
import "./PDFListComponent.css";

function PDFListComponent() {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);

  
  useEffect(() => {
    const fetchPdfFiles = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/list-pdfs");
        console.log(response.data); 
        setPdfFiles(response.data);
      } catch (error) {
        console.error("Error fetching PDF files:", error);
      }
    };

    fetchPdfFiles();
  }, []);

  const handleDownload = async (filename) => {
    try {
      const encodedFilename = encodeURIComponent(filename);
      const response = await axios.get(
        `http://127.0.0.1:5000/download-pdf/${encodedFilename}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const handlePreview = (filename) => {
    const encodedFilename = encodeURIComponent(filename);
    const url = `http://127.0.0.1:5000/download-pdf/${encodedFilename}`;
    setSelectedPdf(url);
  };

  return (
    <div className="pdf-list-container">
      {pdfFiles.length === 0 ? (
        <p>No PDF files available</p> 
      ) : (
        <ul className="pdf-list">
          {pdfFiles.map((file) => (
            <li key={file} className="pdf-item">
              <span
                className="pdf-name"
                onClick={() => handlePreview(file)}
                title="Preview PDF"
              >
                {file}
              </span>
              <span
                className="download-icon"
                onClick={() => handleDownload(file)}
                title="Download PDF"
              >
                <FaDownload />
              </span>
            </li>
          ))}
        </ul>
      )}

      <PDFPreviewComponent pdfUrl={selectedPdf} />
    </div>
  );
}

export default PDFListComponent;
