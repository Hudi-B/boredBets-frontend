import React from 'react';
import { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, Divider, Grid, Input, MenuItem, Select, Stack, Typography, FormControl, Dialog } from '@mui/material';
import { useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';
import { phonePrefixes } from '../../boredLocal';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const customPhoneInputStyle = {
    color: 'white',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid black',
    borderRadius: 0,
  };

const customDatePickerStyle = {
    color: 'white',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid black',
    borderRadius: 0,
};

const UserDetailForm = ( {open, onClose, onSubmit} ) => {
    const { enqueueSnackbar } = useSnackbar();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [address, setAddress] = useState('');

    return (
            <Dialog open={open} onClose={onClose}>
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
                                <DatePicker {...customDatePickerStyle} style={{ width: '100%' }} selected={dateOfBirth} onChange={(date) => setDateOfBirth(date)} dateFormat="MM-dd-yyyy"/>
                            </Stack>
                            <Stack spacing={1} direction={'column'} alignItems={'start'}>
                                <Typography variant='subtitle2' sx={{ color: 'white' }}>Phone number</Typography>
                                <PhoneInput country={'us'} disableDropdown inputStyle={customPhoneInputStyle} buttonStyle={customPhoneInputStyle} value={phoneNumber} onChange={(value) => setPhoneNumber(value)}
                                />
                            </Stack>
                            <Stack spacing={1} direction={'column'} alignItems={'start'}>
                                <Typography variant='subtitle2' sx={{ color: 'white' }}>Address</Typography>
                                <Input sx={{ width: '300px', color: 'white' }} placeholder='Adress' />
                            </Stack>
                            <Button variant='contained' sx={{ padding: '10px', width: '300px', color: 'white', backgroundColor: 'rgb(4, 112, 107)' }} onClick={onSubmit}>Submit</Button>
                        </Stack>
                    </Box>
                </Box>
            </Dialog>
    )
}

export default UserDetailForm;