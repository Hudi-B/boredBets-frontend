import React, { useState } from 'react';
import {DialogActions, TextField,DialogTitle,DialogContent,DialogContentText,InputAdornment,Paper, Tooltip,Input,IconButton ,Accordion,List, ListItem, AccordionSummary, AccordionDetails,Button, Typography, Grid, Box, Dialog} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AuthPopup from './AuthPopup';
import { apiUrl, secondaryColor, fontColor } from '../../boredLocal';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import '../../styles/Main.css';
import { useDispatch } from 'react-redux';
import { updateWallet } from '../../auth/authSlice';

import { useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';

function PlaceBetPopup({ raceId, participants }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [restParticipants, setRestParticipants] = useState(participants);
  const [orderedBet, setOrderedBet] = useState(true);
  const [betAmount, setBetAmount] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const userData = useSelector((state) => state.auth);
  const [errorOnAmount, setErrorOnAmount] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleToggle = (horse) => () => {
    if (selectedItems.length < 5) {
      const currentIndex = selectedItems.indexOf(horse);
      const newCheckedItems = [...selectedItems];
      if (currentIndex === -1) {
        newCheckedItems.push(horse);
        setRestParticipants(restParticipants.filter((item) => item !== horse));
      }
      setSelectedItems(newCheckedItems);
    }
  };
  function showHorses() {
    return (
      <Box>
        {restParticipants.map((horse) => (
            <ListItem sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Button 
                variant="string" 
                onClick={handleToggle(horse)} 
                startIcon={<AddIcon />}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  color: fontColor,
                  width: '100%',
                  border: '3px solid rgba(50,50,50,0.3)',
                  borderRadius: 5,
                  textTransform: 'none',
                }}>
                <Box sx={{alignItems: 'center', display: 'flex', flexDirection: 'row'}}>
                    <Typography sx={{fontWeight: '600', color:fontColor}} className='preventSelect'>
                      {horse.horseName}
                    </Typography> 
                    <Typography sx={{color:fontColor}} className='preventSelect'>
                    &nbsp;{"from "+horse.horseCountry}
                    </Typography> 
                </Box>
              </Button>
            </ListItem>
        ))}
      </Box>
    );
  }

  function handleRemove(index) {
    const newSelectedItems = [...selectedItems];
    const [removedItem] = newSelectedItems.splice(index, 1);
    setSelectedItems(newSelectedItems);
    setRestParticipants([...restParticipants, removedItem]);
  }

  const handleClear = () => {
    setRestParticipants([...restParticipants, ...selectedItems]); // Add all checked items back to restParticipants
    setSelectedItems([]); // Clear checkedItems
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;
  
    const items = Array.from(selectedItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
  
    setSelectedItems(items);
  }
  

  const handleBetAmountChange = (event) => {
    if (errorOnAmount) {
      setErrorOnAmount(false);
    }
    const regex = /^[0-9\b]+$/;
    if (event.target.value === '' || regex.test(event.target.value)) {
      setBetAmount(Number(event.target.value));
    }
  };

  const handleOpenDialog = () => {
    if (selectedItems.length === 5 && betAmount > 0 ) {
      if (userData.wallet >= betAmount) {
      setOpenDialog(true);
      }else {
        setErrorOnAmount(true);
      }
    }else {
      setErrorOnAmount(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const dispatch = useDispatch();
  const fetchWallet = async () => {
    await axios.get(apiUrl+`User/GetWalletByUserId?UserId=` + userData.userId)
    .then((response) => {
        dispatch(updateWallet(response.data.wallet));
    })
    .catch((error) => {
        enqueueSnackbar("Failed to fetch wallet", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
    })
  }

  const handleConfirmBet = () => {
    setOpenDialog(false);
    const bet = {
      userId: userData.userId,
      first: selectedItems[0].horseId,
      second: selectedItems[1].horseId,
      third: selectedItems[2].horseId,
      fourth: selectedItems[3].horseId,
      fifth: selectedItems[4].horseId,
      raceId: raceId,
      betAmount: betAmount,
      betTypeId: orderedBet ? 0 : 1
    };
    axios.post(apiUrl+'UserBet/UserBetPost', bet )
    .then((response) => {
      handleClear();
      enqueueSnackbar("Bet Succesfully placed", {
        variant: 'success',
        autoHideDuration: 3000,
        TransitionComponent: Slide,
    });
    fetchWallet();
    }).catch((error) => {
      enqueueSnackbar("An error occured. Please try again later!", {
        variant: 'error',
        autoHideDuration: 3000,
        TransitionComponent: Slide,
    });
    })
  };
  

  return (
    <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>      
    <Paper elevation={10} sx={{width: '90%', maxWidth: '1000px', marginX: 'auto', borderRadius: 5, background:'none'}}>
    <Accordion square='false'sx={{width: '100%', backgroundColor: 'rgb(57,81,122)', borderRadius: 5}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon  />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            backgroundColor: secondaryColor,
            fontSize: '20px',
            height: '70px',
            fontWeight: '500',
            color: fontColor,
            '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
              transform: 'rotate(90deg)',
            },
            borderRadius:3,
            paddingX: 3,
        }}
        >
        Start betting
        </AccordionSummary>
        <AccordionDetails>
          {!userData.isLoggedIn? (
            <Box sx={{
              justifyContent: 'center',
               alignItems: 'center',
                display: 'flex', 
                flexDirection:'column',
                gap: 1,
                height: '200px'}}>
            <Typography sx={{
                fontSize: '20px',
                fontWeight: '600',
                color: fontColor}}>
              To access betting, please log in.
            </Typography>
            <AuthPopup itsALogin={true} />
            </Box>
          ): (
            <Grid container sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
              <Grid item xs={12} sm={12} md={5.9} sx={{alignItems:'center', display: 'flex', flexDirection:'column'}}>
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
                <Button variant='contained' sx={{width: '80%', marginY: 1}} onClick={handleClear}>Clear</Button>

              </Grid>

              <Grid item sm={12} md={5.9} sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                backgroundColor: selectedItems.length !== 5 && 'rgba(50, 50, 50, 0.3)',
                transition: 'background-color 0.5s ease'
                }}>
                  {selectedItems.length !== 5 ? (
                    <Typography 
                      sx={{margin:3, fontSize: '20px', fontWeight: '500', color: fontColor}}
                    >
                      {selectedItems.length ?  
                        "Horses selected: " + selectedItems.length :
                        "Pick 5 horses to start betting"
                      }
                    </Typography>
                  ): (
                    <Typography 
                      sx={{marginTop:1, fontSize: '20px', fontWeight: '750', color: fontColor, letterSpacing: '1px'}}
                    >
                      Top 5 horses:
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
                                        border: '3px solid rgba(200,200,200,0.5)',
                                        borderRadius: 5,
                                        backgroundColor: 'rgb(57,81,122)',
                                        justifyContent: 'space-between',
                                        marginY: 1,
                                      }}>
                                    <Box sx={{paddingLeft: 1, alignItems: 'center', display: 'flex', flexDirection: 'row'}}>
                                        <Typography sx={{fontWeight: '600', color: fontColor}} className='preventSelect'>
                                          {orderedBet? index+1+"."
                                          :
                                          "●"}
                                          &nbsp;
                                        </Typography> 
                                        <Typography sx={{fontWeight: '600', color: fontColor}} className='preventSelect'>
                                          {data.horseName}
                                        </Typography> 
                                        <Typography className='preventSelect' sx={{color: fontColor}}>
                                        &nbsp;{"from "+data.horseCountry}
                                        </Typography> 
                                    </Box>
                                    <IconButton sx={{padding: 0, color: fontColor}} onClick={() => handleRemove(index)}>
                                      <ClearIcon/>
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
                {selectedItems.length === 5 &&
                  <Box sx={{width:'100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap'}} >
                    <Box sx={{width:'100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap'}}>
                      <Tooltip arrow placement="top-start" title={orderedBet?
                        "Placing bets with order results in higher prizes, but less winning chance."
                        :
                        "Placing bets without order results in lower prizes, but higher winning chance."} 
                        >
                          <Button variant='contained' 
                          color='primary'
                          sx={{width: '200px', marginY: 1, marginX: 1,textTransform: 'none', fontSize: '15px',}} 
                          onClick={() => setOrderedBet(!orderedBet)}>
                            {orderedBet?"Exact order": "Any order"}
                          </Button>
                      </Tooltip>

                      <TextField
                        id="bet-amount"
                        type="number"
                        variant='standard'
                        error={errorOnAmount}
                        label="Bet amount"
                        helperText={errorOnAmount&&"Bet amount was invalid" }
                        onChange={handleBetAmountChange}
                        inputProps={{
                          min: 1,
                          step: 'any',
                        }}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">€</InputAdornment>,
                          sx: {
                            '& input': {
                              '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                                '-webkit-appearance': 'none',
                                margin: 0,
                              },
                            },
                            paddingX: 1,
                          },
                        }}
                      />
                      </Box>

                      <Button variant='contained' 
                      fullWidth
                      color='primary'
                      sx={{width: '200px', marginY: 1, marginX: 1, textTransform: 'none', fontWeight: 'bold', fontSize: '20px', letterSpacing: '2px'}} 
                      onClick={handleOpenDialog}>
                        Place bet
                      </Button>

                      <Dialog
                        open={openDialog}
                        onClose={handleCloseDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        sx={{backgroundColor: 'rgba(0,0,0,0.5)'}}
                        PaperProps={{
                          sx: {
                            backgroundColor: secondaryColor,
                            color: fontColor,
                          },
                        }}
                      >
                        <DialogTitle id="alert-dialog-title">{"Confirm Bet"}</DialogTitle>
                        <DialogContent>
                          <DialogContentText color={fontColor} id="alert-dialog-description">
                            Are you sure satisfied with this bet?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseDialog} color="primary" sx={{'&:hover': {backgroundColor: 'rgba(50,50,50,0.1)',boxShadow: '0 0 5px rgb(50, 50,50)'},textTransform: 'none', color: fontColor }}>
                            Not yet
                          </Button>
                          <Button onClick={handleConfirmBet} color="primary" autoFocus sx={{'&:hover': {backgroundColor: 'rgba(50,50,50,0.1)',boxShadow: '0 0 5px rgb(50, 50,50)'},color: fontColor}}>
                            Yes!
                          </Button>
                        </DialogActions>
                      </Dialog>
                  </Box>
                  
                }
              </Grid>
            </Grid>
        )}
      </AccordionDetails>
    </Accordion>
    </Paper>
  </Box>
  );
}

export default PlaceBetPopup;
