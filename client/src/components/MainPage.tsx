import React, { useEffect, useState } from "react";
import { getRaces, Race } from "../api";
import IndividualRace from "./IndividualRace";

function MainPage() {
    const [upcomingRaces, setUpcomingRaces] = useState<Race[]>([]);


    useEffect(() => {
        getRaces()
          .then((data) => {
            if (Array.isArray(data)) {
              setUpcomingRaces(data);
              console.log(data); // Make sure data is of type Race[]
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
      
  
  return (
    <div>
      <h2>Home Page</h2>
      <div className="race-container">
      {upcomingRaces.map((race) => (
  <IndividualRace time={race.time} venue={race.venue} />
))}
</div>
      
    </div>
  );
}

export default MainPage;
