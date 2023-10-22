import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAXG6lMYjUOsRDKpY718P74PCGJ9Cg0ik4",
    authDomain: "dbhacktx23.firebaseapp.com",
    projectId: "dbhacktx23",
    storageBucket: "dbhacktx23.appspot.com",
    messagingSenderId: "429684702980",
    appId: "1:429684702980:web:9d2540488174701db19a51"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export {app, db};