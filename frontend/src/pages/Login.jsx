import { useNavigate } from "react-router-dom";
import { Eye, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { auth, googleProvider } from "../firebase";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";


function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleForgotPassword = async () => {
  if (!email) {
    alert("Please enter your email address first.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);

    alert("Password reset email sent! Please check your inbox.");

  } catch (error) {
    alert(error.message);
  }
};

  const handleGoogleLogin = async () => {
  try {
    await signInWithPopup(auth, googleProvider);

    alert("Google login successful!");

    navigate("/chat");

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

  const handleLogin = async () => {
  try {
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Login successful!");

    navigate("/chat");

  } catch (error) {
    alert(error.message);
  }
};

  return (
    <div className="min-h-screen bg-slate-950 flex">

      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center items-center bg-gradient-to-br from-cyan-600 to-blue-700 text-white p-12">

        <h1 className="text-6xl font-bold mb-6">
          Ask My Docs
        </h1>

        <p className="text-xl text-center max-w-md leading-8">
          Chat with your PDFs using AI.
          <br />
          Upload documents.
          <br />
          Ask questions.
          <br />
          Get instant answers with citations.
        </p>

      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center p-8">

        <div className="w-full max-w-md bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 p-10">

          <h2 className="text-4xl font-bold text-white text-center">
            Welcome Back
          </h2>

          <p className="text-slate-400 text-center mt-2 mb-8">
            Login to continue
          </p>

          {/* Email */}

          <div className="relative mb-5">

            <Mail
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
               type="email"
               placeholder="Email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-500"
           />

          </div>

          {/* Password */}

          <div className="relative mb-3">

            <Lock
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
               type={showPassword ? "text" : "password"}
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full pl-12 pr-12 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-500"
            />

            <Eye
             size={18}
             onClick={() => setShowPassword(!showPassword)}
             className="absolute right-4 top-4 text-slate-400 cursor-pointer hover:text-white"
            />

          </div>

          <div className="flex items-center justify-between mb-6">

          <label className="flex items-center gap-2 text-sm text-slate-300">

             <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="accent-cyan-500"
           />

                  Remember Me

            </label>

                 <button
                   onClick={handleForgotPassword}
                    className="text-cyan-400 text-sm hover:underline"
                 >
                     Forgot Password?
                 </button>
              </div>

          <button
             onClick={handleLogin}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl font-semibold transition"
          >
            Login
          </button>

          {/* OR Divider */}
<div className="flex items-center my-6">
  <div className="flex-1 h-px bg-slate-700"></div>

  <span className="px-4 text-slate-400 text-sm">
    OR
  </span>

  <div className="flex-1 h-px bg-slate-700"></div>
</div>

{/* Google Login */}
<button
  onClick={handleGoogleLogin}
  className="w-full border border-slate-700 text-white py-3 rounded-xl hover:border-cyan-500 hover:bg-slate-800 transition flex items-center justify-center gap-3"
>
  <img
    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
    alt="Google"
    className="w-5 h-5"
  />

  Continue with Google
</button>

<button
  onClick={() => navigate("/signup")}
  className="w-full mt-6 text-cyan-400 hover:underline"
>
  Don't have an account? Create one
</button>

        </div>

      </div>

    </div>
  );
}

export default Login;