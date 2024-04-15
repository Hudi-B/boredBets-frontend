import React, { useState, useEffect } from 'react';
import { IconButton ,Accordion,List, ListItem, AccordionSummary, AccordionDetails,Button, Typography, Grid, ListItemText, Checkbox, Box, Dialog} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'; // Import DragDropContext, Droppable, and Draggable from react-beautiful-dnd

import { isMobile } from 'react-device-detect';

import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

import '../../styles/Main.css';
function PlaceBetPopup({ raceId, participants }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [restParticipants, setRestParticipants] = useState(participants);

  const handleToggle = (horse) => () => {
    if (selectedItems.length < 5) {
      const currentIndex = selectedItems.indexOf(horse);
      const newCheckedItems = [...selectedItems];

      if (currentIndex === -1) {
        // Add the horse to checkedItems
        newCheckedItems.push(horse);
        // Remove the horse from restParticipants
        setRestParticipants(restParticipants.filter((item) => item !== horse));
      }

      setSelectedItems(newCheckedItems);
    }
  };

  function showHorses() {
    return restParticipants.map((horse) => {
      return (
        <ListItem key={horse.horseId} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Button variant="string" onClick={handleToggle(horse)} startIcon={<AddIcon />}>
            {horse.horseName} from {horse.horseCountry}
          </Button>
        </ListItem>
      );
    });
  }
  function handleMoveUp(index) {
    if (index === 0) return;
    const items = Array.from(selectedItems);
    const temp = items[index];
    items[index] = items[index - 1];
    items[index - 1] = temp;
    setSelectedItems(items);
  }
  
  function handleMoveDown(index) {
    if (index === selectedItems.length - 1) return;
    const items = Array.from(selectedItems);
    const temp = items[index];
    items[index] = items[index + 1];
    items[index + 1] = temp;
    setSelectedItems(items);
  }
  function handleMoveToStart(index) {
    const items = Array.from(selectedItems);
    const movedItem = items.splice(index, 1)[0];
    items.unshift(movedItem);
    setSelectedItems(items);
  }
  
  function handleMoveToEnd(index) {
    const items = Array.from(selectedItems);
    const movedItem = items.splice(index, 1)[0];
    items.push(movedItem);
    setSelectedItems(items);
  }
  const handleRemove = (index) => () => {
    console.log(index);

    const newSelectedItems = [...selectedItems];
    const [removedItem] = newSelectedItems.splice(index, 1);
    setSelectedItems(newSelectedItems);
    setRestParticipants([...restParticipants, removedItem]);
  };

  
  function handleOnDragEnd(result) {
    if (!result.destination) return;
  
    const items = Array.from(selectedItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
  
    setSelectedItems(items);
  }
  
  return (
    <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <Accordion square='false'sx={{width: '90%',marginX: 'auto', backgroundColor: 'rgba(4, 88, 88, 0.7)', borderRadius:5 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon  />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            backgroundColor: 'rgba(4, 88, 88, 0.7)',
            fontSize: '20px',
            fontWeight: '500',
            color: 'white',
            '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
              transform: 'rotate(90deg)',
            },
            borderRadius:5,
            paddingX: 3,

        }}
        >
        Start betting
        </AccordionSummary>
        <AccordionDetails>
          <Grid container sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
            <Grid item xs={12} sm={12} md={5.9} sx={{alignItems:'flex-end', display: 'flex', flexDirection:'column'}}>
              <Box sx={{
                width: '100%',
                height: '360px', 
                border:'3px solid rgba(50, 50, 50 , 0.3)',
                overflowY: 'auto',
                '&::-webkit-scrollbar': { 
                  backgroundColor: 'transparent',
                  width: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(50,50,50,0.6)', 
                }
                }}>                        
                  {showHorses()}
              </Box>
              <Button variant='contained' sx={{margin:1,width: 150}} onClick={() => setSelectedItems([])}>Clear</Button>
            </Grid>
            
            <Grid item sm={12} md={5.9} sx={{
              width: '100%',
              border:'3px solid rgba(50, 50, 50 , 0.3)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              backgroundColor: selectedItems.length !== 5 && 'rgba(50, 50, 50, 0.3)',
              transition: 'background-color 0.5s ease'

              }}>
                {selectedItems.length !== 5 && (
                  <Typography 
                    sx={{margin:1, fontSize: '20px', fontWeight: '500', color: 'black'}}
                  >
                    {selectedItems.length ?  
                      "Horses selected: " + selectedItems.length :
                      "Pick 5 horses to start betting"
                    }
                  </Typography>
                )}

              <DragDropContext onDragEnd={handleOnDragEnd} >
                  <Droppable droppableId="characters" isDropDisabled={selectedItems.length !== 5} >
                    {(provided) => (
                      <List sx={{width: '100%', paddingX: 2}} className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                       {selectedItems.map((data, index) => {
                          return (
                            <Draggable key={data.horseId} draggableId={data.horseId} index={index}>
                              {(provided) => (
                                <ListItem 
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      border: '3px solid rgba(50,50,50,0.3)',
                                      borderRadius: 5,
                                      justifyContent: 'space-between',
                                      marginY: 1,
                                    }}>
                                  <Box sx={{paddingLeft: 1, alignItems: 'center'}}>
                                      <Typography sx={{fontWeight: '600'}} className='preventSelect'>
                                        {data.horseName+" "}
                                      </Typography> 
                                      <Typography className='preventSelect'>
                                        from {data.horseCountry}
                                      </Typography> 
                                  </Box>
                                  {isMobile&&
                                    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexWrap: 'nowrap' }}>
                                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', minWidth: '100%' }}>
                                        <IconButton onClick={() => handleMoveUp(index)} disabled={index === 0}>
                                          <KeyboardArrowUpIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleMoveToStart(index)} disabled={index === 0}>
                                          <KeyboardDoubleArrowUpIcon onClick={() => handleMoveToStart(index)} /> 
                                        </IconButton>
                                      </div>
                                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', minWidth: '100%' }}>
                                        <IconButton onClick={() => handleMoveDown(index)} disabled={index === selectedItems.length - 1}>
                                          <KeyboardArrowDownIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleMoveToEnd(index)} disabled={index === selectedItems.length - 1}>
                                          <KeyboardDoubleArrowDownIcon />
                                        </IconButton>
                                      </div>
                                    </Box> 
                                  }
                                  <IconButton sx={{padding: 0}} onClick={() => handleRemove(index)}>
                                    <ClearIcon />
                                  </IconButton>
                                </ListItem>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </List>
                    )}
                  </Droppable>
                </DragDropContext>
            </Grid>
          </Grid>
        </AccordionDetails>
    </Accordion>
  </Box>
  );
}

export default PlaceBetPopup;
