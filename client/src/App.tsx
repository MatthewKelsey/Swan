import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import MainPage from './components/MainPage';
import OddsPage from './components/OddsPage';

function App() {
  const [currentRace, setCurrentRace] = useState<string>('')

  return (


    <BrowserRouter>
    <h1>Swan Odds </h1>
    <Routes>
      <Route path='' element={<Register />} />
      <Route path= '/login' element = {<Login />} />
      <Route path='/home' element = {<MainPage currentRace = {currentRace} setCurrentRace = {setCurrentRace} />} />
      <Route path='/odds' element = {<OddsPage currentRace={currentRace} />} />


    </Routes>
    
    </BrowserRouter>
   
  );
}

export default App;
