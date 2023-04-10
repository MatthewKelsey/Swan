import React from "react";
import { Odds } from "../api";

function IndividualOdd(props: Odds) {
  return (
    <div className="horse-div">
   <div className="race-info">
      <h3>{props.horseName}</h3></div>
      <div className="race-info">
      <h3>{props.odds}</h3></div>
    </div>
  );
}

export default IndividualOdd;
