import { addressInput } from "./check-out-form-events.js";

const defaultLatLng = [30.0444, 31.2357];

const map = L.map("map").setView(defaultLatLng, 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

const marker = L.marker(defaultLatLng, { draggable: true }).addTo(map);

marker.on("dragend", () => {
  const pos = marker.getLatLng();
  addressInput.value = `${pos.lat.toFixed(5)}, ${pos.lng.toFixed(5)}`;
  fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.lat}&lon=${pos.lng}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data && data.display_name) {
        addressInput.value = data.display_name;
      }
    });
});

export function getAdress() {
  const query = addressInput.value;
  if (query.length < 3) return;

  fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query
    )}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        marker.setLatLng([lat, lon]);
        map.setView([lat, lon], 15);
      } else {
        alert("العنوان مش واضح، جرّب تكتبه بطريقة تانية");
      }
    });
}
