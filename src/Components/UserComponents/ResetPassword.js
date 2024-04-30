import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { secondaryColor, fontColor, apiUrl } from '../../boredLocal';
import { TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';

export default function ForgotPassword() {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const { enqueueSnackbar } = useSnackbar();
    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const sendEmail = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            try {
                await axios.post(`${apiUrl}/User/ForgotYourPassword?Email=${email}`);
                enqueueSnackbar("Successful email sent", {
                    variant: 'success',
                    autoHideDuration: 3000,
                    TransitionComponent: Slide,
                });
                setOpenDialog(false);
            } catch (error) {
                enqueueSnackbar("Failed email sent, try again later.", {
                    variant: 'error',
                    autoHideDuration: 3000,
                    TransitionComponent: Slide,
                });
            }
        } else {
            enqueueSnackbar("Invalid email address.", {
                variant: 'error',
                autoHideDuration: 3000,
                TransitionComponent: Slide,
            });
        }
    }

    return (
    <>
        <Button onClick={handleClickOpen} variant="contained" sx={{width: '300px'}} >
            Reset password
        </Button> 
        <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{backgroundColor: 'rgba(0,0,0,0.5)'}}
            PaperProps={{
                sx: {
                backgroundColor: secondaryColor,
                color: fontColor,
                },
            }}
            >
            <DialogTitle sx={{ justifyContent: 'center' }} id="alert-dialog-title">{"Get new password"}</DialogTitle>
            <DialogContent>
                <TextField variant='standard' label="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                sx={{
                    width: '100%',
                    color: fontColor
                    }} /> 
                    <Typography sx={{color: fontColor, fontSize: 10, letterSpacing: 0.5}}>*Please note that a new password request will deactivate your existing password and the replacement will be emailed to the specified address.</Typography>
            </DialogContent>
            <DialogActions sx={{display: 'flex', justifyContent: 'space-between', paddingX: 2}}>
                <Button onClick={handleCloseDialog} color="primary" sx={{'&:hover': {backgroundColor: 'rgba(50,50,50,0.1)',boxShadow: '0 0 5px rgb(50, 50,50)'},textTransform: 'none', color: fontColor }}>
                    CALCEL
                </Button>
                <Button color="primary" onClick={sendEmail} autoFocus sx={{'&:hover': {backgroundColor: 'rgba(50,50,50,0.1)',boxShadow: '0 0 5px rgb(50, 50,50)'},color: fontColor, textTransform: 'none'}}>
                    CONFIRM
                </Button>
            </DialogActions>
        </Dialog>
    </>
    )
}