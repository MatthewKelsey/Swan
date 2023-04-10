import React from "react";
import { Odds } from "../api";

function IndividualOdd(props: Odds) {
  return (
    <div className="race-div">
      <h3>{props.horseName}</h3>
      <h3>{props.odds}</h3>
    </div>
  );
}

export default IndividualOdd;
