/* Shared navigation bar.
 *
 * Renders the site navigation into every page so the markup is defined once
 * instead of being copy-pasted. The current page is highlighted automatically
 * via aria-current, so no per-page markup is needed.
 *
 * Pages that need a different menu can set window.navConfig before this script:
 *   window.navConfig = {
 *     items: [ { href, label, children? }, ... ],
 *     activeHref: "/custom"          // optional explicit active link override
 *   };
 */
(function () {
  "use strict";

  var DEFAULT_ITEMS = [
    { href: "/", label: "Home" },
    { href: "/tonerde", label: "Tonerde" },
    { href: "/ausdrucksmalen", label: "Ausdrucksmalen" },
    { href: "/schaufenster", label: "Schaufenster" },
    { href: "/ferienhaus", label: "Ferienhaus" },
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
    { href: "/ueber-mich", label: "Über mich" },
    { href: "/kontakt", label: "Kontakt" }
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
    // Nested section pages: keep the section link highlighted.
    if (current.indexOf("/schaufenster/") === 0) return target === "/schaufenster";
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
  nav.className = "nav-modern";
  var ul = document.createElement("ul");
  items.forEach(function (item) {
    ul.insertAdjacentHTML("beforeend", itemHtml(item));
  });
  nav.appendChild(ul);
  document.body.insertBefore(nav, document.body.firstChild);
})();
