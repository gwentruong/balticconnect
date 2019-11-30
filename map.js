var map;
// var layerControl;

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

function main() {
    var oceanMap = L.tileLayer.provider('CartoDB.Positron');
    var imageryMap = L.tileLayer.provider('Esri.WorldImagery');

    // Load basemap with 2 styles
    var map = L.map('map', {
        center: [60.359708, 22.021643],
        zoom: 8,
        minZoom: 6,
        maxZoom: 12,
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
    $.getJSON("./layers/Activities_Database_TurkuExample.geojson",function(data){
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

      var toggle = L.easyButton({
          states: [{
            stateName: 'add-markers',
            icon: '&check;',
            title: 'Show activities',
            onClick: function(control) {
              map.addLayer(activityTurku);
              control.state('remove-markers');
            }
          }, {
            icon: '&cross;',
            stateName: 'remove-markers',
            onClick: function(control) {
              map.removeLayer(activityTurku);
              control.state('add-markers');
            },
            title: 'Hide activities'
          }]
      });
      toggle.addTo(map);
    });

    // Combine overlay layers
    var groupOverLays = {
        "Land development": {
            "Agriculture": agriculture,
            "Vegetation index (NDVI)": ndvi
        },
        "Water quality": {
            "Ocean depth (Bathymetric)": bathymetric
        }
    };

    // Group basemap and overlay layers
    L.control.groupedLayers(baseLayers, groupOverLays).addTo(map);

    // Add map scale
    L.control.scale({
        position: 'bottomleft'
    }).addTo(map);
}

main();
