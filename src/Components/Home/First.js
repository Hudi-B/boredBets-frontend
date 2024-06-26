
import { Typography, Grid, Avatar, Paper, Divider, Button, Hidden, Slide } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormatDate, apiUrl, secondaryColor,fontColor } from '../../boredLocal';
import  axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateWallet } from '../../auth/authSlice';
import { enqueueSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';

export default function First() {
  const [comingRaces, setComingRaces] = useState([]);
  const [pending, setPending] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);

    useEffect(() => {
      axios.get(apiUrl+`Race/GetFiveFutureRaces`)
      .then((response) => {
        setComingRaces(response.data);
      }).catch((error) => {
        enqueueSnackbar("Something went wrong", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
      }).finally(() => {
        setPending(false);
      });
    }, [])

    const bonusClaimCheck = () => {
      if(userId===null) return
      axios.post(apiUrl+`/User/Bonus?UserId=${userId}`)
      .then((response) => {
          if(response.data){
            enqueueSnackbar("Bonus has been claimed", { variant: 'success', autoHideDuration: 3000, TransitionComponent: Slide, });
            fetchWallet();
          }
          else
          {
            enqueueSnackbar("Bonus has already been claimed", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });   
          }
          fetchWallet();
      })
      .catch((error) => {
        enqueueSnackbar("An error occured while claiming bonus", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
      })
  }

  const fetchWallet = async () => {
      await axios.get(apiUrl+`User/GetWalletByUserId?UserId=` + userId)
      .then((response) => {
          dispatch(updateWallet(response.data.wallet));
      })
      .catch((error) => {
        enqueueSnackbar("Failed to fetch wallet", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
      })
  }


      const comingRaceBox = (race) => {
        return (
          <Paper
          key={race.id.toString()}
          elevation={4}
          className='preventSelect'
          component={Button}
          onClick={() => {navigate("/race/"+race.id)}}
            sx={{
              textTransform: 'none',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(200,200,200,0.2)',
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
                <Grid item sm={5} xs={12} sx={{justifyContent: 'center', display: 'flex', marginRight: 1, color:fontColor}}>
                  {pending? 'RaceName': race.name}
                </Grid>
                <Hidden smUp>
                  <Divider sx={{width: '90%', borderColor: 'black'}} />
                </Hidden>
                <Grid item sm={5} xs={12} sx={{justifyContent: 'center', display: 'flex', color:fontColor}}>
                  {pending? 'Country': race.country}
                </Grid>
                <Divider sx={{width: '90%', borderColor: 'black'}} />
                <Grid item sm={12} sx={{justifyContent: 'center', display: 'flex', color:fontColor}}>
                  {pending ? 'Date': FormatDate(race.raceScheduled)}
                </Grid>
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
                  <Avatar className='preventSelect' variant='square' src={process.env.PUBLIC_URL + '/images/horsepromotionbanner.png'} onClick={bonusClaimCheck} sx={{width: '100%', height: 'auto', maxWidth: '500px', borderRadius:3 }} />
              </Grid>

              <Grid item xs={10} md={5} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Paper
                elevation={10}
                sx={{
                  width: '100%',
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
                  backgroundColor: secondaryColor}}>
                    <Typography sx={{width: '100%', textAlign: 'flex-start', color: 'rgb(220,220,220)', margin:0.5}} fontWeight={'800'}>Upcoming races:</Typography>
                  {comingRaces.map((race) => (
                    comingRaceBox(race)
                  ))}
                </Paper>
              </Grid>
        </Grid>
    );
}
