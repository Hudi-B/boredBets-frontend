import { Box, Dialog, Typography, Button, Stack, FormControl, Input } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { useSnackbar } from 'notistack';
import Slide from '@mui/material';
import axios from 'axios';
import { apiUrl } from '../../boredLocal';
import { useSelector } from 'react-redux';

const PasswordChangeForm = ( {open, onClose} ) => {
    const { enqueueSnackbar } = useSnackbar();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const userId = useSelector(state => state.auth.userId);

    const handlePasswordChange = () => {
        if(newPassword.length <= 4) {
            enqueueSnackbar('Password must be at least 6 characters long', { variant: 'error' });
            return;
        }
        if(newPassword !== confirmPassword) {
            enqueueSnackbar('Passwords do not match', { variant: 'error' });
            return;
        }
        if(oldPassword.length <= 4) {
            enqueueSnackbar('Invalid old password', { variant: 'error' });
            return;
        }
        setIsLoading(true);
        axios.put(apiUrl+`User/UpdatePasswordByOldPassword?UserId=` + userId, { oldPassword: oldPassword, newPassword: newPassword })
        .then((response) => {
            if (response.status === 401) {
                enqueueSnackbar('Invalid old password', { variant: 'error' });
                return;
            }
            enqueueSnackbar('Password successfully changed', { variant: 'success' });
        })
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <Box>
                <Box>
                    <ClearIcon style={{ color: 'white', position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} onClick={onClose} />
                </Box>
                <Box sx={{ padding: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'rgb(4, 112, 107)' }}>
                    <Typography variant='h4' sx={{ color: 'white', paddingBottom: '40px' }}>Change password</Typography>
                    <Stack spacing={2} alignItems={'center'} direction={'column'}>
                        <Stack spacing={1} direction={'column'} alignItems={'start'}>
                            <Typography variant='subtitle2' sx={{ color: 'white' }}>Old password</Typography>
                            <Input sx={{ width: '300px', color: 'white' }} placeholder='Old password' onChange={(e) => setOldPassword(e.target.value)}/>
                        </Stack>
                        <Stack spacing={1} direction={'column'} alignItems={'start'}>
                            <Typography variant='subtitle2' sx={{ color: 'white' }}>New password</Typography>
                            <Input sx={{ width: '300px', color: 'white' }} placeholder='New password' onChange={(e) => setNewPassword(e.target.value)}/>
                        </Stack>
                        <Stack spacing={1} direction={'column'} alignItems={'start'}>
                            <Typography variant='subtitle2' sx={{ color: 'white' }}>Confirm new password</Typography>
                            <Input sx={{ width: '300px', color: 'white' }} placeholder='Confirm new password' onChange={(e) => setConfirmPassword(e.target.value)}/>
                        </Stack>
                        <Button variant='contained' onClick={handlePasswordChange}>Submit</Button>
                    </Stack>
                </Box>
            </Box>
        </Dialog>
    )
}

export default PasswordChangeForm;