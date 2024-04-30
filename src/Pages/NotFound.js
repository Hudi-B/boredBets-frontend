import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';

export default function NotFound({lookedFor}) {
  console.log(lookedFor);
    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            margin: '0px',
            overflowY: 'auto',
            paddingY: '50px',
            backgroundColor: 'rgb(63, 85, 115)'}}>
              <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'}} className='preventSelect'>
                  <Typography variant='h3' textAlign={'center'}>The {lookedFor} you’re looking for doesn’t exist.</Typography>
                  <Typography variant='h2' textAlign={'center'} fontWeight={'800'}>Bet on boredBets</Typography>
                  <Avatar variant='square' src={process.env.PUBLIC_URL + '/images/errorcatlight.png'} sx={{height: '400px', width: 'auto' }}/>
              </Box>
        </Box>
    )
}