// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBQUHhcF_ZWlGIhTyecNANAH_t_beIf2r8",
    authDomain: "frublom-8953b.firebaseapp.com",
    projectId: "frublom-8953b",
    storageBucket: "frublom-8953b.appspot.com",
    messagingSenderId: "721273267091",
    appId: "1:721273267091:web:bc6342629415016e917e66",
    measurementId: "G-9S2ZXF54DG"
};


const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const auth = getAuth(app);