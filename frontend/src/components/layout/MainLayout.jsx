import { useContext, useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import ChatWindow from "../chat/ChatWindow";
import { ThemeContext } from "../../context/ThemeContext";
import { newChat } from "../../services/chatService";
function MainLayout() {
  const { theme } = useContext(ThemeContext);
  const [conversations, setConversations] = useState(() => {
  const saved = localStorage.getItem("ask-my-docs-conversations");

  if (saved) {
    return JSON.parse(saved);
  }

  return [
    {
      id: 1,
      title: "New Chat",
      messages: [],
    },
  ];
});
  const [activeConversationId, setActiveConversationId] = useState(() => {
  const saved = localStorage.getItem("ask-my-docs-active-chat");

  return saved ? Number(saved) : 1;
});
  useEffect(() => {
  localStorage.setItem(
    "ask-my-docs-conversations",
    JSON.stringify(conversations)
  );

  localStorage.setItem(
    "ask-my-docs-active-chat",
    activeConversationId
  );
}, [conversations, activeConversationId]);

  const activeConversation =
    conversations.find(
      (conversation) =>
        conversation.id === activeConversationId
    ) || conversations[0];

  const handleNewChat = async () => {
    await newChat();  
  // If the current chat is already empty,
  // don't create another conversation.
  if (activeConversation.messages.length === 0) {
    return;
  }

  const newConversation = {
    id: Date.now(),
    title: "New Chat",
    messages: [],
    lastMessage: "",
    updatedAt: new Date().toISOString(),
  };

  setConversations((previous) => [
    ...previous,
    newConversation,
  ]);

  setActiveConversationId(newConversation.id);
};
  const handleDeleteConversation = (conversationId) => {
  setConversations((previous) => {
    const updated = previous.filter(
      (conversation) => conversation.id !== conversationId
    );

    // If all conversations are deleted,
    // create a fresh New Chat
    if (updated.length === 0) {
      const newConversation = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
      lastMessage: "",
      updatedAt: new Date().toISOString(),
    };

     
      setActiveConversationId(newConversation.id);

      return [newConversation];
    }

    // If the deleted conversation was active,
    // switch to the first remaining one.
    if (conversationId === activeConversationId) {
      setActiveConversationId(updated[0].id);
    }

    return updated;
  });
};
  const handleRenameConversation = (conversationId, newTitle) => {
  setConversations((previous) =>
    previous.map((conversation) =>
      conversation.id === conversationId
        ? {
            ...conversation,
            title: newTitle,
          }
        : conversation
    )
  );
};

const handleClearAllConversations = () => {
  const newConversation = {
    id: Date.now(),
    title: "New Chat",
    messages: [],
    lastMessage: "",
    updatedAt: new Date().toISOString(),
  };

  setConversations([newConversation]);
  setActiveConversationId(newConversation.id);
};

  const updateMessages = (messages) => {
  setConversations((previous) =>
    previous.map((conversation) => {
      if (conversation.id !== activeConversationId) {
        return conversation;
      }

      let title = conversation.title;

      // Use the first user message as the conversation title
      if (
        title === "New Chat" &&
        messages.length > 0 &&
        messages[0].sender === "user"
      ) {
        title =
          messages[0].text.length > 35
            ? messages[0].text.substring(0, 35) + "..."
            : messages[0].text;
      }

      const lastUserMessage = [...messages]
       .reverse()
       .find((message) => message.sender === "user");

    return {
       ...conversation,
       title,
       messages,
       lastMessage: lastUserMessage
       ? lastUserMessage.text
       : "",
       updatedAt: new Date().toISOString(),
       };
     })
   );
  };

  return (
    <div
      className={`flex h-screen transition-colors duration-300 ${
      theme === "dark"
      ? "bg-slate-950"
      : "bg-slate-100"
  }`}
>
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        setActiveConversationId={setActiveConversationId}
        onNewChat={handleNewChat}
        onDeleteConversation={handleDeleteConversation}
        onRenameConversation={handleRenameConversation}
        onClearAllConversations={handleClearAllConversations}
/>

      <ChatWindow
        messages={activeConversation.messages}
        setMessages={updateMessages}
      />
    </div>
  );
}

export default MainLayout;