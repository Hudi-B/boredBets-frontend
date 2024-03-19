import React from 'react';
import { Box, Chip, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

import Information from '../Components/UserComponents/Information';
import Cards from '../Components/UserComponents/Cards';
import History from '../Components/UserComponents/History';

const MenuChip = styled(Chip)(({ theme }) => ({
    height: '50px',
    fontSize: '20px',
    color: 'white',
  }));

export default function UserPage() {

    const [currentPage, setCurrentPage] = React.useState(0);

    const handleCompChange = (component) => {
        setCurrentPage(component);
    }

    return (
        <Box sx={{ 
         padding: '10px', 
         paddingTop: '50px' }}
         
        >
            <Grid container spacing={5} sx={{width: '100%', height: '100%'}}>
                <Grid item xs={4}>
                    <Stack spacing={2} sx={{ paddingTop: '10px' }}>
                        <MenuChip label="Account" onClick={() => { handleCompChange(0) }} />
                        <MenuChip label="Payment" onClick={() => { handleCompChange(1) }} />
                        <MenuChip label="History" onClick={() => { handleCompChange(2) }} />
                    </Stack>
                </Grid>
                <Grid item xs={8} sx={{minHeight: '100vh'}}>
                    {currentPage === 0 && <Information />}
                    {currentPage === 1 && <Cards />}
                    {currentPage === 2 && <History />}
                </Grid>
            </Grid>
        </Box>
    )
}