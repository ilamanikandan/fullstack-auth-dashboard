import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, provider } from "../firebase";
import API from "../services/api";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  /* ---------------- Google login ---------------- */
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      /* 👉 1. Get Google ID token (NOT Firebase idToken) */
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const idToken   = credential.idToken;          // ✅ real Google token

      /* 👉 2. Send to backend for JWT */
      const { data } = await API.post("/auth/google-login", { idToken });

      /* 👉 3. Store backend JWT */
      localStorage.setItem("authToken", data.token);
      setUser({ email: data.email });
      navigate("/dashboard");
    } catch (err) {
      console.error("Google login failed:", err);
      alert("Google login failed: " + (err.response?.data?.message || err.message));
    }
  };

  /* ---------- email login / logout omitted for brevity ---------- */
  /* ... keep your existing login(), logout(), onAuthStateChanged ... */

  return (
    <AuthContext.Provider value={{ user, googleLogin /* plus others */ }}>
      {children}
    </AuthContext.Provider>
  );
};
