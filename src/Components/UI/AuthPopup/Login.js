import { Button, Box, TextField } from '@mui/material';
import React, { useRef } from 'react';
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
import ForgotPassword from './ForgotPassword';
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
            id="outlined-basic"
            variant="outlined"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password" 
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            value={data.password} 
            onChange={handleChange} 
            autoComplete="off"
            autoCapitalize="off"
      
            sx={{
                flexGrow: 1,
                marginRight: 1,
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
                            {showPassword ? <VisibilityOff sx={{ color: 'rgb(220, 220, 220)'}} /> : <Visibility sx={{ color: 'rgb(220, 220, 220)'}} />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
            <Button variant='contained' color='primary' disabled={pending} sx={{ height: 55, width: 55 }} onClick={handleLogin}>
                Go
            </Button>
        </Box>
        <Box display="flex" justifyContent="flex-end">
            <ForgotPassword />
        </Box>
    </>
    )
}