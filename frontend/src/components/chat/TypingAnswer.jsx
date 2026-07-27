import { useEffect, useState } from "react";
import AnswerRenderer from "./AnswerRenderer";
import { useContext } from "react";
import { SettingsContext } from "../../context/SettingsContext";

function TypingAnswer({ text }) {
  const { typingEnabled } = useContext(SettingsContext);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
  // If typing animation is OFF,
  // show the full answer immediately.
  if (!typingEnabled) {
    setDisplayText(text);
    return;
  }

  // If typing animation is ON,
  // animate word by word.
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

}, [text, typingEnabled]);

  return (
    <AnswerRenderer
      content={displayText}
    />
  );
}

export default TypingAnswer;