import { createContext, useState } from "react";

export const UploadContext = createContext();

export function UploadProvider({ children }) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

// NEW
const [uploadedFile, setUploadedFile] = useState(null);
  return (
    <UploadContext.Provider
      value={{
        uploadProgress,
        setUploadProgress,
        uploading,
        setUploading,
        uploadedFile,
        setUploadedFile
      }}
    >
      {children}
    </UploadContext.Provider>
  );
}