import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import MainPage from './components/MainPage';

function App() {
  return (


    <BrowserRouter>
    <h1>Swan Odds </h1>
    <Routes>
      <Route path='' element={<Register />} />
      <Route path= '/login' element = {<Login />} />
      <Route path='/home' element = {<MainPage />} />


    </Routes>
    
    </BrowserRouter>
   
  );
}

export default App;
