import {useLocation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Register from './MuiPopup';
import {Box, Link, Typography} from '@mui/material';
import { useSelector } from 'react-redux';
import UserIcon from './userIcon';

export default function Header() {
  const [onUserPage, setOnUserPage] = useState(true);
  const userData = useSelector((state) => state.auth);
  const location = useLocation();

useEffect(() => {
  let url = location.pathname;
  if (url.includes("login") || url.includes("register") || url.includes("mypage")) {
    setOnUserPage(false);
  } else {
    setOnUserPage(true);
  }
}, [location.pathname]);




  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'rgb(54, 54, 54)',
      paddingInline: '10px',
      minHeight: '65px',
      color: 'white',
      overflow: 'hidden',
      flexWrap: 'nowrap'}}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '15px',
          height: 'fill',
          flexWrap: 'nowrap'}}>
            <Link href="/" underline='none' sx={{cursor: 'pointer'}}>
              <Typography variant='h4' color={'rgb(220, 220, 220)'}>BoredBets</Typography>
            </Link>
            <Link href="/community" underline='none' sx={{cursor: 'pointer'}}>
              <Typography variant='h7' color={'rgb(200, 100, 100)'}>Community</Typography>
            </Link>
            <Link href="/races" underline='none' sx={{cursor: 'pointer'}}>
              <Typography variant='h7' color={'rgb(200, 100, 100)'}>Races</Typography>
            </Link>
            {userData.isAdmin &&
              <Link href="/admin" underline='none' sx={{cursor: 'pointer'}}>
                <Typography variant='h7' color={'rgb(200, 100, 100)'}>AdminPage</Typography>
              </Link>
             }
        </Box>

      {
        onUserPage ? 
          userData.isLoggedIn ? 
            <UserIcon />
            :
            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '10px',
              marginLeft: '10px',
              flexWrap: 'nowrap'}}>
                <Register thisIsA={'Login'} />
                <Register thisIsA={'Register'} />
            </Box>
         : null
      }
    </Box>
  );
}
