import { useState ,response} from 'react';
import Axios from 'axios'
import AppHeader from '../AppHeader';
import DrugItem from '../DrugItem';

import Navbar from '../components/Navbar';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Admin from './Admin';

export default function CustomerIndex() {
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
    
            </Router>
          </div>
    
          
    
        </div>
       
      );
}