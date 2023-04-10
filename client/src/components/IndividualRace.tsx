import React, { Dispatch, SetStateAction, useState } from "react";
import { Race, getOdds } from "../api";
import { useNavigate } from "react-router-dom";

interface IndividualRaceProps extends Race {
  setCurrentRace: Dispatch<SetStateAction<any>>;
  setCurrentEvent: Dispatch<SetStateAction<any>>;
}
function IndividualRace(props: IndividualRaceProps) {
  const navigate = useNavigate();
  async function handleClick() {
    props.setCurrentEvent(props.event);
    props.setCurrentRace(props.eventUrl);
    navigate("/odds");
  }

  return (
    <div className="race-div" onClick={handleClick}>
      <h3>{props.event}</h3>
    </div>
  );
}

export default IndividualRace;
