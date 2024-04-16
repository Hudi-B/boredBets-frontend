import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { apiUrl } from '../../boredLocal';
import {Stack, Tooltip, Paper, Grid, Box, Typography, Button, Hidden, Skeleton} from "@mui/material";
import { useLocation } from 'react-router-dom';
import CloudIcon from '@mui/icons-material/Cloud';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import StraightenIcon from '@mui/icons-material/Straighten';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { Link } from 'react-router-dom';

import BetScrollDownMenu from '../../Components/UI/BetScrollDownMenu';


function App() {
  const id = useLocation().pathname.split("/")[2];
  const [race, setRace] = useState();
  const [participants, setParticipants] = useState([]);
  const [pending, setPending] = useState(true);

  function participantCard(participant) {
    return(
      <Grid item xs={12} sm={5.9} sx={{marginBottom: 1}}>
      <Paper sx={{borderRadius: 3, overflow: 'hidden', background:'none', display: 'flex', }} elevation={10}>
              <Grid item  xs={6}
              component={Link}
              to={`/Horse/${participant.horseId}`}
              sx={{
                backgroundImage: `linear-gradient(to right, #00463f, #00574f, #00695f, #007b70, #008e81)`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                textTransform: 'none',
                textDecoration: 'none',
                height: '70px',
              }}>
                <Box
                sx={{
                  width: '100%', 
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  }}>
                    <Box sx={{textAlign: 'center'}}>
                      {participant.horseName}&nbsp;
                      <Hidden mdDown>
                        {participant.horseAge}
                        <Typography variant="caption" >yo&nbsp; </Typography>
                        {participant.horseStallion?"Stallion":"Mare"}&nbsp;
                      </Hidden>
                      <Hidden smUp>
                        {participant.horseAge}
                        <Typography variant="caption" >yo&nbsp; </Typography>
                        {participant.horseStallion?"Stallion":"Mare"}&nbsp;
                      </Hidden>
                    </Box>
                      <Typography variant="caption">from {participant.horseCountry}</Typography>
                      
                </Box>
              </Grid>
              <Grid item xs={6}
                component={Link}
                to={`/Jockey/${participant.jockeyId}`}
                sx={{
                  backgroundImage: `linear-gradient(to left, #00463f, #00574f, #00695f, #007b70, #008e81)`,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  textTransform: 'none',
                  textDecoration: 'none',
                  height: '70px',
                }}>
                {participant.jockeyName}
              </Grid></Paper></Grid>
    )
  }

  useEffect(() => {
    axios.get(`${apiUrl}Race/GetByRaceId?Id=`+id)
      .then((response) => {
        setRace({
          raceId: response.data.raceId,
          rain: response.data.rain,
          raceSceduled: response.data.raceScheduled,
          track: response.data.track,
        });
        setParticipants(response.data.participants);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setPending(false);
      });
  }, []);
  
  const handleMapOpen = () => {
    if (!pending) {
      const searchString = `${race.track.country}, ${race.track.address}`; // Replace with your desired string
      const mapUrl = `https://www.google.com/maps/search/?q=${searchString}`;
      window.open(mapUrl, '_blank');
    }
  };

  function showSkeletons() {
    const items = [];
    for (let index = 0; index < 20; index++) {
        items.push(
          <Skeleton width={"47%"} height={"90px"} animation="wave" />
        );
    }
    return items;
  }

  return (
    <Box sx={{width: '100%', paddingBottom: 10}}>
      <Box 
        sx={{
          marginBottom: 2,
          justifyContent: 'center',
          paddingTop: 10,
          backgroundColor: 'rgba(50,50,50,0.3)'}}>
            <Box
            sx={{
              display: 'flex',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 'calc(1.5rem + 1.5vw)',
              letterSpacing: '0.1em',
              fontWeight: '700'}}>
                {pending? 
                <Skeleton width={"70%"} height={"70px"} animation="wave" />
                : race.track.name}
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 'calc(0.8rem + 2vw)',
                whiteSpace: 'nowrap'}}>
                {pending? 
                <Skeleton width={"50%"} height={"50px"} animation="wave" />
                : 
                "Race held at: "+race.raceSceduled.replace("T"," ").replace("Z","").replaceAll("-", "/")
                }
            </Box>
            <Stack
              direction="row"
              sx={{
              width: '100%',  
              fontSize: 'calc(0.9rem + 1.5vw)',
              whiteSpace: 'nowrap',
              justifyContent: 'space-between',
              alignItems: 'space-between',
              letterSpacing: '0.1em',    
              paddingX:2
                }}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    Weather: 
                    {pending? 
                      <Skeleton width={"30px"} height={"40px"} animation="wave" /> 
                      :
                      race.rain?
                        <CloudIcon/> 
                          : 
                        <WbSunnyRoundedIcon/>}  
                 </Box>
                
                 <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <StraightenIcon /> 
                  {pending? 
                    <Skeleton width={"60px"} height={"40px"} animation="wave" />
                    :
                    race.track.length}km
                  </Box>
            </Stack>

      </Box>

      <Stack
        direction="row"
        sx={{
        width: '100%',  
        fontSize: '13px',
        justifyContent: 'flex-end',
        alignItems: 'center',
        letterSpacing: '0.1em',    
        paddingX:1 }}>
          {pending? 
              <Skeleton width={"50%"} height={"40px"} animation="wave" />
              : <>{race.track.address}</>}
        
        <Tooltip title="Show on map" placement='top'>
          <Button variant="string" onClick={handleMapOpen}
          sx={{width: 'fit-content'}}>
            <FmdGoodIcon sx={{fontSize: '40px', margin:'none'}}/>
          </Button>
        </Tooltip>
      </Stack>

      <Typography sx={{marginLeft: 2}} variant="h5">In the competition:</Typography>
      <Stack key={"btc"} direction="column" gap={1} sx={{paddingX: 2}}>
        <Grid key={"btc1"} container sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
          {pending? 
        showSkeletons()
        :
          participants.map((participant) => {
            return participantCard(participant);
          })
        }
        </Grid>
      </Stack>
      
      {!pending && 
      participants[0].placement === 0?
        <BetScrollDownMenu raceId={race.raceId} participants={participants}/>
      :
        <>{/*Implement placement checker here*/}</>
      }
        

    </Box >
  );
}

export default App;