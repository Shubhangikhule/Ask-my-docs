import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase";

function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSignup = async () => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Account created successfully!");

    navigate("/");

  } catch (error) {
    alert(error.message);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Create Account
        </h1>

        <p className="text-slate-400 text-center mb-8">
          Join Ask My Docs
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full mb-4 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none"
      />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none"
        />

        <input
         type="password"
         placeholder="Password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         className="w-full mb-6 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none"
       />
     <button
       onClick={handleSignup}
       className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-semibold transition"
    >
         Create Account
     </button>

        <button
          onClick={() => navigate("/")}
          className="w-full mt-4 text-cyan-400"
        >
          Already have an account? Login
        </button>

      </div>
    </div>
  );
}

export default Signup;