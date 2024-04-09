
import { Typography, Grid, Avatar, Paper, Divider, Button } from '@mui/material';


export default function First() {

    const tempRaces = [
        {
          id: 1,
          name: "Race 1",
          country: "Fictopia",
          raceSceduled: "2024-04-05T10:00:00", // Replace with the actual race time
        },
        {
          id: 2,
          name: "Race 2",
          country: "Fictopia",
          raceSceduled: "2024-04-06T14:30:00", // Replace with the actual race time
        },
        {
          id: 3,
          name: "Race 3",
          country: "Fictopia",
          raceSceduled: "2024-04-07T09:15:00", // Replace with the actual race time
        },
        {
          id: 4,
          name: "Race 4",
          country: "Fictopia",
          raceSceduled: "2024-04-08T16:45:00", // Replace with the actual race time
        },
        {
          id: 5,
          name: "Race 5",
          country: "Fictopia",
          raceSceduled: "2024-04-09T11:00:00", // Replace with the actual race time
        },
      ];
    
      const comingRaceBox = (race) => {
        return (
          <Paper
          elevation={4}
          className='preventSelect'
          component={Button}
          //onClick={() => {navigate("/race/"+race.id)}}
            sx={{
              textTransform: 'none',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(200,200,200,0.3)',
              borderRadius: 2,
              padding: 1,
              margin: 0.5,
              maxWidth: '500px',
              '&hover': {
                backgroundColor: 'rgba(200,200,200,0.7)',
              },
            }}>
              <Grid container 
              sx={{
                width: '100%', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center'}}>
                <Grid item sm={5} sx={{justifyContent: 'center', display: 'flex'}}>{race.name}</Grid>
                <Grid item sm={5} sx={{justifyContent: 'center', display: 'flex'}}>{race.country}</Grid>
                <Divider sx={{width: '90%', borderColor: 'black'}} />
                <Grid item sm={12} sx={{justifyContent: 'center', display: 'flex'}}>{race.raceSceduled}</Grid>
              </Grid>
          </Paper>
        ) 
      }


    return (
        <Grid container gap={2}  sx={{
            justifyContent: 'center',
            width: '100%',
            backgroundImage: {url: process.env.PUBLIC_URL + "/images/whiteBg.jpg"},
            marginTop: 15,
            marginBottom: 20}}>
              <Grid item xs={10} md={5} sx={{
                justifyContent: 'center', 
                display: 'flex',
                alignItems: 'center'}}>
                  <Avatar variant='square' sx={{width: '100%', height: 'auto', maxWidth: '500px' }} />
              </Grid>

              <Grid item xs={10} md={5} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Paper
                elevation={10}
                sx={{
                  width: '100%',
                  backgroundColor: '',
                  height: 'fit-content',
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  paddingTop: 2,
                  paddingX: 2,
                  paddingBottom: 1,
                  maxWidth: '600px',
                  borderRadius: 4,
                  backgroundColor: 'rgba(0,0,0,0.3)'}}>
                    <Typography sx={{width: '100%', textAlign: 'flex-start', color: 'rgb(220,220,220)', margin:0.5}} fontWeight={'800'}>Fictopia</Typography>
                  {tempRaces.map((race) => (
                    comingRaceBox(race)
                  ))}
                </Paper>
                  
              </Grid>
        </Grid>
    );
}
