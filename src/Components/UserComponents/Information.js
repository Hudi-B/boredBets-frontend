import React from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Paper, Stack, Typography, Chip, Button, Divider, Input, Switch, Select, FormControl, MenuItem, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';
import { apiUrl } from '../../boredLocal';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';
import UserDetailForm from './UserDetailForm';
import CheckIcon from '@mui/icons-material/Check';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AddIcon from '@mui/icons-material/Add';
import ChecklistIcon from '@mui/icons-material/Checklist';
import PortraitIcon from '@mui/icons-material/Portrait';
import EditIcon from '@mui/icons-material/Edit';
import PasswordChangeForm from './PasswordChangeForm';
import EmailChangeForm from './EmailChangeForm';
import UsernameChangeForm from './UsernameChangeForm';
import ChangeImage from './ChangeImage';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { logout } from '../../auth/authSlice';
import ResetPassword from './ResetPassword';

const TilePaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    boxShadow: theme.shadows[4],
    backgroundColor: 'rgba(50, 50, 50, 0.2)',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'white',
}))

const BackgroundBox = styled(Box)(({ theme }) => ({
    backgroundColor: 'rgb(50,71,101)',
    padding: theme.spacing(1),
    borderRadius: '5px',
    boxShadow: 'inset 0px 0px 5px rgba(0, 0, 0, 0.5)',
}))

