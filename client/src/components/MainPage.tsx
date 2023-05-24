import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getRaces, Race } from "../api";
import IndividualRace from "./IndividualRace";

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
    let isMounted = true;

    const cachedRaces = localStorage.getItem("races");

    if (cachedRaces) {
     
      const parsedData = JSON.parse(cachedRaces);
      setUpcomingRaces(parsedData);
      setIsLoading(false);
    } else {
    
      getRaces()
        .then((data) => {
          if (isMounted && Array.isArray(data)) {
            setUpcomingRaces(data);
            setIsLoading(false);

            // Store the response in localStorage for future use
            localStorage.setItem("races", JSON.stringify(data));
          }
        })
        .catch((error) => {
          if (error.response && error.status === 403) {
            alert("Unauthorized. Please login.");
          }
          setIsLoading(false);
        });
    }

    return () => {
      isMounted = false;
    };
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
