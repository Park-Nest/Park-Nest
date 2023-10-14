import React from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { useMemo } from "react";


export default function GoogleMapApi({ latLng }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API
    });

    if (!isLoaded){return <div>Loading...</div>}
    console.log('latlng inside google wrapper', latLng.length)
    let array = [...latLng]
    const coordinates = array.map((location, index) => {
        console.log('inside map, location')
        return <Marker position={{lat: location.lat, lng: location.lng}} key={index}/>
    })
    console.log('coordinates', coordinates)
    return <Map coordinates={coordinates}/>;
}

function Map({ coordinates }) {
    const center = useMemo(() => ({lat: 34.0549 , lng: -118.243683}), []);
    return <GoogleMap zoom={9} center={center} mapContainerClassName="map-container">
        {coordinates}
    </GoogleMap>
}