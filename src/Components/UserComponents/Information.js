import React from 'react';
import { Box, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

export default function Information() {
    return (
        <Box sx={{ 
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
                <Grid item xs={4}>
                    <Paper sx={{width: '100%', height: '100px', backgroundColor: 'rgb(2, 145, 138)'}}>asd</Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper sx={{width: '100%', height: '100px', backgroundColor: 'rgb(2, 145, 138)'}}>asd</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={{width: '100%', height: '100px', backgroundColor: 'rgb(2, 145, 138)'}}>asd</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={{width: '100%', height: '100px', backgroundColor: 'rgb(2, 145, 138)'}}>asd</Paper>
                </Grid>
            </Grid>
        </Box>
    );
}