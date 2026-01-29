import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Replace with your Firebase Project Configuration
// You can get this from Firebase Console -> Project Settings -> General -> Your Apps -> SDK Setup/Configuration
const firebaseConfig = {
    apiKey: "AIzaSyD0f4YxmW3O82_efX-FNvOzobwMMN4A2j0",
    authDomain: "flowday-com.firebaseapp.com",
    projectId: "flowday-com",
    storageBucket: "flowday-com.firebasestorage.app",
    messagingSenderId: "735118858084",
    appId: "1:735118858084:web:dbb3af01a8e73c5bca8c71",
    measurementId: "G-N0XS7FTXMM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
