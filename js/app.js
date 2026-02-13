// hero switch
setTimeout(() => {
  document.querySelector(".hero")?.classList.add("show-second");
  document.querySelector(".hero")?.classList.add("show-text");
}, 1000);

// music
const btn = document.getElementById("musicBtn");
const audio = document.getElementById("bgm");
let playing = false;

btn.addEventListener("click", (e) => {
  if (!playing) {
    audio.play();
    btn.innerHTML = '<img src="./images/cake.png" class="cake-img">';
    btn.classList.add("cake");

    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    burstParticles(centerX, centerY);
  }

  playing = !playing;
});



// reveal
function initReveal(){
  const els = document.querySelectorAll(".reveal");
  if(!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("is-inview");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => io.observe(el));
}

initReveal();


// 11111111111111111111111111
const form = document.getElementById("wishForm");
const list = document.getElementById("wishList");

if (form && list) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // ❗关键：防止页面刷新

    const name = document.getElementById("wishName").value.trim();
    const message = document.getElementById("wishMessage").value.trim();

    if (!name || !message) return;

    // 写入 Firebase
    await addWish({
      name,
      message,
      createdAt: Date.now()
    });

    form.reset();
  });

  // 实时监听数据库
  listenWishes((wishes) => {
    list.innerHTML = wishes.map(w => `
      <div class="wishwall-item">
        <strong>${w.name}</strong>
        <p>${w.message}</p>
      </div>
    `).join("");
  });
}

function burstParticles(x, y) {
  const colors = ["#ffea06", "rgb(187,0,0)", "rgb(19,164,0)", "#ffffff"];

  for (let i = 0; i < 25; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const angle = Math.random() * 2 * Math.PI;
    const distance = 80 + Math.random() * 40;

    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    particle.style.left = x + "px";
    particle.style.top = y + "px";
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.setProperty("--dx", dx + "px");
    particle.style.setProperty("--dy", dy + "px");

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 800);
  }
}


function initStageSliders() {
  const sliders = document.querySelectorAll(".stage-slider");

  sliders.forEach(slider => {
    const images = slider.querySelectorAll("img");
    if (images.length < 2) return; // 少于2张不轮播

    let index = 0;

    setInterval(() => {
      images[index].classList.remove("active");
      index = (index + 1) % images.length;
      images[index].classList.add("active");
    }, 3000);
  });
}

document.addEventListener("DOMContentLoaded", initStageSliders);


window.addEventListener("DOMContentLoaded", () => {

  function lightHappyBirthday() {
    const items = document.querySelectorAll(".wall-item");
    console.log("found:", items.length);

    if (!items.length) return;

    const letters = "HAPPYBIRTHDAY";
    let letterIndex = 0;

    function lightNextLetter() {

      if (letterIndex >= letters.length) return;

      items.forEach(item => item.classList.remove("active"));

      const selected = [];
      while (selected.length < 6) {
        const rand = Math.floor(Math.random() * items.length);
        if (!selected.includes(rand)) {
          selected.push(rand);
        }
      }

      selected.forEach(i => {
        items[i].classList.add("active");
      });

      letterIndex++;
      setTimeout(lightNextLetter, 600);
    }

    lightNextLetter();
  }

  setTimeout(lightHappyBirthday, 2000);
});
