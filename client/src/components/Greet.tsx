import React from 'react';
type GreetProps = {
    name: string
    messageCount: number
    isLoggeIn: boolean
}


function Greet(props:GreetProps) {
    return (
        <div>
            <h1>Swan Bet
            </h1>
            
            <h2>
         { props.isLoggeIn ? `Welcome ${props.name} `: `Welcome User`}</h2>
        </div>
    );
}

export default Greet;