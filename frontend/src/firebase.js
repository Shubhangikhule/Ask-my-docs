import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDW5OV_e4lZf_PeMH_XneRv_SWX7cBRPQI",
  authDomain: "ask-my-docs-29348.firebaseapp.com",
  projectId: "ask-my-docs-29348",
  storageBucket: "ask-my-docs-29348.firebasestorage.app",
  messagingSenderId: "564205427224",
  appId: "1:564205427224:web:b74aceffac85ed8dea416d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();