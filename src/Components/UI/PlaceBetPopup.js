import React, { useState, useEffect } from 'react';
import { List, ListItem,Button, Paper, Grid, ListItemText, Checkbox, Box, Dialog} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { HomeRepairServiceSharp } from '@mui/icons-material';


function PlaceBetPopup(data) {
  const [checkedItems, setCheckedItems] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [fullscreen, setFullscreen] = React.useState(false);
  const horses = data.participants;
  const raceId = data.raceId;

  console.log(checkedItems);

  useEffect(() => {
    if (window.innerWidth < 500) {
        setFullscreen(true);
    }
    else {
        setFullscreen(false);
    }
}, [window.innerWidth]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function showHorses() {
    return  horses.map((horse) => {
      return (
        <ListItem key={horse.horseId} button onClick={handleToggle(horse)}>
        <Checkbox
          edge="start"
          checked={checkedItems.indexOf(horse) !== -1}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': horse.horseName }}
        />
        <ListItemText id={horse.horseId} primary={horse.horseName+" from " + horse.horseCountry} />
      </ListItem>
      );
    });
  }

  const handleToggle = (value) => () => {
    const currentIndex = checkedItems.indexOf(value);
    const newChecked = [...checkedItems];

    if (currentIndex === -1) {
      if (newChecked.length < 5) {
        newChecked.push(value);
      }
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedItems(newChecked);
  };




  return (
    <React.Fragment>
      <Paper component={Button} variant="contained" onClick={handleClickOpen}
      sx={{
        textTransform:'none',
        width: '200px',
        fontSize: '20px',
        borderRadius: 6,
        backgroundColor: 'rgb(80, 150, 60)',
        position: 'absolute',
        bottom: 10,
        zIndex: 1000,
        right: 20,
        boxShadow: '0 0 10px rgb(50, 120, 45)',
        transition: 'background-color 0.4s ease',
        ':hover': {
          backgroundColor: 'rgb(29, 119, 44)',
          transition: 'background-color 0.4s ease',
        },
       }}>
          Start Betting
      </Paper>


      <Dialog
          open={open}
          className="preventSelect"
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullScreen={fullscreen}
      >
          <Box 
          sx={{
              backgroundColor: 'rgb(60, 150, 120)',
              width: fullscreen? '100%' : '700px',
              maxWidth: '100%',
              height: fullscreen? '100%' : '800px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              overflowY: 'hidden',
              padding:'30px'}}>
                  {fullscreen &&
                  <Button onClick={handleClose}
                  sx={{
                      ripple: 'rgba(50, 50, 50, 0.5)',
                      position: 'absolute', 
                      top: 10, 
                      left: 10, 
                      borderRadius: '50%',
                      '&:hover': {
                          backgroundColor: 'rgba(50, 50, 50, 0.2)',
                        },
                        '&:active': {
                          backgroundColor: 'rgba(50, 50, 50, 0.5)',
                        },
                  }}>
                      <CloseIcon sx={{fontSize: '50px', color: 'rgb(50, 50, 50)'}}/>
                  </Button>
                  }

              <Grid container sx={{width: '100%' , justifyContent: 'space-between'}} >
              <Grid item xs={12} sm={5.9} sx={{height: '300px', border:'3px solid rgb(50, 50, 50)',  marginBottom: 1}}>

              </Grid>
              <Grid item xs={12} sm={5.9} sx={{ height: '300px', border:'3px solid rgb(50, 50, 50)', overflowY: 'auto'}}>                        
              {showHorses()}
              </Grid>
          </Grid>

        </Box>
      </Dialog>
    </React.Fragment>
  );
}

export default PlaceBetPopup;
