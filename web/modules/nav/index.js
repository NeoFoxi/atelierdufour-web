/* Shared navigation bar.
 *
 * Renders the site navigation into every page so the markup is defined once
 * instead of being copy-pasted. The current page is highlighted automatically
 * via aria-current, so no per-page markup is needed.
 *
 * Responsive UI: below 860px a hamburger button toggles a full-screen menu
 * overlay; at 860px and above the classic horizontal bar is shown. Which UI
 * applies is decided purely by the CSS breakpoint in src/nav/index.css.
 *
 * Pages that need a different menu can set window.navConfig before this script:
 *   window.navConfig = {
 *     items: [ { href, label, children? }, ... ],
 *     activeHref: "/custom"          // optional explicit active link override
 *   };
 */
(function () {
  "use strict";

  var MOBILE_MAX = 860;

  var DEFAULT_ITEMS = [
    { href: "/", label: "Home" },
    {
      href: "/ig",
      label: "Integrale Gestaltungsarbeit",
      children: [
        { href: "/schatten", label: "Schatten" },
        { href: "/ton", label: "Tonerde" },
        { href: "/malen", label: "Ausdrucksmalen" },
      ]
    },
    { href: "/fenster", label: "Schaufenster" },
    {
      href: "/workshops",
      label: "Workshops",
      children: [
        { href: "/workshop/schoggi-giessen", label: "Schoggi giessen" },
        { href: "/workshop/pappmache", label: "Pappmaché" },
        { href: "/workshop/siebdruck", label: "Siebdruck" },
        { href: "/workshop/offenes-atelier", label: "Offenes Atelier" }
      ]
    },
    {
      href: "/kontakt",
      label: "Kontakt",
      children: [
        { href: "/ueber-mich", label: "Über mich" }
      ]
    }
  ];

  var config = (typeof window.navConfig === "object" && window.navConfig) || {};
  var items = Array.isArray(config.items) ? config.items : DEFAULT_ITEMS;
  var activeOverride = config.activeHref || null;

  function normalizePath(p) {
    p = String(p).split(/[?#]/)[0];
    p = p.replace(/\/+$/, "");
    if (p.endsWith("/index.html")) {
      p = p.slice(0, -"/index.html".length) || "/";
    }
    return p || "/";
  }

  var current = normalizePath(window.location.pathname);

  function isActive(item) {
    var target = normalizePath(item.href);
    if (activeOverride) return target === normalizePath(activeOverride);
    if (current === "/") return target === "/";
    if (current.indexOf("/fenster/") === 0) return target === "/fenster";
    if (current.indexOf("/workshop/") === 0) return target === current;
    return target === current;
  }

  function linkHtml(item) {
    var active = isActive(item) ? ' aria-current="page"' : "";
    return '<a href="' + item.href + '"' + active + ">" + item.label + "</a>";
  }

  function itemHtml(item) {
    var hasChildren = item.children && item.children.length;
    var liClass = hasChildren ? ' class="dropdown"' : "";
    var html = "<li" + liClass + ">" + linkHtml(item);
    if (hasChildren) {
      html += '<div class="dropdown-content">';
      item.children.forEach(function (child) {
        html += linkHtml(child);
      });
      html += "</div>";
    }
    return html + "</li>";
  }

  var nav = document.createElement("nav");
  nav.className = "nav";

  var toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "nav-toggle";
  toggle.setAttribute("aria-label", "Menü öffnen");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", "navMenu");
  toggle.innerHTML =
    '<span class="nav-brand">Atelierdufour</span>' +
    '<span class="nav-burger" aria-hidden="true"><span></span><span></span><span></span></span>';

  var ul = document.createElement("ul");
  ul.id = "navMenu";
  items.forEach(function (item) {
    ul.insertAdjacentHTML("beforeend", itemHtml(item));
  });

  nav.appendChild(toggle);
  nav.appendChild(ul);
  document.body.insertBefore(nav, document.body.firstChild);

  function isDesktop() {
    return window.matchMedia("(min-width: " + MOBILE_MAX + "px)").matches;
  }

  function setOpen(open) {
    nav.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Menü schliessen" : "Menü öffnen");
    document.body.classList.toggle("nav-locked", open);
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("nav-open"));
  });

  nav.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest("a")) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      setOpen(false);
    }
  });

  window.addEventListener("resize", function () {
    if (isDesktop()) {
      setOpen(false);
    }
  });
})();
