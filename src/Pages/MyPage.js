import React from 'react';
import { Box, Chip, Divider, Stack, Typography, Paper, Hidden, createTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

import Information from '../Components/UserComponents/Information';
import Cards from '../Components/UserComponents/Cards';
import History from '../Components/UserComponents/History';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
const theme = createTheme({});

export default function UserPage() {

    const [currentPage, setCurrentPage] = React.useState(0);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleCompChange = (component) => {
        setCurrentPage(component);
    }

    return (
        <Box sx={{ 
         padding: isSmallScreen ? 'none' : '35px', 

         paddingTop: '50px'}}
         >
            <Grid container spacing={5} sx={{height: '100%'}}>
                {!isSmallScreen &&
                    <Grid item xs={3} minWidth={'250px'}>
                        <Stack spacing={2} alignItems={'center'} className='preventSelect' sx={{ paddingTop: '10px' }}>
                            <Paper elevation={ currentPage === 0 ? 5 : 0} square sx={{ padding: '10px', backgroundColor: 'transparent', minWidth: '250px'}} onClick={() => { handleCompChange(0) }} >
                                <Typography sx={{ color: 'white', paddingLeft: '10px' }} variant='h5' >Account</Typography>
                            </Paper>
                            <Paper elevation={ currentPage === 1 ? 5 : 0} square sx={{ padding: '10px', backgroundColor: 'transparent', minWidth: '250px'}} onClick={() => { handleCompChange(1) }} >
                                <Typography sx={{ color: 'white', paddingLeft: '10px' }} variant='h5' >Payment</Typography>
                            </Paper>
                            <Paper elevation={ currentPage === 2 ? 5 : 0} square sx={{ padding: '10px', backgroundColor: 'transparent', minWidth: '250px'}} onClick={() => { handleCompChange(2) }} >
                                <Typography sx={{ color: 'white', paddingLeft: '10px' }} variant='h5' >History</Typography>
                            </Paper>
                        </Stack>
                    </Grid>
                    }
                <Grid item xs={12} md={8} sx={{ paddingBottom: '100px'}}>
                    {currentPage === 0 && <Information />}
                    {currentPage === 1 && <Cards />}
                    {currentPage === 2 && <History />}
                </Grid>
            </Grid>
        </Box>
    )
}