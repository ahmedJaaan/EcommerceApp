import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyDux_B9gaHMXkGlpvVp5y2QRnNIGIyUaQg",
  authDomain: "e-commerce-cbb9a.firebaseapp.com",
  projectId: "e-commerce-cbb9a",
  storageBucket: "e-commerce-cbb9a.appspot.com",
  messagingSenderId: "1031229170701",
  appId: "1:1031229170701:web:ac93320c3889b904e26144"
};

const app = initializeApp(firebaseConfig);


export default app;