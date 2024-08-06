const socket = io();

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;

    const map = L.map("map").setView([latitude, longitude], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const marker = L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup("You are here.")
      .openPopup();

    socket.on("receive-location", (data) => {
      const { id, latitude, longitude } = data;
      map.setView([latitude, longitude], 16);
      if (marker[id]) {
        marker[id].setLatLng([latitude, longitude]);
      } else {
        marker[id] = L.marker([latitude, longitude]).addTo(map);
      }
    });
  });
  socket.on("disconnecte") 
}
