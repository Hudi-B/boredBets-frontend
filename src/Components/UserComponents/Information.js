import React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Paper, Stack, Typography, Chip, Button, Select, MenuItem, FormControl, InputLabel, Divider } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';
import { apiUrl } from '../../boredLocal';
import { useSelector } from 'react-redux';

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
    const userId = useSelector((state) => state.auth.userId);
    const [userData, setUserData] = useState({
        email: '',
        fullName: '-',
        birthDate: '-',
        address: '-',
    });

    const fetchData = async () => {
        await axios.get(apiUrl+`User/GetByUserId?UserId=` + userId)
        .then((response) => {
            setUserData(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        fetchData();
    }, []);

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
                <Grid item xs={8}>
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
                                            alignItems: 'center',}}
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
                                            alignItems: 'center',}}
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
                                            alignItems: 'center',}}
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
                                                }}
                                            >
                                                <CreditCardIcon sx={{color: 'white'}}/>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </TilePaper>

                        <TilePaper>
                            <Typography variant="h6" sx={{ paddingBottom: '20px' }}>Email</Typography>
                            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Chip size='large' label={userData.email} onClick={() => {}} onDelete={() => {}} deleteIcon={<EditIcon style={{color: 'white'}} />} sx={{color: 'white', width: '400px',display: 'flex', justifyContent: 'space-between', alignItems: 'center',}}/>
                            </Box>
                        </TilePaper>

                        <TilePaper>
                            <Typography variant="h6" sx={{ paddingBottom: '20px' }}>Password</Typography>
                            <Stack direction="column" spacing={1} sx={{paddingBottom: '20px'}}>
                                <Button variant="contained" onClick={() => {}} sx={{width: '100%'}}>Change Password</Button>
                                <Typography variant="caption">Change password by entering your current one.</Typography>
                            </Stack>
                            <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.5)' }}/>
                            <Stack direction="column" spacing={1} sx={{paddingTop: '20px'}}>
                                <Button variant="contained" onClick={() => {}} sx={{width: '100%'}}>Reset Password</Button>
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
                            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                <Avatar sx={{width: '100px', height: '100px', fontSize: '50px'}}>A</Avatar>
                            </Box>
                            <Typography variant="h5">UserID:</Typography>
                            <Typography variant="h6">{ userId }</Typography>
                        </TilePaper>

                        <TilePaper>
                            <Typography variant="h6" sx={{ paddingBottom: '20px' }}>About you:</Typography>

                            <Divider>
                                <Chip label="Name" size="small" sx={{color: 'white'}}/>
                            </Divider>
                            <Typography variant="subtitle1">{ userData.name }</Typography>
                            <Divider>
                                <Chip label="Date of birth" size="small" sx={{color: 'white'}}/>
                            </Divider>
                            <Typography variant="subtitle1">{ userData.birthDate }</Typography>
                            <Divider>
                                <Chip label="Phone number" size="small" sx={{color: 'white'}}/>
                            </Divider>
                            <Typography variant="subtitle1">Phone number placeholder</Typography>
                            <Divider>
                                <Chip label="Address" size="small" sx={{color: 'white'}}/>
                            </Divider>
                            <Typography variant="subtitle1">{ userData.address }</Typography>
                        </TilePaper>

                    </Stack>
                </Grid>

            </Grid>
        </Box>
    );
}