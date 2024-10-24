import { useState } from "react";
import Image from "next/image";

interface UploadFromDeviceForm {
  language: string;
  level: number;
  selectedCard: number | null;
  isLoading: boolean;
  progress: number;
  isFinalPage: boolean;
}

export default function UploadFromDeviceForm() {
  const [fileName, setFileName] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  // Assuming these props are passed in
  const [language, setLanguage] = useState<string>("EN");
  const [level, setLevel] = useState<number>(1);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isFinalPage, setIsFinalPage] = useState<boolean>(false);

  const handleCardSelect = (cardNumber: number) => {
    setSelectedCard(cardNumber);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.size <= 25 * 1024 * 1024) {
      setIsLoading(true);
      setFileName(file.name);
      setUploadedFiles([...uploadedFiles, file.name]);
      setIsLoading(false);
    } else {
      alert("File size exceeds 25MB or invalid file format");
    }
  };

  return (
    <div className="flex flex-col items-center bg-white p-6 md:p-8 lg:p-10 rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <h1 className="font-bold text-lg md:text-xl text-center mb-4">
        Upload from device
      </h1>

      {/* Input for Name */}
      <input
        type="text"
        className="w-full border-2 border-gray-200 rounded-full p-2 text-center text-gray-500 focus:outline-none mb-4"
        placeholder="Enter name"
      />

      {/* File Upload */}
      <label className="w-full">
        <input
          type="file"
          className="hidden"
          accept=".pdf,.txt,.rst,.docx,.md,.zip"
          onChange={handleFileUpload}
        />
        <div className="w-full flex justify-center items-center bg-purple-100 border-2 border-purple-500 text-purple-700 font-semibold py-2 px-4 rounded-full cursor-pointer">
          Choose file
        </div>
      </label>

      <p className="text-gray-500 text-xs mt-2">
        Please upload .pdf, .txt, .rst, .docx, .md, .zip limited to 25mb
      </p>

      {/* Uploaded Files */}
      <div className="mt-6">
        <h3 className="font-semibold">Uploaded Files:</h3>
        {isLoading ? (
          <div className="flex items-center mt-2">
            Fetching
            <div className="ml-2 animate-spin">
              <svg
                className="w-5 h-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 0116 0"
                ></path>
              </svg>
            </div>
          </div>
        ) : uploadedFiles.length === 0 ? (
          <p>None</p>
        ) : (
          <ul className="list-disc ml-4 mt-2">
            {uploadedFiles.map((file, index) => (
              <li key={index} className="text-gray-700">
                {file}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
