import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAU6RchzmUNIDxoSsryIrv_WV5-aGryVc",
  authDomain: "otpauth-cd9a9.firebaseapp.com",
  projectId: "otpauth-cd9a9",
  storageBucket: "otpauth-cd9a9.appspot.com",
  messagingSenderId: "89546071758",
  appId: "1:89546071758:web:6689c08724bdf313087a9f",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
