import React from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { useMemo } from "react";


export default function GoogleMapApi({ myLat, myLng }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 
    });

    if (!isLoaded) return <div>Loading...</div>
    return <Map myLat={myLat} myLng={myLng}/>;
}

function Map({ myLat, myLng }) {
    const center = useMemo(() => ({lat: 34.0549 , lng: -118.243683}), []);
    return <GoogleMap zoom={9} center={center} mapContainerClassName="map-container">
        <Marker position={{lat: myLat, lng: myLng}}/>
    </GoogleMap>
}