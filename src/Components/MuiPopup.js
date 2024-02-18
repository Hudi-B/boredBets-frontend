import * as React from 'react';
import axios from 'axios';
import { Button, Box, Checkbox, Dialog, DialogContent, FormControlLabel, TextField } from '@mui/material';

import '../styles/MuiPopup.css';

export default function RegisterPopup({login}) {
  const [open, setOpen] = React.useState(false);  
  const [alertOnEmail, setAlertOnEmail] = React.useState(false);
  const [alertOnPass, setAlertOnPass] = React.useState(false);
  const [onLogin, setOnLogin] = React.useState(login);
  const [formState, setFormState] = React.useState({
    email: '',
    password: '',
});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFormState({email: '', password: ''});
    setOpen(false);
  };




const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormState(prevState => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value,
    }));
};



const handleLogin = async () => {
    const { email, password } = formState;

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length >= 4;

    const alerts = {
        email: !isEmailValid,
        password: !isPasswordValid,
    };

    setAlertOnEmail(alerts.email);
    setAlertOnPass(alerts.password);

    if (alerts.email || alerts.password) return;

    try {
        const response = await axios.get(`https://localhost:7090/api/User/UserLogin?Email=${formState.email}&Password=${formState.password}`);
        console.log(response);
    } catch (error) {
        alert("Invalid Email or Password");
    }
};

const handleRegister = async () => {
    const { email, password } = formState;

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length >= 4;

    const alerts = {
        email: !isEmailValid,
        password: !isPasswordValid,
    };

    setAlertOnEmail(alerts.email);
    setAlertOnPass(alerts.password);

    if (alerts.email || alerts.password) return;

    try {
        const response = await axios.post('https://localhost:7090/api/User/UserRegister', formState);
        console.log(response);
    } catch (error) {
        alert("There seems to be a problem. Please try again later.");
        console.error(error);
    }
};


const ForgotPassword = () => {
    // another dialog in here asking for the users email, then sending a post request with that email to the api
}

return (
    <React.Fragment>
        <Button variant='contained' onClick={handleClickOpen}>
            {onLogin ? 'Login' : 'Register'}
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent className='registerPopup'>
                <div>
                    logo
                </div>

                

                <Box sx={{marginBottom: 15}}>
                    <Box display="flex" justifyContent="center">
                        <Button variant='string' disabled onClick={() => setOnLogin(true)}> Sign in</Button>
                        <Box mx={1} />
                        <Button variant='string' disabled onClick={() => setOnLogin(false)}> Sign up</Button>
                    </Box>

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
                    {onLogin ? (
                        <>
                        <FormControlLabel control={<Checkbox />} label="Remember me" />
                        <Button variant='string' onClick={ForgotPassword} size='small' sx={{ textTransform: 'none' }}>
                            forgot password
                        </Button>
                        </>
                    ) : null}
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    </React.Fragment>
);
}