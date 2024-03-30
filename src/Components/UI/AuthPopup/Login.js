import { Button, Box, TextField } from '@mui/material';
import React, {useRef} from 'react';
import { apiUrl } from '../../../boredLocal';
import { useDispatch } from 'react-redux';
import { login } from '../../../auth/authSlice';
import { useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { setCookieToken } from '../../../boredLocal';

export default function Login({data, callback}) {
    const [alertOnLogin, setAlertOnLogin] = React.useState(false);
    const [alertOnPass, setAlertOnPass] = React.useState(false);
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

    if(alerts.password)
    {
        if(alerts.emailOrUsername)
        {
            loginRef.current.focus();
            return;
        }
        passwordRef.current.focus();
        return;
    }

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
            enqueueSnackbar("Couldn't login. Something went wrong", {
                variant: 'error',
                autoHideDuration: 3000,
                TransitionComponent: Slide,
            });
        }
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
            helperText={alertOnLogin ? 'Please enter a valid login identifier' : ''}
        />
        
        <Box display="flex" spacing={1} alignItems="flex-start" > 
            <TextField 
                inputRef={passwordRef}
                className='popupPassword'
                id="loginPassword" 
                label="Password" 
                variant="outlined" 
                name="password" 
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                value={data.password} 
                onChange={handleChange} 
                sx={{ flexGrow: 1, marginRight: 1, '& p': { color: 'rgb(204, 2, 2)', fontWeight: 'bold', }  }}
                helperText={alertOnPass ? 'Please enter your password' : ''}
            />
            <Button variant='contained' sx={{ height: 55, width: 55 }} onClick={handleLogin}>
                Go
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