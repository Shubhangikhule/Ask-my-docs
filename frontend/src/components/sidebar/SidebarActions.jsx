import { Settings, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

function SidebarActions({
  onNewChat,
  onOpenSettings,
}) {

  const navigate = useNavigate();

  const handleLogout = async () => {
  try {
    await signOut(auth);

    alert("Logged out successfully!");

    navigate("/");

  } catch (error) {
    alert(error.message);
  }
};

  return (
    <>
      <div className="px-5 pt-4">
        <button
          onClick={onOpenSettings}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition-all py-3 font-semibold text-white"
        >
          <Settings size={20} />
          Settings
        </button>
      </div>

      <div className="px-5 pt-3">
  <button
    onClick={handleLogout}
    className="w-full flex items-center justify-center gap-2 rounded-xl bg-cyan-500 hover:bg-red-600 transition-all py-3 font-semibold text-white"
  >
    <LogOut size={20} />
    Logout
  </button>
</div>

      <div className="p-5">
        <button
          onClick={onNewChat}
          className="w-full rounded-xl bg-cyan-500 hover:bg-cyan-600 transition py-3 text-white font-semibold"
        >
          + New Chat
        </button>
      </div>
    </>
  );
}

export default SidebarActions;