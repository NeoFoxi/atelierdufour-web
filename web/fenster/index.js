/* Schaufenster (Window Display) gallery.
 *
 * Fetches the master properties.json to determine how many objects exist,
 * then loads each object's data and clones a <template> to build each card.
 * Cards link to the detail view at /fenster/view/?id=NNN.
 */

const template = document.getElementById("card-template");
const list = document.getElementById("object");

fetch(`/fenster/data/properties.json`)
  .then(response => response.json())
  .then(async Propertiesjson => {

    for (let i = Propertiesjson.last_post; i >= 1; i--) {
      let number = i.toString().padStart(3, '0');

      const response = await fetch(`/fenster/data/object/${number}/properties.json`);
      const data = await response.json();

      const card = template.content.cloneNode(true);

      card.querySelector(".fenster-card-img").src = `/images/fenster/${number}.webp`;
      card.querySelector(".fenster-card-title").textContent = data.title;
      card.querySelector(".fenster-card-date").textContent = `${data.date.from} – ${data.date.to}`;

      const link = card.querySelector(".fenster-card-link");
      link.href = `https://${data.website}`;
      link.textContent = data.website;

      card.querySelector(".fenster-card-desc").textContent = data.description;

      const btn = card.querySelector(".fenster-card-btn");
      btn.addEventListener("click", () => {
        window.location.href = `/fenster/view/?id=${number}`;
      });

      list.appendChild(card);
    }
  })
