import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton, Popover, Box, Badge, Typography, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Notifications() {
    const [anchorEl, setAnchorEl] = useState(null);
    const userData = useSelector((state) => state.auth);
    const [notifications, setNotifications] = useState([]);
    const [notificationNumber, setNotificationNumber] = useState(3);
    useEffect(() => {
        setNotifications([
            {
                id: 1,
                title: 'Match concluded',
                body: 'Your bet on "Match 1" has been concluded, click here to check out the results.',
            },
            {
                id: 2,
                title: 'Notification Title 2',
                body: 'Notification Body 2',
            },
            {
                id: 3,
                title: 'Notification Title 3',
                body: 'Notification Body 3',
            },
        ]);
    },[])
    const handleOpen = (event) => {
        /*axios.get(apiUrl+`user/getUserNotifications?userId=` + userId)
        .then(response => {
            setNotifications(response.data);
        }).catch(error => {
            console.log(error);
        })*/
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
        setNotificationNumber(0);
      };

    return (
    <Box>
        <IconButton color='inherit' onClick={handleOpen}>
            <Badge badgeContent={notificationNumber} color="primary">
                <NotificationsIcon />
            </Badge>
        </IconButton>
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
                color: 'white',
                backgroundColor: 'rgb(54, 54, 54)',
                border: '3px solid rgb(54,54,54)',
              }}>
                {notifications.map((notification) => (
                    <Box key={notification.id} sx={{textDecoration: 'none', color: 'white'}} component={Link} to={`/myPage/bets/${notification.id}`}>
                        <Typography sx={{fontWeight: '600'}} className='preventSelect'>
                            {notification.title}
                        </Typography>
                        <Typography className='preventSelect'>
                            {notification.body}
                        </Typography>
                    <Divider color="white" />
                    </Box>
                ))}
            </Box>
      </Popover>
    </Box>
    );
}