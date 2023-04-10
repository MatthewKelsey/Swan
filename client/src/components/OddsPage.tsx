import React, { useEffect, useState } from "react";
import { Odds, getOdds } from "../api";
import IndividualOdd from "./IndividualOdd";

interface OddsPageProps {
  currentRace: string;
  currentEvent: string;
}

function OddsPage(props: OddsPageProps) {
  const [horseOdds, setHorseOdds] = useState<Odds[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOdds = async () => {
      const odds = await getOdds(`https://www.betfair.com${props.currentRace}`);
      if (odds) {
        setHorseOdds(odds);
        setIsLoading(false);
      }
    };
    fetchOdds();
  }, [props.currentRace]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1> {props.currentEvent}</h1>
      <div className="race-container">
        {horseOdds.map((horse) => {
          return (
            <IndividualOdd horseName={horse.horseName} odds={horse.odds} />
          );
        })}
      </div>
    </div>
  );
}

export default OddsPage;
