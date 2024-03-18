import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Popover, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {logout} from '../../auth/authSlice';
import { clearCookies } from '../../boredLocal';
import Cookie from 'js-cookie';

export default function UserIcon() {
  const [pfpImage, setPfpImage] = useState('./stock_pfp.png'); //should also pull the user's pfp, and only set it to default if it doesn't exist
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
      navigate(`/mypage/${userData.userId}`);
  };

  const handleLogout = () => {
    dispatch(logout());
    clearCookies('');
  }
  
    return (
    <>
        <Box onClick={handleOpen}
            sx={{
              cursor: 'pointer',
              borderRadius: '40%',
              height: '50px',
              minimumWidth: '50px',
              overflow: 'hidden',
            }}>
            <img 
                src={process.env.PUBLIC_URL + pfpImage} 
                alt='why'
                style={{
                    objectFit: 'cover', 
                    height: '100%',
                    width: '100%'
                }} />
        </Box>
        <Popover
        open={Boolean(anchorEl)}
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
      >
        <Box sx={{
            display: 'flex', 
            flexDirection: 'column', 
            padding: '10px',
            gap: '7px', 
            backgroundColor: 'rgb(54, 54, 54)',
            border: '2px solid rgb(90, 90, 90)',
            }}>
                <Typography variant='h6'>{userData.id}</Typography>
            <Button onClick={toUserPage} sx={{flexWrap: 'nowrap'}} variant='contained'>Go to my page</Button>
            <Button onClick={handleLogout} variant='outlined' color='warning'>Log out</Button>
        </Box>
      </Popover>
    </>
    );
}