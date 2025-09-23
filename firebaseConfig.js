
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAIUESyNJo_sBOfEvH1ko0BV_6HBhD6uSk",
  authDomain: "smartlift-a2f85.firebaseapp.com",
  projectId: "smartlift-a2f85",
  storageBucket: "smartlift-a2f85.appspot.com",
  messagingSenderId: "734042931459",
  appId: "1:734042931459:web:f454b87d0f088e1f112936",
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export default app;