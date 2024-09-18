// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhhiomfTsyFibixYFc6eQI9VjazBWwrok",
  authDomain: "hotelbooking-aff00.firebaseapp.com",
  projectId: "hotelbooking-aff00",
  storageBucket: "hotelbooking-aff00.appspot.com",
  messagingSenderId: "445855714035",
  appId: "1:445855714035:web:9cdd56f6e6a15336c9c586",
  measurementId: "G-9ZLM47PZMJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getFirestore(app);
export { storage, db };
