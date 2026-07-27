import { X } from "lucide-react";

function PDFViewerModal({
  isOpen,
  onClose,
  pdfUrl,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl w-[90vw] h-[90vh] overflow-hidden flex flex-col">

        <div className="flex items-center justify-between p-4 border-b">

          <h2 className="font-semibold text-lg">
            PDF Viewer
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <iframe
          src={pdfUrl}
          title="PDF Viewer"
          className="flex-1 w-full"
        />

      </div>

    </div>
  );
}

export default PDFViewerModal;