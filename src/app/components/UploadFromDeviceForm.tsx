import { useState } from "react";

export const UploadFromDeviceForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string>("None");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const allowedFileTypes = [".pdf", ".txt", ".rst", ".docx", ".md", ".zip"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      const fileExtension = selectedFile.name
        .split(".")
        .pop()
        ?.toLowerCase();
      const fileSizeMB = selectedFile.size / (1024 * 1024);

      if (!allowedFileTypes.includes(`.${fileExtension}`)) {
        alert("Please upload a valid file type.");
        return;
      }
      if (fileSizeMB > 25) {
        alert("File size should not exceed 25MB.");
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleSubmit = () => {
    if (name && file) {
      setIsFetching(true);
      setTimeout(() => {
        setUploadedFiles(file.name);
        setIsFetching(false);
      }, 2000); // Simulate file upload delay
    }
  };

  return (
    <div className="p-6 border rounded-lg shadow-md w-full sm:w-96 bg-white">
      <h2 className="font-bold text-lg">Upload from device</h2>

      {/* Name Input */}
      <div className="mt-4">
        <label className="block font-semibold text-sm">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="w-full px-4 py-2 mt-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
        />
      </div>

      {/* File Input */}
      <div className="mt-4">
        <label className="block">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
            accept=".pdf,.txt,.rst,.docx,.md,.zip"
          />
          <button
            type="button"
            className="w-32 px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-full text-center mt-2 transition-all hover:bg-purple-100 text-sm"
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            Choose file
          </button>
        </label>
        <p className="text-xs text-gray-500 mt-2">
          Please upload .pdf, .txt, .rst, .docx, .md, .zip limited to 25mb
        </p>
      </div>

      {/* Uploaded Files */}
      <div className="mt-4">
        <span className="font-semibold">Uploaded Files:</span>
        <div className="text-sm text-gray-600 mt-1">{uploadedFiles}</div>
      </div>

      {/* Fetching/Loading State */}
      {isFetching && (
        <div className="mt-4 flex justify-between items-center">
          <span>Fetching</span>
          <div className="w-6 h-6 border-4 border-t-purple-600 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Submit Button */}
      <button
        className={`w-full mt-6 py-2 text-white rounded-full bg-purple-600 transition-all hover:bg-purple-700 ${
          !name || !file ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleSubmit}
        disabled={!name || !file}
      >
        Upload
      </button>
    </div>
  );
};
