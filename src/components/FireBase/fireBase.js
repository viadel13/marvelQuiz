import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore, doc } from "firebase/firestore";




const firebaseConfig = {
  apiKey: "AIzaSyD-VlCWjWRTLvwGZ_BONYR2hFwUTTjByQ0",
  authDomain: "marvel-quiz-2f3f9.firebaseapp.com",
  projectId: "marvel-quiz-2f3f9",
  storageBucket: "marvel-quiz-2f3f9.appspot.com",
  messagingSenderId: "796563953550",
  appId: "1:796563953550:web:4955a9c1f576eb9ce536df"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth(app)
export const user = uid => doc(db, `user/${uid}`)


