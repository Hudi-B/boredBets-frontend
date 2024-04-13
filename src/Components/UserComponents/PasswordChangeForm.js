import { Box, Dialog, Typography, Button, Stack, FormControl, Input } from '@mui/material';
import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { useSnackbar } from 'notistack';
import Slide from '@mui/material';

const PasswordChangeForm = ( {open, onClose, onSubmit} ) => {
    const { enqueueSnackbar } = useSnackbar();

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
                            <Input sx={{ width: '300px', color: 'white' }} placeholder='Old password' />
                        </Stack>
                        <Stack spacing={1} direction={'column'} alignItems={'start'}>
                            <Typography variant='subtitle2' sx={{ color: 'white' }}>New password</Typography>
                            <Input sx={{ width: '300px', color: 'white' }} placeholder='New password' />
                        </Stack>
                        <Stack spacing={1} direction={'column'} alignItems={'start'}>
                            <Typography variant='subtitle2' sx={{ color: 'white' }}>Confirm new password</Typography>
                            <Input sx={{ width: '300px', color: 'white' }} placeholder='Confirm new password' />
                        </Stack>
                        <Button variant='contained' onClick={onSubmit}>Submit</Button>
                    </Stack>
                </Box>
            </Box>
        </Dialog>
    )
}

export default PasswordChangeForm;