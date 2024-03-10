import {useLocation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Register from './MuiPopup';
import {Box, Typography, Button, AppBar} from '@mui/material';
import { useSelector } from 'react-redux';
import UserIcon from './userIcon';
import {Link} from 'react-router-dom';
import Hamburger from './hamburgerMenu';

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
            <Button component={Link} to="/Home">
              <Typography variant='h5' color={'rgb(220, 220, 220)'}>BoredBets</Typography>
            </Button>
            {screenWidth>=550 &&
              <>
                <Button component={Link} to="/community">
                  <Typography variant='h7' color={'rgb(220, 220, 220)'}>Community</Typography>
                </Button>
                <Button component={Link} to="/races">
                  <Typography variant='h7' color={'rgb(220, 220, 220)'}>Races</Typography>
                </Button>
                {userData.isAdmin &&
                <Button component={Link} to="/admin">
                  <Typography variant='h7' color={'rgb(220, 220, 220)'}>Admin</Typography>
                </Button>
                }
              </>
            }
        </Box>
      {RightBoxContent()}
    </AppBar>
  );
}