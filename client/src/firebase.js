import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDiKTc19rAlFtpKaicY49VVEncgLG-mYhs",
  authDomain: "auth-based-dashboard-app.firebaseapp.com",
  projectId: "auth-based-dashboard-app",
  storageBucket: "auth-based-dashboard-app.appspot.com",
  messagingSenderId: "774675732772",
  appId: "1:774675732772:web:15b9a5cd9fa712c5d0fbb1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
