import { addWish, listenWishes } from "./firebase.js";

window.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("wishForm");
  const list = document.getElementById("wishList");
  const nameInput = document.getElementById("wishName");
  const messageInput = document.getElementById("wishMessage");

  if (!form || !list) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) return;

    await addWish(name, message);

    nameInput.value = "";
    messageInput.value = "";
  });

  listenWishes((wishes) => {
    list.innerHTML = wishes.map(w => `
      <div class="wishwall-item">
        <div class="wishwall-name">${w.name}</div>
        <div class="wishwall-text">${w.message}</div>
      </div>
    `).join("");
  });

});


const scrollContainer = document.querySelector(".wishwall-list");

scrollContainer.addEventListener("wheel", (e) => {
  e.preventDefault();
  scrollContainer.scrollTop += e.deltaY;
});
