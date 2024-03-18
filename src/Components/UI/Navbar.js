import {useLocation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import AuthPopup from './AuthPopup';
import {Box, Typography, Button, AppBar, Chip, Stack} from '@mui/material';
import { useSelector } from 'react-redux';
import UserIcon from './userIcon';
import {Link} from 'react-router-dom';
import Hamburger from './hamburgerMenu';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import StadiumRoundedIcon from '@mui/icons-material/StadiumRounded';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import axios from 'axios';

import { apiUrl } from '../../boredLocal';
import { SecurityUpdateWarning } from '@mui/icons-material';


export default function Navbar( {background} ) {
  const userData = useSelector((state) => state.auth);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const location = useLocation();
  const [wallet,setWallet] = useState();

  const handleScreenResize = () => {
    setScreenWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleScreenResize);
    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };
  });


const GetWallet = () => {
  axios.get(`${apiUrl}User/GetWalletByUserId?UserId=${userData.userId}`)
  .then((response) => {
    setWallet(response.data.wallet);
  })
  .catch((error) => {
    console.log(error);
  })
}


useEffect((event) => {
  if (userData.isLoggedIn) {
    GetWallet();
  }
},[userData])


const RightBoxContent = () => {
    if (userData.isLoggedIn === null) {
      return null;
    } else if (userData.isLoggedIn) {
      return  (
        <Stack direction={'row'} spacing={1} alignItems={'center'}> 
          <Chip label={wallet} sx={{ color: 'white'}} />
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
            {screenWidth<550 && <Hamburger isAdmin={userData.isAdmin} />}
            <Button style={{color: 'white', fontSize: '25px'}} component={Link} to="/">
              BoredBets
            </Button>
            {screenWidth>=550 &&
              <>
                <Button style={{color: 'white', fontSize: '13px'}} component={Link} to="/community">
                  <PeopleRoundedIcon sx={{marginRight: '3px'}}/>Community
                </Button>
                <Button style={{color: 'white', fontSize: '13px'}} component={Link} to="/races">
                  <StadiumRoundedIcon sx={{marginRight: '3px'}}/>Races
                </Button>
                {userData.isAdmin &&
                <Button style={{color: 'white', fontSize: '13px'}} component={Link} to="/admin">
                  <EngineeringRoundedIcon sx={{marginRight: '3px'}}/>Admin
                </Button>
                }
              </>
            }
        </Box>
      {RightBoxContent()}
    </AppBar>
  );
}