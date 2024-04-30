import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';
import { apiUrl } from '../../boredLocal';

import { Box, Input, Dialog, Button, Stack, Typography, CircularProgress } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const EmailChangeForm = ( { open, onClose } ) => {
    
    const { enqueueSnackbar } = useSnackbar();
    const userId = useSelector((state) => state.auth.userId);
    const [email, setEmail] = useState('');
    const [tempEmail, setTempEmail] = useState('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const[isLoading, setIsLoading] = useState(false);

    const handleEmailSubmit = async () => {
        if (!tempEmail.match(emailRegex) || tempEmail.length <= 4) {
            enqueueSnackbar("Invalid email", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
            return;
        }
        if (tempEmail === email) {
            enqueueSnackbar("New email cannot be the same as old email", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
            return;
        }
        setIsLoading(true)
        await axios.put(apiUrl+`User/UpdateEmailByUserId?UserId=` + userId, { email: tempEmail })
        .then(() => {
            setTempEmail('');
            enqueueSnackbar("Email updated", { variant: 'success', autoHideDuration: 3000, TransitionComponent: Slide, });
            setIsLoading(false)
        })
        .catch(() => {
            enqueueSnackbar('Something went wrong', { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide });
            setIsLoading(false);
            return;
        })
    }

    const fetchEmail = async () => {
        axios.get(apiUrl+`User/GetByUserId?UserId=` + userId)
        .then((response) => {
            setEmail(response.data.email);
        })
        .catch((error) => {
            enqueueSnackbar("Something went wrong", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
        })
    }

    useEffect(() => {
        fetchEmail();
    }, [])

    return(
        <Dialog open={open} onClose={onClose}>
                {isLoading && (
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
                        }}
                    >
                        <CircularProgress color="inherit" />
                    </Box>
                )}
                <Box>
                    <ClearIcon style={{ color: 'white', position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} onClick={onClose} />
                </Box>
                <Box sx={{ padding: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'rgb(63, 85, 115)' }}>
                    <Typography variant='h4' sx={{ color: 'white', paddingBottom: '40px' }}>Change email</Typography>
                    <Stack spacing={2} alignItems={'center'} direction={'column'}>
                        <Stack spacing={1} direction={'column'} alignItems={'start'}>
                            <Typography variant='subtitle2' >New email</Typography>
                            <Input variant='standard' sx={{ color: 'white', width: '300px', marginBottom: '10px' }} placeholder={email} onKeyDown={(e) => e.key === 'Enter' && handleEmailSubmit()} value={tempEmail} onChange={(e) => setTempEmail(e.target.value)} />
                        </Stack>
                        <Typography variant='caption' >Email must follow this format: example@example.com</Typography>
                        <Button variant='contained' onClick={handleEmailSubmit} >Submit</Button>
                    </Stack>
                </Box>
        </Dialog>
    )
}

export default EmailChangeForm;