import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0hB8Gbh2T4hRiNLyCE7pX8x0qwXDycZY",
  authDomain: "internshala-b1ad8.firebaseapp.com",
  projectId: "internshala-b1ad8",
  storageBucket: "internshala-b1ad8.appspot.com",
  messagingSenderId: "227805491809",
  appId: "1:227805491809:web:47991b44b0b06b0cc73020",
  measurementId: "G-5LK2VTWZSW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔹 Force session-based login (logs out when the tab/browser is closed)
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Session persistence set.");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export { app, auth, db };
