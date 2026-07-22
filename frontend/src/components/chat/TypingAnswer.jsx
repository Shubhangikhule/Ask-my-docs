import { useEffect, useState } from "react";
import AnswerRenderer from "./AnswerRenderer";

function TypingAnswer({ text }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    setDisplayText("");

    const words = text.split(" ");
    let index = 0;

    const timer = setInterval(() => {
      setDisplayText(words.slice(0, index + 1).join(" "));
      index++;

      if (index >= words.length) {
        clearInterval(timer);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <AnswerRenderer
      content={displayText}
    />
  );
}

export default TypingAnswer;