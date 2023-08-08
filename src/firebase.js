// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZgi0vYhMHFVtJfqiDKTUr4lCmZqaHdpM",
  authDomain: "pdf-customization.firebaseapp.com",
  projectId: "pdf-customization",
  storageBucket: "pdf-customization.appspot.com",
  messagingSenderId: "271587626102",
  appId: "1:271587626102:web:1e200daf748b51ce4a6357",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
