import React, { useState, useRef, useEffect, Fragment } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Container, Row, Col, Tab, Nav, Button, Alert} from 'react-bootstrap';
import "mapbox-gl/dist/mapbox-gl.css";
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './App.css'
import InputForm from './components/InputForm'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const rowOverLay = useRef(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const intializeMap = ({ setMap, mapContainer }) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoidXllbnRydW9uZyIsImEiOiJjanVjcGN0b3IwaG5xNDNwZHJ3czRlNmJhIn0.u7o0VUuXY5f-rs4hcrwihA';

    // Initalize map with base style
    const initMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/uyentruong/ckfbjtpi45eqp19myy1pon6r3",
      center: [22.253043, 60.451436],
      zoom: 9
    });
    // Scale control
    const scale = new mapboxgl.ScaleControl({
      maxWidth: 80,
      unit: 'metric'
    });
    initMap.addControl(scale, 'bottom-right');
   
    // Full screen control
    initMap.addControl(new mapboxgl.FullscreenControl(), 'bottom-right');

    // Add navigation control
    const nav = new mapboxgl.NavigationControl();
    initMap.addControl(nav, 'bottom-right');
  
    // Add geocoder
    initMap.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl
        }), 'top-right'
    );

    initMap.on("load", () => {
      setMap(initMap);
      initMap.resize();
    });
  }

  useEffect(() => {
    !map && intializeMap({setMap, mapContainer});
  }, [map])

  const toggleSidebar = (event) => {
    event.stopPropagation();
    setShowSidebar(true);
  }
        {/* <Container>
        <InputForm />
      </Container> */}  
  return (
    <Fragment>
      <Container fluid id="map-container" className="mapContainer" style={{padding: 0}}
        ref={mapContainer}>
        <Row>
          <Col className="side-bar" md={3}>
            {<InputForm />}
          </Col>
        </Row>
      </Container>
      <div className="map-logo">
        <img src="logo.png" />
      </div>
    </Fragment>
  )
}

export default App;
