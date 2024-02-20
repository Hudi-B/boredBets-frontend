import * as React from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import NewHorse from '../Components/AdminComponents/Manual/NewHorse';
import NewJockey from '../Components/AdminComponents/Manual/NewJockey';
import NewTrack from '../Components/AdminComponents/Manual/NewTrack';
import NewRace from '../Components/AdminComponents/Manual/NewRace';

import GenerateHorse from '../Components/AdminComponents/Generate/GenerateHorse';
import GenerateJockey from '../Components/AdminComponents/Generate/GenerateJockey';
import GenerateTrack from '../Components/AdminComponents/Generate/GenerateTrack';
import GenerateRace from '../Components/AdminComponents/Generate/GenerateRace';



import '../styles/Admin.css';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    backgroundColor: theme.palette.grey[300], 

    padding: theme.spacing(2),
    textAlign: 'flex-start',
    color: theme.palette.text.secondary
  }));

  
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


export default function Admin() {
  const [horseManual, setHorseManual] = React.useState(true);
  const [jockeyManual, setJockeyManual] = React.useState(true);
  const [trackManual, setTrackManual] = React.useState(true);
  const [raceManual, setRaceManual] = React.useState(true);


    return (
        <Stack className='Container'   
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}>
              <Item sx={{maxWidth: '800px', width: '100%'}}> 
                <div className='title'>New horse</div> 
                <Box display="flex" justifyContent="space-between" margin="normal">
                  <Button variant={horseManual ? 'contained' : 'outlined'} onClick={() => setHorseManual(true)} sx={{marginBottom: '10px'}}>Add manually</Button>
                  <Button variant={!horseManual ? 'contained' : 'outlined'} onClick={() => setHorseManual(false)} sx={{marginBottom: '10px'}}>Generate data</Button>
                </Box>
                {horseManual? <NewHorse /> : < GenerateHorse/>}
              </Item>
              <Item sx={{maxWidth: '800px', width: '100%'}}> 
                <div className='title'>New jockey</div> 
                <Box display="flex" justifyContent="space-between" margin="normal">
                  <Button variant={jockeyManual ? 'contained' : 'outlined'} onClick={() => setJockeyManual(true)} sx={{marginBottom: '10px'}}>Add manually</Button>
                  <Button variant={!jockeyManual ? 'contained' : 'outlined'} onClick={() => setJockeyManual(false)} sx={{marginBottom: '10px'}}>Generate data</Button>
                </Box>
                {jockeyManual? <NewJockey /> : < GenerateJockey/>} 
              </Item>
              <Item sx={{maxWidth: '800px', width: '100%'}}> 
                <div className='title'>New track</div>
                <Box display="flex" justifyContent="space-between" margin="normal">
                  <Button variant={trackManual ? 'contained' : 'outlined'} onClick={() => setTrackManual(true)} sx={{marginBottom: '10px'}}>Add manually</Button>
                  <Button variant={!trackManual ? 'contained' : 'outlined'} onClick={() => setTrackManual(false)} sx={{marginBottom: '10px'}}>Generate data</Button>
                </Box>
                {trackManual? <NewTrack /> : < GenerateTrack />}
              </Item>
              <Item sx={{maxWidth: '800px', width: '100%'}}> 
                <div className='title'>New Race</div>
                <Box display="flex" justifyContent="space-between" margin="normal">
                  <Button variant={raceManual ? 'contained' : 'outlined'} onClick={() => setRaceManual(true)} sx={{marginBottom: '10px'}}>Add manually</Button>
                  <Button variant={!raceManual ? 'contained' : 'outlined'} onClick={() => setRaceManual(false)} sx={{marginBottom: '10px'}}>Generate data</Button>
                </Box>
                {raceManual? <NewRace /> : < GenerateRace/>}
              </Item>
        </Stack>
    );
  }
  
  