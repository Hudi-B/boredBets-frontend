import React from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Box, Typography, Stack } from '@mui/material';
import HorsesGrid from './HorsesGrid';
import JockeysGrid from './JockeysGrid';

const TilePaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    boxShadow: theme.shadows[4],
    backgroundColor: 'rgba(50, 50, 50, 0.2)',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'white',
}))

const AdminParticipants = () => {
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
        overflowY: '',
        paddingBottom: '50px' }}
        >
            <Stack direction={'column'} spacing={2}>
                <TilePaper>
                    <Typography variant='h5'>All participants</Typography>
                </TilePaper>
                <TilePaper>
                    <HorsesGrid/>
                </TilePaper>
                <TilePaper>
                    <JockeysGrid/>
                </TilePaper>
            </Stack>
        </Box>
    );
};

export default AdminParticipants;