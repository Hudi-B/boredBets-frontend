import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton, Popover, Box, Paper, Badge, Typography, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../boredLocal';
import axios from 'axios';
import { fontColor } from '../../boredLocal';

import { enqueueSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';

export default function Notifications() {
    const [anchorEl, setAnchorEl] = useState(null);
    const userData = useSelector((state) => state.auth);
    const [notifications, setNotifications] = useState([]);
    const [notificationNumber, setNotificationNumber] = useState(0);
    const [seen, setSeen] = useState(false);
    const [pending, setPending] = useState(true);
    
    const moment = require('moment');
    const dateFormat = "MMMM DD. HH:mm";


    const getNotifications = () => {
        axios.get(apiUrl + `Notifications/GetAllUnseenNotificationsByUserId?UserId=` + userData.userId)
          .then(response => {
            setNotifications(oldNotifications => [...oldNotifications, ...response.data]); //if there are multiple notifications, append them together
            setNotificationNumber(oldNumber => oldNumber + response.data.length);
            setPending(false);
          }).catch(error => {
            console.log(error);
            enqueueSnackbar("Error while accessing your notifications.", {
              variant: 'error',
              autoHideDuration: 3000,
              TransitionComponent: Slide,
            });
          });
      };
    
      useEffect(() => {
        getNotifications();
    
        const intervalId = setInterval(getNotifications, 2 * 60 * 1000);
    
        return () => clearInterval(intervalId);
      }, []); // Empty 
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(false);
        setSeen(true);
      };
useEffect(() => {
  if (seen) {
    setTimeout(() => {
        setNotificationNumber(0);
      }, 500);
  }
}, [anchorEl]);

    const writeNotification = (notification) => {
        switch (notification.source) {
          case 'bet':
            return (
            <Box key={notification.id} sx={{textDecoration: 'none', color: 'white'}}>
                <Typography sx={{fontWeight: '600'}} className='preventSelect'>
                    Betting
                </Typography>
                <Typography className='preventSelect'>
                    Your bet on {moment(notification.raceDate).format(dateFormat)} race has concluded.
                </Typography>
                <Divider color="white" />
            </Box>)

        case 'wallet':
            return (
                <Box key={notification.id} sx={{textDecoration: 'none', color: 'white'}}>
                    <Typography sx={{fontWeight: '600'}} className='preventSelect'>
                        Wallet
                    </Typography>
                    <Typography className='preventSelect'>
                        Your wallet could use a refill! Why not add some funds to keep it happy?
                    </Typography>
                    <Divider color="white" />
                </Box>)
            
          default:
            console.log(notification);
            break;
        }
    }


    return (
    <Box>
        <IconButton color='inherit' onClick={handleOpen}>
            <Badge badgeContent={notificationNumber} color="success">
                <NotificationsIcon sx={{color: fontColor}} />
            </Badge>
        </IconButton>
        <Popover
            open={Boolean(anchorEl)}
            elevation={20}
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
            <Paper sx={{
                display: 'flex', 
                flexDirection: 'column', 
                padding: '10px',
                gap: '7px', 
                background:'none',
                color: 'white',
                backgroundColor: 'rgb(54, 54, 54)',
                border: '3px solid rgb(54,54,54)',
              }}>
                {notifications.length === 0 && <Typography sx={{color: 'white', marginY:0.5, marginX:3}}>No notifications yet.</Typography>}
                {notifications.map((notification) => (
                    writeNotification(notification)
                ))}
            </Paper>
      </Popover>
    </Box>
    );
}