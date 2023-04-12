import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAx1WOhbXstMBUNR2v9jFusOdOY2XwZL9s",
  authDomain: "welink-fa1cd.firebaseapp.com",
  projectId: "welink-fa1cd",
  storageBucket: "welink-fa1cd.appspot.com",
  messagingSenderId: "537653178068",
  appId: "1:537653178068:web:e8f498167969d4038b5541",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
