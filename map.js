var map;
var layerControl;

function main() {
    var oceanMap = L.tileLayer.provider('Esri.OceanBasemap');
    var imageryMap = L.tileLayer.provider('Esri.WorldImagery');

    var map = L.map('map', {
        center: [60.359708, 22.021643],
        zoom: 8,
        minZoom: 6,
        maxZoom: 9,
        layers: [oceanMap]
    });

    var options = {
        maxZoom: 16,
        tolerance: 3,
        debug: 0,
        style: {
            fillColor: '#1EB300',
            color: '#F2FF00',
            opacity: 0.5,
            weight: 2,
            fillOpacity:0.5
        }
    };
    var baseLayers = {
        'ERSI Ocean Map': oceanMap,
        'ERSI Imagery': imageryMap
    };

    var option_wms = {
        transparent: true,
        format: 'image/png',
        opacity: 0.5
    };
    var source = L.WMS.source('https://services.sentinel-hub.com/ogc/wms/c28647c2-61b0-4e76-909e-bc6e30c634a1?', option_wms);
    var agriculture = source.getLayer('AGRICULTURE');
    var ndvi = source.getLayer('NDVI');
    var bathymetric = source.getLayer('BATHYMETRIC');

    var groupOverLays = {
        "Land development": {
            "Agriculture": agriculture,
            "Vegetation index (NDVI)": ndvi
        },
        "Water quality": {
            "Ocean depth (Bathymetric)": bathymetric
        }
    };

    L.control.groupedLayers(baseLayers, groupOverLays).addTo(map);

    L.control.scale({
        position: 'bottomleft'
    }).addTo(map);
}

main();
