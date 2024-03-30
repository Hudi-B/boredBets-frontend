import React, { useRef } from 'react';
import { apiUrl } from '../../../boredLocal';
import { useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { TextField, Box, Button } from '@mui/material';

export default function Register({data, callback}) {
    const [open, setOpen] = React.useState(false);  
    const [alertOnEmail, setAlertOnEmail] = React.useState(false);
    const [alertOnUsername, setAlertOnUsername] = React.useState(false);
    const [alertOnPass, setAlertOnPass] = React.useState(false);
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const handleChange = (event) => {
        callback(event);
    };

    const { enqueueSnackbar } = useSnackbar();

    
const handleRegister = async () => {
    const {username, email, password } = data;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const alerts = {
        email: !emailRegex.test(email),
        username: username.length <= 4,
        password: password.length <= 4,
    };
    setAlertOnUsername(alerts.username);
    setAlertOnEmail(alerts.email);
    setAlertOnPass(alerts.password);
    if(alerts.password)
    {
        if(alerts.email)
        {
            if(alerts.username)
            {
                usernameRef.current.focus();
                return;
            }
            emailRef.current.focus();
            return;
        }
        passwordRef.current.focus();
        return;
    }
    await axios.post(`${apiUrl}User/UserRegister`, data)
    .then(() => {
        enqueueSnackbar("Successful register, now try to Log in", {
            variant: 'success',
            autoHideDuration: 3000,
            TransitionComponent: Slide,
        });
        })
};


    return (
    <>
        <TextField 
            inputRef={usernameRef}
            id="registerUsername" 
            label="Username" 
            variant="outlined" 
            name="username" 
            value={data.username} 
            onChange={handleChange} 
            sx={{ '& p': { color: 'rgb(204, 2, 2)', fontWeight: 'bold', } }}
            onKeyDown={(e) => e.key === 'Enter' && emailRef.current.focus()}
            fullWidth
            helperText={alertOnUsername ? 'Please enter a valid Username' : ''}
        />
        
        <TextField 
            inputRef={emailRef}
            id="registerEmail" 
            label="Email" 
            variant="outlined" 
            name="email" 
            value={data.email} 
            onChange={handleChange}
            sx={{ '& p': { color: 'rgb(204, 2, 2)', fontWeight: 'bold', } }}
            onKeyDown={(e) => e.key === "Enter" && passwordRef.current.focus()}
            fullWidth
            helperText={alertOnEmail ? 'Please enter a valid Email' : ''}
        />
        
        <Box display="flex" spacing={1} alignItems="flex-start" > 
            <TextField 
                inputRef={passwordRef}
                className='popupPassword'
                id="registerPassword" 
                label="Password" 
                variant="outlined" 
                name="password" 
                onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
                value={data.password} 
                onChange={handleChange} 
                sx={{ flexGrow: 1, marginRight: 1, 
                    '& p': { color: 'rgb(204, 2, 2)', fontWeight: 'bold', } }}
                helperText={alertOnPass ? 'Please enter a valid password' : ''}
            />
            <Button variant='contained' sx={{ height: 55, width: 55 }} className='doitButton' onClick={handleRegister}>
                Go
            </Button>
        </Box>
    </>
    )
}