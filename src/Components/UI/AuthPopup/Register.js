import React, { useRef, useEffect, useState } from 'react';
import { apiUrl, fontColor } from '../../../boredLocal';
import { useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { TextField, Box, Button, InputAdornment, Tooltip, IconButton, FormControlLabel, Checkbox } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';

export default function Register({data, callback}) {
    const [alertOnEmail, setAlertOnEmail] = useState(false);
    const [alertOnUsername, setAlertOnUsername] = useState(false);
    const [alertOnPass, setAlertOnPass] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [pending, setPending] = useState(false);
    const [oldEnough, setOldEnough] = useState(false);
    const [alertOnAge, setAlertOnAge] = useState(false);
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    console.log(oldEnough);
    
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
        age: !oldEnough
    };
    setAlertOnUsername(alerts.username);
    setAlertOnEmail(alerts.email);
    setAlertOnPass(alerts.password);
    setAlertOnAge(alerts.age);
    if(alerts.username) //set Focus for inputs if there is an error
    {
        usernameRef.current.focus();
        return;
    }
    if(alerts.email)
    {
        emailRef.current.focus();
        return;
    }
    if(alerts.password)
    {
        passwordRef.current.focus();
        return;
    }
    if(alerts.age)
    {
        enqueueSnackbar("You must be at least 18 years old to register.", {
            variant: 'error',
            autoHideDuration: 3000,
            TransitionComponent: Slide,
        });
        return;
    }

    setPending(true);
    axios.post(`${apiUrl}User/UserRegister`, data)
    .then((response) => {
        console.log(response.data);
        enqueueSnackbar("Successful register! Before login you need to verify your account through email. Please check your inbox.", {
            variant: 'success',
            autoHideDuration: 5000,
            TransitionComponent: Slide,
        });
    })
    .catch((error) => {
        enqueueSnackbar(error.response.data, {
            variant: 'error',
            autoHideDuration: 3000,
            TransitionComponent: Slide,
        });
    }).finally(() => {
        setPending(false);
        
    })

};



    return (
    <>
        {pending && (
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    color: 'white',
                    flexDirection: 'column',
                }}
            >
                <CircularProgress color='inherit' />
            </Box>
        )}

        <TextField 
            inputRef={usernameRef}
            id="registerUsername" 
            label="Username" 
            variant="outlined" 
            name="username" 
            autoComplete='off'
            autoFocus
            autoCapitalize='off'
            value={data.username} 
            onChange={handleChange} 
            sx={{ '& p': { color: 'rgb(204, 2, 2)', fontWeight: 'bold', } }}
            onKeyDown={(e) => e.key === 'Enter' && emailRef.current.focus()}
            fullWidth
            helperText={alertOnUsername ? 'Please enter a valid Username' : ''}
            
            InputProps={{
                startAdornment: (
                    alertOnUsername &&
                  <InputAdornment position="start">
                    <Tooltip placement="top" sx={{ cursor: 'default'  }} title="Your username must be at least 5 characters">
                        <InfoIcon sx={{ color: 'rgb(220,220,220)' }}/>
                    </Tooltip>
                  </InputAdornment>
                ),
            }}
        />
        
        <TextField 
            inputRef={emailRef}
            id="registerEmail" 
            label="Email" 
            variant="outlined" 
            name="email" 
            value={data.email} 
            autoComplete='off'
            autoCapitalize='off'
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
                autoComplete='off'
                autoCapitalize='off'
                variant="outlined" 
                type={showPassword ? 'text' : 'password'}
                name="password" 
                onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
                value={data.password} 
                onChange={handleChange} 
                sx={{ flexGrow: 1, marginRight: 1, 
                    '& p': { color: 'rgb(204, 2, 2)', fontWeight: 'bold', } }}
                helperText={alertOnPass ? 'Please enter a valid password' : ''}

                InputProps={{
                    startAdornment: (
                        alertOnPass &&
                      <InputAdornment position="start">
                        <Tooltip placement="top" sx={{ cursor: 'default' }} title="Your password must be at least 5 characters">
                            <InfoIcon sx={{ color: 'rgb(220,220,220)' }}/>
                        </Tooltip>
                      </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={()=>setShowPassword(!showPassword)}
                                onMouseDown={(event) => event.preventDefault()}
                            >
                                {showPassword ? <VisibilityOff sx={{ color: 'rgb(220, 220, 220)'}} /> : <Visibility sx={{ color: 'rgb(220, 220, 220)'}} />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Button variant='contained' color='primary' disabled={pending} sx={{ height: 55, width: 55 }} className='doitButton' onClick={handleRegister}>
            Go
            </Button>
        </Box>
        <Box sx={{width:'100%', display:'flex', justifyContent:'flex-end'}}>
            <FormControlLabel
            control={<Checkbox checked={oldEnough} onChange={(event) => setOldEnough(event.target.checked)} style={{ color: 'rgb(220,220,220)' }} />}
            label="I'm over the age of 18"
            style={{ color: fontColor }}
            labelPlacement='start'
            color={alertOnAge && 'error' }
        />
        </Box>
    </>
    )
}