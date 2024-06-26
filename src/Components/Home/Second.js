
import { Typography, Grid, Avatar, Hidden } from '@mui/material';
export default function Second() {

    return (
        <Grid container gap={2}  sx={{
            justifyContent: 'center',
            width: '100%',
            backgroundImage: 'url("/images/bg.png")',
            backgroundRepeat: 'repeat',
            backgroundSize: '10%',
            paddingY: 10,}}>
            <Hidden mdDown>
                <Grid item xs={10} md={5} sx={{
                    justifyContent: 'center', 
                    display: 'flex',
                    alignItems: 'center'}}>
                <Avatar
                    className='preventSelect'
                    variant='square'
                    src={process.env.PUBLIC_URL + '/images/paintedhorsebanner.png'}
                    sx={{
                        width: '80%',
                        height: 'auto',
                        maxWidth: '300px',
                        borderRadius: 3,
                        backgroundColor: 'rgba(200, 200, 200, 0.95)',
                        boxShadow: ' 0 0 30px rgba(200,200,200, 1)'
                    }}
                    />                
                </Grid>
            </Hidden>
            <Grid item xs={10} md={5} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant='h3' textAlign={'center'} fontWeight={'400'}>
                <span style={{ fontWeight: 'bold'}}>boredBets</span>
                &nbsp;is a place where betting isn't about luck, but the numbers.
                </Typography>
            </Grid>
        </Grid>
    );
}
