import React from 'react';
import { Box, Paper, Chip, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

import Information from '../Components/UserComponents/Information';
import Security from '../Components/UserComponents/Security';
import Billing from '../Components/UserComponents/Billing';
import History from '../Components/UserComponents/History';

const MenuChip = styled(Chip)(({ theme }) => ({
    height: '50px',
    fontSize: '20px',
  }));

export default function UserPage() {

    const [currentPage, setCurrentPage] = React.useState('Information');

    const handleCompChange = (component) => {
        setCurrentPage(component);
    }

    return (
        <Box sx={{ width: '100%', 
         height: '100%', 
         display: 'flex', 
         flexDirection: 'column', 
         alignItems: 'center', 
         justifyContent: 'center', 
         padding: '10px', 
         margin: '0px', 
         overflowY: 'auto', 
         paddingTop: '50px' }}
        >
            <Grid container spacing={5} sx={{width: '100%', height: '100%'}}>
                <Grid item xs={4}>
                    <Stack spacing={2} sx={{ paddingTop: '10px' }}>
                        <MenuChip label="Account Information" onClick={() => { handleCompChange('Information') }} />
                        <MenuChip label="Account Security" onClick={() => { handleCompChange('Security') }} />
                        <MenuChip label="Billing" onClick={() => { handleCompChange('Billing') }} />
                        <MenuChip label="History" onClick={() => { handleCompChange('History') }} />
                    </Stack>
                </Grid>
                <Grid item xs={8}>
                    {currentPage === 'Information' && <Information />}
                    {currentPage === 'Security' && <Security />}
                    {currentPage === 'Billing' && <Billing />}
                    {currentPage === 'History' && <History />}
                </Grid>
            </Grid>
        </Box>
    )
}