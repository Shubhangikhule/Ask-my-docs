import { useRef, useContext, useState } from "react";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";
import { uploadPDF } from "../../services/uploadService";
import { UploadContext } from "../../context/UploadContext";

function UploadPanel() {
  
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const {
  uploadProgress,
  setUploadProgress,
  uploading,
  setUploading,
  uploadedFile,
  setUploadedFile,
} = useContext(UploadContext);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please select a PDF file.");
      e.target.value = "";
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(10);

      const result = await uploadPDF(file, (progress) => {
        setUploadProgress(progress);
      });

      setUploadProgress(100);

      toast.success(result.message || "PDF uploaded successfully!");
      setUploadedFile({
      name: file.name,
      uploadedAt: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
   }),
 });

      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 3000);

      e.target.value = "";
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail || "Upload failed!"
      );

      setUploading(false);
      setUploadProgress(0);

      e.target.value = "";
    }
  };
  const handleDragOver = (e) => {
  e.preventDefault();
  setDragActive(true);
};

const handleDragLeave = (e) => {
  e.preventDefault();
  setDragActive(false);
};

const handleDrop = async (e) => {
  e.preventDefault();
  setDragActive(false);

  const file = e.dataTransfer.files[0];

  if (!file) return;

  if (file.type !== "application/pdf") {
    toast.error("Please drop a PDF file.");
    return;
  }

  try {
    setUploading(true);
    setUploadProgress(10);

    const result = await uploadPDF(file, (progress) => {
      setUploadProgress(progress);
    });

    setUploadProgress(100);

    toast.success(result.message || "PDF uploaded successfully!");

    setTimeout(() => {
      setUploading(false);
      setUploadProgress(0);
    }, 3000);

  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.detail || "Upload failed!"
    );

    setUploading(false);
    setUploadProgress(0);
  }
};

  return (
  <>
   <div
  onDragOver={handleDragOver}
  onDragLeave={handleDragLeave}
  onDrop={handleDrop}
  className={`rounded-xl border-2 border-dashed p-4 transition-all duration-300 ${
    dragActive
      ? "border-cyan-500 bg-cyan-50 scale-[1.02]"
      : "border-slate-300 hover:border-cyan-400 hover:bg-cyan-50"
  }`}
>
  <button
    onClick={handleButtonClick}
    disabled={uploading}
    className="w-full flex items-center justify-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 transition-all py-3 font-semibold text-white"
  >
    <Upload size={20} />
    {uploading ? "Uploading..." : "Upload PDF"}
  </button>

  <p className="mt-3 text-center text-sm text-slate-500">
    Drag & Drop a PDF here or click the button
  </p>
</div>
    <input
      ref={fileInputRef}
      type="file"
      accept=".pdf"
      hidden
      onChange={handleFileChange}
    />
  </>
);
}

export default UploadPanel;