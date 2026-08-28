/* Shared site footer.
 *
 * Renders the footer into every page so the markup is defined once instead of
 * being copy-pasted. The footer shows the brand/address, quick links and
 * contact info, plus a legal line with the current year.
 *
 * Pages that need different content can set window.footerConfig before this
 * script:
 *   window.footerConfig = {
 *     brand:   { name, href, tagline, address },
 *     links:   [ { href, label }, ... ],
 *     contact: [ { label, href }, ... ],
 *     legal:   "..."   // defaults to brand.name
 *   };
 */
(function () {
  "use strict";

  var DEFAULT_BRAND = {
    name: "Atelier Dufour",
    href: "/",
    tagline: "Integrales Gestalten · Ausdrucksmalen · Workshops",
    address: "Manuela Maurer · General-Dufour-Strasse 138, 2502 Biel/Bienne"
  };

  var DEFAULT_LINKS = [
    { href: "/", label: "Home" },
    { href: "/ton", label: "Tonerde" },
    { href: "/malen", label: "Ausdrucksmalen" },
    { href: "/fenster", label: "Schaufenster" },
    { href: "/ferienhaus", label: "Ferienhaus" },
    { href: "/workshops", label: "Workshops" },
    { href: "/ueber-mich", label: "Über mich" },
    { href: "/kontakt", label: "Kontakt" }
  ];

  var DEFAULT_CONTACT = [
    { label: "+41 77 453 10 82", href: "tel:+41774531082" },
    { label: "manuela@atelierdufour.ch", href: "mailto:manuela@atelierdufour.ch" }
  ];

  var config = (typeof window.footerConfig === "object" && window.footerConfig) || {};
  var brand = config.brand || DEFAULT_BRAND;
  var links = Array.isArray(config.links) ? config.links : DEFAULT_LINKS;
  var contact = Array.isArray(config.contact) ? config.contact : DEFAULT_CONTACT;
  var legal = config.legal || brand.name;

  var footer = document.createElement("footer");
  footer.className = "site-footer";

  var inner = document.createElement("div");
  inner.className = "site-footer-inner";

  function heading(text) {
    var h = document.createElement("h2");
    h.className = "footer-heading";
    h.textContent = text;
    return h;
  }

  function linkList(items) {
    var ul = document.createElement("ul");
    items.forEach(function (item) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.label;
      li.appendChild(a);
      ul.appendChild(li);
    });
    return ul;
  }

  /* --- Brand / address ------------------------------------------------ */

  var brandCol = document.createElement("div");
  brandCol.className = "footer-col footer-brand";

  var brandLink = document.createElement("a");
  brandLink.className = "footer-brand-name";
  brandLink.href = brand.href;
  brandLink.textContent = brand.name;

  var tagline = document.createElement("p");
  tagline.className = "footer-tagline";
  tagline.textContent = brand.tagline;

  var address = document.createElement("p");
  address.className = "footer-address";
  address.textContent = brand.address;

  brandCol.appendChild(brandLink);
  brandCol.appendChild(tagline);
  brandCol.appendChild(address);

  /* --- Quick links ---------------------------------------------------- */

  var nav = document.createElement("nav");
  nav.className = "footer-col footer-nav";
  nav.setAttribute("aria-label", "Fusszeile");
  nav.appendChild(heading("Navigation"));
  nav.appendChild(linkList(links));

  /* --- Contact -------------------------------------------------------- */

  var contactCol = document.createElement("div");
  contactCol.className = "footer-col footer-contact";
  contactCol.appendChild(heading("Kontakt"));
  contactCol.appendChild(linkList(contact));

  inner.appendChild(brandCol);
  inner.appendChild(nav);
  inner.appendChild(contactCol);

  /* --- Legal line ----------------------------------------------------- */

  var legalP = document.createElement("p");
  legalP.className = "footer-legal";
  legalP.textContent = "© " + new Date().getFullYear() + " " + legal;

  footer.appendChild(inner);
  footer.appendChild(legalP);
  document.body.appendChild(footer);
})();
