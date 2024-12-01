import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3Q4f4itlW7PJ4TUlRha5kJoI72QrrC5s",
  authDomain: "global-forms.firebaseapp.com",
  projectId: "global-forms",
  storageBucket: "global-forms.firebasestorage.app",
  messagingSenderId: "675009576434",
  appId: "1:675009576434:web:39e1ca159125d2e6143f6b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
