import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import Header from "../components/Header";
import './Mapping.css'
import axios from "axios";

const HOST = process.env.REACT_APP_HOST

function Mapping() {

  const [position, setPosition] = useState([])
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("NOT")
    }
    function showPosition(position) {
      console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude)
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
      loadMap(position.coords.latitude, position.coords.longitude)
    }
  }, [])

  const loadMap = async (latitude, longitude) => {
    var data = {
      "latitude": latitude,
      "longitude": longitude
    };

    var config = {
      method: 'post',
      url: HOST + '/map/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    await axios(config)
      .then(function (response) {
        setPosition(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const listMarker = () => {
    let element = position.map((item, index) => {
      console.log(item.latitude)
      return <Marker position={[item.latitude, item.longitude]} key={index}>
        <Popup>
          <Store
            id={item.id}
            business_name={item.user.full_name}
            image={HOST + item.user.image} />
        </Popup>
      </Marker>
    })
    return element;
  }

  return (
    <div>
      <header>
        <Header></Header>
      </header>
      <main>
        <div className="body-container">
          {
            longitude ? (
              <MapContainer center={[latitude, longitude]} zoom={14} scrollWheelZoom={true}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {listMarker()}
                {/* <RoutingMachine /> */}
              </MapContainer>
            ) : (
              <></>
            )
          }
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
    <Link to={"/store/" + props.id} className="map-store-container">
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
