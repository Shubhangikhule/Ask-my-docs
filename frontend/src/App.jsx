import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";

import Home from "./pages/Home";
import Login from "./pages/Login";

import { UploadProvider } from "./context/UploadContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";

function App() {
  return (
    <UploadProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

         <Route path="/signup" element={<Signup />} />

        <Route
  path="/chat"
  element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>

         <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </UploadProvider>
  );
}

export default App;