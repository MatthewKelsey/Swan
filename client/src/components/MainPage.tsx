import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getRaces, Race } from "../api";
import IndividualRace from "./IndividualRace";
import moment from "moment";
interface MainPageProps {
  currentRace: string;
  setCurrentRace: Dispatch<SetStateAction<string>>;
  currentEvent: string;
  setCurrentEvent: Dispatch<SetStateAction<string>>;
}

function MainPage(props: MainPageProps) {
  const [upcomingRaces, setUpcomingRaces] = useState<Race[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const cachedRaces = sessionStorage.getItem('races');
    let parsedData = null;
  
    if (cachedRaces) {
      parsedData = JSON.parse(cachedRaces);
      const filteredArray = parsedData.filter((race: Race) => {
        const currentDate = new Date();
        console.log(currentDate)
        console.log(new Date(race.eventDateTime))
        return currentDate < new Date(race.eventDateTime);

      });
      console.log('pasresd-Data', parsedData)
      console.log(filteredArray)
      setUpcomingRaces(filteredArray)
      ;
      setIsLoading(false);
    }
    else{  getRaces()
      .then((data) => {
        if ( Array.isArray(data)) {
          setUpcomingRaces(data);
          setIsLoading(false);
          sessionStorage.setItem('races', JSON.stringify(data));
        }
      })
      .catch((error) => {
        if (error.response && error.status === 403) {
          alert('Unauthorized. Please login.');
        }
        setIsLoading(false);
      });
    }
  }, []);
  
  

  return (
    <div className="main-container">
      <h2>Upcoming Races</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="race-container">
          {upcomingRaces.map((race) => (
            <IndividualRace
              eventDateTime={race.eventDateTime}
              key={race.eventUrl}
              event={race.event}
              eventUrl={race.eventUrl}
              setCurrentRace={props.setCurrentRace}
              setCurrentEvent={props.setCurrentEvent}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MainPage;
