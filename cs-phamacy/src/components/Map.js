import './Map.css'
import { MapContainer, TileLayer, Marker, Popup, useMapEvent, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, {useState } from 'react';
import L from 'leaflet';
import Alert from 'react-bootstrap/Alert';
import { Button, Container } from 'react-bootstrap';


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

function AlertDismissible() {
    const [show, setShow] = useState(true);
  
    return (
      <>
        <Alert show={show} variant="success">
          <Alert.Heading>ตรวจสอบพื้นที่การจัดส่ง</Alert.Heading>
          <p>
          ลูกค้าต้องดูที่อยู่ของตนเอง หากอยู่ในรัศมีการจัดส่งสามารถทำการสั่งได้ กรณีที่อยู่นอกรัศมีการจัดส่ง ร้านไม่สามารถจัดส่งได้
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="outline-success">
              ปิด
            </Button>
          </div>
        </Alert>
  
        {!show && <Button onClick={() => setShow(true)}>แสดงข้อความ</Button>}
      </>
    );
  }



function Map(){

    const center = [7.0091783, 100.4951276];
    const redOptions = {color: 'red'};

    return (
    <div>
        <Container>
        <a class="back-Odetail" href="/Odetail">back</a><br/>
        <AlertDismissible /> 
        <MapContainer className='map-viwe'
            center={center} 
            zoom={10}
            scrollWheelZoom={true} 
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
        </Container>
    </div>
    );
}


export default Map;


//lat7.0091783 lng100.4951276 พิกัด psu