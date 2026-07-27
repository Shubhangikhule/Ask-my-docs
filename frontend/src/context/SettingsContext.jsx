import { createContext, useState } from "react";

export const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [typingEnabled, setTypingEnabled] = useState(true);

  return (
    <SettingsContext.Provider
      value={{
        typingEnabled,
        setTypingEnabled,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}