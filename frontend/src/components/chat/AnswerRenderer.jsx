import ReactMarkdown from "react-markdown";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

function AnswerRenderer({ content }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`leading-7 transition-colors duration-300 ${
        theme === "dark"
          ? "text-slate-100"
          : "text-slate-800"
      }`}
    >
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-cyan-500 mb-4 mt-2">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold text-cyan-500 mt-6 mb-3">
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-cyan-500 mt-5 mb-2">
              {children}
            </h3>
          ),

          p: ({ children }) => (
            <p className="mb-3 leading-7">
              {children}
            </p>
          ),

          ul: ({ children }) => (
            <ul className="list-disc pl-6 space-y-2 mb-3">
              {children}
            </ul>
          ),

          ol: ({ children }) => (
            <ol className="list-decimal pl-6 space-y-2 mb-3">
              {children}
            </ol>
          ),

          strong: ({ children }) => (
            <strong className="font-semibold text-cyan-500">
              {children}
            </strong>
          ),

          code: ({ children }) => (
            <code
              className={`px-1.5 py-0.5 rounded ${
                theme === "dark"
                  ? "bg-slate-800 text-cyan-300"
                  : "bg-slate-200 text-cyan-700"
              }`}
            >
              {children}
            </code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default AnswerRenderer;