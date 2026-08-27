/* Ferienhaus image slider with thumbnail strip.
 *
 * Similar dual-layer approach to the homepage slider, but without auto-play.
 * Thumbnails are generated dynamically from the image list and highlight the
 * currently visible image.
 */

const imgs = [
  "/images/ferienhaus/1.webp",
  "/images/ferienhaus/2.webp",
  "/images/ferienhaus/3.webp",
  "/images/ferienhaus/4.webp",
  "/images/ferienhaus/5.webp",
  "/images/ferienhaus/6.webp",
  "/images/ferienhaus/7.webp",
  "/images/ferienhaus/8.webp",
  "/images/ferienhaus/9.webp",
  "/images/ferienhaus/10.webp",
  "/images/ferienhaus/11.webp",
  "/images/ferienhaus/12.webp",
  "/images/ferienhaus/13.webp",
  "/images/ferienhaus/14.webp",
  "/images/ferienhaus/15.webp",
  "/images/ferienhaus/16.webp"
];

/* Preload all images for instant transitions. */
function preloadImages() {
  imgs.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

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

/* Highlight active dot and thumbnail. */
function updateUI() {
  [...dotsEl.children].forEach((d, i) => {
    d.setAttribute("aria-current", i === index);
  });
  [...thumbsEl.children].forEach((t, i) => {
    if (i === index) t.classList.add("active");
    else t.classList.remove("active");
  });
}

/* Create dot buttons and thumbnail images from the image list. */
function buildNav() {
  dotsEl.innerHTML = "";
  thumbsEl.innerHTML = "";

  imgs.forEach((src, i) => {
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

/* Transition to image at index i. */
function goTo(i) {
  if (animating || i === index) return;
  animating = true;
  const direction = i > index ? 1 : -1;

  const nextIndex = (i + imgs.length) % imgs.length;
  const current = activeA ? layerA : layerB;
  const next = activeA ? layerB : layerA;
  const nextImg = activeA ? imgB : imgA;

  nextImg.src = imgs[nextIndex];
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
  goTo((index + 1) % imgs.length);
}
function prevPic() {
  if (animating) return;
  goTo((index - 1 + imgs.length) % imgs.length);
}

document.getElementById("nextBtn").onclick = nextPic;
document.getElementById("prevBtn").onclick = prevPic;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextPic();
  if (e.key === "ArrowLeft") prevPic();
});

buildNav();
preloadImages();
imgA.src = imgs[0];
setLayer(layerA, 0, false);
setLayer(layerB, 100, false);
updateUI();