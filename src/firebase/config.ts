import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
const Config = {
  apiKey: "AIzaSyDWD8d4HV6qk9GHs5TY_OyKbM4Yml0KCnY",
  authDomain: "fir-inter-18713.firebaseapp.com",
  projectId: "fir-inter-18713",
  storageBucket: "fir-inter-18713.appspot.com",
  messagingSenderId: "329871594204",
  appId: "1:329871594204:web:4058eb517b0593003dda19",
  measurementId: "G-94ZV72JBBV",
};

/**
 * Creates and initializes a @firebase/app#FirebaseApp instance.
 */
export const authApp = initializeApp(Config);

/**
 *Returns the Auth instance associated with the provided
 */
export const Auth = getAuth(authApp);
export const db = getDatabase(authApp);
export const storage = getStorage(authApp, "gs://fir-inter-18713.appspot.com");

export const GProvider = new GoogleAuthProvider();
