import { SendHorizonal } from "lucide-react";

function ChatInput() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">

      <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-2xl p-3 shadow-lg">

        <input
          type="text"
          placeholder="Ask something about your document..."
          className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-400 px-3 py-2"
        />

        <button
          className="bg-cyan-500 hover:bg-cyan-600 transition-all p-3 rounded-xl"
        >
          <SendHorizonal className="text-white" size={22} />
        </button>

      </div>

    </div>
  );
}

export default ChatInput;