import React from 'react';
import { Avatar, Box, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

const TilePaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    boxShadow: theme.shadows[4],
    backgroundColor: 'rgb(4, 112, 107)',
    padding: theme.spacing(2),
    textAlign: 'center',
}))

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
                    <Stack direction={'column'} spacing={2}>
                        <TilePaper centered sx={{height: '250px', alignItems: 'center', justifyContent: 'center'}}>
                            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                <Avatar sx={{width: '100px', height: '100px', fontSize: '50px'}}>A</Avatar>
                            </Box>
                            <Typography variant="h5">UserID:</Typography>
                            <Typography variant="h6">asrwh42-135fhsdhs3-qsdgdwsh</Typography>
                        </TilePaper>
                        <TilePaper sx={{height: '400px'}}>
                            <Typography variant="h5">About you:</Typography>
                        </TilePaper>
                    </Stack>
                </Grid>
                <Grid item xs={8}>
                    <Stack direction="column" spacing={2}>
                        <TilePaper sx={{height: '100px'}}>Account status</TilePaper>
                        <TilePaper sx={{height: '100px'}}>Email</TilePaper>
                        <TilePaper sx={{height: '100px'}}>Password</TilePaper>
                        <TilePaper sx={{height: '100px'}}>Preferences</TilePaper>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}