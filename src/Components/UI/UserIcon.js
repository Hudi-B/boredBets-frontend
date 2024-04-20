import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Popover, Button, Typography, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {logout} from '../../auth/authSlice';
import { clearCookies } from '../../boredLocal';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function UserIcon() {
  const [pfpImage, setPfpImage] = useState('./stock_pfp.png'); //should also pull the user's pfp, and only set it to default if it doesn't exist
  const userData = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  console.log(userData);
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
              <Avatar sx={{width: '100%', height: '100%'}} src={process.env.PUBLIC_URL + "images/" +pfpImage} />
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
              padding: '10px',
              gap: '7px', 
              background:'none',
              backgroundColor: 'rgb(54, 54, 54)',
              border: '3px solid rgb(54,54,54)',
              }}>
              <Button onClick={toUserPage} sx={{flexWrap: 'nowrap'}} variant='contained'>Go to my page</Button>
              <Button onClick={handleLogout} variant='outlined' color='warning'>Log out</Button>
        </Box>
      </Popover>
    </>
    );
}
