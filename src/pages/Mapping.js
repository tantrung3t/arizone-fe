import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import Header from "../components/Header";
import './Mapping.css'


function Mapping() {
  return (
    <div>
      <header>
        <Header></Header>
      </header>
      <main>
        <div className="body-container">
          <MapContainer center={[10.0362005, 105.788033]} zoom={16} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[10.036100, 105.788033]}>
              <Popup>
                <Store business_name="Cửa hàng sản phẩm ADC"
                  image="https://static.vecteezy.com/system/resources/thumbnails/004/702/341/small/hb-hexagon-letter-logo-isolated-on-white-background-vector.jpg" />
              </Popup>
            </Marker>
            <Marker position={[10.038000, 105.788033]}>
              <Popup>
                <Store business_name="Cửa hàng vật tư nông nghiệp Hoà Bình"
                  image="https://printgo.vn/uploads/file-logo/1/512x512.56d2835d0e091042311f8688d1ab3ce8.ai.1.png" />
              </Popup>
            </Marker>
            {/* <RoutingMachine /> */}
          </MapContainer>
        </div>
      </main>
    </div>
  );
}

const createRoutineMachineLayer = (props) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(10.036100, 105.788033),
      L.latLng(10.047000, 105.788033)
    ],
    lineOptions: {
      styles: [{ color: "#05445E", weight: 8 }]
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

function Store(props) {
  return (
    <Link to="#map" className="map-store-container">
      <img className=''
        src={props.image}
        alt="product 1"
      />
      <div className="map-title-store">
        <p>
          {props.business_name}
        </p>
      </div>
    </Link>
  )
}

export default Mapping;