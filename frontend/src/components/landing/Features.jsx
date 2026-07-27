import { motion } from "framer-motion";
function Features() {
  const features = [
    {
      icon: "📄",
      title: "Upload PDFs",
      description:
        "Upload books, research papers, notes, reports, or documentation in seconds.",
    },
    {
      icon: "🤖",
      title: "AI Chat",
      description:
        "Ask natural language questions and receive intelligent answers instantly.",
    },
    {
      icon: "🔍",
      title: "Hybrid Search",
      description:
        "Combines semantic search and BM25 retrieval for highly accurate results.",
    },
    {
      icon: "📚",
      title: "Source Citations",
      description:
        "Every answer includes references to the original PDF sections.",
    },
    {
      icon: "💬",
      title: "Conversation Memory",
      description:
        "Continue asking follow-up questions naturally without losing context.",
    },
    {
      icon: "⚡",
      title: "Fast Responses",
      description:
        "Optimized retrieval pipeline delivers answers quickly and efficiently.",
    },
  ];

  return (
    <section className="py-24 px-8 bg-slate-900">
      <h2 className="text-5xl font-bold text-center text-white">
        Powerful Features
      </h2>

      <p className="text-slate-400 text-center mt-4 mb-16">
        Everything you need to chat intelligently with your documents.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map((feature,index) => (
          <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                 duration: 0.5,
                 delay: index * 0.15,
              }}
              className="bg-slate-800 rounded-3xl p-8 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300"
           >
            <div className="text-5xl mb-6">{feature.icon}</div>

            <h3 className="text-2xl font-semibold text-white mb-4">
              {feature.title}
            </h3>

            <p className="text-slate-400">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Features;