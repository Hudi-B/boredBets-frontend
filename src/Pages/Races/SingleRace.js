import { useLocation} from "react-router-dom";
import { useEffect, useState } from 'react';

export default function SingleRace() {
    const id = useLocation().pathname.split("/")[2];
    const [raceData , setRaceData] = useState({});



  return (
    <>
      <h1>Single Race - {id}</h1>
    </>
  );
}
