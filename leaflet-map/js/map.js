// initialize the map
var map = L.map('map').setView([34.8, -92.3], 7);
map.options.minZoom = 7;
map.options.maxZoom = 13;


var countyStyle = {
  "color": "#696969",
  "weight": 0.5,
};

var darkStyle = {
  "color": "#E74C3C",
  "weight": 3,
  "opacity": 0.9
};

var midStyle = {
  "color": "#E67E22",
  "weight": 2,
  "opacity": 0.7
};

var lightStyle = {
  "color": "#F1C40F",
  "weight": 1,
  "opacity": 0.6
};

var undefStyle = {
  "color": "#F1C40F",
  "weight": 2,
  "opacity": 0.7
};

//import GeoJSONs
L.geoJson(countyData, {style: countyStyle}).addTo(map);

$.getJSON("./geojson/NOAA_ARKANSAS_tornado.geojson",function(data){
  // add GeoJSON layer to the map once the file is loaded
  L.geoJson(data, {
    style: function(feature) {
      switch (feature.properties.scale) {
          case '' : return undefStyle;
          case 'F0' : return lightStyle;
          case 'F1' :   return lightStyle;
          case 'F2' : return midStyle;
          case 'F3' :   return midStyle;
          case 'F4' : return darkStyle;
          case 'F5' :   return darkStyle;
          case 'EF0' : return lightStyle;
          case 'EF1' :   return lightStyle;
          case 'EF2' : return midStyle;
          case 'EF3' :   return midStyle;
          case 'EF4' : return darkStyle;
          case 'EF5' :   return darkStyle;
      }
    }
  }).addTo(map);
});