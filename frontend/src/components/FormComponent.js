import React, { useState } from "react";
import axios from "axios";
import "./FormComponent.css"; 

function FormComponent() {
  const [formData, setFormData] = useState({
    incident_number: "",
    occurrence_time: "",
    short_description: "",
    applications_impacted: "",
    incident_description: "",
    mitigation_time: "",
    root_cause: "",
    incident_resolution: "",
    resolution_time: "",
    future_items: "",
    dev_representative: "",
    rca_owner: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const occurrenceTime = new Date(formData.occurrence_time);
    const mitigationTime = new Date(formData.mitigation_time);
    const resolutionTime = new Date(formData.resolution_time);

    
    if (occurrenceTime >= mitigationTime) {
      setError("Incident occurrence time must be before the incident mitigation time.");
      return;
    }
    if (mitigationTime >= resolutionTime) {
      setError("Incident mitigation time must be before the incident resolution time.");
      return;
    }

    try {
      
      await axios.post("http://127.0.0.1:5000/save-json", formData);
      
      
      const response = await axios.post("http://127.0.0.1:5000/save-pdf", formData, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      const filename = `RCA_${formData.incident_number}.pdf`;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error processing form:", error);
      setError("An error occurred while processing the form. Please try again.");
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Incident Number:</label>
        <input
          type="text"
          name="incident_number"
          value={formData.incident_number}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Time of Occurrence:</label>
        <input
          type="datetime-local"
          name="occurrence_time"
          value={formData.occurrence_time}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Short Description:</label>
        <input
          type="text"
          name="short_description"
          value={formData.short_description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Applications Impacted:</label>
        <input
          type="text"
          name="applications_impacted"
          value={formData.applications_impacted}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Incident Description:</label>
        <textarea
          name="incident_description"
          value={formData.incident_description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Time of Mitigation:</label>
        <input
          type="datetime-local"
          name="mitigation_time"
          value={formData.mitigation_time}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Root Cause:</label>
        <textarea
          name="root_cause"
          value={formData.root_cause}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Incident Resolution:</label>
        <textarea
          name="incident_resolution"
          value={formData.incident_resolution}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Time of Resolution:</label>
        <input
          type="datetime-local"
          name="resolution_time"
          value={formData.resolution_time}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Future Action Items:</label>
        <textarea
          name="future_items"
          value={formData.future_items}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Dev Representative:</label>
        <input
          type="text"
          name="dev_representative"
          value={formData.dev_representative}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>RCA Owner:</label>
        <input
          type="text"
          name="rca_owner"
          value={formData.rca_owner}
          onChange={handleChange}
          required
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      <button className="submit-button" type="submit">
        Create RCA
      </button>
    </form>
  );
}

export default FormComponent;
