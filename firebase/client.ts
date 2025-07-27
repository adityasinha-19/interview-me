// Import the functions you need from the SDKs you need
import { getApp,getApps,initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_pfj3h2DxUIgMDw39x1A-TzE3Yhhves4",
  authDomain: "interviewme-cd110.firebaseapp.com",
  projectId: "interviewme-cd110",
  storageBucket: "interviewme-cd110.firebasestorage.app",
  messagingSenderId: "471717328609",
  appId: "1:471717328609:web:4902c3b829c7ccf77ae9a0",
  measurementId: "G-0BNC389197"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app)
export const db = getFirestore(app)
