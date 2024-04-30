import React from 'react';
import { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, Divider, Grid, Input, MenuItem, Select, Stack, Typography, FormControl, Dialog, DialogContent, DialogContentText, TextField} from '@mui/material';
import { useSnackbar } from 'notistack';
import { styled } from '@mui/system';
import Slide from '@mui/material/Slide';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import axios from 'axios';
import { apiUrl } from '../../boredLocal';
import { useSelector } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@mui/material/styles';

const CustomInput = styled(TextField)({
    input: {
      color: 'white',
      fontSize: '16px',
      width: '300px',
    },
  });

const defaultTheme = createMuiTheme();

const UserDetailForm = ( {open, onClose} ) => {
    const { enqueueSnackbar } = useSnackbar();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(dayjs());
    const [address, setAddress] = useState('');
    const maxDate = dayjs().subtract(18, 'year');
    const minDate = dayjs().subtract(100, 'year');
    const [warningShown, setWarningShown] = useState(false);
    const userId = useSelector((state) => state.auth.userId);

    const handleNameChange = (event) => {
        const formattedValue = event.target.value.replace(/[^A-Z\s\u00C0-\u02AF]/gi, '');
        const capitalizedValue = formattedValue.replace(/\b\w/g, (match) => match.toUpperCase());
        setName(capitalizedValue);
    }

    const handlePhoneNumberChange = (event) => {
        const formattedValue = event.target.value.replace(/[^0-9+]/g, '');
        setPhoneNumber(formattedValue);
    }

    const hanndleAddressChange = (event) => {
        const formattedValue = event.target.value.replace(/[^A-Z0-9.,\s\u00C0-\u02AF]/gi, '')
        setAddress(formattedValue);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(phoneNumber, name, dateOfBirth, address);
        if (phoneNumber === '' || name === '' || dateOfBirth === '' || address === '') {
            enqueueSnackbar('Please fill in all fields', { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide });
            return;
        }
        if (!phoneNumber.match(/^\+(?=\d+$)/)) {
            enqueueSnackbar('Invalid phone number', { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide });
            return;
        }
        if (name.match(/^\S+$/g) && warningShown === false) {
            enqueueSnackbar('Make sure to enter your full name', { variant: 'warning', autoHideDuration: 3000, TransitionComponent: Slide });
            setWarningShown(true);
            return;
        }
        const formattedDate = dateOfBirth.format('YYYY-MM-DD');
        await axios.put(apiUrl+`UserDetail/UpdateUserDetailByUserId?UserId=` + userId, { fullname: name, address: address, phoneNum: phoneNumber, birthDate: formattedDate })
            .then(() => {
                enqueueSnackbar('Details successfully updated', { variant: 'success', autoHideDuration: 3000, TransitionComponent: Slide });
                onClose();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
            <Dialog open={open} onClose={onClose}>
                <Box>
                    <Box>
                        <ClearIcon style={{ color: 'white', position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} onClick={onClose} />
                    </Box>
                    <Box sx={{ padding: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'rgb(63, 85, 115)' }}>
                        <Typography variant='h4' sx={{ color: 'white', paddingBottom: '40px' }}>About you</Typography>
                        <Stack spacing={2} alignItems={'center'} direction={'column'}>
                            <Stack spacing={1} direction={'column'} alignItems={'start'}>
                                <Typography variant='subtitle2' sx={{ color: 'white' }}>Name</Typography>
                                <CustomInput variant='standard' onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} value={name} onChange={handleNameChange} placeholder='John Doe' inputProps={{ maxLength: 60 }} />
                            </Stack>
                            <Stack spacing={1} direction={'column'} alignItems={'start'}>
                                <Typography variant='subtitle2' sx={{ color: 'white' }}>Date of birth</Typography>
                                <ThemeProvider theme={defaultTheme}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker maxDate={maxDate} minDate={minDate} slotProps={{ textField: { variant: 'standard', style:{ width: '300px' }, inputProps: { style: { color: 'white', fontSize: '16px' }, } }}} slots={{ openPickerIcon: () => <CalendarMonthIcon style={{ fontSize: '16px', color: 'white' }} />,}} value={dateOfBirth} onChange={(newValue) => { setDateOfBirth(newValue) }} />
                                    </LocalizationProvider>
                                </ThemeProvider>
                            </Stack>
                            <Stack spacing={1} direction={'column'} alignItems={'start'}>
                                <Typography variant='subtitle2' sx={{ color: 'white' }}>Phone number</Typography>
                                <CustomInput variant='standard' onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} value={phoneNumber} onChange={handlePhoneNumberChange} placeholder='+36012345678' inputProps={{ maxLength: 13 }} />
                            </Stack>
                            <Stack spacing={1} direction={'column'} alignItems={'start'}>
                                <Typography variant='subtitle2' sx={{ color: 'white' }}>Address</Typography>
                                <CustomInput variant='standard' onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} placeholder='Palóczy László utca 3, 3525' value={address} onChange={hanndleAddressChange} inputProps={{ maxLength: 60 }} />
                            </Stack>
                            <Button variant='contained' sx={{ padding: '10px', color: 'white' }} onClick={handleSubmit}>Submit</Button>
                        </Stack>
                    </Box>
                </Box>
            </Dialog>
    )
}

export default UserDetailForm;