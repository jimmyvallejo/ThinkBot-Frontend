import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCARo8IWnyAH9WPZlA9j63i1mtSJlU_f74",
  authDomain: "miami-hackathon-ai.firebaseapp.com",
  projectId: "miami-hackathon-ai",
  storageBucket: "miami-hackathon-ai.appspot.com",
  messagingSenderId: "480223531817",
  appId: "1:480223531817:web:f62b9a6cd8be70e5cd9d38",
};

export const init = () => {
  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);

  if (process.env.REACT_APP_ENVIRONMENT === "development") {
    console.log("Connecting to local authentication emulator");
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
  }
};
