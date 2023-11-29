import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAbViPJKAEo_n6sqXZqeaXHWlfBJDXkhhU",
  authDomain: "ecommerce-9113d.firebaseapp.com",
  projectId: "ecommerce-9113d",
  storageBucket: "ecommerce-9113d.appspot.com",
  messagingSenderId: "697835544755",
  appId: "1:697835544755:web:c53dec697ed28e7c8550c6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider(app);
