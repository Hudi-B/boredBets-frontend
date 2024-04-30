import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Popover, Button, Typography, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {logout} from '../../auth/authSlice';
import { clearCookies } from '../../boredLocal';

export default function UserIcon() {
  const userData = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toUserPage = () => {
      handleClose();
      navigate(`/mypage`);
  };

  const handleLogout = () => {
    dispatch(logout());
    clearCookies('');
    navigate('/');
  }
  
    return (
    <>
        <Box onClick={handleOpen}
            sx={{
              cursor: 'pointer',
              borderRadius: '40%',
              height: '50px',
              width: '50px',
              overflow: 'hidden',
            }}>
              {/*process.env.PUBLIC_URL + pfpImage*/}
              <Avatar sx={{width: '100%', height: '100%'}} src={userData.imageUrl} />
        </Box>
        <Popover
          open={Boolean(anchorEl)}
          elevation={5}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          PaperProps={{
            sx: {
              background:'none',
              borderRadius: '15px', // Set the desired borderRadius
            },
          }}
        >
          <Box sx={{
              display: 'flex', 
              flexDirection: 'column', 
              gap: '7px', 
              background:'none',
              backgroundColor: 'rgb(54, 54, 54)',
              }}>
              <Typography sx={{fontWeight: '600', color: 'white',paddingX:2, paddingTop:2, backgroundColor: 'rgba(200, 200, 200, 0.07)'}} className='preventSelect'>
                {userData.username}
              </Typography>
              <Button onClick={toUserPage} sx={{flexWrap: 'nowrap', marginX:3}} color='secondary' variant='contained'>Go to my page</Button>
              <Button onClick={handleLogout} variant='outlined' sx={{flexWrap: 'nowrap', marginX:3, marginBottom:1}} color='warning'>Log out</Button>
        </Box>
      </Popover>
    </>
    );
}
