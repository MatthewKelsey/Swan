import React, { useEffect, useState } from 'react';
import { Odds, getOdds } from '../api';
import IndividualOdd from './IndividualOdd';

interface OddsPageProps {
  currentRace: string;
}

function OddsPage(props: OddsPageProps) {
  const [horseOdds, setHorseOdds] = useState<Odds[]>([]);

  useEffect(() => {
    console.log(props.currentRace)
    const fetchOdds = async () => {
      const odds = await getOdds(`https://www.betfair.com${props.currentRace}`);
      if (odds) {
        setHorseOdds(odds);
      }
    };
    fetchOdds();
  }, []);

  return (
    <div>
      {horseOdds.map((horse) => {
        return <IndividualOdd horseName={horse.horseName} odds={horse.odds} />;
      })}
    </div>
  );
}

export default OddsPage;
