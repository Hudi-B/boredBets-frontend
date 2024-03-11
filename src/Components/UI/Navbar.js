import {useLocation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Register from './MuiPopup';
import {Box, Typography, Button, AppBar} from '@mui/material';
import { useSelector } from 'react-redux';
import UserIcon from './userIcon';
import {Link} from 'react-router-dom';
import Hamburger from './hamburgerMenu';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import StadiumRoundedIcon from '@mui/icons-material/StadiumRounded';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';




export default function Navbar( {background} ) {
  const [onUserPage, setOnUserPage] = useState(true);
  const userData = useSelector((state) => state.auth);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const location = useLocation();

  const handleScreenResize = () => {
    setScreenWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleScreenResize);
    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };
  });



useEffect(() => {
  let url = location.pathname;
  if (url.includes("mypage")) {
    setOnUserPage(true);
  } else {
    setOnUserPage(false);
  }

}, [location.pathname]);




const RightBoxContent = () => {
  if (!onUserPage) {
    if (userData.isLoggedIn === null) {
      return null;
    } else if (userData.isLoggedIn) {
      return <UserIcon />;
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
          <Register itsALogin={true} />
          <Register itsALogin={false} />
        </Box>
      );
    }
  } else {
    return null;
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
                  <PeopleRoundedIcon/>Community
                </Button>
                <Button style={{color: 'white', fontSize: '13px'}} component={Link} to="/races">
                  <StadiumRoundedIcon/>Races
                </Button>
                {userData.isAdmin &&
                <Button style={{color: 'white', fontSize: '13px'}} component={Link} to="/admin">
                  <EngineeringRoundedIcon/>Admin
                </Button>
                }
              </>
            }
        </Box>
      {RightBoxContent()}
    </AppBar>
  );
}