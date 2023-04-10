import React from "react";
import { Odds } from "../api";

function IndividualOdd(props: Odds) {
  return (
    <div className="race-div">
      <h2>{props.horseName}</h2>
      <h2>{props.odds}</h2>
    </div>
  );
}

export default IndividualOdd;
