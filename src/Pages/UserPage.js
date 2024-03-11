import React from 'react';
import { Box, Chip, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

import Information from '../Components/UserComponents/Information';
import Billing from '../Components/UserComponents/Billing';
import History from '../Components/UserComponents/History';

const MenuChip = styled(Chip)(({ theme }) => ({
    height: '50px',
    fontSize: '20px',
  }));

export default function UserPage() {

    const [currentPage, setCurrentPage] = React.useState(0);

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
                        <MenuChip label="Account Information" onClick={() => { handleCompChange(0) }} />
                        <MenuChip label="Billing" onClick={() => { handleCompChange(1) }} />
                        <MenuChip label="History" onClick={() => { handleCompChange(2) }} />
                    </Stack>
                </Grid>
                <Grid item xs={8}>
                    {currentPage === 0 && <Information />}
                    {currentPage === 1 && <Billing />}
                    {currentPage === 2 && <History />}
                </Grid>
            </Grid>
        </Box>
    )
}