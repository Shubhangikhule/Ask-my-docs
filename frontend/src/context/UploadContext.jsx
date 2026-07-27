import { createContext, useState } from "react";

export const UploadContext = createContext();

export function UploadProvider({ children }) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [pdfThumbnail, setPdfThumbnail] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [viewerOpen, setViewerOpen] = useState(false);

// NEW
const [uploadedFiles, setUploadedFiles] = useState([]);
const [activeDocument, setActiveDocument] = useState(null);
  return (
    <UploadContext.Provider
      value={{
        uploadProgress,
        setUploadProgress,
        uploading,
        setUploading,
        uploadedFiles,
        setUploadedFiles,
        pdfThumbnail,
        setPdfThumbnail,
        pdfUrl,
        setPdfUrl,
        viewerOpen,
        setViewerOpen,
        activeDocument,
        setActiveDocument,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
}