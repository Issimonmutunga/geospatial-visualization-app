import React, { useEffect, useState } from "react";
import axios from "../api";
import { ScrollArea } from "../components/ui/scroll-area";
import { Card } from "../components/ui/card";

const Panel = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/api/")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setFiles(res.data);
        } else {
          throw new Error("Invalid response format");
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Could not fetch file list.");
      });
  }, []);

  return (
    <Card className="absolute top-[150px] left-0 z-50 w-[250px] h-[40vh] rounded-xl border shadow-lg p-4 bg-white">
      <h4 className="text-lg font-semibold mb-2">Uploaded Files</h4>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ScrollArea className="h-32">
          <ul className="list-disc pl-4 text-sm">
            {files.length > 0 ? files.map((file, i) => <li key={i}>{file}</li>) : <li>No files available.</li>}
          </ul>
        </ScrollArea>
      )}
    </Card>
  );
};

export default Panel;