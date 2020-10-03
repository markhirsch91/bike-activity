var newYorkCoords = [40.73, -74.0059];
var mapZoomLevel = 12;

// Create the createMap function
function createMap(bikes) {
  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {
    "Bike Stations": bikes
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: newYorkCoords,
    zoom: mapZoomLevel,
    layers: [lightmap, bikes]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
  }).addTo(map);
}

// Create the createMarkers function
function createMarkers(response) {

  // Pull the "stations" property off of response.data
  var stations = response.data.stations;

  // Initialize an array to hold bike markers
  var markers = [];

  // Loop through the stations array
  for (var i = 0; i < stations.length; i++) {
    var station = stations[i];
    var marker = L.marker([station.lat, station.lon])
      .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");
    markers.push(marker);
  }
  createMap(L.layerGroup(markers));
}

d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json", createMarkers);



  

  

  
    // For each station, create a marker and bind a popup with the station's name

    // Add the marker to the bikeMarkers array

  // Create a layer group made from the bike markers array, pass it into the createMap function


// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
