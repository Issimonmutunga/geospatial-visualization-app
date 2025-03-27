import React, { useState, useEffect } from "react";
import axios from "../api"; 

//Start here 3/28/2025
//Can not fetch file list
const Panel = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("../media/uploads"); 
        setFiles(response.data); 
      } catch (error) {
        console.error("Error fetching file list:", error);
      }
    };

    fetchFiles();
  }, []);

  return (
  <div
    style={{
      width: "250px",
      height: "40vh",
      overflowY: "auto",
      backgroundColor: "#f4f4f4",
      padding: "1rem",
      position: "absolute",
      left: 0,
      top: 150,
      border: "1px solid #ccc",
      zIndex: 1000,
      cursor: "move",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    }}
  >
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