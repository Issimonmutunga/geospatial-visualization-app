//This component allows users to upload shapefiles, GeoJSON, or CSV files.

import React, { useState } from "react";
import axios from "../api";

const FileUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("Attempting to upload file..."); 
      const response = await axios.post("/api/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Response data:", response.data)//Logs the response for debugging purposes
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("File upload error:", error);
      alert("File upload failed!");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUploader;
