import React from 'react';
import { Odds } from '../api';

function IndividualOdd(props:Odds) {
    return (
        <div>
            <h1>{props.horseName}</h1>
            <h2>{props.odds}</h2>
        </div>
    );
}

export default IndividualOdd;