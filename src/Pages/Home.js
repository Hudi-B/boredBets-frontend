import {useState, useEffect} from 'react';
import axios from 'axios';
import { apiUrl } from '../boredLocal';
import moment from 'moment';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';


export default function App() {
  const [recentRaces, setRecentRaces] = useState([]);
  const [comingRaces, setComingRaces] = useState([]);

  useEffect(() => {
      axios.get(`${apiUrl}Race/GetFivePreviousRaces` ) 
      .then((response) => {
        setRecentRaces(response.data);
      }).catch((err) => {
        console.log();
      });
      axios.get(`${apiUrl}Race/GetFiveFutureRaces`)
      .then((response) => {
        setComingRaces(response.data);
      }).catch((err) => {
        console.log();
      });
  }, [])
  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px',
      margin: '0px',
      overflowY: 'auto',
      paddingTop: '50px',
      backgroundColor: 'rgb(2, 145, 138)'}} className="noScrollBar">
        <Box sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'}} className='preventSelect'>
            <Typography variant='h3' textAlign={'center'}>Don’t let boredom get you down.</Typography>
            <Typography variant='h2' textAlign={'center'} fontWeight={'800'}>Bet on boredBets</Typography>
        </Box>
    </Box>
  );
}

