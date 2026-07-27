import { useContext,useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { SettingsContext } from "../../context/SettingsContext";
import AboutModal from "./AboutModal";

function SettingsPanel({
  onClose,
  onClearAllConversations,
}) {
  const { theme, toggleTheme } = useContext(ThemeContext);
    const { typingEnabled, setTypingEnabled } = useContext(SettingsContext); 
    const [aboutOpen, setAboutOpen] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-[380px] rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl">

        <h2 className="text-3xl font-bold text-white mb-5">
          ⚙️ Settings
        </h2>

       <div className="space-y-4">

  <div className="flex items-center justify-between">

    <span className="text-white font-medium">
      🌙 Theme
    </span>

   <button
  onClick={toggleTheme}
  className="rounded-lg bg-cyan-500 hover:bg-cyan-600 transition px-4 py-2 text-white font-semibold"
>
  {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
</button>

  </div>

  <div className="flex items-center justify-between mt-5">

  <div>
    <p className="text-white font-medium">
      ✨ Typing Animation
    </p>

    <p className="text-sm text-slate-400">
      Show AI responses word by word
    </p>
  </div>


  <button
    onClick={() => setTypingEnabled(!typingEnabled)}
    className={`rounded-lg px-4 py-2 font-semibold transition ${
      typingEnabled
        ? "bg-cyan-500 hover:bg-cyan-600 text-white"
        : "bg-cyan-600 hover:bg-cyan-500 text-white"
    }`}
  >
    {typingEnabled ? "ON" : "OFF"}
  </button>

</div>

<div className="mt-6 pt-6 border-t border-slate-700">

  <button
  onClick={() => {
    if (window.confirm("Clear all conversations?")) {
      onClearAllConversations();
      onClose();
    }
  }}
  className="w-full rounded-xl bg-cyan-500 hover:bg-cyan-600 transition py-3 font-semibold text-white"
>
  🗑 Clear All Conversations
</button>

</div>

<div className="mt-4">

  <button
    onClick={() => setAboutOpen(true)}
    className="w-full rounded-xl bg-cyan-700 hover:bg-cyan-600 transition py-3 font-semibold text-white"
  >
    ℹ About Ask My Docs
  </button>

</div>

</div>

        <div className="flex justify-end mt-8">
          <button
            onClick={onClose}
            className="rounded-xl bg-cyan-500 hover:bg-cyan-600 px-6 py-2 font-semibold text-white transition"
          >
            Close
          </button>
        </div>

      </div>

      {aboutOpen && (
  <AboutModal
    onClose={() => setAboutOpen(false)}
  />
)}

    </div>
  );
}

export default SettingsPanel;