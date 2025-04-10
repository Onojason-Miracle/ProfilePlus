import React, { useState } from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Google = ({ mode = "login" }) => {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`Welcome, ${user.displayName}`);
      // Optionally redirect here
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const googleButtonText = () => {
    if (loading) return "Signing in...";
    return mode === "register" ? "Sign up with Google" : "Login with Google";
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn} disabled={loading} className="google-btn">
        <i className="fa-brands fa-google"></i>
        {` ${googleButtonText()}`}
      </button>
    </div>
  );
};

export default Google;
