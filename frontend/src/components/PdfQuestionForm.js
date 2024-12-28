import React, { useState } from 'react';
import axios from 'axios';
import './PdfQuestionForm.css'; 

function PdfQuestionForm() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (file) {
      formData.append('file', file);
    }
    formData.append('question', question);

    try {
      const response = await axios.post('http://127.0.0.1:5000/process-pdf', formData);
      setAnswer(response.data.answer);
    } catch (error) {
      console.error('Error processing PDF:', error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="header">RCA Insights</h2>

        <div className="inputContainer">
          <label className="label">Upload RCA (optional):</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="input"
          />
        </div>

        <div className="inputContainer">
          <label className="label">Question:</label>
          <input
            type="text"
            value={question}
            onChange={handleQuestionChange}
            required
            className="input"
          />
        </div>

        <button type="submit" className="button">Submit</button>
      </form>

      {answer && (
        <div className="answerContainer">
          <h3 className="answerHeader">Answer:</h3>
          <p className="answerText">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default PdfQuestionForm;
