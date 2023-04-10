import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import OddsPage from "./components/OddsPage";

interface currentRace {
  url: string;
  name: string;
}

function App() {
  const [currentRace, setCurrentRace] = useState<string>("");
  const [currentEvent, setCurrentEvent] = useState<string>("");
  return (
    <BrowserRouter>
    <div className="title-box">
      <h1>Swan Odds </h1></div>
      <Routes>
        <Route path="" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <MainPage
              currentRace={currentRace}
              setCurrentRace={setCurrentRace}
              currentEvent={currentEvent}
              setCurrentEvent={setCurrentEvent}
            />
          }
        />
        <Route
          path="/odds"
          element={
            <OddsPage currentRace={currentRace} currentEvent={currentEvent} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
