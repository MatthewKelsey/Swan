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
    getRaces()
      .then((data) => {
        if (Array.isArray(data)) {
          setUpcomingRaces(data);
          setIsLoading(false); // Set loading to false when data is loaded
          console.log(data); // Make sure data is of type Race[]
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          alert("Unauthorized. Please login.");
        }
        setIsLoading(false); // Set loading to false if there's an error
      });
  }, []);

  return (
    <div>
      <h2>Home Page</h2>
      {isLoading ? (
        <div>Loading...</div> // Show loading symbol while data is being fetched
      ) : (
        <div className="race-container">
          {upcomingRaces.map((race) => (
            <IndividualRace
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
