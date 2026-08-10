const urlIdParams = new URLSearchParams(window.location.search);
const urlId = urlIdParams.get('id');

document.getElementById("img").src = `/schaufenster/data/object/${urlId}/img.jpg`;

    fetch(`/schaufenster/data/object/${urlId}/properties.json`)
.then(response => response.json())
.then(objectPropertiesjson => {
    document.getElementById("card-title").innerHTML = objectPropertiesjson.title;
    document.getElementById("card-date").innerHTML = `${objectPropertiesjson.date.from} – ${objectPropertiesjson.date.to}`;
    document.getElementById("card-description").innerHTML = objectPropertiesjson.description;
})