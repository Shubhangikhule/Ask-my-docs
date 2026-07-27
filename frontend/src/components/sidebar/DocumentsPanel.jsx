import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { UploadContext } from "../../context/UploadContext";
import UploadPanel from "../upload/UploadPanel";
import { deletePdf } from "../../services/api";

function DocumentsPanel({ onNewChat }) {
  const { theme } = useContext(ThemeContext);

  const {
    uploading,
    uploadProgress,
    uploadedFiles,
    setUploadedFiles,
    setPdfUrl,
    setViewerOpen,
    activeDocument,
    setActiveDocument,
  } = useContext(UploadContext);

  const handleRemovePdf = async (file) => {
  try {
    await deletePdf(file.name);

    setUploadedFiles((previous) =>
      previous.filter((pdf) => pdf.id !== file.id)
    );

    // If the deleted document was selected, clear it
    if (activeDocument?.id === file.id) {
      setActiveDocument(null);
    }

    alert("PDF deleted successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to delete PDF.");
  }
};

  return (
    <div className="px-5 pb-5">
          {/* Upload */}
<div className="px-5 pb-5">
  <UploadPanel />

  {uploading && (
    <div className="mt-4">
      <div
        className={`flex justify-between text-xs mb-2 ${
          theme === "dark"
            ? "text-slate-400"
            : "text-slate-600"
        }`}
      >
        <span>Uploading PDF...</span>
        <span>{uploadProgress}%</span>
      </div>
      


      <div
        className={`w-full h-2 rounded-full overflow-hidden ${
          theme === "dark"
            ? "bg-slate-700"
            : "bg-slate-300"
        }`}
      >
        <div
          className="h-full bg-cyan-500 transition-all duration-300"
          style={{
            width: `${uploadProgress}%`,
          }}
        />
      </div>
    </div>
  )}
   {/* Uploaded PDF Cards */}
{uploadedFiles.length > 0 && (
  <div
  className={`mt-4 rounded-xl border p-4 h-[240px] flex flex-col transition-colors duration-300 ${
      theme === "dark"
        ? "border-slate-700 bg-slate-800"
        : "border-slate-300 bg-slate-50"
    }`}
  >
    <h3 className="font-semibold text-cyan-500 mb-4">
      📂 My Documents
    </h3>

   <div className="flex-1 overflow-y-auto space-y-4 pr-2">
      {uploadedFiles.map((file) => (
        <div
  key={file.id}
  onClick={() => {
  // Only create a new chat if the selected PDF changes
  if (activeDocument?.name !== file.name) {
    setActiveDocument(file);
    onNewChat();
  } else {
    setActiveDocument(file);
  }
}}
  className={`border-b pb-4 last:border-b-0 cursor-pointer rounded-lg transition ${
    activeDocument?.id === file.id
      ? "border-cyan-500 bg-cyan-500/10"
      : "border-slate-700 hover:bg-slate-700/30"
  }`}
>
         {file.thumbnail && (
  <img
  src={file.thumbnail}
  alt="PDF Preview"
  className="w-20 h-24 rounded-lg object-cover border border-slate-700 flex-shrink-0 cursor-pointer"
  onClick={() => {
  alert(file.url);
  console.log(file);

  setPdfUrl(file.url);
  setViewerOpen(true);
}}
/>
)}

          <div className="flex gap-3 items-start">
            

            <div className="flex-1">

              <p
                className={`font-medium break-words ${
                  theme === "dark"
                    ? "text-white"
                    : "text-slate-900"
                }`}
              >
                {file.name}
              </p>

              <p className="text-green-500 text-sm mt-1">
                ✓ Ready to chat
              </p>

              <p
                className={`text-xs mt-1 ${
                  theme === "dark"
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >
                Uploaded at {file.uploadedAt}
              </p>

              <button
                onClick={(e) => {
                   e.stopPropagation();
                    handleRemovePdf(file);
                }}
                className="mt-3 inline-flex items-center gap-1 text-sm text-red-500 hover:text-red-600"
              >
                Remove PDF
              </button>

            </div>

          </div>
        </div>
      ))}
    </div>
  </div>
)}


</div>
    </div>
  );
}

export default DocumentsPanel;