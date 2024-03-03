import React from 'react';
import { Box, Typography } from '@mui/material';

export default function NotFound() {
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
            paddingTop: '50px',
            backgroundColor: 'rgb(2, 145, 138)'}} className="noScrollBar">
              <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'}} className='preventSelect'>
                  <Typography variant='h3' textAlign={'center'}>The page you’re looking for doesn’t exist.</Typography>
                  <Typography variant='h2' textAlign={'center'} fontWeight={'800'}>Bet on boredBets</Typography>
              </Box>
        </Box>
    )
}