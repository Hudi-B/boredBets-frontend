import { Box, Dialog, Typography, Button, Stack, FormControl, Input, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { apiUrl } from '../../boredLocal';
import { useSelector } from 'react-redux';

    const StyledInput = styled(Input)(({ theme }) => ({
        color: 'white',
        width: '300px',

        '& .MuiInputBase-input': {
            '&::placeholder': {
                color: 'white', // change placeholder color
            },
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'white !important', // change the color of the underline
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white !important', // change the color of the underline when focused
        },
    }));

const PasswordChangeForm = ( {open, onClose} ) => {
    const { enqueueSnackbar } = useSnackbar();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const userId = useSelector(state => state.auth.userId);

    const handlePasswordChange = async () => {
        if(newPassword.length <= 4) {
            enqueueSnackbar('Password must be at least 6 characters long', { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide });
            return;
        }
        if (newPassword !== confirmPassword) {
            enqueueSnackbar('Passwords do not match', { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide });
            return;
        }
        if(oldPassword.length <= 4) {
            enqueueSnackbar('Invalid old password', { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide });
            return;
        }
        if (oldPassword === newPassword) {
            enqueueSnackbar('New password cannot be the same as old password', { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide });
            return;
        }
        setIsLoading(true);
        await axios.put(apiUrl+`User/UpdatePasswordByOldPassword?UserId=` + userId, { oldPassword: oldPassword, newPassword: newPassword })
        .then((response) => {
            if (response.status === 401) {
                enqueueSnackbar('Invalid old password', { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide });
                return;
            }
            enqueueSnackbar('Password successfully changed', { variant: 'success', autoHideDuration: 3000, TransitionComponent: Slide });
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        })
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <Box>
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
                <Box sx={{ padding: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'rgb(4, 112, 107)' }}>
                    <Typography variant='h4' sx={{ color: 'white', paddingBottom: '40px' }}>Change password</Typography>
                    <Stack spacing={2} alignItems={'center'} direction={'column'}>
                        <Stack spacing={1} direction={'column'} alignItems={'start'}>
                            <Typography variant='subtitle2' sx={{ color: 'white' }}>Old password</Typography>
                            <StyledInput placeholder='Old password' onChange={(e) => setOldPassword(e.target.value)} disabled={isLoading} />
                        </Stack>
                        <Stack spacing={1} direction={'column'} alignItems={'start'}>
                            <Typography variant='subtitle2' sx={{ color: 'white' }}>New password</Typography>
                            <StyledInput placeholder='New password' onChange={(e) => setNewPassword(e.target.value)} disabled={isLoading} />
                        </Stack>
                        <Stack spacing={1} direction={'column'} alignItems={'start'}>
                            <Typography variant='subtitle2' sx={{ color: 'white' }}>Confirm new password</Typography>
                            <StyledInput placeholder='Confirm new password' onChange={(e) => setConfirmPassword(e.target.value)} disabled={isLoading} />
                        </Stack>
                        <Button variant='contained' onClick={handlePasswordChange} disabled={isLoading} >Submit</Button>
                    </Stack>
                </Box>
            </Box>
        </Dialog>
    )
}

export default PasswordChangeForm;