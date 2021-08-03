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



function App() {
  return (
    <BrowserRouter>
    <div className="app">
      

      <Navbar/>
      <div>
        <Router>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={HomeScreens}/>
          <Route path="/register" component={Register}/>
          <Route path="/admin" component={Admin}/>
          <Route path="/adminlogin" component={AdminLogin}/>
          <Route path="/CustomerScreen" component={CustomerScreen}/>
          <Route path="/addproduct" component={AddProduct}/>
          <Route path="/showpharmacist" component={ShowPharmacist}/>
          <Route path="/profile" component={Profile}/>
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
      </div>*/
export default App;
