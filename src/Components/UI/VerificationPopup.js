import * as React from 'react';
import { Button, Box,Dialog, Stack, Paper, Hidden, Avatar } from '@mui/material';
import Login from './AuthPopup/Login';
import Register from './AuthPopup/Register';
import CloseIcon from '@mui/icons-material/Close';

export default function VerificationPopup(data) {
  const [open, setOpen] = React.useState(data.open); 
  const [fullscreen, setFullscreen] = React.useState(false);
  console.log(data);
    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        if (window.innerWidth < 500) {
            setFullscreen(true);
        }
        else {
            setFullscreen(false);
        }
    }, [window.innerWidth]);


    return (
        <>
            <Dialog
                open={open}
                className="preventSelect"
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullScreen={fullscreen}
                sx={{zIndex: 1000}}
            >
                <Box 
                sx={{
                    backgroundColor: 'rgb(60, 150, 120)',
                    width: fullscreen? '100%' : '450px',
                    maxWidth: '100%',
                    height: fullscreen? '100%' : '600px',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    padding:'30px'}}>
                        {fullscreen &&
                        <Button onClick={handleClose}
                        sx={{
                            ripple: 'rgba(50, 50, 50, 0.5)',
                            position: 'absolute', 
                            top: 10, 
                            left: 10, 
                            borderRadius: '50%',
                            '&:hover': {
                                backgroundColor: 'rgba(50, 50, 50, 0.2)',
                              },
                              '&:active': {
                                backgroundColor: 'rgba(50, 50, 50, 0.5)',
                              },
                        }}>
                            <CloseIcon sx={{fontSize: '50px', color: 'rgb(50, 50, 50)'}}/>
                        </Button>
                        }
                        <Avatar variant='rounded' sx={{width: '100%', height: 'auto', marginY:7, marginTop: fullscreen? '15vh' : 5,}} src={process.env.PUBLIC_URL + "/images/banner.png"} />

                </Box>
            </Dialog>
        </>
    );
}