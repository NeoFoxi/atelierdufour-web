const images = [
      "/images/atelierdufour/2.webp",
      "/images/atelierdufour/3.webp",
      "/images/atelierdufour/4.webp",
      "/images/atelierdufour/5.webp",
      "/images/atelierdufour/6.webp"
    ];

    function preloadImages() {
      images.forEach(src => {
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
    const counter = document.getElementById("counter");
    const autoToggle = document.getElementById("autoToggle");
    const slideText = document.getElementById("slideText");

    const slideTexts = [
      "\"Der Schatten macht uns ganz. Er ist der Boden, aus dem Licht aus dem erst entstehen kann.\"",
      "\"Ich werde dir die Hand reichen, nicht um dich aus dem Schatten zu ziehen sondern um dort mit dir zu stehen, bis die Dunkelheit ihre eigenen Farben zeigt.\"",
      "\"Ich bin nicht hier um die Schatten auszulöschen, sondern um zu lernen wie ich mich nicht wieder in ihnen verliere.\"",
      "\"Heilung bedeutet die Risse zu ehren, das Prisma zu nehmen und das Licht des Lebens in all seinen farben zu brechen.\"",
      "\"Fertraue dem Prozess, auch wenn du nicht siehst wohin er dich führt. Die Schatten sind nur ein Teil des Weges.\""
    ];

    function updateSlideText() {
      slideText.textContent = slideTexts[index] || "";
      slideText.style.opacity = slideTexts[index] ? "1" : "0";
      fitSlideText();
    }

    function fitSlideText() {
      if (!slideText.textContent) return;
      const style = getComputedStyle(slideText);
      const min = parseFloat(style.getPropertyValue("--text-min")) || 11;
      const max = parseFloat(style.getPropertyValue("--text-max")) || 22;
      const maxH = slider.clientHeight * 0.42;

      slideText.style.fontSize = max + "px";
      if (slideText.scrollHeight <= maxH) return;

      let lo = min;
      let hi = max;
      for (let i = 0; i < 8; i++) {
        const mid = (lo + hi) / 2;
        slideText.style.fontSize = mid + "px";
        if (slideText.scrollHeight > maxH) hi = mid;
        else lo = mid;
      }
      slideText.style.fontSize = lo + "px";
    }

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
        updateSlideText();
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
    preloadImages();
    imgA.src = images[0];
    setLayer(layerA, 0, false);
    setLayer(layerB, 100, false);
    updateUI();
    updateSlideText();
    startAuto();

    if ("ResizeObserver" in window) {
      new ResizeObserver(fitSlideText).observe(slider);
    } else {
      let resizeTimer = null;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(fitSlideText, 100);
      });
    }