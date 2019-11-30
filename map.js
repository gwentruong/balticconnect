var map;
var PLayer;
var NLayer;

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.Name) {
        var contentString = '<div id="content">'+
            '<h2 id="firstHeading" class="firstHeading">' +feature.properties.Name+'</h2>'+
            '<div id="bodyContent">'+
            '<p><b>Year</b>: '+feature.properties.Year+'</p>'+
            '<p><b>Contact</b>: '+feature.properties.Contact+'</p>'+
            '<p>'+feature.properties.Details+'</p>'+
            '</div></div>';
        layer.bindPopup(contentString);
    }
}

function handleFeature(feature, layer) {
    layer.bindPopup('<strong>'+ feature.properties.name +
                    '</strong><br/>'+ feature.properties.country
                    +'<br/>' + feature.properties.helcomId)
}

function main() {
    var oceanMap = L.tileLayer.provider('CartoDB.Positron');
    var imageryMap = L.tileLayer.provider('Esri.WorldImagery');

    // Load basemap with 2 styles
    var map = L.map('map', {
        center: [60.295895, 21.903840],
        zoom: 9,
        minZoom: 9,
        maxZoom: 11,
        layers: [oceanMap]
    });

    var baseLayers = {
        'CartoDB Positron': oceanMap,
        'ERSI Imagery': imageryMap
    };

    // Load WMS layers of Sattelite images hosted from Sentinel Hub
    var option_wms = {
        transparent: true,
        format: 'image/png',
        opacity: 0.5
    };
    var source = L.WMS.source('https://services.sentinel-hub.com/ogc/wms/c28647c2-61b0-4e76-909e-bc6e30c634a1?', option_wms);
    var agriculture = source.getLayer('AGRICULTURE');
    var ndvi = source.getLayer('NDVI');
    var bathymetric = source.getLayer('BATHYMETRIC');

    // Load geojson of activities points
    $.getJSON("./layers/Activities_Database_TurkuExample.geojson", function(data){
        var markerIcon = L.icon({
        iconUrl: './img/marker.svg',
        iconSize: [50,40]
      });
      var activityTurku = L.geoJson(data, {
        pointToLayer: function(feature,latlng){
    	  return L.marker(latlng,{icon: markerIcon});
        },
        onEachFeature: onEachFeature
      });

      // Toogle button to enable/disable activities
      var toggle = L.easyButton({
          states: [{
              stateName: 'add-markers',
              icon: '&check;',
              title: 'Show activities',
              onClick: function(control) {
                  map.setView([60.448861, 22.265566], 11);
                  map.addLayer(activityTurku);
                  control.state('remove-markers');
              }
          }, {
              icon: '&cross;',
              stateName: 'remove-markers',
              onClick: function(control) {
                  map.removeLayer(activityTurku);
                  map.setView([60.359708, 22.021643], 9);
                  control.state('add-markers');
              },
              title: 'Hide activities'
          }]
      });
      toggle.addTo(map);
    });

    // Add nutrient vector layers
    map.createPane("Total phosphorus");
    map.createPane("Total nitrogen");

    $.getJSON('./layers/nutrient_2018.geojson', function(vectorData) {
        PLayer = L.geoJson(vectorData, {
            style: function(feature) {
                var fillColor;
                var status = feature.properties.phosphorus;
                if (status == 'Fail') fillColor = "#e6ac25";
                else if (status == 'Achieve') fillColor = "#32bf3e";
                else fillColor = "#FFFFFFFF";
                return { color: "#FFFFFFFF", weight: 0, fillColor: fillColor, fillOpacity: .4 };
            },
            onEachFeature: handleFeature,
            pane : "Total phosphorus"
        });

        var Pbutton = L.easyButton({
            states: [{
                stateName: 'add-markers',
                icon: '&Rho;',
                title: 'Show total phosphorus',
                onClick: function(control) {
                    map.addLayer(PLayer);
                    control.state('remove-markers');
                }
            }, {
                icon: '&cross;',
                stateName: 'remove-markers',
                onClick: function(control) {
                    map.removeLayer(PLayer);
                    control.state('add-markers');
                },
                title: 'Hide total phosphorus'
            }]
        });
        Pbutton.addTo(map);

        NLayer = L.geoJson(vectorData, {
            style: function(feature) {
                var fillColor;
                var status = feature.properties.nitrogen;
                if (status == 'Fail') fillColor = "#e6ac25";
                else if (status == 'Achieve') fillColor = "#32bf3e";
                else fillColor = "#FFFFFFFF";
                return { color: "#FFFFFFFF", weight: 0, fillColor: fillColor, fillOpacity: .4 };
            },
            onEachFeature: handleFeature,
            pane : "Total nitrogen"
        });

        var Nbutton = L.easyButton({
            states: [{
                stateName: 'add-markers',
                icon: '&Nu;',
                title: 'Show total nitrogen',
                onClick: function(control) {
                    map.addLayer(NLayer);
                    control.state('remove-markers');
                }
            }, {
                icon: '&cross;',
                stateName: 'remove-markers',
                onClick: function(control) {
                    map.removeLayer(NLayer);
                    control.state('add-markers');
                },
                title: 'Hide total nitrogen'
            }]
        });
        Nbutton.addTo(map);
    });

    // Combine overlay layers
    var groupOverLays = {
        "Land development": {
            "Agriculture": agriculture,
            "Vegetation index (NDVI)": ndvi,
        },
        "Water quality": {
            "Ocean depth (Bathymetric)": bathymetric
        }
    };


    // Group basemap and overlay layers
    var layerControl = L.control.groupedLayers(baseLayers, groupOverLays);
    map.addControl(layerControl);

    // Add map scale
    L.control.scale({
        position: 'bottomleft'
    }).addTo(map);

    var credctrl = L.controlCredits({
        image: "./img/logo.png",
        link: "http://balticsatapps.eu/weseachallenge/",
        text: "Baltic Connect, participant of <u>WeSeachallenge</u>"
    }).addTo(map);
}

main();
