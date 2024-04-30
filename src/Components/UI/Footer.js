import React from 'react';
import { Avatar, Box, Grid, Typography, Stack, Link, Divider } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import BackupIcon from '@mui/icons-material/Backup';

export default function Footer() {
    const link = (whereTo, label)=>{
        return (
            <Typography sx={{ 
                textDecoration: 'none',
                cursor: 'pointer',
                color:'lightgray',
                    '&:hover': {
                    color: 'white',
                    },
                transition: 'color 0.5s ease',}} 
            component={Link} 
            to={whereTo}>
                {label}
            </Typography>
        )
    }

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
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Grid container>
                                    <Grid item sm={4} lg={4} xl={4} sx={{ paddingX: 5 }}>
                                        <Stack spacing={1} direction="column" sx={{ alignItems: 'left' }}>
                                            {link('/', 'Home')}
                                            {link('/discover', 'Discover')}
                                            {link('/Races', 'Races')}
                                        </Stack>
                                    </Grid>
                                    <Grid item sm={4} lg={4} xl={4} sx={{paddingX: 5, textAlign: 'start' }}>
                                        <Stack direction={'column'} spacing={1} sx={{ alignItems: 'left', color: 'lightgray'}}>
                                            <Stack direction={'row'} sx={{alignItems: 'center'}}>
                                                <EmailIcon sx={{ color: 'lightgray'}} />
                                                <Typography sx={{ color: 'inherit', marginLeft: '5px' }}>boredomserviceprovider@gmail.com</Typography>
                                            </Stack>
                                            <Stack direction={'row'} sx={{alignItems: 'center' }}> 
                                                <PowerSettingsNewIcon sx={{ color: 'lightgray'}}/> 
                                                <Typography sx={{ color: 'inherit', marginLeft: '5px' }}>Powered by:</Typography>
                                            </Stack>
                                            <Stack  direction={'row'} sx={{ alignItems: 'center' }}> 
                                                <ArrowCircleUpIcon sx={{ color: 'lightgray'}}/> 
                                                <Typography sx={{ color: 'inherit', marginLeft: '5px' }}>Vercel</Typography>
                                            </Stack>
                                            <Stack  direction={'row'} sx={{alignItems: 'center' }}>
                                                <BackupIcon sx={{ color: 'lightgray'}}/> 
                                                <Typography sx={{ color: 'inherit', marginLeft: '5px' }}>Microsoft Azure</Typography>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid item sm={4} lg={4} xl={4} sx={{paddingX: 5,  textAlign: 'center'  }}>
                                        <Stack direction={'column'} spacing={2}>
                                            <Avatar variant='square' src={process.env.PUBLIC_URL + '/images/bannerlight.png'} sx={{ width: 'auto', height: 'auto' }}/>
                                            <Typography sx={{ fontSize: '12px', textAlign: 'right' }}>© 2024 - BoreDom</Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Box>
                </Grid>

                <Grid container sx={{ width: '100%', backgroundColor: 'rgba(66, 66, 66, 1)', paddingX: '20vw', paddingY: 5 }}>
                    <Grid item sx={{display: 'flex', justifyContent: 'space-around', width: '100%', fontSize: '12px'}}>
                    <Typography sx={{ color: 'inherit' }}>
                            Disclaimer: The horses, jockeys, 
                            and races showcased on this website are computer-generated 
                            simulations intended for entertainment purposes. While the race tracks mentioned 
                            are real, please note that the depicted events are fictional and not based on real-life 
                            occurrences. Enjoy the virtual thrill responsibly!
                        </Typography>
                        <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.5)' }}/>
                        <Typography sx={{ color: 'inherit' }}>
                            Important Notice: We kindly advise users not to 
                            input or share real credit card information on this 
                            platform. Your security is our priority, and entering 
                            real financial details poses unnecessary risks. 
                            Please refrain from using genuine credit card information 
                            for any transactions or registrations. Thank you for your 
                            understanding and cooperation.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </footer>
    );
}