import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCEvPulWoPOep_9rtoSxQxch599sPZqJk",
  authDomain: "forms-c4eb8.firebaseapp.com",
  projectId: "forms-c4eb8",
  storageBucket: "forms-c4eb8.firebasestorage.app",
  messagingSenderId: "293870870373",
  appId: "1:293870870373:web:9cc9808710c0893bc60b8c",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
