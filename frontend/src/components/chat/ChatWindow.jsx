import { useState, useEffect, useRef, useContext, } from "react";
import { SendHorizontal, User, Bot } from "lucide-react";
import { askQuestion } from "../../services/chatService";
import AnswerRenderer from "./AnswerRenderer";
import SourceCard from "./SourceCard";
import CopyButton from "./CopyButton";
import ThinkingIndicator from "./ThinkingIndicator";
import TypingAnswer from "./TypingAnswer";
import {
  exportAsPDF,
  exportAsMarkdown,
  exportAsText,
} from "../../services/exportService";
import { ThemeContext } from "../../context/ThemeContext";


function ChatWindow({ messages, setMessages }) {
  const [question, setQuestion] = useState("");
  const [showExportMenu, setShowExportMenu] = useState(false);
  const messagesEndRef = useRef(null);
  const { theme, toggleTheme } =
  useContext(ThemeContext);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = async () => {
    if (!question.trim()) return;

    const currentQuestion = question;

   const updatedMessages = [
  ...messages,
   {
      sender: "user",
      text: currentQuestion,
      time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
];

setMessages(updatedMessages);

    setQuestion("");

    // Reset textarea after sending
    if (textareaRef.current) {
    textareaRef.current.style.height = "52px";
    textareaRef.current.style.overflowY = "hidden";
}

    const thinkingMessages = [
     ...updatedMessages,
    {
       sender: "ai",
       text: "Thinking...",
       sources: [],
       time: new Date().toLocaleTimeString([], {
       hour: "2-digit",
       minute: "2-digit",
    }),
  },
];

setMessages(thinkingMessages);

    try {
      const response = await askQuestion(currentQuestion);

       const finalMessages = [...thinkingMessages];

     finalMessages[finalMessages.length - 1] = {
     sender: "ai",
     text: response.answer,
     sources: response.sources || [],
     time: thinkingMessages[thinkingMessages.length - 1].time,
  };

    setMessages(finalMessages);
    } catch (error) {
  console.error(error);

  const finalMessages = [...thinkingMessages];

  finalMessages[finalMessages.length - 1] = {
    sender: "ai",
    text: "Something went wrong. Please try again.",
    sources: [],
    time: thinkingMessages[thinkingMessages.length - 1].time,
  };

  setMessages(finalMessages);
}
   };

  return (
   <main
  className={`flex-1 flex flex-col min-h-0 transition-colors duration-300 ${
    theme === "dark"
      ? "bg-slate-950"
      : "bg-slate-100"
  }`}
>
      {/* Header */}
     {/* Header */}
   <div
      className={`border-b p-6 flex items-center justify-between transition-colors duration-300 ${
      theme === "dark"
      ? "border-slate-800 bg-slate-950"
      : "border-slate-300 bg-white"
  }`}
>

  <div>
    <h2
  className={`text-2xl font-bold ${
    theme === "dark"
      ? "text-white"
      : "text-slate-900"
  }`}
>
  AI Chat
</h2>
    <p
  className={`mt-1 ${
    theme === "dark"
      ? "text-slate-400"
      : "text-slate-600"
  }`}
>
  Upload a PDF and ask questions about it.
</p>
  </div>

  <div className="flex items-center gap-2">

  <button
    onClick={toggleTheme}
    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition"
  >
    {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
  </button>

  <div className="relative">

    <button
      onClick={() => setShowExportMenu(!showExportMenu)}
      className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition"
    >
      Export ▼
    </button>

    {showExportMenu && (
      <div
  className={`absolute right-0 mt-2 w-52 rounded-xl border shadow-xl overflow-hidden z-50 ${
    theme === "dark"
      ? "bg-slate-900 border-slate-700"
      : "bg-white border-slate-300"
  }`}
>

        <button
          onClick={() => {
            exportAsPDF("Ask My Docs Chat", messages);
            setShowExportMenu(false);
          }}
          className={`w-full text-left px-4 py-3 transition ${
            theme === "dark"
            ? "text-white hover:bg-slate-800"
            : "text-slate-800 hover:bg-slate-100"
}`}
        >
          📄 Export as PDF
        </button>

        <button
          onClick={() => {
            exportAsMarkdown("Ask My Docs Chat", messages);
            setShowExportMenu(false);
          }}
          className={`w-full text-left px-4 py-3 transition ${
            theme === "dark"
            ? "text-white hover:bg-slate-800"
            : "text-slate-800 hover:bg-slate-100"
       }`}
        >
          📝 Export as Markdown
        </button>

        <button
          onClick={() => {
            exportAsText("Ask My Docs Chat", messages);
            setShowExportMenu(false);
          }}
          className={`w-full text-left px-4 py-3 transition ${
            theme === "dark"
            ? "text-white hover:bg-slate-800"
            : "text-slate-800 hover:bg-slate-100"
       }`}
        >
          📃 Export as Text
        </button>

      </div>
    )}

  </div>

</div>

</div>

      {/* Messages */}
      <div
      className={`flex-1 min-h-0 overflow-y-auto p-6 transition-colors duration-300 ${
        theme === "dark"
         ? "bg-slate-950"
         : "bg-slate-50"
     }`}
>
  <div className="p-6">

        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
             <div className="text-center">
    <h3
      className={`text-2xl font-semibold mb-2 ${
        theme === "dark"
          ? "text-white"
          : "text-slate-900"
      }`}
    >
      Welcome 👋
    </h3>

    <p
      className={`${
        theme === "dark"
          ? "text-slate-400"
          : "text-slate-600"
      }`}
    >
      Upload a PDF from the sidebar to start chatting.
    </p>
  </div>
</div>
        ) : (
          <div className="space-y-6">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start gap-3 ${
                    msg.sender === "user"
                      ? "flex-row-reverse max-w-[80%]"
                      : "flex-row w-full"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      msg.sender === "user"
                        ? "bg-cyan-500"
                        : "bg-slate-700"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      <User size={20} className="text-white" />
                    ) : (
                      <Bot size={20} className="text-cyan-400" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
             className={`rounded-2xl px-4 py-3 w-full max-w-5xl transition-colors duration-300 ${
              msg.sender === "user"
             ? "bg-cyan-500 text-white"
             : theme === "dark"
             ? "bg-slate-800 text-white"
             : "bg-white border border-slate-300 text-slate-900 shadow-sm"
            }`}
         >
                    {/* Name */}
                   <div className="mb-3 flex items-center justify-between">
                    <span
                       className={`text-xs font-semibold ${
                         theme === "dark"
                            ? "text-slate-400"
                            : "text-slate-600"
                      }`}
                  >
                    {msg.sender === "user"
                     ? "You"
                     : "Ask My Docs"}
                </span>

                   <span
                       className={`text-[11px] ${
                       theme === "dark"
                       ? "text-slate-400"
                       : "text-slate-500"
                     }`}
                 >
                   {msg.time}
                  </span>
                  </div>
                    {msg.sender === "ai" ? (
  <>
    {msg.text === "Thinking..." ? (
      <ThinkingIndicator />
    ) : (
      <>
        {msg.text === "Thinking..." ? (
          <AnswerRenderer content={msg.text} />
     ) : (
  <TypingAnswer text={msg.text} />
     )}

        <CopyButton text={msg.text} />

        {msg.sources?.length > 0 && (
          <div className="mt-5">
            <h4 className="mb-3 text-sm font-semibold text-cyan-400 uppercase tracking-wide">
              📄 Sources
            </h4>

            <div className="space-y-3">
              {msg.sources.map((source, index) => (
                <SourceCard
                  key={index}
                  source={source}
                />
              ))}
              </div>
            </div>
            )}
            </>
           )}
          </>
          ) : (
             <div className="whitespace-pre-wrap">
               {msg.text}
            </div>
         )}
                  </div>
                </div>
              </div>
            ))}

            <div ref={messagesEndRef}></div>
          </div>
        )}
      </div>
      </div>

      {/* Input */}
      <div
         className={`border-t p-5 transition-colors duration-300 ${
            theme === "dark"
              ? "border-slate-800 bg-slate-950"
              : "border-slate-300 bg-white"
        }`}
     >
        <div className="flex items-end gap-3">
         <textarea
  ref={textareaRef}
  placeholder="Ask anything about your document..."
  value={question}
  rows={1}
  onChange={(e) => {
    setQuestion(e.target.value);

    e.target.style.height = "auto";

    const maxHeight = 160;
    const scrollHeight = e.target.scrollHeight;

    e.target.style.height =
      Math.min(scrollHeight, maxHeight) + "px";

    e.target.style.overflowY =
      scrollHeight > maxHeight ? "auto" : "hidden";
  }}
             onKeyDown={(e) => {
            // Enter = Send
            if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
         }

           // Shift + Enter = New Line
}}
  className={`flex-1 resize-none overflow-y-auto rounded-xl border px-4 py-3 outline-none focus:border-cyan-500 min-h-[52px] max-h-40 transition-colors duration-300 ${
  theme === "dark"
    ? "bg-slate-900 border-slate-700 text-white placeholder:text-slate-400"
    : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-500"
}`}
/>

   <button
      onClick={handleSend}
      className="h-[52px] shrink-0 rounded-xl bg-cyan-500 hover:bg-cyan-600 px-5 flex items-center justify-center text-white"
   >
  <SendHorizontal size={22} />
</button>
        </div>
      </div>
    </main>
  );
}

export default ChatWindow;



