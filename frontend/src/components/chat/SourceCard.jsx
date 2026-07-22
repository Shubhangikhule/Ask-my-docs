import { FileText, Star } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

function SourceCard({ source }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div
  className={`mt-3 rounded-xl border p-4 transition-all hover:border-cyan-500 ${
      theme === "dark"
      ? "border-slate-700 bg-slate-900"
      : "border-slate-300 bg-white shadow-sm"
  }`}
>

      <div
  className={`flex items-center gap-2 font-semibold ${
    theme === "dark"
      ? "text-cyan-400"
      : "text-cyan-600"
  }`}
>
        <FileText size={18} />
        <span className="truncate">{source.filename}</span>
      </div>

      <div
  className={`mt-3 flex items-center justify-between text-sm ${
    theme === "dark"
      ? "text-slate-400"
      : "text-slate-600"
  }`}
>

        <span>
          📄 Chunk #{source.chunk}
        </span>

        <span className="flex items-center gap-1">
          <Star size={14} className="text-yellow-400" />
          {source.relevance_score}
        </span>

      </div>

    </div>
  );
}

export default SourceCard;