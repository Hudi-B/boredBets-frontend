import { Box, Stack, Skeleton, Typography, Chip, Grid, Avatar, Button, Divider} from '@mui/material';
import { useEffect } from 'react';
import {useLocation, Link} from 'react-router-dom';
import { apiUrl } from '../../boredLocal';
import axios from 'axios';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { enqueueSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';
import NotFound from '../NotFound';

import { secondaryColor, FormatDate, fontColor } from '../../boredLocal';

const Title = styled(Typography)(({ theme }) => ({
  width:'fill',
  margin:'10px',
  borderBottom: '3px solid black',
  color: fontColor,
  fontSize: '25px',
  letterSpacing: '1px',
}))
const BulletPoint = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  color: fontColor,
  width: 'fit-content',
  marginLeft: '25px',
  letterSpacing: '2px',
  content: '"\\2022"',
  '&::before': {
    content: '"\\2022"',
},
}))
const DataText = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  color: fontColor,
  width: 'fit-content',
  paddingBottom: '0px',
  marginLeft: '10px',
  marginTop:'auto'
}))

export default function App() {
  const id = useLocation().pathname.split("/")[2];
  const [data, setData] = useState({});
  const [pending, setPending] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    axios.get(`${apiUrl}Jockey/GetJockeyDetailByJockeyId?JockeyId=${id}`)
    .then((response) => {
        setData(response.data);
        setPending(false);
        if(response.data === 0){
          setNotFound(true);
        }
    })
    .catch((error) => {
      enqueueSnackbar("Error while requesting this jockey's data.", {
        variant: 'error',
        autoHideDuration: 3000,
        TransitionComponent: Slide,
      });
    })
  }, []);

  function showPastRaces() {
    if(data.past3Races && data.past3Races.length > 0){
      return data.past3Races.map((race) => (
        <Button key={race.id} component={Link} to={`/race/${race.id}`}variant="contained"
        sx={{ 
          marginY: '10px',
          textTransform: 'none',
          fontSize: '18px',
          backgroundColor: 'rgba(40,40,40,0.3)',
          '&:hover': {
            backgroundColor: 'rgba(50,50,50,0.3)',
          },
          width: '95%',
          boxShadow: '2px 3px 5px 0px rgba(0,0,0,0.5)',
          
          display: 'flex',
          flexDirection: 'column',
        }}>
          
          {race.track.name}
          <Typography sx={{color:'white'}}>{FormatDate(race.raceScheduled)}</Typography>
        </Button>
      ));
    }else{
      return (
        <Box key={0}
        sx={{
          color:'white',
          paddingX:3,
          paddingY:3,
          marginY: 1,
          borderRadius: 3,
          width: '95%',
          display:'flex',
          alignItems:'center',
          backgroundColor: 'rgba(50,50,50,0.4)',
        }}>This jockey has not yet participated in any races.
        </Box>)
    }
    
  }

  function showUpcomingRaces() {
    if(data.next3Races && data.next3Races.length > 0){
      return data.next3Races.map((race) => (
          <Button key={race.id} component={Link} to={`/race/${race.id}`}variant="outlined"
          sx={{ 
            marginY: '10px',
            textTransform: 'none',
            borderColor: 'rgba(50,50,50,0.3)',
            borderWidth: 2,
            backgroundColor: 'rgba(150,150,150,0.1)',
            fontSize: '18px',
            color:'white',
            width: '95%',
            display: 'flex',
            flexDirection: 'column',
            '&:hover': {
              backgroundColor: 'rgba(200,200,200,0.1)',
              borderColor: 'rgba(50,50,50,0.2)',
              borderWidth: 2,
            },
            boxShadow: '2px 3px 5px 0px rgba(0,0,0,0.5)',
          }}>
            {race.track.name}
            <Typography sx={{color:'white'}}>{FormatDate(race.raceScheduled)}</Typography>
          </Button>
      ));
    }else{
      return (
        <Box 
        sx={{
          color:'white',
          paddingX:3,
          paddingY:3,
          marginY: 1,
          borderRadius: 3,
          width: '95%',
          display:'flex',
          alignItems:'center',
          backgroundColor: 'rgba(50,50,50,0.4)',
      }}>This jockey does not participate in any races at the moment
      </Box>)
    }
    
  }


  if(notFound) {
    return (
      <NotFound lookedFor={'jockey'} />
    );
  }
  return (
    <Box
      sx={{
        backgroundColor: secondaryColor,
        borderTopRightRadius: '20px',
        borderTopLeftRadius: '20px',
        width:'90%',
        maxWidth: '1000px',
        marginTop: '100px',
        marginLeft:'auto',
        marginRight:'auto',
      }}>

        <Stack direction="column">


          <Grid container className='preventSelect' direction="row" sx={{ justifyContent: 'center', marginTop: '20px', gap: 1 }}>
            <Grid item xs={12} sm={4} sx={{display:'flex', flexWrap:'nowrap',minWidth:'220px', justifyContent: 'center'}}>
            <Avatar sx={{
                width: 'auto',
                height: '200px',
              }}
              variant='square'
              src={process.env.PUBLIC_URL + `/images/Jockey.png`}/>
            </Grid>
            <Grid item xs={12} sm={7} sx={{display:'flex', flexWrap:'nowrap'}}>
              <Stack direction={"column"} sx={{
                width: '100%',
                height: 'fill',
                marginX: '20px',
              }}>
                <Box sx={{paddingTop: '20px', width: 'fill', display: 'flex', justifyContent: 'space-between'}}>
                  {pending? 
                  <Skeleton variant='rectangular' width={200} height={25} />
                    : 
                  <Typography variant='h5'>{data.name}</Typography>
                  }
                  <Typography variant='h5'>{data.isMale? <MaleIcon sx={{color: 'blue', fontSize: '40px'}}/> : <FemaleIcon sx={{color: 'pink', fontSize: '40px'}}/>}</Typography>
                </Box>
                <Box sx={{marginY: 'auto',display: 'flex', justifyContent: 'space-between', paddingX: '20px'}}>
                <Stack sx={{alignItems:'flex-end'}}>
                  <Typography>
                    Life time races:
                  </Typography>
                <Chip sx={{paddingX: '10px', fontSize: '15px', color: fontColor}} label={data.raceParticipatedIn}/>
                </Stack>
                <Stack sx={{alignItems:'flex-end'}}>
                  <Typography>
                    Average placement:
                  </Typography>
                <Chip sx={{paddingX: '10px', fontSize: '15px', color: fontColor}} label={data.avgPlacement}/>
                </Stack>
                </Box>

                </Stack>
              </Grid>
          </Grid>

          <Stack 
            className='preventSelect' 
            direction="column" 
            sx={{
              width: '100%', 
              marginTop: '30px'}}>
            <Title>Information:</Title>
              <Grid container spacing={2}>
                  <Grid item xs={12} md={6} sx={{display:'flex', flexWrap:'nowrap', alignItems:'center'}}>
                      <BulletPoint>Age: </BulletPoint>
                      {pending? 
                        <Skeleton variant='rect' width={100} height={20} />
                        : 
                        <DataText>{data.age}y. old</DataText>
                      }
                  </Grid>
                  <Grid item xs={12} md={6} sx={{display:'flex', flexWrap:'nowrap', alignItems:'center'}}>
                      <BulletPoint>Gender:</BulletPoint>
                      {pending? 
                        <Skeleton variant='rect' width={80} height={20} />
                        : 
                        <DataText>{data.isMale? "Male" : "Female"}</DataText>
                      }
                  </Grid>
                  <Grid item xs={12} md={6} sx={{display:'flex', flexWrap:'nowrap', alignItems:'center'}}>
                      <BulletPoint>Represents</BulletPoint>
                      {pending? 
                        <Skeleton variant='rect' width={120} height={20} />
                        : 
                        <DataText>{data.country}</DataText>
                      }
                  </Grid>
                  <Grid item xs={12} md={6} sx={{display:'flex', flexWrap:'nowrap', alignItems:'center'}}>
                      <BulletPoint>{data.isMale?"His ":"Her "}Horse:</BulletPoint>
                      {pending? 
                        <Skeleton variant='rect' width={120} height={20} />
                        : 
                        data.horseId ? (
                          <DataText 
                            component={Link}
                            to={`/Horse/${data.horseId}`}
                            sx={{
                              textDecoration: 'none',
                              paddingX: '10px', 
                              paddingY: '3px',
                              cursor: 'pointer', 
                              backgroundColor: 'rgba(0,0,0,0.15)', 
                              borderRadius: '5px'
                            }}
                          >
                            {data.horseName}
                          </DataText>
                        ):(
                          <DataText 
                          sx={{
                            textDecoration: 'none',
                            paddingX: '10px', 
                            paddingY: '3px',
                            backgroundColor: 'rgba(0,0,0,0.15)', 
                            borderRadius: '5px'
                          }}>
                            This jockey has no horse
                          </DataText>
                        )
                      }
                  </Grid>
              </Grid>
            
            <Title>History:</Title>
            <Grid container sx={{width: '100%', paddingBottom: 3, gap: 1}}>
              <Grid item xs={12} md={5.9} sx={{display:'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection:'column'}}>
              <Box 
              sx={{
                fontSize: '18px',
                fontWeight: 'bold',
                paddingX: 3,
                width: '100%',
              }}
              >Last 3 races:</Box>
              <Divider color="black" sx={{ width: '95%'}} />
                {pending? <></>:showPastRaces()}
              </Grid>

              <Grid item xs={12} md={5.9} sx={{display:'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection:'column'}}>
                <Box 
                sx={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  paddingX: 3,
                  width: '100%',
                }}
                >Upcoming 3 races:</Box>
                <Divider color="black" sx={{ width: '95%'}} />
                {pending? <></>:showUpcomingRaces()}
              </Grid>

            </Grid>
          
          </Stack>
        </Stack>
    </Box>
  );
}
  