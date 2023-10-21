// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXG6lMYjUOsRDKpY718P74PCGJ9Cg0ik4",
  authDomain: "dbhacktx23.firebaseapp.com",
  projectId: "dbhacktx23",
  storageBucket: "dbhacktx23.appspot.com",
  messagingSenderId: "429684702980",
  appId: "1:429684702980:web:9d2540488174701db19a51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Export firestore DB
// import this into react app whenever needed
export const db = getFirestore(app);