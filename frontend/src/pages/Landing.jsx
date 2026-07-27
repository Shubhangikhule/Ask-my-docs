import { useNavigate } from "react-router-dom";
import Features from "../components/landing/Features";
import { motion } from "framer-motion";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-6 border-b border-slate-800">

        <h1 className="text-2xl font-bold text-cyan-400">
          Ask My Docs
        </h1>

        <div className="flex items-center gap-8">

          <button
  onClick={() =>
    document
      .getElementById("features")
      ?.scrollIntoView({ behavior: "smooth" })
  }
  className="relative text-slate-300 hover:text-cyan-400 transition-all duration-300"
>
  Features
</button>

<button
  onClick={() =>
    document
      .getElementById("how-it-works")
      ?.scrollIntoView({ behavior: "smooth" })
  }
  className="hover:text-cyan-400 transition"
>
  How It Works
</button>

<button
  onClick={() =>
    document
      .getElementById("about")
      ?.scrollIntoView({ behavior: "smooth" })
  }
  className="hover:text-cyan-400 transition"
>
  About
</button>

        </div>

        <div className="flex gap-4">

          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-xl border border-slate-700 hover:border-cyan-500 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition"
          >
            Get Started
          </button>

        </div>

      </nav>

{/* Hero Section */}
<motion.section
  initial={{ opacity: 0, y: 60 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="relative overflow-hidden py-28 px-8"
>

  {/* Background Glow */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/20 blur-[140px] rounded-full"></div>

  <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">


    <motion.div
  animate={{ y: [0, -12, 0] }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute top-10 right-20 bg-slate-800 border border-cyan-500/30 rounded-2xl px-4 py-2 shadow-lg"
>
  📄 PDF
</motion.div>

<motion.div
  animate={{ y: [0, 12, 0] }}
  transition={{
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute bottom-16 right-32 bg-slate-800 border border-cyan-500/30 rounded-2xl px-4 py-2 shadow-lg"
>
  🤖 AI
</motion.div>

<motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{
    duration: 3.5,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute top-48 right-4 bg-slate-800 border border-cyan-500/30 rounded-2xl px-4 py-2 shadow-lg"
>
  ⚡ Fast
</motion.div>

    {/* Left */}
    <div>

      <p className="text-cyan-400 font-semibold mb-4">
        AI Powered Document Assistant
      </p>

      <h1 className="text-6xl font-bold leading-tight">
        Chat with
        <span className="text-cyan-400"> Your PDFs </span>
        Using AI
      </h1>

      <p className="mt-8 text-xl text-slate-400 leading-8">
        Upload books, notes, research papers, and reports.
        Ask questions naturally and receive accurate answers
        with intelligent search and source citations.
      </p>

      <div className="mt-10 flex gap-5">

        <button
          onClick={() => navigate("/signup")}
          className="px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 hover:scale-105 transition-all duration-300 font-semibold shadow-lg hover:shadow-cyan-500/40"
        >
          Get Started
        </button>

        <button
          onClick={() => navigate("/login")}
          className="px-8 py-4 rounded-xl border border-slate-700 hover:border-cyan-500 hover:bg-slate-900 transition-all duration-300"
        >
          Login
        </button>

      </div>

    </div>

    {/* Right */}
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">

      <div className="space-y-4">

        <div className="bg-slate-800 rounded-xl p-4">
          📄 Research Paper.pdf
        </div>

        <div className="bg-cyan-500 text-white rounded-xl p-4 ml-12">
          What are the main findings?
        </div>

        <div className="bg-slate-800 rounded-xl p-4">
         The paper concludes that hybrid retrieval
         improves answer accuracy while reducing
         hallucinations.
        </div>

        <div className="mt-3 text-cyan-400 text-sm">
    📚 Source: Page 7
        </div>

      </div>

    </div>

  </div>

</motion.section>

{/* Features */}
  <section id="features">
  <Features />
</section>

  {/* How It Works */}
<section
  id="how-it-works"
  className="py-28 px-8 bg-slate-950"
>

  <h2 className="text-5xl font-bold text-center text-white">
    How It Works
  </h2>

  <p className="text-slate-400 text-center mt-4 mb-16">
    Start chatting with your documents in just three easy steps.
  </p>

  <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

    <div className="text-center">
      <div className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center text-3xl mx-auto mb-6">
        📄
      </div>

      <h3 className="text-2xl font-semibold text-white mb-4">
        Upload PDF
      </h3>

      <p className="text-slate-400">
        Upload books, notes, reports, or research papers securely.
      </p>
    </div>

    <div className="text-center">
      <div className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center text-3xl mx-auto mb-6">
        ❓
      </div>

      <h3 className="text-2xl font-semibold text-white mb-4">
        Ask Questions
      </h3>

      <p className="text-slate-400">
        Ask anything in natural language just like chatting with an AI assistant.
      </p>
    </div>

    <div className="text-center">
      <div className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center text-3xl mx-auto mb-6">
        🤖
      </div>

      <h3 className="text-2xl font-semibold text-white mb-4">
        Get Answers
      </h3>

      <p className="text-slate-400">
        Receive accurate responses with references from your uploaded documents.
      </p>
    </div>

  </div>

</section>

{/* Call To Action */}
<section className="py-28 px-8 bg-gradient-to-r from-cyan-600 to-blue-700 text-center">

  <h2 className="text-5xl font-bold text-white">
    Ready to Chat with Your Documents?
  </h2>

  <p className="text-xl text-cyan-100 mt-6 max-w-2xl mx-auto">
    Upload your PDFs, ask questions, and get intelligent answers in seconds.
  </p>

  <button
    onClick={() => navigate("/signup")}
    className="mt-10 px-10 py-4 bg-white text-cyan-700 rounded-xl font-bold hover:scale-105 transition"
  >
    Get Started Free
  </button>

</section>

<footer className="bg-slate-900 border-t border-slate-800 py-8 text-center">

  <h3 className="text-cyan-400 font-bold text-xl">
    Ask My Docs
  </h3>

  <p className="text-slate-400 mt-2">
    AI Powered Document Assistant
  </p>

  <p className="text-slate-500 mt-6 text-sm">
    © 2026 Ask My Docs. All rights reserved.
  </p>

</footer>

{/* About */}
<section
  id="about"
  className="py-24 px-8 bg-slate-900"
>

  <div className="max-w-5xl mx-auto text-center">

    <h2 className="text-5xl font-bold text-white">
      About Ask My Docs
    </h2>

    <p className="mt-8 text-xl text-slate-400 leading-9">
      Ask My Docs is an AI-powered document assistant that helps users
      upload PDFs, ask questions in natural language, and receive
      accurate answers with source citations.
    </p>

    <p className="mt-6 text-slate-500 leading-8">
      Built using React, FastAPI, Firebase Authentication,
      ChromaDB, BM25 Hybrid Search, Cross Encoder Re-ranking,
      and Groq LLM.
    </p>

  </div>

</section>


    </div>
  );
}

export default Landing;