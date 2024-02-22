import {useState, useEffect} from 'react';
import '../styles/Home.css';
import axios from 'axios';
import config from '../config';
import moment from 'moment';


export default function App() {
  const [recentRaces, setRecentRaces] = useState([]);
  const [comingRaces, setComingRaces] = useState([]);

  useEffect(() => {
      axios.get(`${config.apiUrl}Race/GetFiveAlreadyHappenedRaces` ) 
      .then((response) => {
        setRecentRaces(response.data);
      }).catch((err) => {
        console.log();
      });
      axios.get(`${config.apiUrl}Race/GetFutureFiveRaces`)
      .then((response) => {
        setComingRaces(response.data);
      }).catch((err) => {
        console.log();
      });
  }, [])
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
        <h3 className='text-center'>Recent races</h3>
          {recentRaces.map((race) => {
            return (
            <div key={race.id} className='slideItem'>
              <p>{race.country}</p>
              <p>{race.length}m</p>
              <p>{race.oval?'Oval':'Straight'}</p>
              <p>{moment(race.raceScheduled).format('yyyy. MMM. Do.  hh:mm')}</p>
            </div>
          )})}
        </div>
    </div>
  );
}

