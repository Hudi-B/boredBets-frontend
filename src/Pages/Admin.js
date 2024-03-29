import * as React from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import NewHorse from '../Components/AdminComponents/Manual/NewHorse';
import NewJockey from '../Components/AdminComponents/Manual/NewJockey';
import NewTrack from '../Components/AdminComponents/Manual/NewTrack';
//import NewRace from '../Components/AdminComponents/Manual/NewRace';

import GenerateHorse from '../Components/AdminComponents/Generate/GenerateHorse';
import GenerateJockey from '../Components/AdminComponents/Generate/GenerateJockey';
import GenerateRace from '../Components/AdminComponents/Generate/GenerateRace';


const Panel = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    backgroundColor: theme.palette.grey[300], 

    padding: theme.spacing(2),
    textAlign: 'flex-start',
    color: theme.palette.text.secondary,
    maxWidth: '800px',
    width: '100%',
  }));

const Title = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    backgroundColor: theme.palette.grey[300], 
    fontSize: 40,
    fontWeight: 800,
    marginBottom: '10px',
    borderBottom: '5px solid rgb(113, 113, 113)'
  }));

export default function AdminPage() {
  const [horseManual, setHorseManual] = React.useState(true);
  const [jockeyManual, setJockeyManual] = React.useState(true);
  const [trackManual, setTrackManual] = React.useState(true);
  const [raceManual, setRaceManual] = React.useState(true);
  
    return (
        <Stack className='Container' direction="column" justifyContent="flex-start" alignItems="center" spacing={2}>
              <Panel> 
                <Title>New horse</Title> 
                <Box display="flex" justifyContent="space-between" margin="normal" paddingBottom={'10px'}>
                  <Button variant={horseManual ? 'contained' : 'outlined'} onClick={() => setHorseManual(true)}>Add manually</Button>
                  <Button variant={!horseManual ? 'contained' : 'outlined'} onClick={() => setHorseManual(false)}>Generate data</Button>
                </Box>
                { horseManual ? 
                  <NewHorse /> 
                  : 
                  < GenerateHorse/>
                }
              </Panel>
              <Panel> 
                <Title className='title'>New jockey</Title> 
                <Box display="flex" justifyContent="space-between" margin="normal" paddingBottom={'10px'}>
                  <Button variant={jockeyManual ? 'contained' : 'outlined'} onClick={() => setJockeyManual(true)}>Add manually</Button>
                  <Button variant={!jockeyManual ? 'contained' : 'outlined'} onClick={() => setJockeyManual(false)}>Generate data</Button>
                </Box>
                { jockeyManual ? 
                  <NewJockey /> 
                  : 
                  < GenerateJockey/>
                } 
              </Panel>
              <Panel> 
                <Title className='title'>New track</Title>
               <NewTrack />
              </Panel>
              <Panel> 
                <Title className='title'>New Race</Title>
                <Box display="flex" justifyContent="space-between" margin="normal" paddingBottom={'10px'}>
                  <Button variant={raceManual ? 'contained' : 'outlined'} onClick={() => setRaceManual(true)}>Add manually</Button>
                  <Button variant={!raceManual ? 'contained' : 'outlined'} onClick={() => setRaceManual(false)}>Generate data</Button>
                </Box>
                { raceManual ? 
                  <>
                    {/*<NewRace />*/}
                    < GenerateRace/>
                  </>
                  : 
                  < GenerateRace/>
                }
              </Panel>
        </Stack>
    );
  }
  
  