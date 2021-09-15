import React ,{ useState } from 'react';
import './App.css';
import AppHeader from './AppHeader';
import DrugItem from './DrugItem';

import Navbar from './components/Navbar';
import {BrowserRouter, BrowserRouter as Router,Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './components/Admin';
import AdminLogin from './components/AdminLogin';
import Axios from 'axios';
import CustomerScreen from './screens/CustomerScreen';
import HomeScreens from './screens/HomeScreen';
import AddProduct from './components/AddProduct';
import ShowPharmacist from './components/ShowPharmacist';
import Profile from './components/Profile';
import Logout from './components/Logout';
import Cart from './components/Cart'
import { CartProvider } from "react-use-cart";
import ReactDOM from 'react-dom';
import CustomerNavbar from './components/CustomerNavbar';
import PharmacistLogin from './components/PharmacistLogin';
import Pharmacist from './components/Pharmacist';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet' 
import MessengerCustomerChat from 'react-messenger-customer-chat';
import ChatHomePage from './containers/ChatHome'
import ChatLogin from './containers/Chat'
import ChatRegister from './containers/RegisterPage'
import Map from './components/Map'
import ShowProduct from './components/ShowProduct';
 
function App() {
  const saveUsername = localStorage.getItem("user");
  console.log("saveUser"+saveUsername)
  
  return (
    
    
    <BrowserRouter>
    <div id="mapid">
     
    <div>
        <Router>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={HomeScreens}/>
          <Route path="/register" component={Register}/>
          <Route path="/admin" component={Admin}/>
          <Route path="/adminlogin" component={AdminLogin}/>
          <Route path="/pharmacist" component={Pharmacist}/>
          <Route path="/pharmalogin" component={PharmacistLogin}/>
          <Route path="/CustomerScreen" component={CustomerScreen}/>
          <Route path="/addproduct" component={AddProduct}/>
          <Route path="/showpharmacist" component={ShowPharmacist}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/cus_profile" component={Profile}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/cart" component={Cart}/>
          <Route path="/chat" component={ChatHomePage}/>
          <Route path="/chatlogin" component={ChatLogin}/>
          <Route path="/chatregister" component={ChatRegister}/>
          <Route path="/map" component={Map}/>
          <Route path="/showproduct" component={ShowProduct}/>
        </Router>
      </div>
      
    </div>
    </BrowserRouter>  

   
   
    
    
   
    
  );
  
}
/*
<div className="app-grid">
        <DrugItem title="ยาพารา" thumbnailUrl="/img/para500.jpg" />
        <DrugItem title="ยาแก้ไอ" thumbnailUrl="/img/iiii.png" />
        <DrugItem title="เครื่องดื่มเกลือแร่" thumbnailUrl="/img/vitamin.jpg" />
      </div>
  
      <div>
        <Router>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={HomeScreens}/>
          <Route path="/register" component={Register}/>
          <Route path="/admin" component={Admin}/>
          <Route path="/adminlogin" component={AdminLogin}/>
          <Route path="/pharmacist" component={Pharmacist}/>
          <Route path="/pharmalogin" component={PharmacistLogin}/>
          <Route path="/CustomerScreen" component={CustomerScreen}/>
          <Route path="/addproduct" component={AddProduct}/>
          <Route path="/showpharmacist" component={ShowPharmacist}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/cus_profile" component={Profile}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/cart" component={Cart}/>
        </Router>
      </div>
    </div>
    </BrowserRouter>
      


    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>

<BrowserRouter>
    <div id="mapid">
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
    <div>
        <Router>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={HomeScreens}/>
          <Route path="/register" component={Register}/>
          <Route path="/admin" component={Admin}/>
          <Route path="/adminlogin" component={AdminLogin}/>
          <Route path="/pharmacist" component={Pharmacist}/>
          <Route path="/pharmalogin" component={PharmacistLogin}/>
          <Route path="/CustomerScreen" component={CustomerScreen}/>
          <Route path="/addproduct" component={AddProduct}/>
          <Route path="/showpharmacist" component={ShowPharmacist}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/cus_profile" component={Profile}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/cart" component={Cart}/>
        </Router>
      </div>
    </div>
    </BrowserRouter> 
    
    
   
    

*/
export default App;
