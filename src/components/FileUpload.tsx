import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "../hooks/use-toast";
import { Loader2, Upload } from "lucide-react";
import axiosInstance from "../api/axiosInstance";

interface FileUploadProps {
  onUploadSuccess: () => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to upload.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setIsUploading(true);

    try {
      const response = await axiosInstance.post("/api/upload-csv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Upload Successful",
        description: `${response.data.insertedCount} products have been uploaded and processed.`,
        variant: "success",
      });
      onUploadSuccess();
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your CSV file.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setSelectedFile(null);
    }
  };

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Upload CSV File</h2>
      <div className="flex flex-col space-y-4">
        <Input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="w-full"
          id="csv-upload"
          ref={fileInputRef}
        />
        <Button
          onClick={handleFileUpload}
          disabled={!selectedFile || isUploading}
          className="w-full"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </>
          )}
        </Button>
      </div>
      {selectedFile && (
        <p className="mt-2 text-sm text-gray-600">
          Selected file: {selectedFile.name}
        </p>
      )}
    </div>
  );
};
