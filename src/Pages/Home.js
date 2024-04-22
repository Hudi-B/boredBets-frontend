import {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../boredLocal';
import Box from '@mui/material/Box';
import { Typography, Grid, Paper, Divider, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';

import First from '../Components/Home/First'

export default function HomePage() {

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

