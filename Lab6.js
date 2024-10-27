function createMap() {
    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    for (i = 1; i <=3; i++){
        latitude = getRandomInRange(30, 35, 3);
        longitude = getRandomInRange(-90, -100, 3);

        var marker = L.marker([latitude, longitude]).addTo(map);
        marker.bindPopup(`Marker ${i}: (${latitude}, ${longitude})`).openPopup();
        
        fetchLocality(latitude, longitude, i);
    }
    
}

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

function fetchLocality(latitude, longitude, markerNum) {
    
    const apiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const locality = data.locality || "Locality not found";
            document.getElementById(`marker${markerNum}`).innerHTML = `<strong>Marker ${markerNum}: Latitude: ${latitude}, Longitude: ${longitude}</strong>
            <br> Locality: ${locality}`;
            })        
}
window.onload = createMap;