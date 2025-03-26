import React, { useState, useEffect } from "react";
import axios from "../api"; 

const Panel = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("/api/files/"); 
        setFiles(response.data); 
      } catch (error) {
        console.error("Error fetching file list:", error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div style={{
      width: "250px",
      height: "100vh",
      overflowY: "auto",
      backgroundColor: "#f4f4f4",
      padding: "1rem",
      position: "fixed",
      left: 0,
      top: 0,
      borderRight: "1px solid #ccc",
      zIndex: 1000
    }}>
      <h3>Uploaded Files</h3>
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file}</li>
        ))}
      </ul>
    </div>
  );
};

export default Panel;