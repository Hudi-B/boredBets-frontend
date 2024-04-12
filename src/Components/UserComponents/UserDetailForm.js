import React from 'react';
import { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, Divider, Grid, Input, MenuItem, Select, Stack, Typography, FormControl } from '@mui/material';
import { useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';
import { phonePrefixes } from '../../boredLocal';

const UserDetailForm = ( onClose, onSubmit ) => {
    const { enqueueSnackbar } = useSnackbar();
    const [phonePrefix, setPhonePrefix] = useState('+36');

    return (
            <Box>
                <Box>
                    <ClearIcon style={{ color: 'white', position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} onClick={onClose} />
                </Box>
                <Box sx={{ padding: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'rgb(4, 112, 107)' }}>
                    <Typography variant='h4' sx={{ color: 'white', paddingBottom: '40px' }}>About you</Typography>
                    <Stack spacing={2} alignItems={'center'} direction={'column'}>
                        <Stack spacing={1} direction={'column'} alignItems={'start'}>
                            <Typography variant='subtitle2' sx={{ color: 'white' }}>Name</Typography>
                            <Input sx={{ width: '300px', color: 'white' }} placeholder='Name' />
                        </Stack>
                        <Stack spacing={1} direction={'column'} alignItems={'start'}>
                            <Typography variant='subtitle2' sx={{ color: 'white' }}>Date of birth</Typography>
                            <Input sx={{ width: '300px', color: 'white' }} placeholder='Date of birth' />
                        </Stack>
                        <Stack spacing={1} direction={'column'} alignItems={'start'}>
                            <Typography variant='subtitle2' sx={{ color: 'white' }}>Phone number</Typography>
                            <Stack direction={'row'}>
                                <FormControl>
                                    <Select variant='standard' value={phonePrefix}>
                                        {phonePrefixes.map((prefix) =>
                                            <MenuItem key={prefix} value={prefix}>{prefix}</MenuItem>
                                            )}
                                        <MenuItem value={'+44'}>+44</MenuItem>
                                    </Select>
                                </FormControl>
                                <Input sx={{ width: '300px', color: 'white' }} placeholder='Phone number' />
                            </Stack>
                        </Stack>
                        <Stack spacing={1} direction={'column'} alignItems={'start'}>
                            <Typography variant='subtitle2' sx={{ color: 'white' }}>Address</Typography>
                            <Input sx={{ width: '300px', color: 'white' }} placeholder='Adress' />
                        </Stack>
                        <Button variant='contained' sx={{ padding: '10px', width: '300px', color: 'white', backgroundColor: 'rgb(4, 112, 107)' }} onClick={onSubmit}>Submit</Button>
                    </Stack>
                </Box>
            </Box>
    )
}

export default UserDetailForm;