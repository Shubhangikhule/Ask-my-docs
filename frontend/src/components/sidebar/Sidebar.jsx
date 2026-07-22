import { useState, useEffect, useRef,useContext, } from "react";
import {
  FileText,
  MessageSquare,
  Trash2,
  Pencil,
  Search,
  MoreVertical,
} from "lucide-react";
import UploadPanel from "../upload/UploadPanel";
import { ThemeContext } from "../../context/ThemeContext";
import { UploadContext } from "../../context/UploadContext";

function Sidebar({
  conversations,
  activeConversationId,
  setActiveConversationId,
  onNewChat,
  onDeleteConversation,
  onRenameConversation,
}) {
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [menuOpenId, setMenuOpenId] = useState(null);
  const { theme } = useContext(ThemeContext);
  console.log("Current theme:", theme);

  const menuRef = useRef(null);
  const {
  uploadProgress,
  uploading,
  uploadedFile,
  setUploadedFile,
} = useContext(UploadContext);
console.log("Uploading:", uploading);
console.log("Progress:", uploadProgress);

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
    <aside
  className={`w-80 border-r flex flex-col transition-colors duration-300 ${
    theme === "dark"
      ? "bg-slate-900 border-slate-800"
      : "bg-white border-slate-300"
  }`}
   >
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">

          <div className="bg-cyan-500 p-3 rounded-xl">
            <FileText className="text-white" size={26} />
          </div>

          <div>
            <h1
              className={`text-2xl font-bold ${
              theme === "dark"
              ? "text-white"
              : "text-slate-900"
            }`}
    >
              Ask My Docs
            </h1>

            <p
               className={`text-sm ${
                theme === "dark"
                  ? "text-slate-400"
                  : "text-slate-600"
          }`}
     >
              AI Document Assistant
            </p>
          </div>

        </div>
      </div>

      {/* New Chat */}
      <div className="p-5">
        <button
          onClick={onNewChat}
          className="w-full rounded-xl bg-cyan-500 hover:bg-cyan-600 transition py-3 text-white font-semibold"
        >
          + New Chat
        </button>
      </div>

      {/* Upload */}
<div className="px-5 pb-5">
  <UploadPanel />

  {uploading && (
    <div className="mt-4">
      <div
        className={`flex justify-between text-xs mb-2 ${
          theme === "dark"
            ? "text-slate-400"
            : "text-slate-600"
        }`}
      >
        <span>Uploading PDF...</span>
        <span>{uploadProgress}%</span>
      </div>

      <div
        className={`w-full h-2 rounded-full overflow-hidden ${
          theme === "dark"
            ? "bg-slate-700"
            : "bg-slate-300"
        }`}
      >
        <div
          className="h-full bg-cyan-500 transition-all duration-300"
          style={{
            width: `${uploadProgress}%`,
          }}
        />
      </div>
    </div>
  )}
   {/* Uploaded PDF Card */}
  {uploadedFile && (
    <div
      className={`mt-4 rounded-xl border p-4 transition-colors duration-300 ${
        theme === "dark"
          ? "border-slate-700 bg-slate-800"
          : "border-slate-300 bg-slate-50"
      }`}
    >
      <div className="flex items-start gap-3">

        <div className="bg-cyan-500 p-2 rounded-lg">
          <FileText className="text-white" size={20} />
        </div>

        <div className="flex-1">

          <p
            className={`font-medium break-words ${
              theme === "dark"
                ? "text-white"
                : "text-slate-900"
            }`}
          >
            {uploadedFile.name}
          </p>

          <p className="text-green-500 text-sm mt-1">
            ✓ Ready to chat
          </p>

          <p
            className={`text-xs mt-1 ${
              theme === "dark"
                ? "text-slate-400"
                : "text-slate-500"
            }`}
          >
            Uploaded at {uploadedFile.uploadedAt}
          </p>

          <button
            onClick={() => setUploadedFile(null)}
            className="mt-3 text-red-500 text-sm hover:underline"
          >
            Remove PDF
          </button>

        </div>

      </div>
    </div>
  )}


</div>


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

      <div className="flex-1 px-5 pb-5 overflow-y-auto">

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

          <div className="space-y-3">

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

    <div className="flex gap-3">

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
   <p
  className={`text-sm break-words ${
    theme === "dark"
      ? "text-white"
      : "text-slate-900"
  }`}
>
  {conversation.title}
</p>
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

    </aside>
  );
}

export default Sidebar;