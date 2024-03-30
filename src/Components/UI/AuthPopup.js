import * as React from 'react';
import axios from 'axios';
import { Button, Box, Checkbox, Dialog, DialogContent, FormControlLabel, TextField, Stack } from '@mui/material';
import { apiUrl, setCookieToken } from '../../boredLocal';
import { useDispatch } from 'react-redux';
import { login } from '../../auth/authSlice';
import { useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';
import Login from './AuthPopup/Login';
import Register from './AuthPopup/Register';
import CloseIcon from '@mui/icons-material/Close';

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
            <Button sx={{flexWrap: 'nowrap', whiteSpace:'nowrap'}} variant={itsALogin ? "outlined" : "contained"} onClick={handleClickOpen}>
                {itsALogin? "Login" : "Sign up"}
            </Button>
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
                    backgroundColor: 'rgb(60, 150, 120)',
                    width: fullscreen? '100%' : '450px',
                    maxWidth: '100%',
                    height: fullscreen? '100%' : '600px',
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
                        <Box sx={{
                            display: 'flex', 
                            justifyContent: 'center',
                            alignItems: 'center', 
                            backgroundColor: 'rgb(50, 50, 50)', 
                            minHeight: '200px',
                            color: 'white',
                            fontSize: '60px',
                            letterSpacing: '10px',
                            fontWeight: 'bold',
                            borderRadius: '30px',
                            marginBottom: '10px',
                            marginTop: fullscreen? '15vh' : '0px',
                            }}>
                            Logo
                        </Box>
                        <Stack sx={{gap: 1}}>
                            <Box display="flex" justifyContent="center" gap={1} marginBottom={1}>
                                <Button 
                                    sx={{flexWrap: 'nowrap', whiteSpace:'nowrap'}}
                                    variant='string' 
                                    onClick={() => setOnLogin(true)}> 
                                    Sign in
                                </Button>
                                <Button 
                                    sx={{flexWrap: 'nowrap', whiteSpace:'nowrap'}}
                                    variant='string'
                                    onClick={() => {
                                        setOnLogin(false); 
                                        setFormState({username: '',email:'', password: ''})
                                        }}> 
                                        Sign up
                                </Button>
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