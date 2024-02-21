import {useState, useEffect} from 'react';
import '../styles/Home.css';
import axios from 'axios';
import config from '../config';

export default function App() {
  const [recentRaces, setRecentRaces] = useState([]);
  const [comingRaces, setComingRaces] = useState([]);

  useEffect(() => {
    if (recentRaces.length === 0) {   //last 5 races get method
      axios.get(`${config.apiUrl}Race/GetFiveAlreadyHappenedRaces` ) 
      .then((response) => {
        setRecentRaces(response.data);
        console.log(response.data);
      }).catch((err) => {
        console.log();
      });
    }
    if(comingRaces.length === 0){   //next 5 races get method
      axios.get(`${config.apiUrl}Race/GetFutureFiveRaces`)
      .then((response) => {
        setComingRaces(response.data);
      }).catch((err) => {
        console.log();
      });
    }
  })
  return (
    <div className="Container noScrollBar">
      <div className='welcome preventSelect'>
        <h3>Don’t let boredom get you down.</h3>
        <h1>Bet on boredBets</h1>
      </div>
      <div className='promo'>
        <div className='box left'>
          <p>Some people dream of success, while others wake up and bet on it.</p>
          <p>Whether you want to have fun, learn, or compete, BoredBets has it all.</p>
          <p className='mt-2 mb-2'>Join today and discover the thrill of gambling on horse races.</p>
          <p>BoredBets:</p><p> Where dreams come true.</p>
        </div>
      </div>
      <div className='fiveRecentRaces'>
          {recentRaces.map((race) => {
            return (
            <div key={race.id} className='slideItem'>
            <p>{race.country}</p>
            <p>{race.length}m</p>
            <p>{race.oval?'Oval':'Straight'}</p>
            <p>{race.raceScheduled}</p>
          </div>
          )})}
        </div>
    </div>
  );
}

