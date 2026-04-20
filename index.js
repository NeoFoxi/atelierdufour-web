const images = [
      "http://atelierdufour.ch/assets/atelierdufour/img/2.png",
      "http://atelierdufour.ch/assets/atelierdufour/img/3.png",
      "http://atelierdufour.ch/assets/atelierdufour/img/4.png",
      "http://atelierdufour.ch/assets/atelierdufour/img/5.png",
      "http://atelierdufour.ch/assets/atelierdufour/img/6.png"
    ];

    const slider = document.getElementById("slider");
    const layerA = document.getElementById("layerA");
    const layerB = document.getElementById("layerB");
    const imgA = document.getElementById("imgA");
    const imgB = document.getElementById("imgB");
    const dotsEl = document.getElementById("dots");
    const counter = document.getElementById("counter");
    const autoToggle = document.getElementById("autoToggle");

    const intervalMs = 3000;
    let index = 0;
    let activeA = true;
    let timer = null;
    let animating = false;

    function updateUI() {
      counter.textContent = `${index + 1} / ${images.length}`;
      [...dotsEl.children].forEach((d, i) => {
        d.setAttribute("aria-current", i === index);
      });
    }

    function buildDots() {
      dotsEl.innerHTML = "";
      images.forEach((_, i) => {
        const d = document.createElement("button");
        d.className = "dot";
        d.onclick = () => goTo(i, true);
        dotsEl.appendChild(d);
      });
    }

    function setLayer(el, x, animate) {
      el.style.transition = animate ? "transform 420ms ease" : "none";
      el.style.transform = `translateX(${x}%)`;
    }

    function goTo(i, manual) {
      if (animating) return;

      const nextIndex = (i + images.length) % images.length;
      if (nextIndex === index) return;

      animating = true;
      const goingForward = i > index;

      const current = activeA ? layerA : layerB;
      const next = activeA ? layerB : layerA;
      const nextImg = activeA ? imgB : imgA;

      nextImg.src = images[nextIndex];

      const enterX = goingForward ? 100 : -100;
      const exitX = goingForward ? -100 : 100;

      setLayer(next, enterX, false);
      setLayer(current, 0, false);

      next.offsetWidth;

      setLayer(next, 0, true);
      setLayer(current, exitX, true);

      next.addEventListener("transitionend", () => {
        setLayer(current, 100, false);
        activeA = !activeA;
        index = nextIndex;
        animating = false;
        updateUI();
      }, { once: true });
    }

    function next(manual) { goTo(index + 1, manual); }
    function prev(manual) { goTo(index - 1, manual); }

    function startAuto() {
      stopAuto();
      if (!autoToggle.checked) return;
      timer = setInterval(() => next(false), intervalMs);
    }

    function stopAuto() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    autoToggle.addEventListener("change", () => {
      autoToggle.checked ? startAuto() : stopAuto();
    });

    document.getElementById("nextBtn").onclick = () => next(true);
    document.getElementById("prevBtn").onclick = () => prev(true);

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") next(true);
      if (e.key === "ArrowLeft") prev(true);
    });

    slider.addEventListener("mouseenter", stopAuto);
    slider.addEventListener("mouseleave", startAuto);

    buildDots();
    imgA.src = images[0];
    setLayer(layerA, 0, false);
    setLayer(layerB, 100, false);
    updateUI();
    startAuto();