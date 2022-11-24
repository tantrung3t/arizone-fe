import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import Header from "../components/Header";
import './Mapping.css'


export default function MapDirection(props) {
    console.log(props.data)

    return (
        <div>
            <header>
                <Header></Header>
            </header>
            <main>
                <div className="body-container map-container">
                    <MapContainer center={[10.0362005, 105.788033]} zoom={16} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {/* <Marker position={[10.036100, 105.788033]}>
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
                        </Marker> */}
                        <RoutingMachine />
                    </MapContainer>
                </div>
            </main>
        </div>
    );
}

const createRoutineMachineLayer = (props) => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const storeLongitude = urlParams.get('longitude')
    const storeLatitude = urlParams.get('latitude')

    const latitude = urlParams.get('mylat')
    const longitude = urlParams.get('mylong')

    const instance = L.Routing.control({
        waypoints: [
            L.latLng(latitude, longitude),
            L.latLng(storeLatitude, storeLongitude)
            // L.latLng(10.0309036, 105.7692527)
            
        ],
        lineOptions: {
            styles: [{ color: "red", weight: 6 }]
        },
        show: false,
        addWaypoints: true,
        routeWhileDragging: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false
    });

    return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

function Store(props) {
    return (
        <Link to="/store/1" className="map-store-container">
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

