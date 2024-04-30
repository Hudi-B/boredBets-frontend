import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';

import { apiUrl } from '../../boredLocal';

import { Box, Input, Dialog, Button, Stack, Typography, CircularProgress } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { updateUsername } from '../../auth/authSlice';

const UsernameChangeForm = ( { open, onClose } ) => {
    
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.userId);
    const username = useSelector((state) => state.auth.username);
    const [tempUsername, setTempUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleUsernameSubmit = async () => {
        if (tempUsername.length <= 4) {
            enqueueSnackbar("Invalid username", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
            return;
        }
        if (tempUsername === username) {
            enqueueSnackbar("New username cannot be the same as old username", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
            return;
        }
        setIsLoading(true);
        await axios.put(apiUrl+`User/UpdateUsernameByUserId?UserId=` + userId, { username: tempUsername })
        .then(() => {
            setTempUsername('');
            enqueueSnackbar("Username updated", { variant: 'success', autoHideDuration: 3000, TransitionComponent: Slide, });
            dispatch(updateUsername(tempUsername));
            onClose();
        })
        .catch(() => {
            enqueueSnackbar('Something went wrong', { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide });
            setIsLoading(false);
            return;
        })
    }

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
                    <Typography variant='h4' sx={{ color: 'white', paddingBottom: '40px' }}>Change username</Typography>
                    <Stack spacing={2} alignItems={'center'} direction={'column'}>
                        <Stack spacing={1} direction={'column'} alignItems={'start'}>
                            <Typography variant='subtitle2' >New username</Typography>
                            <Input variant='standard' sx={{ color: 'white', width: '300px', marginBottom: '10px' }} placeholder={username} onKeyDown={(e) => e.key === 'Enter' && handleUsernameSubmit()} value={tempUsername} onChange={(e) => setTempUsername(e.target.value)} />
                        </Stack>
                        <Typography variant='caption' >Username must be at least 5 characters long</Typography>
                        <Button variant='contained' onClick={handleUsernameSubmit} >Submit</Button>
                    </Stack>
                </Box>
        </Dialog>
    )
}

export default UsernameChangeForm;