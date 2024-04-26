import React from 'react';
import { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, Divider, Grid, Input, MenuItem, Select, Stack, Typography, FormControl, Dialog, DialogContent, DialogContentText, TextField} from '@mui/material';
import { useSnackbar } from 'notistack';
import { styled } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const CustomInput = styled(TextField)({
    input: {
      color: 'white',
      fontSize: '16px',
      width: '300px',
    },
  });

const UserDetailForm = ( {open, onClose, onSubmit} ) => {
    const { enqueueSnackbar } = useSnackbar();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(dayjs());
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
                                <CustomInput variant='standard' placeholder='John Doe' />
                            </Stack>
                            <Stack spacing={1} direction={'column'} alignItems={'start'}>
                                <Typography variant='subtitle2' sx={{ color: 'white' }}>Date of birth</Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker slotProps={{ textField: { variant: 'standard', style:{ width: '300px' }, inputProps: { style: { color: 'white', fontSize: '16px' }, } }}} slots={{ openPickerIcon: () => <CalendarMonthIcon style={{ fontSize: '16px', color: 'white' }} />,}} value={dateOfBirth} onChange={(newValue) => { setDateOfBirth(newValue) }} />
                                </LocalizationProvider>
                            </Stack>
                            <Stack spacing={1} direction={'column'} alignItems={'start'}>
                                <Typography variant='subtitle2' sx={{ color: 'white' }}>Phone number</Typography>
                                <CustomInput variant='standard' placeholder='+36012345678' />
                            </Stack>
                            <Stack spacing={1} direction={'column'} alignItems={'start'}>
                                <Typography variant='subtitle2' sx={{ color: 'white' }}>Address</Typography>
                                <CustomInput variant='standard' placeholder='Palóczy László utca 3, 3525' />
                            </Stack>
                            <Button variant='contained' sx={{ padding: '10px', width: '300px', color: 'white', backgroundColor: 'rgb(4, 112, 107)' }} onClick={onSubmit}>Submit</Button>
                        </Stack>
                    </Box>
                </Box>
            </Dialog>
    )
}

export default UserDetailForm;