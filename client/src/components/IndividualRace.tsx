import React, { Dispatch, SetStateAction } from "react";
import { Race } from "../api";
import { useNavigate } from "react-router-dom";

interface IndividualRaceProps extends Race {
  setCurrentRace: Dispatch<SetStateAction<any>>;
  setCurrentEvent: Dispatch<SetStateAction<any>>;
}
function IndividualRace(props: IndividualRaceProps) {
  const venue: string = props.event.split(" ")[1];
  const time: string = props.event.split(" ")[0];
  const navigate = useNavigate();
  async function handleClick() {
    props.setCurrentEvent(props.event);
    props.setCurrentRace(props.eventUrl);
    navigate("/odds");
  }

  return (
    <div className="race-div" onClick={handleClick}>
      <div className="race-info">
        <h3>{venue}</h3>
      </div>
      <div className="race-info">
        <h3>{time}</h3>
      </div>
    </div>
  );
}

export default IndividualRace;
