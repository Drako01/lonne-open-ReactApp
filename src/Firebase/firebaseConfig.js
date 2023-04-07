import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyAI8fIhRosqtbuo7JIquCj_pYhFBYmE0b8",
    authDomain: "backend-lonne-open-reactapp.firebaseapp.com",
    projectId: "backend-lonne-open-reactapp",
    storageBucket: "backend-lonne-open-reactapp.appspot.com",
    messagingSenderId: "995648902023",
    appId: "1:995648902023:web:d5fbb68b3dcba19277f922"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)