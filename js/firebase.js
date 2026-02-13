import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC0B0ushQN85ttGRG4b3E45qg4eR5gM5VI",
  authDomain: "happy-bir-to-kira.firebaseapp.com",
  projectId: "happy-bir-to-kira",
  storageBucket: "happy-bir-to-kira.firebasestorage.app",
  messagingSenderId: "1035953659828",
  appId: "1:1035953659828:web:49bd41e8f4d65d37cddce1",
  measurementId: "G-GP1MPQ9EFC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const wishesRef = collection(db, "wishes");

export async function addWish(name, message) {
  await addDoc(wishesRef, {
    name,
    message,
    createdAt: serverTimestamp()
  });
}

export function listenWishes(callback) {
  const q = query(wishesRef, orderBy("createdAt", "desc"));
  onSnapshot(q, snap => {
    const data = snap.docs.map(d => d.data());
    callback(data);
  });
}

