// ==================================
// HOSHIZORA MITEMINAIKA
// GIFU TECHNICAL HIGH SCHOOL 2-3
// ==================================


// LOADING SCREEN

window.addEventListener("load", () => {

  const loading = document.getElementById("loading");

  setTimeout(() => {
    loading.classList.add("hide");
  }, 900);

});


// STAR ANIMATION

const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

let stars = [];
let width = 0;
let height = 0;

function resizeCanvas() {

  width = window.innerWidth;
  height = window.innerHeight;

  const ratio = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = width * ratio;
  canvas.height = height * ratio;

  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  createStars();

}

function createStars() {

  stars = [];

  const count = Math.min(
    180,
    Math.floor((width * height) / 7000)
  );

  for (let i = 0; i < count; i++) {

    stars.push({

      x: Math.random() * width,
      y: Math.random() * height,

      size: Math.random() * 1.8 + 0.3,

      opacity: Math.random(),

      speed: Math.random() * 0.25 + 0.05,

      twinkle: Math.random() * 0.02 + 0.005

    });

  }

}

function drawStars() {

  ctx.clearRect(0, 0, width, height);

  stars.forEach(star => {

    star.opacity += star.twinkle;

    if (star.opacity > 1 || star.opacity < 0.15) {
      star.twinkle *= -1;
    }

    star.y += star.speed;

    if (star.y > height) {
      star.y = 0;
      star.x = Math.random() * width;
    }

    ctx.beginPath();

    ctx.arc(
      star.x,
      star.y,
      star.size,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      `rgba(190,220,255,${star.opacity})`;

    ctx.shadowBlur = 8;
    ctx.shadowColor = "#55d9ff";

    ctx.fill();

  });

  ctx.shadowBlur = 0;

  requestAnimationFrame(drawStars);

}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
drawStars();


// MOBILE MENU

const menuButton = document.getElementById("menuButton");

const navigation = document.getElementById("navigation");

menuButton.addEventListener("click", () => {

  navigation.classList.toggle("open");

});


// CLOSE MENU AFTER CLICK

document.querySelectorAll(".navigation a").forEach(link => {

  link.addEventListener("click", () => {

    navigation.classList.remove("open");

  });

});


// SCROLL ANIMATION

const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.classList.add("visible");

    }

  });

}, {

  threshold: 0.15

});

document.querySelectorAll(
  ".section-heading, .about-card, .program-card, .schedule-box, .access-card"
).forEach(element => {

  observer.observe(element);

});

console.log(
  "HOSHIZORA MITEMINAIKA - SYSTEM ONLINE"
);
