import { useState } from 'react';
import './App.css';
import AppHeader from './AppHeader';
import DrugItem from './DrugItem';

import Navbar from './components/Navbar';

function App() {

  const[searchText, setSeachText] = useState ('');

  return (
    <div className="app">
      
      <Navbar/>
      
      <div className="app-grid">
        <DrugItem title="ยาพารา" thumbnailUrl="/img/para500.jpg" />
        <DrugItem title="ยาแก้ไอ" thumbnailUrl="/img/iiii.png" />
        <DrugItem title="เครื่องดื่มเกลือแร่" thumbnailUrl="/img/vitamin.jpg" />
      </div>

      

    </div>
  );
}

export default App;
