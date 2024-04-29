import * as React from 'react';
import { Button, Box,Dialog, Stack, Paper, Hidden, Avatar } from '@mui/material';
import Login from './AuthPopup/Login';
import Register from './AuthPopup/Register';
import CloseIcon from '@mui/icons-material/Close';
import { secondaryColor } from '../../boredLocal';
export default function AuthPopup({itsALogin}) {
  const [open, setOpen] = React.useState(false); 
  const [onLogin, setOnLogin] = React.useState();
  const [fullscreen, setFullscreen] = React.useState(false);
  const [formState, setFormState] = React.useState({
    username: '',
    email: '',
    password: '',
  });    
    const handleClickOpen = () => {
        setOpen(true);
        setOnLogin(itsALogin);
    };

    const handleClose = () => {
        setFormState({username: '',email:'', password: ''});
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'emailOrUsername') {
            setFormState((prevState) => ({
                ...prevState,
                username: value,
                email: value,
                }));
        }
        setFormState((prevState) => ({
        ...prevState,
        [name]: value,
        }));
    };

    return (
        <>
        {itsALogin? 
            <Button sx={{flexWrap: 'nowrap', whiteSpace:'nowrap'}} variant={"outlined"} onClick={handleClickOpen}>
                Login
            </Button>
            :
            <Hidden smDown>
                <Button sx={{flexWrap: 'nowrap', whiteSpace:'nowrap'}} variant={"contained"} onClick={handleClickOpen}>
                    Sign up
                </Button>    
            </Hidden>
        }       
            <Dialog
                open={open}
                className="preventSelect"
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullScreen={fullscreen}
            >
                <Box 
                sx={{
                    backgroundColor: secondaryColor,
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

                        <Stack sx={{gap: 1}}>
                            <Box display="flex" justifyContent="center" gap={1} marginBottom={1}>
                                
                                <Paper
                                    elevation={onLogin ? 3 : 0}
                                    square
                                    sx={{
                                        flexWrap: 'nowrap', 
                                        borderRadius: '10px',
                                        paddingX: 3,
                                        paddingY: 0.7,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        whiteSpace:'nowrap',
                                        backgroundColor: "transparent",
                                        '&:hover': {
                                            backgroundColor: 'rgba(50, 50, 50, 0.11)',
                                          },
                                          '&:active': {
                                              backgroundColor: 'rgba(50, 50, 50, 0.08)',
                                            },
                                        }}
                                    onClick={() => setOnLogin(true)}>
                                    Sign in
                                </Paper>
                                <Paper
                                    elevation={!onLogin ? 3 : 0}
                                    square
                                    sx={{
                                        flexWrap: 'nowrap', 
                                        borderRadius: '10px',
                                        paddingX: 3,
                                        paddingY: 0.7,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        whiteSpace:'nowrap',
                                        backgroundColor: "transparent",
                                        '&:hover': {
                                            backgroundColor: 'rgba(50, 50, 50, 0.11)',
                                          },
                                          '&:active': {
                                              backgroundColor: 'rgba(50, 50, 50, 0.08)',
                                            },
                                        }}
                                        onClick={() => {
                                            setOnLogin(false); 
                                            setFormState({username: '',email:'', password: ''})
                                            }}>
                                        Sign up
                                </Paper>
                            </Box>
                            {
                                onLogin
                                ?
                                <Login data={formState} callback={handleChange}/>
                                :
                                <Register data={formState} callback={handleChange} />
                            }
                        </Stack>
                </Box>
            </Dialog>
        </>
    );
}