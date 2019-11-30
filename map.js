var map;
var layerControl;

function initMap() {
    var oceanMap = L.tileLayer.provider('Esri.OceanBasemap');
    var imageryMap = L.tileLayer.provider('Esri.WorldImagery');
    map = L.map('map', {
        center: [60.359708, 22.021643],
        zoom: 8,
        minZoom: 6,
        maxZoom: 9,
        layers: [oceanMap]
    });
    layerControl = L.control.layers({
        'ERSI Ocean Map': oceanMap,
        'ERSI Imagery': imageryMap
    }, {}).addTo(map);
    L.hash(map);
}

function drawCanvasLayer(url, name, options) {
    var name = name || "canvas";

    corslite(url, function (err, resp) {
        var json = JSON.parse(resp.response);
        var canvasLayer = L.tileLayer.canvas.geoJson(json, options).addTo(map);
        layerControl.addOverlay(canvasLayer, name);
    }, true);
}

function main() {
    initMap();
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
    // drawCanvasLayer('http://handygeospatial.github.io/geojsonvt-ksj-site/kanagawa_yoto.geojson', 'polygon', options)
    // drawCanvasLayer('./greenway.json', 'polyline', options)
    // drawCanvasLayer('./busstop.json', 'point', options)
}

main();
