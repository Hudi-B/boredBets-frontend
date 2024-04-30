import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

import First from '../Components/Home/First'

import Second from '../Components/Home/Second'

import Third from '../Components/Home/Third'

export default function HomePage() {
  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      alignItems: 'center',
      margin: '0px',
      overflowY: 'auto',
      paddingTop: '30px',
      backgroundColor: 'rgb(63, 85, 115)'}} className="noScrollBar">

        <First/>
        
        <Second/>

        <Third/>
        
        <Box sx={{
          paddingX: 5,
          paddingY: 20,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'}} className='preventSelect'>
            <Typography variant='h3' textAlign={'center'}>Don’t let boredom get you down.</Typography>
            <Typography variant='h2' textAlign={'center'} fontWeight={'800'}>Bet on boredBets</Typography>
        </Box>

    </Box>
  );
}

