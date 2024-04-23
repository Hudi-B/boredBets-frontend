import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton, Popover, Box, Paper, Badge, Typography, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../boredLocal';
import axios from 'axios';

import { enqueueSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';

export default function Notifications() {
    const [anchorEl, setAnchorEl] = useState(null);
    const userData = useSelector((state) => state.auth);
    const [notifications, setNotifications] = useState([]);
    const [notificationNumber, setNotificationNumber] = useState(3);
    const [seen, setSeen] = useState(false);
    const [pending, setPending] = useState(true);

    const notificationss = [
        {
          id: 'abc123',
          userId: 'xyz789',
          source: 'bet',
          raceDate: '2024-05-01',
          created: '2024-04-23T09:00:00'
        },
        {
          id: 'def456',
          userId: 'xyz789',
          source: 'wallet',
          created: '2024-04-23T10:30:00'
        },
        {
          id: 'ghi789',
          userId: 'abc456',
          source: 'bet',
          raceDate: '2024-05-03',
          created: '2024-04-23T11:45:00'
        }
      ];

    useEffect(() => {
        axios.get(apiUrl+`user/getUserNotifications?userId=` + userData.id)
        .then(response => {
            setNotifications(response.data);
            setNotificationNumber(response.data.length);
            console.log(response.data);
            setPending(false);
        }).catch(error => {
            console.log(error);
            enqueueSnackbar("Error while accessing your notifications.", {
                variant: 'error',
                autoHideDuration: 3000,
                TransitionComponent: Slide,
              });
        })
    },[])
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
                    Your bet on {notification.raceDate} race has concluded. Check out the results in your profile's betting history.
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
            <Badge badgeContent={notificationNumber} color="primary">
                <NotificationsIcon />
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
                {notificationNumber === 0 ? 
                    <Typography sx={{color:'white', marginY:1, marginX:5}}>No new notifications.</Typography> 
                    :
                    notificationss.map((notification) => (
                        writeNotification(notification)
                    ))
                }
            </Paper>
      </Popover>
    </Box>
    );
}