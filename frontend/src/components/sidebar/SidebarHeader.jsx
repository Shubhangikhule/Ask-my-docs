import { FileText } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

function SidebarHeader() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="p-6 border-b border-slate-800">
      <div className="flex items-center gap-3">
        <div className="bg-cyan-500 p-3 rounded-xl">
          <FileText className="text-white" size={26} />
        </div>

        <div>
          <h1
            className={`text-2xl font-bold ${
              theme === "dark"
                ? "text-white"
                : "text-slate-900"
            }`}
          >
            Ask My Docs
          </h1>

          <p
            className={`text-sm ${
              theme === "dark"
                ? "text-slate-400"
                : "text-slate-600"
            }`}
          >
            AI Document Assistant
          </p>
        </div>
      </div>
    </div>
  );
}

export default SidebarHeader;