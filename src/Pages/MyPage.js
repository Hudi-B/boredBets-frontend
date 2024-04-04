import React from 'react';
import { Box, Chip, Divider, Stack, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

import Information from '../Components/UserComponents/Information';
import Cards from '../Components/UserComponents/Cards';
import History from '../Components/UserComponents/History';

export default function UserPage() {

    const [currentPage, setCurrentPage] = React.useState(0);

    const handleCompChange = (component) => {
        setCurrentPage(component);
    }

    return (
        <Box sx={{ 
         padding: '35px', 
         paddingTop: '50px',
         minHeight: '100vh', }}
         >
            <Grid container spacing={5} sx={{width: '100%', height: '100%'}}>
                <Grid item xs={2}>
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
                <Grid item xs={10}>
                    {currentPage === 0 && <Information />}
                    {currentPage === 1 && <Cards />}
                    {currentPage === 2 && <History />}
                </Grid>
            </Grid>
        </Box>
    )
}