import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import './App.css'


const App = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  const intializeMap = ({ setMap, mapContainer }) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoidXllbnRydW9uZyIsImEiOiJjanVjcGN0b3IwaG5xNDNwZHJ3czRlNmJhIn0.u7o0VUuXY5f-rs4hcrwihA';

    // Initalize map with base style
    const initMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/uyentruong/ckfbjtpi45eqp19myy1pon6r3",
      center: [22.253043, 60.451436],
      zoom: 9
    });

    // Add navigation control
    const nav = new mapboxgl.NavigationControl();
    initMap.addControl(nav, 'top-right');

    // Full screen control
    initMap.addControl(new mapboxgl.FullscreenControl());

    // Scale control
    const scale = new mapboxgl.ScaleControl({
        maxWidth: 80,
        unit: 'metric'
      });
    initMap.addControl(scale, 'bottom-right');

    initMap.on("load", () => {
      setMap(initMap);
      initMap.resize();
    });
  }

  useEffect(() => {
    !map && intializeMap({setMap, mapContainer});
  }, [map])

  return (
    <div>
      <div ref={el => mapContainer.current = el} className="mapContainer" />
    </div>
  )
}

export default App;
