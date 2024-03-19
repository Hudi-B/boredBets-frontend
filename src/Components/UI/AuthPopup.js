import * as React from 'react';
import axios from 'axios';
import { Button, Box, Checkbox, Dialog, DialogContent, FormControlLabel, TextField } from '@mui/material';
import { apiUrl, setCookieToken } from '../../boredLocal';
import { useDispatch } from 'react-redux';
import { login } from '../../auth/authSlice';
import { useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';

export default function AuthPopup({itsALogin}) {
  const [open, setOpen] = React.useState(false);  
  const [alertOnEmail, setAlertOnEmail] = React.useState(false);
  const [alertOnUsername, setAlertOnUsername] = React.useState(false);
  const [alertOnPass, setAlertOnPass] = React.useState(false);
  const [onLogin, setOnLogin] = React.useState();
  const [formState, setFormState] = React.useState({
    username:'',
    email: '',
    password: '',
  });    
  const { enqueueSnackbar } = useSnackbar();

    const dispatch = useDispatch();
    const handleClickOpen = () => {
        setOpen(true);
        setOnLogin(itsALogin);
    };

    const handleClose = () => {
        setFormState({emailOrUsername: '', password: ''});
        setOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

const handleLogin = async () => {
    const { emailOrUsername, password } = formState;

    // Regular expression for email validation
    //const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //const isEmailValid = emailRegex.test(email);
    //const isPasswordValid = password.length >= 4;

    // const alerts = {
    //    email: !isEmailValid,
    //    password: !isPasswordValid,
    // };

    // setAlertOnEmail(alerts.email);
    // setAlertOnPass(alerts.password);

    //if (alerts.email || alerts.password) return;

    initiateLogin();
};

const handleRegister = async () => {
    const {username, email, password } = formState;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const alerts = {
        email: !emailRegex.test(email),
        username: !username.length >= 4,
        password: !password.length >= 4,
    };
    console.log(formState);
    setAlertOnUsername(alerts.username);
    setAlertOnEmail(alerts.email);
    setAlertOnPass(alerts.password);

    if (!alerts.email || !alerts.password){
        await axios.post(`${apiUrl}User/UserRegister`, formState)
        .then(() => {
            enqueueSnackbar("Successful register, now try to Log in", {
              variant: 'success',
              autoHideDuration: 3000,
              TransitionComponent: Slide,
            });
            setOnLogin(true);
          })
    }
};

const initiateLogin = async () => {
    try {
        console.log(formState);
        const response = await axios.post(`${apiUrl}User/UserLogin`, {
            emailOrUsername: formState.emailOrUsername,
            password: formState.password
        });
        setCookieToken(true, response.data.accessToken);
        setCookieToken(false, response.data.refreshToken);
        console.log(response.data);
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
}


const ForgotPassword = () => {
    // another dialog in here asking for the users email, then sending a post request with that email to the api
}

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
                <DialogContent sx={{
                    backgroundColor: 'rgb(130, 130, 130)',
                    width: '450px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    height: '600px',
                    padding:'40px'}}>
                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
                            logo
                        </Box>
                        <Box sx={{marginBottom: 15}}>
                            <Box display="flex" justifyContent="center">
                                <Button variant='string' onClick={() => setOnLogin(true)}> Sign in</Button>
                                <Box mx={1} />
                                <Button variant='string' onClick={() => setOnLogin(false)}> Sign up</Button>
                            </Box>
                            {!onLogin && <TextField 
                                id="outlined-basic" 
                                label="Username" 
                                variant="outlined" 
                                name="username" 
                                value={formState.name} 
                                onChange={handleChange} 
                                fullWidth
                                margin='normal'
                                helperText={alertOnUsername ? 'Please enter a valid Username' : ''}
                            />}
                            
                            <TextField 
                                id="outlined-basic" 
                                label="Email" 
                                variant="outlined" 
                                name="email" 
                                value={formState.name} 
                                onChange={handleChange} 
                                fullWidth
                                margin='normal'
                                helperText={alertOnEmail ? 'Please enter a valid Email' : ''}
                            />
                            <Box display="flex" spacing={1} alignItems="flex-start" > 
                                <TextField 
                                    className='popupPassword'
                                    id="outlined-basic" 
                                    label="Password" 
                                    variant="outlined" 
                                    name="password" 
                                    onKeyDown={(e) => e.keyCode == 13 ? onLogin ? handleLogin() : handleRegister() : null}
                                    value={formState.password} 
                                    onChange={handleChange} 
                                    sx={{ flexGrow: 1, marginRight: 1 }}
                                    helperText={alertOnPass ? 'Please enter your password' : ''}
                                />
                                <Button variant='contained' sx={{ height: 55, width: 55 }} className='doitButton' onClick={onLogin ? handleLogin : handleRegister}>
                                    Go
                                </Button>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                            {onLogin &&
                                <Button variant='string' onClick={ForgotPassword} size='small' sx={{ textTransform: 'none', position: 'absolute', right: 35 }}>
                                    forgot password
                                </Button>
                            }
                            </Box>
                        </Box>
                </DialogContent>
            </Dialog>
        </>
    );
}