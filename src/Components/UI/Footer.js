import React from 'react';
import { Avatar, Box, Grid, Typography, Stack } from '@mui/material';

export default function Footer() {
    return (
        <footer>
            <Box sx={{
            width: '100%',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            bottom: 0,
            position: 'relative',}}
            >
                <Grid container sx={{ width: '100%', backgroundColor: 'rgba(50, 50, 50, 1)', paddingX: '20vw', paddingY: 5 }}>
                    <Grid item>
                        <Typography>Contact: boredomserviceprovider@gmail.com</Typography>
                    </Grid>
                </Grid>
                <Grid container sx={{ width: '100%', backgroundColor: 'rgba(66, 66, 66, 1)', paddingX: '20vw', paddingY: 5 }}>
                    <Grid item>
                        <Stack direction="row" spacing={2}>
                            <Avatar variant='square' src={process.env.PUBLIC_URL + '/images/bannerlight.png'} sx={{width: 'auto', height: '120px' }}/>
                            <Typography>© 2024 - BoreDom</Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </footer>
    );
}