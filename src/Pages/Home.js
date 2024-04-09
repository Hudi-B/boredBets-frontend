import {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../boredLocal';
import moment from 'moment';
import Box from '@mui/material/Box';
import { Typography, Grid, Avatar, Paper, Divider, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';

import First from '../Components/Home/First'

export default function HomePage() {
  const [comingRaces, setComingRaces] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const tempRaces = [
    {
      id: 1,
      name: "Race 1",
      country: "Fictopia",
      raceSceduled: "2024-04-05T10:00:00", // Replace with the actual race time
    },
    {
      id: 2,
      name: "Race 2",
      country: "Fictopia",
      raceSceduled: "2024-04-06T14:30:00", // Replace with the actual race time
    },
    {
      id: 3,
      name: "Race 3",
      country: "Fictopia",
      raceSceduled: "2024-04-07T09:15:00", // Replace with the actual race time
    },
    {
      id: 4,
      name: "Race 4",
      country: "Fictopia",
      raceSceduled: "2024-04-08T16:45:00", // Replace with the actual race time
    },
    {
      id: 5,
      name: "Race 5",
      country: "Fictopia",
      raceSceduled: "2024-04-09T11:00:00", // Replace with the actual race time
    },
  ];
  



  useEffect(() => {
      axios.get(`${apiUrl}Race/GetFiveFutureRaces`)
      .then((response) => {
        setComingRaces(response.data);
      }).catch((error) => {
        console.log(error);
        enqueueSnackbar("Error while requesting upcoming races.", {
          variant: 'error',
          autoHideDuration: 3000,
          TransitionComponent: Slide,
        });
      });
  }, [])

console.log(comingRaces);

  const comingRaceBox = (race) => {
    return (
      <Paper
      elevation={4}
      className='preventSelect'
      component={Button}
      onClick={() => {navigate("/race/"+race.id)}}
        sx={{
          textTransform: 'none',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(200,200,200,0.3)',
          borderRadius: 2,
          padding: 1,
          margin: 0.5,
          maxWidth: '500px',
          '&hover': {
            backgroundColor: 'rgba(200,200,200,0.7)',
          },
        }}>
          <Grid container 
          sx={{
            width: '100%', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center'}}>
            <Grid item sm={5} sx={{justifyContent: 'center', display: 'flex'}}>{race.name}</Grid>
            <Grid item sm={5} sx={{justifyContent: 'center', display: 'flex'}}>{race.country}</Grid>
            <Divider sx={{width: '90%', borderColor: 'black'}} />
            <Grid item sm={12} sx={{justifyContent: 'center', display: 'flex'}}>{race.raceSceduled}</Grid>
          </Grid>
      </Paper>
    ) 
  }






  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      alignItems: 'center',
      padding: '10px',
      margin: '0px',
      overflowY: 'auto',
      paddingTop: '30px',
      backgroundColor: 'rgb(2, 145, 138)'}} className="noScrollBar">

        <First/>
        
        
        <Box sx={{
          marginTop: 25,
          marginBottom: 20,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'}} className='preventSelect'>
            <Typography variant='h3' textAlign={'center'}>Don’t let boredom get you down.</Typography>
            <Typography variant='h2' textAlign={'center'} fontWeight={'800'}>Bet on boredBets</Typography>
        </Box>

          <Grid container sx={{
            width: '100%'}}>
              
          </Grid>

    </Box>
  );
}

