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
  apiKey: "你的",
  authDomain: "你的",
  projectId: "你的",
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
