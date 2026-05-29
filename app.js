import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const messagesDiv = document.getElementById("messages");

window.sendMessage = async function () {
  const input = document.getElementById("messageInput");

  if (input.value.trim() === "") return;

  await addDoc(collection(db, "messages"), {
    text: input.value,
    time: Date.now()
  });

  input.value = "";
};

const q = query(collection(db, "messages"), orderBy("time"));

onSnapshot(q, (snapshot) => {
  messagesDiv.innerHTML = "";

  snapshot.forEach((doc) => {
    const div = document.createElement("div");
    div.className = "message";
    div.textContent = doc.data().text;
    messagesDiv.appendChild(div);
  });
});
