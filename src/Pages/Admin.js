import React from 'react';
import { Box, Chip, Divider, Stack, Typography, Paper, Hidden, createTheme, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import StadiumRoundedIcon from '@mui/icons-material/StadiumRounded';

import AdminParticipants from '../Components/AdminComponents/AdminParticipants';
import AdminRaces from '../Components/AdminComponents/AdminRaces';
import AdminUsers from '../Components/AdminComponents/AdminUsers';

import useMediaQuery from '@mui/material/useMediaQuery';
const theme = createTheme({});

export default function Admin() {

    const [currentPage, setCurrentPage] = React.useState(0);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleCompChange = (component) => {
        setCurrentPage(component);
    }

    return (
        <>
            <Box sx={{
             padding: isSmallScreen ? 'none' : '35px',
             paddingTop: '50px'}}
             >
                <Grid container spacing={5} sx={{height: '100%'}}>
                    <Grid item xs={12} md={8} sx={{ paddingBottom: '100px'}}>
                        {currentPage === 0 && <AdminUsers />}
                        {currentPage === 1 && <AdminRaces />}
                        {currentPage === 2 && <AdminParticipants />}
                    </Grid>
                    {!isSmallScreen &&
                        <Grid item xs={3} minWidth={'250px'}>
                            <Stack spacing={2} alignItems={'center'} className='preventSelect' sx={{ paddingTop: '10px' }}>
                            <Paper elevation={ currentPage === 0 ? 5 : 0} square sx={{ padding: '10px', backgroundColor: 'transparent', minWidth: '250px'}} onClick={() => { handleCompChange(0) }} >
                                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                        <PeopleRoundedIcon sx={{ color: currentPage === 0 ? 'white' : 'gray' }} />
                                        <Typography sx={{ color: currentPage === 0 ? 'white' : 'gray', paddingLeft: '10px' }} variant='h5' >Users</Typography>
                                    </Stack>
                                </Paper>
                                <Paper elevation={ currentPage === 1 ? 5 : 0} square sx={{ padding: '10px', backgroundColor: 'transparent', minWidth: '250px'}} onClick={() => { handleCompChange(1) }} >
                                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                        <StadiumRoundedIcon sx={{ color: currentPage === 1 ? 'white' : 'gray' }} />
                                        <Typography sx={{ color: currentPage === 1 ? 'white' : 'gray', paddingLeft: '10px' }} variant='h5' >Races</Typography>
                                    </Stack>
                                </Paper>
                                <Paper elevation={ currentPage === 2 ? 5 : 0} square sx={{ padding: '10px', backgroundColor: 'transparent', minWidth: '250px'}} onClick={() => { handleCompChange(2) }} >
                                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                        <DirectionsRunIcon sx={{ color: currentPage === 2 ? 'white' : 'gray' }} />
                                        <Typography sx={{ color: currentPage === 2 ? 'white' : 'gray', paddingLeft: '10px' }} variant='h5' >Participants</Typography>
                                    </Stack>
                                </Paper>
                            </Stack>
                        </Grid>
                        }
                </Grid>
            </Box>
            {isSmallScreen &&
                <Box sx={{ width: '100%', position: 'absolute', bottom: 0}}>
                <BottomNavigation
                    showLabels
                    value={currentPage}
                    onChange={(event, newValue) => {
                        handleCompChange(newValue);
                    }}
                    sx={{ backgroundColor: 'rgb(50, 50, 50)'}}
                >
                    <BottomNavigationAction sx={{color: 'white'}} label="Account" icon={<PeopleRoundedIcon />} />
                    <BottomNavigationAction sx={{color: 'white'}} label="Payment" icon={<StadiumRoundedIcon />} />
                    <BottomNavigationAction sx={{color: 'white'}} label="History" icon={<DirectionsRunIcon />} />
                </BottomNavigation>
            </Box>
            }
    </>
    )
}