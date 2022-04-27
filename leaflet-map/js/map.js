// constants 
RED = "#E74C3C";
ORANGE = "#E67E22";
YELLOW = "#F1C40F";
UNSPEC = "#3388ff"


// styles for map layers 
var countyStyle = {
  "color": "#808080",
  "weight": 0.5
};

var darkStyle = {
  "color": RED,
  "weight": 3,
  "opacity": 1
};

var midStyle = {
  "color": ORANGE,
  "weight": 3,
  "opacity": 0.8
};

var lightStyle = {
  "color": YELLOW,
  "weight": 3,
  "opacity": 0.6
};


// initialize the map
var map = L.map('map').setView([34.8, -92.3], 7);
map.options.minZoom = 7;
map.options.maxZoom = 13; 


// import GeoJSONs
L.geoJson(countyData, {style: countyStyle}).addTo(map);

$.getJSON("./geojson/NOAA_ARKANSAS_tornado.geojson", function(data){
  // add GeoJSON layer to the map once the file is loaded
  var tornadolayer = L.geoJson(data, {
    style: function(feature) {

      // format color
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

    // add popups 
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

  })

  // format slider
    sliderControl = L.control.sliderControl({
        position: "bottomright",
        layer: tornadolayer, 
        timeAttribute: "date",
        range: true,
        showAllOnStart: true,
        start_date: "01/13/1950",
        end_date: "12/10/2021"
    });

    map.addControl(sliderControl);
    sliderControl.startSlider(); 
});

// add legend 
var legend = L.control({position: "bottomleft"});
legend.onAdd = function (map) {

  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<strong>Severity</strong></br>"
  div.innerHTML += "<span style='height: 10px; width: 10px; background-color:" + YELLOW + "; border-radius: 50%; display: inline-block;'></span><span>  EF0-EF1 </span><br>"
  div.innerHTML += "<span style='height: 10px; width: 10px; background-color:" + ORANGE + "; border-radius: 50%; display: inline-block;'></span><span>  EF2-EF3</span><br>"
  div.innerHTML += "<span style='height: 10px; width: 10px; background-color:" + RED + "; border-radius: 50%; display: inline-block;'></span><span>  EF4-EF5</span><br>"
  div.innerHTML += "<span style='height: 10px; width: 10px; background-color:" + UNSPEC + "; border-radius: 50%; display: inline-block;'></span><span>  Unknown severity</span><br>"

  div.style = "background-color: white; padding: 5px; border: 1px solid black; border-radius: 5px"
  return div;

};

legend.addTo(map);


// add legend 
var header = L.control({position: "topleft"});
header.onAdd = function (map) {

  var div = L.DomUtil.create("div", "top-left-header");

  var head = L.DomUtil.create("div", "top-left-title");
  head.innerHTML = "Arkansas tornadoes (1950-2021)";
  var subhead = L.DomUtil.create("div", "top-left-subtitle");
  subhead.innerHTML = "Arkansas saw more than 2,300 recorded tornadoes between 1950 and 2021, according to the National Oceanic and Atmospheric Administration. Click on a tornado path to get more information about that tornado.";

  div.appendChild(head);
  div.appendChild(subhead);
  return div;

};

header.addTo(map);

