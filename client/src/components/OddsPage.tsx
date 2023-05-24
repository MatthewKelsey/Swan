import React, { useEffect, useState } from "react";
import { Odds, getOdds } from "../api";
import IndividualOdd from "./IndividualOdd";
import { useNavigate } from "react-router-dom";
interface OddsPageProps {
  currentRace: string;
  currentEvent: string;
}

function OddsPage(props: OddsPageProps) {
  const navigate = useNavigate();

  const [horseOdds, setHorseOdds] = useState<Odds[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {

    if (props.currentRace === "") {
      navigate("/home");
    }

const raceInfo = localStorage.getItem(`${props.currentRace}`)

if(raceInfo){
  const parsedOdds = JSON.parse(raceInfo)
  setHorseOdds(parsedOdds)
  setIsLoading(false)
}else {
    const fetchOdds = async () => {
      const odds = await getOdds(`https://www.betfair.com${props.currentRace}`);
      if (odds) {
        setHorseOdds(odds);
        setIsLoading(false);
      }
    };
    fetchOdds();}
  }, [props.currentRace, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2> {props.currentEvent}</h2>
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
