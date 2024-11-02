// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAWP6PSs8nunQtOsytw782JqAftE99PQTo",
  authDomain: "todoapp-63836.firebaseapp.com",
  projectId: "todoapp-63836",
  storageBucket: "todoapp-63836.firebasestorage.app",
  messagingSenderId: "278052171440",
  appId: "1:278052171440:web:66567ae616eed4c984d575",
  measurementId: "G-38CXC073CV"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app); 

export { auth, googleProvider, db };
