import React, { useState } from "react";
import axios from "../api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

const FileUploader = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("File uploaded successfully!");
      console.log("Uploaded file response:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload file.");
    }
  };

  return (
    <div className="p-4 space-y-2">
      <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
};

export default FileUploader;
