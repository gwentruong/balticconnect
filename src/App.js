import React, { useState, useRef, useEffect, Fragment } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Container, Row, Col, Tab, Nav, Button } from "react-bootstrap";
import "mapbox-gl/dist/mapbox-gl.css";
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './App.css'


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

  return (
    <Fragment>
      <Container fluid id="map-container" className="mapContainer" style={{padding: 0}}
        ref={mapContainer}>
           <Button variant="light"
                  style={{margin: "10px 0 0 10px", cursor: "pointer", right: "auto", left: 0}}
                  onClick={toggleSidebar}>
              <i className="fas fa-bars"/>
          </Button>
          <Row className="overlay" style={{margin: 0, width: "100%"}} >
            <Col className={"overlay-col sidebar " + (showSidebar ? "" : "hide ")} sm lg="4" xl="3">
              <div className="overlay-content">
                <Tab.Container defaultActiveKey="visControl">
                  <Nav variant="tabs">
                    <Nav.Item>
                      <Nav.Link eventKey="visControl">
                        <i className="fas fa-list" />
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="upload">
                        <i className="fas fa-pen-alt" />
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content>
                    <Tab.Pane eventKey="visControl">
                      Check this out!
                    </Tab.Pane>
                    <Tab.Pane eventKey="upload">
                      Upload here!
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        padding: "10px",
                        cursor: "pointer"
                    }}
                    onClick={() => {
                        setShowSidebar(false)
                    }}>
                    <i className="fas fa-times"/>
                </div>
              </div>
            </Col>
          </Row>
      </Container>
    </Fragment>
  )
}

export default App;
