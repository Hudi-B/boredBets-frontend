import React from 'react';
import { Avatar, Box, Grid, Typography, Stack, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EmailIcon from '@mui/icons-material/Email';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import BackupIcon from '@mui/icons-material/Backup';

export default function Footer() {
    const userId = useSelector((state) => state.auth.userId);
    const hasUserId = userId ? true : false
    const link = (whereTo, label)=>{
        return (
            <Typography sx={{ 
                textDecoration: 'none',
                cursor: 'pointer',
                color:'lightgray',
                fontSize: 'calc(10px + 0.5vw)',
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
            position: 'relative'}}
            >
                <Grid container sx={{ width: '100%', backgroundColor: 'rgba(50, 50, 50, 1)', paddingX: '10vw', paddingY: 5 }}>
                    <Grid item md={4} lg={4} xl={4} sx={{ paddingX: 5 }}>
                        <Stack spacing={1} direction="column" sx={{ alignItems: 'left',marginTop: '10px'}}>
                            {link('/', 'Home')}
                            {link('/discover', 'Discover')}
                            {link('/Races', 'Races')}
                            {hasUserId && link('/mypage', 'MyPage')}
                        </Stack>
                    </Grid>
                    <Grid item md={6} lg={4} xl={4} sx={{ paddingX: 2, textAlign: 'left' }}>
                        <Stack direction={'column'} spacing={1} sx={{ alignItems: 'left', color: 'lightgray', marginTop: '10px' }}>
                            <Stack direction={'row'} sx={{alignItems: 'center'}}>
                                <EmailIcon sx={{ color: 'lightgray',fontSize: 'calc(10px + 0.5vw)'}} />
                                <Typography sx={{ color: 'inherit', marginLeft: '5px',fontSize: 'calc(10px + 0.5vw)' }}>boredomserviceprovider@gmail.com</Typography>
                            </Stack>
                            <Stack direction={'row'} sx={{alignItems: 'center' }}> 
                                <PowerSettingsNewIcon sx={{ color: 'lightgray',fontSize: 'calc(10px + 0.5vw)'}}/> 
                                <Typography sx={{ color: 'inherit', marginLeft: '5px' ,fontSize: 'calc(10px + 0.5vw)'}}>Powered by:</Typography>
                            </Stack>
                            <Stack  direction={'row'} sx={{ alignItems: 'center' }}> 
                                <ArrowCircleUpIcon sx={{ color: 'lightgray',fontSize: 'calc(10px + 0.5vw)'}}/> 
                                <Typography sx={{ color: 'inherit', marginLeft: '5px',fontSize: 'calc(10px + 0.5vw)' }}>Vercel</Typography>
                            </Stack>
                            <Stack  direction={'row'} sx={{alignItems: 'center' }}>
                                <BackupIcon sx={{ color: 'lightgray',fontSize: 'calc(10px + 0.5vw)'}}/> 
                                <Typography sx={{ color: 'inherit', marginLeft: '5px' ,fontSize: 'calc(10px + 0.5vw)'}}>Microsoft Azure</Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item md={6} lg={4} xl={4} sx={{paddingX: 5,  textAlign: 'center'  }}>
                        <Stack direction={'column'} spacing={2} sx={{marginTop: '10px'}}>
                            <Avatar variant='square' src={process.env.PUBLIC_URL + '/images/bannerlight.png'} sx={{ width: 'auto', height: 'auto', maxWidth: '300px'}}/>
                            <Typography sx={{ fontSize: '12px', textAlign: 'right' }}>© 2024 - BoreDom</Typography>
                        </Stack>
                    </Grid>                       
                </Grid>

                <Grid container sx={{ width: '100%', backgroundColor: 'rgba(66, 66, 66, 1)', paddingX: '20vw', paddingY: 2, display: 'flex', justifyContent: 'space-between'}}>
                    <Grid item sm={12} md={5.9} sx={{justifyContent: 'space-around',marginTop: '5px', alignItems: 'flex-start' }}>
                    <Typography sx={{ color: 'inherit' , fontSize: '8px', textAlign: 'justify',fontSize: 'calc(8px + 0.3vw)'}}>
                            Disclaimer: The horses, jockeys, 
                            and races showcased on this website are computer-generated 
                            simulations intended for entertainment purposes. While the race tracks mentioned 
                            are real, please note that the depicted events are fictional and not based on real-life 
                            occurrences. Enjoy the virtual thrill responsibly!
                        </Typography>
                    </Grid>
                    <Grid item sm={12} md={5.9} sx={{justifyContent: 'space-around', marginTop: '5px', alignItems: 'flex-start' }}>
                        <Typography sx={{ color: 'inherit', fontSize: '8px', textAlign: 'justify',fontSize: 'calc(8px + 0.3vw)'}}>
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