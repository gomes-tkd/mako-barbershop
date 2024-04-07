import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDb8BB1tDux9H13sllXVI7I5wIbBgcIdiI",
    authDomain: "makos-barbershop.firebaseapp.com",
    projectId: "makos-barbershop",
    storageBucket: "makos-barbershop.appspot.com",
    messagingSenderId: "358775876284",
    appId: "1:358775876284:web:bda086e640d42ced763eb9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
