
import { Typography, Grid, Avatar, Paper, Divider, Button, Hidden } from '@mui/material';
export default function Second() {

    return (
        <Grid container gap={2}  sx={{
            justifyContent: 'center',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.7)',
            paddingY: 15,    
            boxShadow: 'inset 0 0 20px rgba(200, 200, 200, 0.3)',
            marginBottom: 20}}>
            <Grid item xs={10} md={5} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant='h3' sx={{color: 'rgb(220,220,220)'}}>
                boredBets is the number one betting simulator on the web.
                </Typography>
            </Grid>
            <Grid item xs={10} md={5} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5}}>
                <Typography variant='h5' textAlign={'center'}  sx={{ fontStyle: 'italic', color: 'rgb(220,220,220)'}}>
                Immerse yourself in the ultimate betting simulation experience, all in the spirit of fun and excitement!
                </Typography>
            </Grid>
            
        </Grid>
    );
}
