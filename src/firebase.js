
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyCA35FFQ-iv0vns-3TzaAsxKTKsSVdOllw",
//   authDomain: "profileplus-928b6.firebaseapp.com",
//   projectId: "profileplus-928b6",
//   storageBucket: "profileplus-928b6.appspot.com",
//   messagingSenderId: "698882773540",
//   appId: "YOUR_APP_ID" 
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// export { auth };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA35FFQ-iv0vns-3TzaAsxKTKsSVdOllw",
  authDomain: "profileplus-928b6.firebaseapp.com",
  projectId: "profileplus-928b6",
  storageBucket: "profileplus-928b6.firebasestorage.app",
  messagingSenderId: "698882773540",
  appId: "1:698882773540:web:e257f3c284d2e767f6feb1",
  measurementId: "G-7RP10KNH1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
