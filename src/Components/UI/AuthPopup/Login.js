import { Button, Box, TextField } from '@mui/material';
import React, {useEffect, useRef} from 'react';
import { apiUrl } from '../../../boredLocal';
import { useDispatch } from 'react-redux';
import { login } from '../../../auth/authSlice';
import { useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { setCookieToken } from '../../../boredLocal';
import {InputAdornment, IconButton} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import CircularProgress from '@mui/material/CircularProgress';

export default function Login({data, callback}) {
    const [alertOnLogin, setAlertOnLogin] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [alertOnPass, setAlertOnPass] = React.useState(false);
    const [pending, setPending] = React.useState(false);

    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const loginRef = useRef(null);
    const passwordRef = useRef(null);

    const handleLogin = async () => {
        const temp =  data.username? data.username : data.email? data.email : ''; // selects the avaliable data from either username or email, on default will return with empty, so it stops on the alertChecks
        const alerts = {
            emailOrUsername: temp.length < 4,
            password: data.password.length < 4
        }
        setAlertOnLogin(alerts.emailOrUsername);
        setAlertOnPass(alerts.password);

    if(alerts.emailOrUsername)
    {
        loginRef.current.focus();
        return;
    }
    if(alerts.password)
    {
        passwordRef.current.focus();
        return;
    }
        setPending(true);
        try {
            const response = await axios.post(`${apiUrl}User/UserLogin`, {
                emailOrUsername: temp,
                password: data.password
            });
            setCookieToken(true, response.data.accessToken);
            setCookieToken(false, response.data.refreshToken);
            dispatch(login(response.data));               
            enqueueSnackbar("Succesfull login", {
                variant: 'success',
                autoHideDuration: 3000,
                TransitionComponent: Slide,
            });
        } catch(error) {
            enqueueSnackbar("Failed login, try again later.", {
                variant: 'error',
                autoHideDuration: 3000,
                TransitionComponent: Slide,
            });
        }
        setPending(false);
    };


    const handleChange = (event) => {
        callback(event);
    };

    const ForgotPassword = () => {
        // another dialog in here asking for the users email, then sending a post request with that email to the api
    }

    return (
    <>
        <TextField 
        inputRef={loginRef}
            id="loginUsername" 
            label="Email or Username"
            variant="outlined" 
            name="emailOrUsername" 
            value={data.username? data.username : data.email} 
            onChange={handleChange} 
            sx={{ '& p': { color: 'rgb(204, 2, 2)', fontWeight: 'bold', } }}
            onKeyDown={(e) => e.key === "Enter" && passwordRef.current.focus()}
            fullWidth
            autoFocus
            autoComplete='off'
            autoCapitalize='off'
            helperText={alertOnLogin ? 'Please enter a valid login identifier' : ''}
        />
        
        <Box display="flex" spacing={1} alignItems="flex-start" > 
        <TextField 
            inputRef={passwordRef}
            className='popupPassword'
            id="loginPassword" 
            label="Password" 
            variant="outlined" 
            type={showPassword ? 'text' : 'password'}
            name="password" 
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            value={data.password} 
            onChange={handleChange} 
            autoComplete='off'
            autoCapitalize='off'
            sx={{
                flexGrow: 1,
                marginRight: 1,
                '& p': { color: 'rgb(204, 2, 2)', fontWeight: 'bold' },
                '& input': { backgroundColor: 'transparent' } 
            }}
            helperText={alertOnPass ? 'Please enter your password' : ''}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={()=>setShowPassword(!showPassword)}
                            onMouseDown={(event) => event.preventDefault()}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
            <Button variant='contained' disabled={pending} sx={{ height: 55, width: 55 }} onClick={handleLogin}>
                {pending? <CircularProgress color="inherit" size={30} /> : 'Go'}
            </Button>
        </Box>
        <Box display="flex" justifyContent="space-between">
            <Button variant='string' onClick={ForgotPassword} size='small' sx={{maxWidth: '50%', textTransform: 'none', position: 'absolute', right: 35 }}>
                forgot password
            </Button>
        </Box>
    </>
    )
}