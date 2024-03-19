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

export default function AuthPopup({itsALogin}) {
  const [open, setOpen] = React.useState(false); 
  const [onLogin, setOnLogin] = React.useState();
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({
        ...prevState,
        [name]: value,
        }));
    };

    return (
        <>
            <Button variant={itsALogin ? "outlined" : "contained"} onClick={handleClickOpen}>
                {itsALogin? "Login" : "Sign up"}
            </Button>
            <Dialog
                open={open}
                className="preventSelect"
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Box 
                sx={{
                    backgroundColor: 'rgb(60, 150, 120)',
                    width: '450px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    height: '600px',
                    padding:'40px'}}>
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
                            }}>
                            Logo
                        </Box>
                        <Stack sx={{gap: 1}}>
                            <Box display="flex" justifyContent="center" gap={1} marginBottom={1}>
                                <Button 
                                    variant='string' 
                                    onClick={() => setOnLogin(true)}> 
                                    Sign in
                                </Button>
                                <Button 
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