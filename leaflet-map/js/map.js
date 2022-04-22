// initialize the map
var map = L.map('map').setView([34.8, -92.3], 7);
map.options.minZoom = 7;
map.options.maxZoom = 13;


// styles for map layers 
var countyStyle = {
  "color": "#808080",
  "weight": 0.5
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


// import GeoJSONs
L.geoJson(countyData, {style: countyStyle}).addTo(map);

$.getJSON("./geojson/NOAA_ARKANSAS_tornado.geojson",function(data){
  // add GeoJSON layer to the map once the file is loaded
  L.geoJson(data, {
    style: function(feature) {
      switch (feature.properties.scale) {
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
      },

    onEachFeature: function(feature, layer) {
      // get popup text
      var popup_text = '';

      // add date
      if (feature.properties.date) {
        popup_text = popup_text + '<strong>Date: </strong>' + '<span>' + feature.properties.date + '</span>' + '<br>';
      }

      // add scale
      if (feature.properties.scale) {
        popup_text = popup_text + '<strong>Scale: </strong>' + '<span>' + feature.properties.scale + '</span>' + '<br>';
      }
      // add deaths   
      if (feature.properties.deaths) { 
        popup_text = popup_text + '<strong>Deaths: </strong>' + '<span>' + feature.properties.deaths + '</span>' + '<br>';
      }
      // add injuries  
      if (feature.properties.injuries) { 
        popup_text = popup_text + '<strong>Injuries: </strong>' + '<span>' + feature.properties.injuries + '</span>' + '<br>';
      }
      // add narrative  
      if (feature.properties.prop_damage) { 
        popup_text = popup_text + '<strong>Property damage: </strong>' + '<span>' + feature.properties.prop_damage + '</span>' + '<br>';
      }

      // add narrative  
      if (feature.properties.narrative) { 
        popup_text = popup_text + '<strong>Narrative: </strong>' + '<span>' + feature.properties.narrative + '</span>' + '<br>';
      }

      // add pop up text
      if (popup_text) {
        layer.bindPopup(popup_text);
      }
    }
  }).addTo(map);
});