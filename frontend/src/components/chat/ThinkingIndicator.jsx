function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-1 py-2">
      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce"></span>

      <span
        className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce"
        style={{ animationDelay: "0.15s" }}
      ></span>

      <span
        className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce"
        style={{ animationDelay: "0.3s" }}
      ></span>
    </div>
  );
}

export default ThinkingIndicator;