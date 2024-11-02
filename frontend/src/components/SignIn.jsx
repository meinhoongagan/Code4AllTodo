// SignIn.js
import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./FireBase";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Link } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Email and Password Sign-In
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", userCredential.user);
      setError("");
      localStorage.setItem("userId", user.uid);
      navigate("/"); // Navigate to the home page on successful sign in
    } catch (err) {
      setError(err.message);
    }
  };

  // Social Sign-In
  const handleSocialSignIn = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in with:", result.user);
      setError("");
      navigate("/"); // Navigate to the home page on successful social sign in
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 h-screen">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <form onSubmit={handleEmailSignIn} className="flex flex-col gap-4 mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="p-2 border border-gray-300 rounded-md w-64"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="p-2 border border-gray-300 rounded-md w-64"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Sign In with Email
        </button>
      </form>

      <p className="text-gray-600 mb-4">Or sign in with:</p>
      <div className="flex gap-4">
        <button
          onClick={() => handleSocialSignIn(googleProvider)}
          className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Google
        </button>
      </div>
      <p>
        Don't have an account?{" "}
        <Link to="/signup">Sign Up</Link>
      </p>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default SignIn;
