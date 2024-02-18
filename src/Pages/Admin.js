import * as React from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import NewHorse from '../Components/AdminComponents/NewHorse';
import NewJockey from '../Components/AdminComponents/NewJockey';
import NewTrack from '../Components/AdminComponents/NewTrack';
import GenerateHorse from '../Components/AdminComponents/GenerateHorse';
import GenerateJockey from '../Components/AdminComponents/GenerateJockey';
import GenerateTrack from '../Components/AdminComponents/GenerateTrack';


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


    return (
        <Stack className='Container'   
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}>
              <Item> 
                <div className='title'>New horse</div> 
                <Box display="flex" justifyContent="space-between" margin="normal">
                  <Button variant={horseManual ? 'contained' : 'outlined'} onClick={() => setHorseManual(true)} sx={{marginBottom: '10px'}}>Add manually</Button>
                  <Button variant={!horseManual ? 'contained' : 'outlined'} onClick={() => setHorseManual(false)} sx={{marginBottom: '10px'}}>Generate data</Button>
                </Box>
                {horseManual? <NewHorse /> : < GenerateHorse/>}
              </Item>
              <Item> 
                <div className='title'>New jockey</div> 
                <Box display="flex" justifyContent="space-between" margin="normal">
                  <Button variant={jockeyManual ? 'contained' : 'outlined'} onClick={() => setJockeyManual(true)} sx={{marginBottom: '10px'}}>Add manually</Button>
                  <Button variant={!jockeyManual ? 'contained' : 'outlined'} onClick={() => setJockeyManual(false)} sx={{marginBottom: '10px'}}>Generate data</Button>
                </Box>
                {jockeyManual? <NewJockey /> : < GenerateJockey/>} 
              </Item>
              <Item> 
                <div className='title'>New track</div>
                <Box display="flex" justifyContent="space-between" margin="normal">
                  <Button variant={trackManual ? 'contained' : 'outlined'} onClick={() => setTrackManual(true)} sx={{marginBottom: '10px'}}>Add manually</Button>
                  <Button variant={!trackManual ? 'contained' : 'outlined'} onClick={() => setTrackManual(false)} sx={{marginBottom: '10px'}}>Generate data</Button>
                </Box>
                {trackManual? <NewTrack /> : < GenerateTrack/>}
              </Item>

        </Stack>
    );
  }
  
  