import React from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Box, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import HorsesGrid from './HorsesGrid';

const TilePaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    boxShadow: theme.shadows[4],
    backgroundColor: 'rgba(50, 50, 50, 0.2)',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'white',
}))

const AdminUsers = () => {
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
            <TilePaper>
                <Typography variant='h5'>All users</Typography>
                <HorsesGrid/>
            </TilePaper>
        </Box>
    );
};

export default AdminUsers;