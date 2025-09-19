import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./upload.css";

import uploadIcon from "../../assets/upload 1.png";
import tickIcon from "../../assets/green.png"; // green tick icon

const Upload: React.FC = () => {
  const query = new URLSearchParams(useLocation().search);
  const selectedPhaseFromQuery = query.get("phase") || "";
  const [fileType, setFileType] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();

  // Define dropdown options based on selected phase
  const getFileTypeOptions = () => {
    if (selectedPhaseFromQuery === "Phase 1") {
      return ["Raw Material_CSV"];
    } else if (selectedPhaseFromQuery === "Phase 2") {
      return ["Inbound Logistics_CSV"];
    } else if (selectedPhaseFromQuery === "Phase 3") {
      return ["Outbound Logistics_CSV"];
    }
    // default fallback
    return [
      "Raw Material_CSV",
      "Inbound Logistics_CSV",
      "On-Site Handling_CSV",
      "Outbound Logistics_CSV",
    ];
  };

  // Auto-select if only one option
  useEffect(() => {
    const options = getFileTypeOptions();
    if (options.length === 1) {
      setFileType(options[0]);
    }
  }, [selectedPhaseFromQuery]);

  const handleUpload = () => {
    if (!fileType) {
      alert("Please select a file type!");
      return;
    }
    if (!file) {
      alert("Please select a CSV file!");
      return;
    }

    // Mock API call
    setTimeout(() => {
      console.log(
        `File: ${file.name} uploaded for phase: ${selectedPhaseFromQuery}, type: ${fileType}`
      );
      setUploadSuccess(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }, 1000);
  };

  return (
    <div className="upload-page">
      <div className="upload-container">
        <h2 className="upload-heading">
          {selectedPhaseFromQuery ? selectedPhaseFromQuery : "Upload File"}
        </h2>

        <div className="upload-box">
          {/* Phase display (read-only) */}
          <div className="phase-display">
            <span className="phase-label">Phase:</span>{" "}
            <span className="phase-value">{selectedPhaseFromQuery}</span>
          </div>

          {/* File type dropdown */}
          <select
            className="upload-select"
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            disabled={getFileTypeOptions().length === 1} // disable if auto-selected
          >
            <option value="">Select File Type</option>
            {getFileTypeOptions().map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {/* File upload */}
          <div className="upload-input">
            <input
              type="file"
              className="file-input"
              accept=".csv"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFile(e.target.files[0]);
                }
              }}
            />
            <button className="upload-btn" onClick={handleUpload}>
              <img src={uploadIcon} alt="Upload" className="upload-icon-img" />
            </button>
          </div>

          {uploadSuccess && (
            <div className="upload-success">
              <img src={tickIcon} alt="Success" className="tick-icon" />
              <span>Uploaded successfully!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
