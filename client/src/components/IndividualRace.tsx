import React, { Dispatch, SetStateAction, useState } from 'react';
import { Race, getOdds } from '../api';
import { useNavigate } from 'react-router-dom';

interface IndividualRaceProps extends Race{
    setCurrentRace :Dispatch<SetStateAction<string>>;
}
function IndividualRace(props: IndividualRaceProps) {
const navigate = useNavigate()
async function handleClick(){
   
    props.setCurrentRace(props.eventUrl)
        navigate('/odds')
    }


    return (
        <div className='race-div' onClick={handleClick}>
           
            <h2>{props.event}</h2>
            
        </div>
    );
}


export default IndividualRace;