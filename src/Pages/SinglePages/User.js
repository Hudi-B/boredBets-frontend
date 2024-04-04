import { Box, Stack, Typography, Chip, Grid, Avatar } from '@mui/material';
import { useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { apiUrl } from '../../boredLocal';
import axios from 'axios';
import { useState } from 'react';
import { styled } from '@mui/material/styles';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import { enqueueSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';

const Title = styled(Typography)(({ theme }) => ({
  width:'fill',
  margin:'10px',
  borderBottom: '3px solid black',
  color: 'black',
  fontSize: '25px',
  letterSpacing: '1px',
}))
const BulletPoint = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  color: 'black',
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
  color: 'black',
  width: 'fit-content',
  paddingBottom: '0px',
  marginLeft: '10px',
  marginTop:'auto'
}))

export default function App() {
  const [isPrivate, setIsPrivate] = useState(true);

  const id = useLocation().pathname.split("/")[2];
  const [pfpImage, setPfpImage] = useState('./stock_pfp.png'); //should also pull the user's pfp, and only set it to default if it doesn't exist

  const [data, setData] = useState({});

  useEffect(() => {
    axios.get(`${apiUrl}User/GetUserDetailsByUserId?UserId=${id}`)
    .then((response) => {
        setData(response.data);
    })
    .catch((error) => {
        console.log(error);
        enqueueSnackbar("Error while requesting this users data.", {
          variant: 'error',
          autoHideDuration: 3000,
          TransitionComponent: Slide,
        });
    })
  }, []);




  const CustomBulletPoint = styled(({ children, ...props }) => (
    <BulletPoint {...props}>
      {children[1]}{children[0]}
    </BulletPoint>
  ))`
    font-weight: bold;
  `;
  
  const convertDate = (date) => {
    const rawDate = new Date(date);
    const formatedDate = rawDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    return formatedDate
  };


  return (
<Box
      sx={{
        backgroundColor: 'rgb(4, 112, 107)',
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
                width: '200px',
                height: '200px',
              }}
              src={process.env.PUBLIC_URL + pfpImage}/>
            </Grid>
            <Grid item xs={12} sm={7} sx={{display:'flex', flexWrap:'nowrap'}}>
              <Stack direction={"column"} sx={{
                width: '100%',
                height: 'fill',
                marginX: '20px',
              }}>
                <Box sx={{paddingTop: '20px', width: 'fill', display: 'flex', justifyContent: 'space-between'}}>
                  <Typography variant='h5'>{data.username}</Typography>
                  <Typography variant='h5'>{data.male? <MaleIcon sx={{color: 'blue', fontSize: '40px'}}/> : <FemaleIcon sx={{color: 'blue', fontSize: '40px'}}/>}</Typography>
                </Box>
                <Box sx={{marginY: 'auto',display: 'flex', justifyContent: 'space-between', paddingX: '20px'}}>
                <Stack sx={{alignItems:'center'}}>
                  <Typography>
                    Registered
                  </Typography>
                <Chip sx={{paddingX: '10px', fontSize: '15px'}} label={convertDate(data.created)}/>
                </Stack>
                <Stack sx={{alignItems:'center'}}>
                  <Typography>
                    Profit:
                  </Typography>
                <Chip sx={{paddingX: '10px', fontSize: '15px'}} label="+132"/>
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
              marginTop: '30px'}}
          >
            <Title>Individuals Information:</Title>
            {data.isPrivate? (
              
              <Box sx={{display:'flex', flexWrap:'nowrap', paddingY: '20px', paddingX: '50px',margin: '20px', backgroundColor: 'error.main', borderRadius: '10px'}}>
                
                <Typography sx={{color: 'white'}}> 
                    Due to privacy settings, we are unable to provide access to this users private information.
                </Typography>

              </Box>
                ):(
              <Grid container spacing={2}>
                  <Grid item xs={12} md={6} sx={{display:'flex', flexWrap:'nowrap'}}>
                      <BulletPoint>Born: </BulletPoint>
                      <DataText>1918.12.44</DataText>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{display:'flex', flexWrap:'nowrap'}}>
                      <BulletPoint>Gender:</BulletPoint>
                      <DataText>the strongerGender</DataText>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{display:'flex', flexWrap:'nowrap'}}>
                      <BulletPoint>Registered:</BulletPoint>
                      <DataText>1920.12.44</DataText>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{display:'flex', flexWrap:'nowrap'}}>
                      <BulletPoint>Phone:</BulletPoint>
                      <DataText>21321321312</DataText>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{display:'flex', flexWrap:'nowrap'}}>
                      <BulletPoint>Email:</BulletPoint>
                      <DataText>gypsy@go.com</DataText>
                  </Grid>
              </Grid>)}
            
            <Title>History:</Title>

          
          </Stack>
        </Stack>
    </Box>
  );
}
  