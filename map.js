
var map = L.map('map', {
    center: [60.359708, 22.021643], // Turku, Finland
    zoom: 9
});
var urban_response;
var justcords;

var defaultBase = L.tileLayer.provider('Esri.OceanBasemap').addTo(map);
var baseLayers = {
    'ESRI Ocean Basemap': defaultBase,
    'ESRI Imagery': L.tileLayer.provider('Esri.WorldImagery'),
};
//ESRI ArcGIS layers from Hawaii GIS Program; dynamic layer example
//Using a relative url to call layer instead of http
var WaterQualSites = L.esri.dynamicMapLayer({
    url: '//geodata.hawaii.gov/arcgis/rest/services/HumanHealthSafety/MapServer',
    layers: [2],
    useCors: false
});

}
//add popup to Water quality sites dynamic map layer
WaterQualSites.bindPopup(function(error, featureCollection) {
    if (error || featureCollection.features.length === 0) {
        return false;
    } else {
        return 'Name: ' + featureCollection.features[0].properties.name + '<br>' + 'ID: ' + featureCollection.features[0].properties.identifier;
    }
});

// jQuery(document).ready(function(){ 
// 	jQuery.getJSON('./layers/urban_point.geojson',function(urban){
//
// 		urban_response = urban;
//
// 		// Heatmap
// 		var coords;
// 		var intensity;
// 		justcords = urban.features.map(function(i){
// 			if ( i.properties.gridcode <= 0 ){
// 				return false;
// 			}
//
// 			coords = i.geometry.coordinates.slice(0).reverse();
// 			intensity = i.properties.gridcode / 12;
// 			coords.push(intensity + '');
//
// 			return coords;
// 		});
// 		justcords = justcords.filter(function(i){return i;});
// 		L.heatLayer(justcords, {max: 2500}).addTo(heatmap4516);
// 	});
// });

//ESRI ArcGIS layers from Hawaii GIS Program; polygon feature layer example
//Using a relative url to call layer instead of http
var AgBaseline = L.esri.featureLayer({
    url: '//geodata.hawaii.gov/arcgis/rest/services/LandUseLandCover/MapServer/4',
    style: function(feature) {
        return {
            fillOpacity: 0.5
        }
    }
});
//add popup to AgBaseline feature layer
AgBaseline.bindPopup(function(evt) {
    return L.Util.template('<p>{cropcatego}<br>{island}</p>', evt.feature.properties);
});
//ESRI ArcGIS layers from Hawaii GIS Program; line feature layer example; can override the styling
//Using a relative url to call layer
var Trails = L.esri.featureLayer({
    url: '//geodata.hawaii.gov/arcgis/rest/services/Terrestrial/MapServer/34',
    style: function(feature) {
        return {
            color: '#328000',
            weight: 2
        }
    }
});
//PacIOOS GeoServer Example; adding a single layer with properties
//Using a relative url to call layer instead of http
var EconSeaLevRise = L.tileLayer.wms('http://geo.pacioos.hawaii.edu/geoserver/wms?', {
    layers: 'PACIOOS:hi_tt_all_slrxa_econ_2030',
    format: 'image/png',
    opacity: 0.5,
    tiled: 'true'
});
//Another example using PacIOOS GeoServer examples; setting properties first then add layers
var options = {
    transparent: 'true',
    format: 'image/png',
    opacity: 0.5,
    tiled: 'true'
    //info_format: 'text/html'
};
//Using a relative url to call layer instead of http
var source = L.WMS.source('http://geo.pacioos.hawaii.edu/geoserver/wms?', options);
var CREDREASites = source.getLayer('PACIOOS:hi_cred_all_rea_sites');
var VegShoreline = source.getLayer('PACIOOS:hi_hcgg_all_shore_veg');
//Load OSM Buildings then disable it on first load; can only be viewed at certain scales
var osmb = new OSMBuildings(map).load();
map.removeLayer(osmb);
//Overlay grouped layers
var groupOverLays = {
    "Hawaii State GIS": {
        "Water Quality Monitoring Sites": WaterQualSites,
        "Na Ala Hele Trails": Trails,
        "Agricultural Baseline": AgBaseline
    },
    "PacIOOS Layers": {
        "Economic Loss from Sea Level Rise (0.5ft) ": EconSeaLevRise,
        "CRED REA Sites": CREDREASites,
        "Vegetation Shoreline": VegShoreline
    },
    "OSM Bldg Classic": {
        "2.5D Buildings": osmb
    }
};
//add layer switch control
L.control.groupedLayers(baseLayers, groupOverLays).addTo(map);
//add scale bar to map
L.control.scale({
    position: 'bottomleft'
}).addTo(map);
// Overview mini map
// var Esri_WorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
//     attribution: '&copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
// });
// var miniMap = new L.Control.MiniMap(Esri_WorldTopoMap, {
//     toggleDisplay: true,
//     minimized: false,
//     position: 'bottomleft'
// }).addTo(map);
//define Drawing toolbar options
// var options = {
//     position: 'topleft', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
//     drawMarker: true, // adds button to draw markers
//     drawPolyline: true, // adds button to draw a polyline
//     drawRectangle: true, // adds button to draw a rectangle
//     drawPolygon: true, // adds button to draw a polygon
//     drawCircle: true, // adds button to draw a cricle
//     cutPolygon: true, // adds button to cut a hole in a polygon
//     editMode: true, // adds button to toggle edit mode for all layers
//     removalMode: true, // adds a button to remove layers
// };
// add leaflet.pm controls to the map
// map.pm.addControls(options);
//Logo position: bottomright
//       var credctrl = L.controlCredits({
//           image: "",
//           link: "",
//           text: ""
//       }).addTo(map);
