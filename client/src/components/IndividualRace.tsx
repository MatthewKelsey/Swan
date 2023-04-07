import React from 'react';
import { Race } from '../api';

function IndividualRace(props: Race) {
    return (
        <div className='race-div'>
            <h2>{props.venue}</h2>
            <h2> {props.time}</h2>
        </div>
    );
}


export default IndividualRace;