import React, { useEffect, useRef } from "react";
import { getDocument } from "pdfjs-dist/webpack"; 

function PDFPreviewComponent({ pdfUrl }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (pdfUrl) {
      const loadPdf = async () => {
        try {
          const pdf = await getDocument(pdfUrl).promise; 
          const page = await pdf.getPage(1); 
          const viewport = page.getViewport({ scale: 1.5 }); 
          const canvas = canvasRef.current;
          const context = canvas.getContext("2d");

          
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          
          await page.render({
            canvasContext: context,
            viewport: viewport,
          });
        } catch (error) {
          console.error("Error loading PDF:", error);
        }
      };

      loadPdf();
    }
  }, [pdfUrl]);

  if (!pdfUrl) return null; 

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#EDE8DC",
        maxWidth: "80%",
        margin: "20px auto"
      }}
    >
      <h3 style={{ fontSize: "1.5rem", color: "#8C1D40", marginBottom: "20px" }}>
        RCA Preview
      </h3>
      <canvas
        ref={canvasRef}
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
        }}
      ></canvas>
    </div>
  );
}

export default PDFPreviewComponent;
