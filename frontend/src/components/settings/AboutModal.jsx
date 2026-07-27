function AboutModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">

      <div className="w-[420px] rounded-2xl bg-slate-900 border border-slate-700 p-8 shadow-2xl">

        <h2 className="text-3xl font-bold text-white text-center">
          📄 Ask My Docs
        </h2>

        <p className="text-center text-cyan-400 mt-2">
          Version 1.0
        </p>

        <p className="text-slate-300 text-center mt-6">
          AI-powered PDF Question Answering Assistant
        </p>

        <div className="mt-8 space-y-3 text-slate-300">

          <p>⚛ React</p>
          <p>⚡ FastAPI</p>
          <p>🧠 ChromaDB</p>
          <p>🔍 BM25 Retrieval</p>
          <p>🤖 Groq LLM</p>

        </div>

        <div className="mt-8 border-t border-slate-700 pt-6">

          <p className="text-white font-semibold">
            Developer
          </p>

          <p className="text-cyan-400 mt-1">
            Shubhangi Khule
          </p>

        </div>

        <div className="mt-8 flex justify-end">

          <button
            onClick={onClose}
            className="rounded-xl bg-cyan-500 hover:bg-cyan-600 transition px-6 py-2 font-semibold text-white"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

export default AboutModal;