import React ,{ useState } from 'react';
import './App.css';
import AppHeader from './AppHeader';
import DrugItem from './DrugItem';

import Navbar from './components/Navbar';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './components/Admin';
import AdminLogin from './components/AdminLogin';
import Axios from 'axios';
import CustomerIndex from './components/CustomerIndex';
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');



function App() {
  return (
    <div className="app">
      

      <Navbar/>
      <div className="app-grid">
        <DrugItem title="ยาพารา" thumbnailUrl="/img/para500.jpg" />
        <DrugItem title="ยาแก้ไอ" thumbnailUrl="/img/iiii.png" />
        <DrugItem title="เครื่องดื่มเกลือแร่" thumbnailUrl="/img/vitamin.jpg" />
      </div>
      <div>
        <Router>
          <Route path="/login"><Login /></Route>
          <Route path="/register"><Register /></Route>
          <Route path="/admin"><Admin /></Route>
          <Route path="/adminlogin"><AdminLogin /></Route>
          <Route path="/customerindex"><CustomerIndex /></Route>
          

        </Router>
      </div>

      

    </div>
   
  );
  
}

export default App;
