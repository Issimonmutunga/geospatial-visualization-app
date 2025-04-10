import React, { useState, useEffect } from "react";
import axios from "../api"; 

const Panel = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null); // State to store error message

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("/api/");
        // Validate the response data to ensure it's an array
        if (Array.isArray(response.data)) {
          setFiles(response.data); // Set files if the data is an array
        } else {
          throw new Error("Fetched data is not an array");
        }
      } catch (error) {
        console.error("Error fetching file list:", error);
        setError(error.message || "An error occurred while fetching the file list"); // Set error state
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
      {error ? (
        <div style={{ color: "red", marginBottom: "10px" }}>
          Error: {error}
        </div>
      ) : (
        <ul>
          {files.length > 0 ? (
            files.map((file, index) => (
              <li key={index}>{file}</li>
            ))
          ) : (
            <li>No files available.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Panel;
