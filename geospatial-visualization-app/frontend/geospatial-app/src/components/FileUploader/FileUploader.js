// Import necessary libraries and components
import React, { useState } from "react"; // React and useState hook for state management
import axios from "../../api"; // Axios instance for making HTTP requests
import { Button } from "../ui/button"; // Custom Button component
import { Input } from "../ui/input"; // Custom Input component
import { toast } from "sonner"; // Toast notifications for user feedback
import "./FileUploader.css"; // CSS for styling the FileUploader component

const FileUploader = () => {
  const [file, setFile] = useState(null); // State to hold the selected file

  // Function to handle the file upload
  const handleUpload = async () => {
    // Check if a file is selected
    if (!file) {
      toast.error("Please select a file to upload."); // Show error toast if no file is selected
      return;
    }

    const formData = new FormData(); // Create FormData to send the file
    formData.append("file", file); // Append the selected file to FormData

    try {
      // Make a POST request to upload the file
      const response = await axios.post("/api/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // Set header for file upload
      });
      toast.success("File uploaded successfully!"); // Show success toast if file upload is successful
      console.log("Uploaded file response:", response.data); // Log the response from the server
    } catch (error) {
      // Handle any errors during the upload process
      console.error("Upload failed:", error); // Log the error
      toast.error("Failed to upload file."); // Show error toast if the upload fails
    }
  };

  return (
    <div className="fileuploader-card"> {/* Card container for file uploader */}
      <h3 className="fileuploader-title">Choose a file</h3> {/* Title of the uploader */}
      {/* File input to select the file */}
      <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      {/* Button to trigger the file upload */}
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
};

export default FileUploader; // Export the FileUploader component for use elsewhere