export default function Information() {
    const { enqueueSnackbar } = useSnackbar();
    const username = useSelector((state) => state.auth.username);
    const userId = useSelector((state) => state.auth.userId);
    const userImage = useSelector((state) => state.auth.imageUrl);
    const [isPrivate, setIsPrivate] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userStatus, setUserStatus] = useState({
        profilePic: userImage !== '',
        transaction: false,
        completedProfile: false,
    });
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        fullName: '-',
        birthDate: '-',
        phoneNumber: '-',
        address: '-',
    });

    const [openDialogs, setOpenDialogs] = useState({
        aboutYouDialog: false,
        passwordChangeDialog: false,
        usernameChangeDialog: false,
        emailChangeDialog: false,
        deleteUserDialog: false,
    });
    
    const handleOpenDialog = (dialogName) => {
        setOpenDialogs({ ...openDialogs, [dialogName]: true });
    };
    
    const handleCloseDialog = (dialogName) => {
        setOpenDialogs({ ...openDialogs, [dialogName]: false });
        fetchData();
    };

    const fetchData = async () => {
        await axios.get(apiUrl+`UserDetail/GetUserDetailByUserId?UserId=` + userId)
        .then((response) => {
            setUserData(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const transactionsCheck = async () => {
        await axios.get(apiUrl+`UserDetail/GetAllTransactionsByUserId?UserId=` + userId)
        .then((response) => {
            if (response.data.length > 0) {
                setUserStatus({ ...userStatus, transaction: true });
            }
        })
        .catch((error) => {  
                console.log(error);
        })
    }

    const privacyCheck = async () => {
        await axios.get(apiUrl+`UserDetail/GetIsPrivateByUserId?UserId=` + userId)
        .then((response) => {
            setIsPrivate(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        fetchData();
        transactionsCheck();
        privacyCheck();
    }, []);

    useEffect(() => {
        if (userStatus.transaction && userStatus.profilePic) {
            setUserStatus({ ...userStatus, completedProfile: true });
        }
        console.log(userStatus);
    }, [userStatus.transaction, userStatus.profilePic]);

    const handleisPrivateChange = async (checked) => {
        setIsPrivate(checked);
        await axios.put(apiUrl+`UserDetail/Preferences?UserId=` + userId + '&isPrivate=' + !isPrivate)
        .then(() => {
            enqueueSnackbar('Privacy updated successfully', { variant: 'success', autoHideDuration: 3000, TransitionComponent: Slide });
        })
        .catch(() => {
            enqueueSnackbar('Something went wrong', { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide });
        })
    }

    const handleUserDelete = async () => {
        await axios.delete(apiUrl+`User/DeleteUserById?UserId=` + userId)
        .then(() => {
            enqueueSnackbar('User successfully deleted', { variant: 'success', autoHideDuration: 3000, TransitionComponent: Slide });
            navigate('/');
            dispatch(logout());
        })
        .catch(() => {
            console.log(userId)
            enqueueSnackbar('Something went wrong', { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide });
        })
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
            <Grid container spacing={2} sx={{width: '100%', justifyContent: 'center', flexDirection: 'row-reverse'}}>
                <Grid item xs={12} sm={10} md={4}>
                    <Stack direction="column" spacing={2}>
                        <TilePaper sx={{alignItems: 'center', justifyContent: 'center'}}>
                            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: '20px'}}>
                                <Box sx={{width: '100px', height: '100px',position: 'relative'}}>
                                    <Avatar sx={{width: '100%', height: '100%', fontSize: '100px'}} src={userImage} />
                                    <ChangeImage userId={userId}/>
                                </Box>
                            </Box>
                            <Typography variant="h4">{username}</Typography>
                            <Typography variant="caption1">UUID:</Typography>
                            <BackgroundBox sx>
                                <Stack direction="column" spacing={0}>
                                    <Typography variant="subtitle1">{ userId }</Typography>
                                </Stack>
                            </BackgroundBox>
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
                            <Typography variant="subtitle1">{ userData.birthDate === '1111-01-01' ? '-' : userData.birthDate }</Typography>
                            <Divider>
                                <Chip label="Phone number" size="small" sx={{color: 'white'}}/>
                            </Divider>
                            <Typography variant="subtitle1">{ userData.phoneNumber }</Typography>
                            <Divider>
                                <Chip label="Address" size="small" sx={{color: 'white'}}/>
                            </Divider>
                            <Typography variant="subtitle1">{ userData.address }</Typography>
                            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'end', justifyContent: 'end', paddingTop: '10px', paddingRight: '20px'}}>
                                <Button variant="contained" onClick={() => {handleOpenDialog('aboutYouDialog')}}>Edit</Button>
                            </Box>
                        </TilePaper>

                    </Stack>
                </Grid>
                <Grid item xs={12} sm={10} md={8}>
                    <Stack direction={'column'} spacing={2}>
                        <TilePaper> 
                            <Typography variant="h5" sx={{ paddingBottom: '20px' }}>Account Status</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={12} lg={6}>
                                    <Stack direction={'column'} spacing={2} alignItems={'center'}>
                                        <Stack direction={'row'} spacing={2} alignItems="center">
                                            <Typography variant="h6" sx={{color: 'lightgrey'}}>Create Account</Typography>
                                            <Box
                                            sx={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '50%',
                                            backgroundColor: 'limegreen',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flex: 'none',}}
                                            >
                                                <AddIcon sx={{color: 'rgb(4, 112, 107)'}}/>
                                            </Box>
                                        </Stack>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Typography variant="h6" sx={{color: userStatus.profilePic ? 'lightgrey' : 'white'}}>Add Profile Picture</Typography>
                                            <Box
                                            sx={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '50%',
                                            borderStyle: 'solid',
                                            borderWidth: '2px',
                                            borderColor: userStatus.profilePic ? 'transparent' : 'white',
                                            display: 'flex',
                                            backgroundColor: userStatus.profilePic ? 'limegreen' : 'transparent',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flex: 'none',}}
                                            >
                                                <PortraitIcon sx={{color: userStatus.profilePic ? 'rgb(4, 112, 107)' : 'white'}}/>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={6} md={12} lg={6}>
                                    <Stack direction={'column'} spacing={2} alignItems={'center'}>
                                        <Stack direction={'row'} spacing={2} alignItems="center">
                                            <Typography variant="h6" sx={{color: userStatus.completedProfile ? 'lightgrey' : 'white'}}>Complete Account</Typography>
                                            <Box
                                            sx={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '50%',
                                            borderStyle: 'solid',
                                            borderWidth: '2px',
                                            borderColor: userStatus.completedProfile ? 'transparent' : 'white',
                                            backgroundColor: userStatus.completedProfile ? 'limegreen' : 'transparent',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flex: 'none',}}
                                            >
                                                <ChecklistIcon sx={{color: userStatus.completedProfile ? 'rgb(4, 112, 107)' : 'white'}}/>
                                            </Box>
                                        </Stack>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Typography variant="h6" sx={{color: userStatus.transaction ? 'lightgrey' : 'white'}}>Make Transaction</Typography>
                                            <Box
                                                sx={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '50%',
                                                borderStyle: 'solid',
                                                borderWidth: '2px',
                                                borderColor: userStatus.transaction ? 'transparent' : 'white',
                                                backgroundColor: userStatus.transaction ? 'limegreen' : 'transparent',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                flex: 'none',}}
                                            >
                                                <CreditCardIcon sx={{color: userStatus.transaction ? 'rgb(4, 112, 107)' : 'white'}}/>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </TilePaper>

                        <TilePaper>
                            <Typography variant="h6" sx={{ paddingBottom: '20px' }}>Details</Typography>
                                <Stack direction="column" spacing={1} sx={{paddingY: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
                                    <Button variant="contained" sx={{width: '300px'}} onClick={() => {handleOpenDialog('usernameChangeDialog')}} >Change Username</Button>
                                    <Typography variant="caption">Change your current username.</Typography>
                                </Stack>
                                <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.5)' }}/>
                                <Stack direction="column" spacing={1} sx={{paddingTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <Button variant="contained" sx={{width: '300px'}} onClick={() => {handleOpenDialog('emailChangeDialog')}} >Change Email Address</Button>
                                    <Typography variant="caption">Change your current email address.</Typography>
                                </Stack>
                        </TilePaper>

                        <TilePaper>
                            <Typography variant="h6" sx={{ paddingBottom: '20px' }}>Password</Typography>
                            <Stack direction="column" spacing={1} sx={{paddingBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
                                <Button variant="contained" onClick={() => {handleOpenDialog('passwordChangeDialog')}} sx={{width: '300px'}} >Change Password</Button>
                                <Typography variant="caption">Change password by entering your current one.</Typography>
                            </Stack>
                            <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.5)' }}/>
                            <Stack direction="column" spacing={1} sx={{paddingTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <ResetPassword />
                                <Typography variant="caption">Reset password via email.</Typography>
                            </Stack>
                        </TilePaper>
                        
                        <TilePaper>
                            <Typography variant="h6" sx={{ paddingBottom: '20px' }}>Manage</Typography>
                            <Stack container direction="column" spacing={1} sx={{paddingBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Stack direction="row" alignItems="center" justifyContent="center" >
                                    <LockOpenIcon sx={{ color: isPrivate ? 'grey' : 'white'}}/>
                                    <Switch size='large' checked={isPrivate} onChange={(e) => handleisPrivateChange(e.target.checked)}/>
                                    <LockOutlinedIcon sx={{ color: isPrivate ? 'white' : 'grey' }}/>
                                </Stack>
                                <Typography variant="caption">Change profile visibility.</Typography>
                            </Stack>
                            <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.5)' }}/>
                            <Stack direction="column" spacing={1} sx={{ paddingTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Button variant="contained" color='error' onClick={() => {handleOpenDialog('deleteUserDialog')}} sx={{width: '300px'}} >Delete account</Button>
                                <Typography variant="caption">Permanently delete your account.</Typography>
                            </Stack>
                        </TilePaper>
                    </Stack>
                </Grid>
            </Grid>
            <Dialog
                open={openDialogs.deleteUserDialog}
                onClose={() => handleCloseDialog('deleteUserDialog')}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{backgroundColor: 'rgba(0,0,0,0.5)'}}
                PaperProps={{
                    sx: {
                    backgroundColor: 'rgb(50,71,101)',
                    color: 'white',
                    },
                }}
                >
                <DialogTitle id="alert-dialog-title">{"Delete Account"}</DialogTitle>
                <DialogContent>
                    <DialogContentText color={'white'} id="alert-dialog-description">
                    Are you sure you want to delete your account?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{justifyContent: 'space-between'}}>
                    <Button onClick={handleCloseDialog} color="primary" sx={{'&:hover': {backgroundColor: 'rgba(50,50,50,0.1)',boxShadow: '0 0 5px rgb(50, 50,50)'},textTransform: 'none', color: 'white' }}>
                    CANCEL
                    </Button>
                    <Button onClick={handleUserDelete} color="primary" autoFocus sx={{'&:hover': {backgroundColor: 'rgba(50,50,50,0.1)',boxShadow: '0 0 5px rgb(50, 50,50)'},color: 'white'}}>
                    Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            <UserDetailForm open={openDialogs.aboutYouDialog} onClose={() => handleCloseDialog('aboutYouDialog')} />
            <PasswordChangeForm open={openDialogs.passwordChangeDialog} onClose={() => handleCloseDialog('passwordChangeDialog')} />
            <EmailChangeForm open={openDialogs.emailChangeDialog} onClose={() => handleCloseDialog('emailChangeDialog')} />
            <UsernameChangeForm open={openDialogs.usernameChangeDialog} onClose={() => handleCloseDialog('usernameChangeDialog')} />
        </Box>
    );
}