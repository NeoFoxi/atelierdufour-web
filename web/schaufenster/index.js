fetch(`/schaufenster/data/properties.json`)
  .then(response => response.json())
  .then(async Propertiesjson => {

    for (let i = Propertiesjson.last_post; i >= 1; i--) {
      let number = i.toString().padStart(3, '0');

        const response = await fetch(`/schaufenster/data/object/${number}/properties.json`);
        const objectPropertiesjson = await response.json();

        object.innerHTML += `
          <div style="
              display: flex;
              flex-direction: column;
              width: 280px;
              height: 520px;
              border: 1px solid #ccc;
              border-radius: 12px;
              padding: 20px;
              margin: 15px;
              box-shadow: 0 4px 10px rgba(0,0,0,0.15);
              font-family: sans-serif;
              background-color: white;
              box-sizing: border-box;
          ">
              
              <div style="width: 100%; height: 180px; overflow: hidden; border-radius: 8px; flex-shrink: 0; background-color: #f0f0f0;">
                  <img src="/schaufenster/data/object/${number}/img.jpg"
                      style="width: 100%; height: 100%; object-fit: cover;">
              </div>

              <h3 style="margin: 15px 0 5px 0; font-size: 1.4em; height: 1.4em; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
                  ${objectPropertiesjson.title}
              </h3>

              <div style="font-size: 0.9em; color: #777; margin-bottom: 5px; font-weight: 500;">
                  ${objectPropertiesjson.date.from} – ${objectPropertiesjson.date.to}
              </div>

              <a href="https://${objectPropertiesjson.website}"
                target="_blank" 
                rel="noopener noreferrer"
                style="
                  display: block;
                  font-size: 1em;
                  color: #555;
                  text-decoration: underline;
                  margin-bottom: 12px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                ">
                  ${objectPropertiesjson.website}
              </a>
              
              <p style="
                  font-size: 1em;
                  color: #555;
                  line-height: 1.4;
                  margin-bottom: 15px;
                  flex-grow: 1;
                  overflow: hidden;
                  display: -webkit-box;
                  -webkit-line-clamp: 4;
                  -webkit-box-orient: vertical;
              ">
                  ${objectPropertiesjson.description}
              </p>

              <button onclick="window.location.href='/schaufenster/view/?id=${number}'"
                      style="
                        width: 100%;
                        padding: 12px;
                        background-color: #555;
                        color: white;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 1.1em;
                        font-weight: bold;
                        margin-top: auto;
                        flex-shrink: 0;
                        transition: background 0.2s;
                      "
                      onmouseover="this.style.backgroundColor='#333'"
                      onmouseout="this.style.backgroundColor='#555'">
                  Anschauen
              </button>
          </div>
        `;
    }
  })