import React, { useState, useEffect } from 'react';
import {Hidden, Avatar, Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Box, Paper} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AuthPopup from './AuthPopup';
import { useSelector } from 'react-redux';
import '../../styles/Main.css';
import { Link } from 'react-router-dom';


export default function ViewResults({participants }) {
  const [firstFive, setFirstFive] = useState();
  const userData = useSelector((state) => state.auth);
const [dots, setDots] = useState('.');

useEffect(() => {
  if (participants[0].placement !== 0) return;
  
  const intervalId = setInterval(() => {
    setDots((prevDots) => {
      switch (prevDots) {
        case '.':
          return '..';
        case '..':
          return '...';
        case '...':
          return '.';
        default:
          return '.';
      }
    });
  }, 500);

  return () => clearInterval(intervalId);
}, [participants]);



  useEffect(() => {
    participants.sort((a, b) => a.placement - b.placement);
    setFirstFive(participants.slice(0, 5));
  }, []);
console.log(firstFive);
  function showHorses() {
    return (
      <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', gap:1}}>
        {firstFive && firstFive.map((participant) => (
            <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Avatar sx={{marginRight:2, boxShadow: '-5px -5px 10px rgba(200,200,200,0.2), 5px 5px 10px rgba(50,50,50,0.5);', marginLeft: 1, backgroundColor: 'rgb(0,139,139)'}}>{participant.placement}</Avatar>
              <Grid container sx={{
                borderRadius: 3, 
                overflow: 'hidden', 
                background:'none', 
                display: 'flex',
                minHeight: '70px',
                '&:hover': { boxShadow: '0 0 10px rgba(200,200,200,0.2)'} }}>
                <Grid item  xs={12} sm={6}
                component={Link}
                to={`/Horse/${participant.horseId}`}
                sx={{
                  backgroundColor: `rgba(50,50,50,0.3)`,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  textTransform: 'none',
                  textDecoration: 'none',
                  paddingTop: 1,
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.4)'}, 
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
                <Grid item xs={12} sm={6}
                  component={Link}
                  to={`/Jockey/${participant.jockeyId}`}
                  sx={{
                    backgroundColor: `rgba(50,50,50,0.3)`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    textTransform: 'none',
                    textDecoration: 'none',
                    paddingY:1,
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.4)'}, 
                  }}>
                  {participant.jockeyName}
                </Grid>
              </Grid>
          </Box>
        ))}
      </Box>
    );
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
        View results
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
                fontWeight: '600'}}>
              To access the results, please log in.
            </Typography>
            <AuthPopup itsALogin={true} />
            </Box>
          ): (
            participants[0].placement ===0 ?
                <Box sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                    display: 'flex', 
                    flexDirection:'column',
                    gap: 1,
                    height: '200px'}}>
                <Typography sx={{
                    fontSize: '20px',
                    fontWeight: '600'}}>
                  Seems like this race is in progress.
                </Typography>
                 <Box sx={{display: 'flex', flexDirection: 'row'}}>
                  <Typography sx={{
                    fontSize: '20px',
                    marginX: 'auto',
                    fontWeight: '600',
                    color: 'transparent'
                  }}>{dots}</Typography>
                  <Typography sx={{
                      fontSize: '20px',
                      marginX: 'auto',
                      fontWeight: '600'}}>
                    Please wait patiently{dots}
                  </Typography>
                </Box>
                </Box>
              :
            <Grid container sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>                 
              {showHorses()}
            </Grid>
        )}
      </AccordionDetails>
    </Accordion>
  </Box>
  );
}
