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
 if(!upcomingRaces){
    getRaces()
      .then((data) => {
        if (isMounted && Array.isArray(data)) {
          setUpcomingRaces(data);
          setIsLoading(false);
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
  }, [upcomingRaces]);

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
