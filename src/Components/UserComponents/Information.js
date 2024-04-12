import React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Paper, Stack, Typography, Chip, Button, Divider, Input, Select, Dialog, DialogContent, InputAdornment } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';
import { apiUrl } from '../../boredLocal';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';
import CheckIcon from '@mui/icons-material/Check';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AddIcon from '@mui/icons-material/Add';
import ChecklistIcon from '@mui/icons-material/Checklist';
import PortraitIcon from '@mui/icons-material/Portrait';
import EditIcon from '@mui/icons-material/Edit';

const TilePaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    boxShadow: theme.shadows[4],
    backgroundColor: 'rgb(4, 112, 107)',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'white',
}))

export default function Information() {
    const { enqueueSnackbar } = useSnackbar();
    const userId = useSelector((state) => state.auth.userId);
    const [tempEmail, setTempEmail] = useState('');
    const [tempUsername, setTempUsername] = useState('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        fullName: '-',
        birthDate: '-',
        phoneNumber: '-',
        address: '-',
    });

    const fetchData = async () => {
        await axios.get(apiUrl+`UserDetail/GetUserDetailByUserId?UserId=` + userId)
        .then((response) => {
            setUserData(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        fetchData();
    }, []);


    const handleEmailSubmit = async () => {
        if (!tempEmail.match(emailRegex)) {
            enqueueSnackbar("Invalid email", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
        }
        else {
            await axios.put(apiUrl+`User/UpdateEmailByUserId?UserId=` + userId, { email: tempEmail })
            .then(() => {
                enqueueSnackbar("Email updated", { variant: 'success', autoHideDuration: 3000, TransitionComponent: Slide, });
                fetchData();
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    const handleUsernameSubmit = async () => {
        if (tempUsername.length <= 6) {
            enqueueSnackbar("Invalid username", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
        }
        else {
            await axios.put(apiUrl+`User/UpdateUsernameByUserId?UserId=` + userId, { username: tempUsername })
            .then(() => {
                enqueueSnackbar("Username updated", { variant: 'success', autoHideDuration: 3000, TransitionComponent: Slide, });
                fetchData();
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    return (
        <Box 
        sx={{ 
        width: '100%',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '10px', 
        margin: '0px', 
        overflowY: ''}}
        >
            <Grid container spacing={2} sx={{width: '100%'}}>
                <Grid item md={8}>
                    <Stack direction={'column'} spacing={2}>
                        <TilePaper> 
                            <Typography variant="h5" sx={{ paddingBottom: '20px' }}>Account Status</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Stack direction={'column'} spacing={2} alignItems={'center'}>
                                        <Stack direction={'row'} spacing={2} alignItems="center">
                                            <Typography variant="h6" sx={{color: 'lightgrey'}}>Create an Account</Typography>
                                            <Box
                                            sx={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '50%',
                                            backgroundColor: 'rgb(44, 252, 3)',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flex: 'none',}}
                                            >
                                                <AddIcon sx={{color: 'rgb(4, 112, 107)'}}/>
                                            </Box>
                                        </Stack>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Typography variant="h6">Add Profile Picture</Typography>
                                            <Box
                                            sx={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '50%',
                                            borderStyle: 'solid',
                                            borderWidth: '2px',
                                            borderColor: 'white',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flex: 'none',}}
                                            >
                                                <PortraitIcon sx={{color: 'white'}}/>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid item xs={6}>
                                    <Stack direction={'column'} spacing={2}>
                                        <Stack direction={'row'} spacing={2} alignItems="center">
                                            <Typography variant="h6">Complete Account</Typography>
                                            <Box
                                            sx={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '50%',
                                            borderStyle: 'solid',
                                            borderWidth: '2px',
                                            borderColor: 'white',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flex: 'none',}}
                                            >
                                                <ChecklistIcon sx={{color: 'white'}}/>
                                            </Box>
                                        </Stack>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Typography variant="h6">Make Transaction</Typography>
                                            <Box
                                                sx={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '50%',
                                                borderStyle: 'solid',
                                                borderWidth: '2px',
                                                borderColor: 'white',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                flex: 'none',}}
                                            >
                                                <CreditCardIcon sx={{color: 'white'}}/>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </TilePaper>

                        <TilePaper>
                            <Typography variant="h6" sx={{ paddingBottom: '20px' }}>Details</Typography>
                            <Stack direction="column" spacing={2} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Stack direction="row" spacing={2} sx={{width: '100%'}}>
                                    <Typography variant="h6">Username</Typography>
                                    <Input placeholder={userData.username} value={tempUsername} onChange={(e) => setTempUsername(e.target.value)} sx={{width: '100%'}}/>
                                    <Button variant="contained" onClick={() => {handleUsernameSubmit()}} sx={{width: '100%'}}>Edit</Button>
                                </Stack>
                                <Stack direction="row" spacing={2} sx={{width: '100%'}}>
                                    <Typography variant="h6">Email</Typography>
                                    <Input placeholder={userData.email} value={tempEmail} onChange={(e) => setTempEmail(e.target.value)} sx={{width: '100%'}}/>
                                    <Button variant="contained" onClick={() => {handleEmailSubmit()}} sx={{width: '100%'}}>Edit</Button>
                                </Stack>
                            </Stack>
                        </TilePaper>

                        <TilePaper>
                            <Typography variant="h6" sx={{ paddingBottom: '20px' }}>Password</Typography>
                            <Stack direction="column" spacing={1} sx={{paddingBottom: '20px'}}>
                                <Button variant="contained" onClick={() => {}} sx={{width: '100%'}}>Change Password</Button>
                                <Typography variant="caption">Change password by entering your current one.</Typography>
                            </Stack>
                            <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.5)' }}/>
                            <Stack direction="column" spacing={1} sx={{paddingTop: '20px'}}>
                                <Button variant="contained" onClick={(event) => {event.preventDefault(); window.scrollTo(0, 0);}} sx={{width: '100%'}}>Reset Password</Button>
                                <Typography variant="caption">Reset password via email.</Typography>
                            </Stack>
                        </TilePaper>

                        <TilePaper>
                            <Typography variant="h6" sx={{ paddingBottom: '20px' }}>Preferences</Typography>
                            <Stack direction="column" spacing={1}>
                            
                            </Stack>
                        </TilePaper>
                    </Stack>
                </Grid>

                <Grid item xs={4}>
                    <Stack direction="column" spacing={2}>

                        <TilePaper centered sx={{alignItems: 'center', justifyContent: 'center'}}>
                            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: '20px'}}>
                                <Avatar sx={{width: '100px', height: '100px', fontSize: '50px'}}>A</Avatar>
                            </Box>
                            <Typography variant="h6">UserID:</Typography>
                            <Typography variant="subtitle1">{ userId }</Typography>
                        </TilePaper>

                        <TilePaper>
                            <Typography variant="h6" sx={{ paddingBottom: '20px' }}>About you:</Typography>

                            <Divider>
                                <Chip label="Name" size="small" sx={{color: 'white'}}/>
                            </Divider>
                            <Typography variant="subtitle1">{ userData.fullName }</Typography>
                            <Divider>
                                <Chip label="Date of birth" size="small" sx={{color: 'white'}}/>
                            </Divider>
                            <Typography variant="subtitle1">{ userData.birthDate }</Typography>
                            <Divider>
                                <Chip label="Phone number" size="small" sx={{color: 'white'}}/>
                            </Divider>
                            <Typography variant="subtitle1">{ userData.phoneNumber }</Typography>
                            <Divider>
                                <Chip label="Address" size="small" sx={{color: 'white'}}/>
                            </Divider>
                            <Typography variant="subtitle1">{ userData.address }</Typography>
                            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'end', justifyContent: 'end', paddingTop: '10px', paddingRight: '20px'}}>
                                <Button variant="contained">Edit</Button>
                            </Box>
                        </TilePaper>

                    </Stack>
                </Grid>

            </Grid>
        </Box>
    );
}