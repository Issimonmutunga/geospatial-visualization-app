// Import necessary libraries and components
import React, { useEffect, useState } from "react"; // React and hooks (useState, useEffect)
import axios from "../../api"; // Axios instance for making HTTP requests
import { ScrollArea } from "../ui/scroll-area"; // Custom ScrollArea component
import { Card } from "../ui/card"; // Custom Card component
import "./panel.css"; // Custom CSS for Panel component

const Panel = () => {
  const [files, setFiles] = useState([]); // State to hold the list of files
  const [error, setError] = useState(null); // State to hold any error messages

  useEffect(() => {
    // Fetch the list of files from the API on component mount
    axios
      .get("/api/") // Make a GET request to fetch files
      .then((res) => {
        // Check if the response data is an array
        if (Array.isArray(res.data)) {
          setFiles(res.data); // Set the files data in state
        } else {
          throw new Error("Invalid response format"); // Handle invalid response format
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err); // Log error to console
        setError("Could not fetch file list."); // Set error message
      });
  }, []); // Empty dependency array to run effect only once on mount

  return (
    <Card className="panel-card"> {/* Card container for the panel */}
      <h4 className="panel-title">Layers</h4> {/* Title of the panel */}
      {error ? (
        <p className="text-red-500">{error}</p> // Display error message if there's an error
      ) : (
        <ScrollArea className="h-32"> {/* Scrollable area for the file list */}
          <ul className="list-disc pl-4 text-sm"> {/* List of files */}
            {files.length > 0 ? (
              files.map((file, i) => <li key={i}>{file}</li>) // Map over the files and display each one
            ) : (
              <li>No files available.</li> // Display if no files are available
            )}
          </ul>
        </ScrollArea>
      )}
    </Card>
  );
};

export default Panel; // Export Panel component for use elsewhere
