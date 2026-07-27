import { useState, useEffect, useRef,useContext, } from "react";
import {
  FileText,
  MessageSquare,
  Trash2,
  Pencil,
  Search,
  MoreVertical,
   Settings,
} from "lucide-react";
import UploadPanel from "../upload/UploadPanel";
import { ThemeContext } from "../../context/ThemeContext";
import { UploadContext } from "../../context/UploadContext";
import PDFViewerModal from "../upload/PDFViewerModal";
import SettingsPanel from "../settings/SettingsPanel";

import SidebarHeader from "./SidebarHeader";
import SidebarActions from "./SidebarActions";
import DocumentsPanel from "./DocumentsPanel";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

function formatTime(dateString) {
  if (!dateString) return "";

  return new Date(dateString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Sidebar({
  conversations,
  activeConversationId,
  setActiveConversationId,
  onNewChat,
  onDeleteConversation,
  onRenameConversation,
  onClearAllConversations,
}) {
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { theme } = useContext(ThemeContext);
  console.log("Current theme:", theme);

  const menuRef = useRef(null);
  const {
  uploadProgress,
  uploading,
  uploadedFiles,
  setUploadedFiles,
  pdfThumbnail,
  pdfUrl,
  setPdfUrl,
  viewerOpen,
  setViewerOpen,
   activeDocument,
  setActiveDocument,
} = useContext(UploadContext);
console.log("Uploading:", uploading);
console.log("Progress:", uploadProgress);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return unsubscribe;
}, []);

  useEffect(() => {
  function handleClickOutside(event) {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setMenuOpenId(null);
    }
  }

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);

  const filteredConversations = conversations.filter((conversation) =>
    conversation.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  return (
    <>
    <aside
  className={`w-80 h-screen border-r flex flex-col transition-colors duration-300 ${
    theme === "dark"
      ? "bg-slate-900 border-slate-800"
      : "bg-white border-slate-300"
  }`}
>
      {/* Logo */}

      <SidebarHeader />
     
      <SidebarActions
  onNewChat={onNewChat}
  onOpenSettings={() => setSettingsOpen(true)}
/>
      <div className="flex-1 overflow-y-auto px-5 pb-5">

        <DocumentsPanel onNewChat={onNewChat} />

<div className="my-5 border-t border-slate-700" />

   {/* Search + Conversation List */}
<div className="px-5">

  <div className="relative mb-4">

    <Search
      size={18}
      className="absolute left-3 top-3 text-slate-400"
    />

    <input
      type="text"
      placeholder="Search chats..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className={`w-full rounded-xl border pl-10 pr-4 py-2 outline-none transition-colors duration-300 ${
           theme === "dark"
             ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
             : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-500"
       }`}
    />

  </div>

  <h2
  className={`uppercase text-xs tracking-wider mb-3 ${
    theme === "dark"
      ? "text-slate-400"
      : "text-slate-600"
  }`}
>
  Recent Chats
</h2>

</div>
        

       {filteredConversations.length === 0 ? (

  <div className="rounded-xl border border-slate-800 p-5 text-center">

    <MessageSquare
      size={30}
      className="mx-auto text-slate-500 mb-3"
    />

    {search ? (
      <>
        <p className="text-white font-medium">
          No conversations found
        </p>

        <p className="text-slate-400 text-sm mt-1">
          Try another search term.
        </p>
      </>
    ) : (
      <>
        <p className="text-white font-medium">
          No chats yet
        </p>

        <p className="text-slate-400 text-sm mt-1">
          Start a new conversation.
        </p>
      </>
    )}

  </div>

) : (

          <div className="flex-1 overflow-y-auto px-5 pb-5 space-y-3">

            {filteredConversations.map((conversation) => (

              <div
  key={conversation.id}
  onClick={() =>
    setActiveConversationId(conversation.id)
  }
  className={`group cursor-pointer rounded-xl border p-4 transition-all ${
  theme === "dark"
    ? activeConversationId === conversation.id
      ? "border-cyan-500 bg-slate-800"
      : "border-slate-800 bg-slate-900 hover:border-cyan-500 hover:bg-slate-800"
    : activeConversationId === conversation.id
      ? "border-cyan-500 bg-cyan-50"
      : "border-slate-300 bg-white hover:border-cyan-500 hover:bg-slate-100"
}`}
>
  <div className="flex items-start justify-between">

   <div className="flex items-start gap-3 flex-1 min-w-0">

      <MessageSquare
        size={18}
        className="text-cyan-400 mt-1"
      />

      {editingId === conversation.id ? (
  <input
    autoFocus
    value={newTitle}
    onChange={(e) => setNewTitle(e.target.value)}
    onBlur={() => {
      if (newTitle.trim()) {
        onRenameConversation(
          conversation.id,
          newTitle.trim()
        );
      }

      setEditingId(null);
    }}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        if (newTitle.trim()) {
          onRenameConversation(
            conversation.id,
            newTitle.trim()
          );
        }

        setEditingId(null);
      }
    }}
    className="bg-slate-700 text-white text-sm rounded px-2 py-1 w-full"
  />
) : (
  <div className="flex-1 min-w-0 overflow-hidden">
  <p
  className={`font-medium text-sm overflow-hidden break-words line-clamp-2 ${
    theme === "dark"
      ? "text-white"
      : "text-slate-900"
  }`}
>
  {conversation.title}
</p>

  <p
    className={`text-xs mt-1 truncate ${
      theme === "dark"
        ? "text-slate-400"
        : "text-slate-500"
    }`}
  >
    {
     conversation.lastMessage || "No messages yet"
    }
  </p>

  <p
    className={`text-[11px] mt-1 ${
      theme === "dark"
        ? "text-slate-500"
        : "text-slate-400"
     }`}
   >
  {formatTime(conversation.updatedAt)}
</p>

</div>
)}
    </div>
    <div
  className="relative"
  ref={
    menuOpenId === conversation.id
      ? menuRef
      : null
  }
>
  <button
    onClick={(e) => {
      e.stopPropagation();

      setMenuOpenId(
        menuOpenId === conversation.id
          ? null
          : conversation.id
      );
    }}
    className={`opacity-0 group-hover:opacity-100 transition ${
    theme === "dark"
    ? "text-slate-400 hover:text-white"
    : "text-slate-500 hover:text-slate-900"
}`}
  >
    <MoreVertical size={18} />
  </button>

  {menuOpenId === conversation.id && (

    <div
      className="absolute right-0 mt-2 w-40 rounded-xl bg-slate-900 border border-slate-700 shadow-xl overflow-hidden z-50"
      onClick={(e) => e.stopPropagation()}
    >

      <button
        onClick={() => {
          setEditingId(conversation.id);
          setNewTitle(conversation.title);
          setMenuOpenId(null);
        }}
        className="w-full text-left px-4 py-3 hover:bg-slate-800 text-white flex items-center gap-2"
      >
        <Pencil size={16} />
        Rename
      </button>

      <button
        onClick={() => {
          onDeleteConversation(conversation.id);
          setMenuOpenId(null);
        }}
        className="w-full text-left px-4 py-3 hover:bg-slate-800 text-red-400 flex items-center gap-2"
      >
        <Trash2 size={16} />
        Delete
      </button>

    </div>

  )}

</div>

  </div>
</div>

            ))}

          </div>

        )}

      </div>

      {user && (
  <div
    className={`border-t p-4 ${
      theme === "dark"
        ? "border-slate-700"
        : "border-slate-300"
    }`}
  >
    <div className="flex items-center gap-3">

      <img
        src={
          user.photoURL ||
          "https://ui-avatars.com/api/?name=" +
            encodeURIComponent(user.email)
        }
        alt="Profile"
        className="w-10 h-10 rounded-full"
      />

      <div className="min-w-0">
        <p
          className={`font-semibold truncate ${
            theme === "dark"
              ? "text-white"
              : "text-slate-900"
          }`}
        >
          {user.displayName || "User"}
        </p>

        <p
          className={`text-xs truncate ${
            theme === "dark"
              ? "text-slate-400"
              : "text-slate-500"
          }`}
        >
          {user.email}
        </p>
      </div>

    </div>
  </div>
)}

    </aside>

    <PDFViewerModal
  isOpen={viewerOpen}
  onClose={() => setViewerOpen(false)}
  pdfUrl={pdfUrl}
/>
{settingsOpen && (
  <SettingsPanel
    onClose={() => setSettingsOpen(false)}
    onClearAllConversations={onClearAllConversations}
  />
)}
  </>
    
    
  );
}

export default Sidebar;