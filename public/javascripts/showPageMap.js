const campground = require("../../models/campground");

mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    center: campground.geometrycoordinates,
    zoom: 7, // starting zoom
});

new mapboxgl.Marker().setLngLat(campground.geometrycoordinates).addTo(map);
