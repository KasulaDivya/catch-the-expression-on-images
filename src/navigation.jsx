import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Newpost from './components/newpost';
//import Home from './components/home';
//import App from './App';
import Home from './Home';

function Navigationss() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/about" Component={Newpost} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Navigationss;
