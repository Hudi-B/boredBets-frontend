import { useEffect, useState } from 'react';
import AuthPopup from './AuthPopup';
import {Box, Button, AppBar, Chip, Stack, Hidden} from '@mui/material';
import { useSelector } from 'react-redux';
import UserIcon from './UserIcon';
import {Link} from 'react-router-dom';
import Hamburger from './HamburgerMenu';
import StadiumRoundedIcon from '@mui/icons-material/StadiumRounded';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import axios from 'axios';

import { apiUrl } from '../../boredLocal';


export default function Navbar( {background} ) {
  const userData = useSelector((state) => state.auth);


const RightBoxContent = () => {
    if (userData.isLoggedIn === null) {
      return null;
    } else if (userData.isLoggedIn) {
      return  (
        <Stack direction={'row'} spacing={1} alignItems={'center'}> 
          <Chip label={userData.wallet} sx={{ color: 'white'}} />
          <UserIcon />
        </Stack>
      );
    } else {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '10px',
            marginLeft: '10px',
            flexWrap: 'nowrap'
          }}
        >
          <AuthPopup itsALogin={true} />
          <AuthPopup itsALogin={false} />
        </Box>
      );
    }
};

  return (
    <AppBar sx={{
      position: 'sticky',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: {background},
      paddingInline: '10px',
      minHeight: '65px'}} className='preventSelect'>
        <Box sx={{
          display: 'flex',
          gap: '15px'}}>
            <Hidden mdUp><Hamburger isAdmin={userData.isAdmin} /></Hidden>
            <Button style={{color: 'white', fontSize: '25px'}} component={Link} to="/">
              <Hidden smDown>BoredBets</Hidden>
              <Hidden smUp>BB</Hidden>
            </Button>
            <Hidden mdDown>
                <Button style={{color: 'white', fontSize: '13px'}} component={Link} to="/discover">
                  <PeopleRoundedIcon sx={{marginRight: '3px'}}/>Discover
                </Button>
                <Button style={{color: 'white', fontSize: '13px'}} component={Link} to="/races">
                  <StadiumRoundedIcon sx={{marginRight: '3px'}}/>Races
                </Button>
                {userData.isAdmin &&
                <Button style={{color: 'white', fontSize: '13px'}} component={Link} to="/admin">
                  <EngineeringRoundedIcon sx={{marginRight: '3px'}}/>Admin
                </Button>
                }
            </Hidden>
        </Box>
      {RightBoxContent()}
    </AppBar>
  );
}