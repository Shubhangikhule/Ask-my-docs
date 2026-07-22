import { Copy, Check } from "lucide-react";
import { useState,useContext } from "react";
import toast from "react-hot-toast";
import { ThemeContext } from "../../context/ThemeContext";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false); 
  const { theme } = useContext(ThemeContext);
  

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);
      toast.success("Answer copied!");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to copy.");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`mt-4 flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
      theme === "dark"
      ? "border-slate-700 text-slate-300 hover:bg-slate-700"
      : "border-slate-300 text-slate-700 hover:bg-slate-100"
}`}
    >
      {copied ? (
        <>
          <Check size={16} className="text-green-400" />
          Copied
        </>
      ) : (
        <>
          <Copy size={16} />
          Copy
        </>
      )}
    </button>
  );
}

export default CopyButton;