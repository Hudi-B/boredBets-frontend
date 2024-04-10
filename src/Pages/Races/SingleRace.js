import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../../styles/DnD.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { apiUrl } from '../../boredLocal';
import {Stack,Tooltip, Divider, Grid, Box, Typography, Button, Hidden} from "@mui/material";
import { useLocation } from 'react-router-dom';
import CloudIcon from '@mui/icons-material/Cloud';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import StraightenIcon from '@mui/icons-material/Straighten';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
function App() {
  const id = useLocation().pathname.split("/")[2];

  const [race, setRace] = useState();
  const [participants, setParticipants] = useState([]);
  const [pending, setPending] = useState(true);


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
        setPending(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleMapOpen = () => {
    if (!pending) {
      const searchString = `${race.track.country}, ${race.track.address}`; // Replace with your desired string
      const mapUrl = `https://www.google.com/maps/search/?q=${searchString}`;
      window.open(mapUrl, '_blank');
    }
  };

  return (
    <Box>
      <Grid container 
        sx={{
          marginBottom: 2, 
          gap: 2, 
          justifyContent: 'center',
          paddingTop: 10,
          backgroundColor: 'rgba(50,50,50,0.3)'}}>
            <Grid item xs={12} sm={12} md={5}
            sx={{
              display: 'flex',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 'calc(1.5rem + 1.5vw)',
              letterSpacing: '0.1em',
              fontWeight: '500'}}>
                {pending? <div>Loading...</div> : race.track.name}
            </Grid>

            <Grid item xs={12} sm={12} md={5}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 'calc(1.2rem + 2vw)',
                whiteSpace: 'nowrap'}}>
                {pending? 
                <div>Loading...</div>/*skeleton here*/
                : 
                "Race held at: "+race.raceSceduled.replace("T"," ").replace("Z","").replaceAll("-", "/")
                }
            </Grid>
            <Stack
              direction="row"
              sx={{
              width: '100%',  
              fontSize: 'calc(0.9rem + 1.5vw)',
              whiteSpace: 'nowrap',
              justifyContent: 'space-between',
              alignItems: 'space-between',
              letterSpacing: '0.1em',    
              marginX:3 
                }}>
                  {pending? 
                <div>Loading...</div>/*skeleton here*/
                : <p>Weather: {pending? <div>Loading...</div> : race.rain?<CloudIcon/> : <WbSunnyRoundedIcon/>}  </p>}
                
                {pending? 
                  <div>Loading...</div>/*skeleton here*/
                  : <p><StraightenIcon /> {race.track.length}km</p>}
            </Stack>

      </Grid>


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
                <div>Loading...</div>/*skeleton here*/
                : <>{race.track.address}</>}
         
          <Tooltip title="Show on map" placement='top'>
            <Button variant="string" onClick={handleMapOpen}
            sx={{width: 'fit-content'}}>
              <FmdGoodIcon sx={{fontSize: '40px', margin:'none'}}/>
            </Button>
          </Tooltip>
        </Stack>

          <Typography sx={{marginLeft: 2}} variant="h5">In the competition:</Typography>

    </Box>
  );
}

export default App;

/*
drag and drop
  const [characters, updateCharacters] = useState(finalSpaceCharacters);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
    console.log(items.map((char) => char.name));
  }

<DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map(({id, name}, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <p>
                            { name }
                          </p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
*/