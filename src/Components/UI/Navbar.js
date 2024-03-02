import {useLocation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Register from './MuiPopup';
import {Box, Typography, Button, AppBar, Toolbar} from '@mui/material';
import { useSelector } from 'react-redux';
import UserIcon from './userIcon';
import {Link} from 'react-router-dom';
import {logout} from '../../auth/authSlice';
import { useDispatch } from 'react-redux';

export default function Navbar() {
  const [onUserPage, setOnUserPage] = useState(true);
  const userData = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

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
      return null; // If the website hasn't determined whether the user is logged in or not, nothing will appear
    } else if (userData.isLoggedIn) {
      return <UserIcon />; // If the user is logged in, their icon will appear
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
          <Register thisIsA={'Login'} />
          <Register thisIsA={'Register'} />
        </Box>
      ); // If the user is not logged in, the login and register buttons will appear
    }
  } else {
    return null; // If the user is on the user page, nothing will appear
  }
};




  return (
    <AppBar sx={{
      position: 'sticky',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'rgb(54, 54, 54)',
      paddingInline: '10px',
      minHeight: '65px'}} className='preventSelect'>
        <Box sx={{
          display: 'flex',
          gap: '15px'}}>
            <Button component={Link} to="/">
              <Typography variant='h5' color={'rgb(220, 220, 220)'}>BoredBets</Typography>
            </Button>
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
        </Box>
      {RightBoxContent()}
    </AppBar>
  );
}
