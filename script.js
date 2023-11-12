const map = L.map('map');
const userIcon = L.icon({
    iconUrl: "icons8-dot-30.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

const defaultLocation = [28.6139, 77.2090];

function setMapView(position) {
    const userLocation = [position.coords.latitude, position.coords.longitude];
    map.setView(userLocation, 12);
    L.marker(userLocation, {
        icon: userIcon
    }).addTo(map).bindPopup("Your location").openPopup();
}

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setMapView, () => {
        map.setView(defaultLocation, 12);
    });
} else {
    map.setView(defaultLocation, 12);
}

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

const control = L.Routing.control({
    waypoints: [
        L.latLng(defaultLocation[0], defaultLocation[1]),
        L.latLng(28.7041, 77.1025)
    ],
    routeWhileDragging: true,
    geocoder: L.Control.Geocoder.nominatim()
}).addTo(map);


// Event listener for hide/show button
const directionBox = document.getElementById("direction-box");
const toggleBtn = document.querySelector('.toggle-btn');

// toggleBtn.addEventListener('click', function() {
//     if (directionBox.style.display === "none" || directionBox.style.display === "") {
//         directionBox.style.display = "block";
//     } else {
//         directionBox.style.display = "none";
//     }
// });



// Display routing instructions
control.on('routeselected', function(e) {
    document.getElementById('directions').innerHTML = e.route.instructions;
});