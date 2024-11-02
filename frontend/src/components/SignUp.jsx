// SignUp.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./FireBase"; // Adjust the path if necessary
import { useNavigate } from "react-router-dom"; // Import useNavigate

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered:", userCredential.user);
      setError("");
      localStorage.setItem("userId", user.uid);
      navigate("/"); // Navigate to the home page on successful sign up
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSocialSignIn = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in with:", result.user);
      setError("");
      navigate("/"); // Navigate to the home page on successful social sign up
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="w-full py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 space-y-2">
          <p className="text-center text-gray-600">Or sign up with</p>
          <button
            onClick={() => handleSocialSignIn(googleProvider)}
            className="w-full py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
          >
            Sign Up with Google
          </button>
        </div>

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
}

export default SignUp;
