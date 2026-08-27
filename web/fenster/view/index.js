const urlIdParams = new URLSearchParams(window.location.search);
const urlId = urlIdParams.get('id');

const card = document.getElementById("card");
const errorMessage = document.getElementById("error-message");

function showError() {
    card.style.display = "none";
    errorMessage.style.display = "block";
    document.getElementById("top-back-button").style.display = "none";
}

function isValidId(id) {
    // must be a 3-digit number like "001"
    return /^\d{3}$/.test(id);
}

if (!isValidId(urlId)) {
    showError();
} else {
    fetch(`/fenster/data/object/${urlId}/properties.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Nicht gefunden (${response.status})`);
            }
            return response.json();
        })
        .then(objectPropertiesjson => {
            document.getElementById("img").src = `/images/fenster/${urlId}.webp`;
            document.getElementById("card-title").innerHTML = objectPropertiesjson.title;
            document.getElementById("card-date").innerHTML = `${objectPropertiesjson.date.from} – ${objectPropertiesjson.date.to}`;
            document.getElementById("card-description").innerHTML = objectPropertiesjson.description;
        })
        .catch(() => showError());
}
