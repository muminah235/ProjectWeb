import './Map.css'
import { MapContainer, TileLayer, Marker, Popup, useMapEvent, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, {useState } from 'react';
import L from 'leaflet';


/*const icon = divIcon({className:'marker-icon', iconSize: [32,32]});

function Map(){

    return(
        <MapContainer className="map-viwe" center={[7.0091783, 100.4951276]} zoom={20} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[7.0091783, 100.4951276]} >
                <Popup>
                    You are here
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default Map;*/


function LocationMap() {

    const makerIcon = new L.icon({
        iconUrl: '/25530.png',
        iconSize: [32, 32],
    })

    const [position, setPosition] = useState(null)
    const map = useMapEvent ({
        click () {
            map.locate()
        },
        locationfound (e)  {
            
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },

    })

    return position === null ? null :(
        <Marker position={position} icon={makerIcon} >
            <Tooltip>ตำแหน่งของคุณ</Tooltip>
        </Marker>
    )
}


function Map(){

    const center = [7.0091783, 100.4951276];
    const redOptions = {color: 'red'};

    return (
    <MapContainer className='map-viwe'
        center={center} 
        zoom={15}
        scrollWheelZoom={false} 
        >
        <TileLayer 
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> 
            contributors'url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CircleMarker center={center} pathOptions={redOptions} radius={250}>
            <Tooltip>ระยะในการจัดส่ง</Tooltip>      
        </CircleMarker>
        <LocationMap /> 
    </MapContainer>
    );
}


export default Map;


//lat7.0091783 lng100.4951276 พิกัด psu