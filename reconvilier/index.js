const images = [
  "http://atelierdufour.ch/assets/reconvilier/img/1.png",
  "http://atelierdufour.ch/assets/reconvilier/img/2.png",
  "http://atelierdufour.ch/assets/reconvilier/img/3.png",
  "http://atelierdufour.ch/assets/reconvilier/img/4.png",
  "http://atelierdufour.ch/assets/reconvilier/img/5.png",
  "http://atelierdufour.ch/assets/reconvilier/img/6.png",
  "http://atelierdufour.ch/assets/reconvilier/img/7.png",
  "http://atelierdufour.ch/assets/reconvilier/img/8.png",
  "http://atelierdufour.ch/assets/reconvilier/img/9.png",
  "http://atelierdufour.ch/assets/reconvilier/img/10.png"
];

const slider = document.getElementById("slider");
const layerA = document.getElementById("layerA");
const layerB = document.getElementById("layerB");
const imgA = document.getElementById("imgA");
const imgB = document.getElementById("imgB");
const dotsEl = document.getElementById("dots");
const thumbsEl = document.getElementById("thumbnails");

let index = 0;
let activeA = true;
let animating = false;

function updateUI() {
  [...dotsEl.children].forEach((d, i) => {
    d.setAttribute("aria-current", i === index);
  });
  [...thumbsEl.children].forEach((t, i) => {
    if (i === index) t.classList.add("active");
    else t.classList.remove("active");
  });
}

function buildNav() {
  dotsEl.innerHTML = "";
  thumbsEl.innerHTML = "";

  images.forEach((src, i) => {
    const d = document.createElement("button");
    d.className = "dot";
    d.onclick = () => goTo(i);
    dotsEl.appendChild(d);

    const t = document.createElement("img");
    t.src = src;
    t.className = "thumb";
    t.onclick = () => goTo(i);
    thumbsEl.appendChild(t);
  });
}

function setLayer(el, x, animate) {
  el.style.transition = animate ? "transform 300ms ease" : "none";
  el.style.transform = `translateX(${x}%)`;
}

function goTo(i) {
  if (animating || i === index) return;
  animating = true;
  const direction = i > index ? 1 : -1;

  const nextIndex = (i + images.length) % images.length;
  const current = activeA ? layerA : layerB;
  const next = activeA ? layerB : layerA;
  const nextImg = activeA ? imgB : imgA;

  nextImg.src = images[nextIndex];
  setLayer(next, 100 * direction, false);
  setLayer(current, 0, false);
  next.offsetWidth;

  setLayer(next, 0, true);
  setLayer(current, -100 * direction, true);

  next.addEventListener("transitionend", () => {
    setLayer(current, 100, false);
    activeA = !activeA;
    index = nextIndex;
    animating = false;
    updateUI();
  }, { once: true });
}

function nextPic() {
  if (animating) return;
  goTo((index + 1) % images.length);
}
function prevPic() {
  if (animating) return;
  goTo((index - 1 + images.length) % images.length);
}

document.getElementById("nextBtn").onclick = nextPic;
document.getElementById("prevBtn").onclick = prevPic;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextPic();
  if (e.key === "ArrowLeft") prevPic();
});

buildNav();
imgA.src = images[0];
setLayer(layerA, 0, false);
setLayer(layerB, 100, false);
updateUI();