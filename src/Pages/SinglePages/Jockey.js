import { Box, Stack, Typography, Chip, Grid, Avatar } from '@mui/material';
import { useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { apiUrl } from '../../boredLocal';
import axios from 'axios';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';


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
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`${apiUrl}Jockey/GetJockeyDetailByJockeyId?JockeyId=${id}`)
    .then((response) => {
        setData(response.data);
    })
    .catch((error) => {
        console.log(error);
    })
  }, []);




  const CustomBulletPoint = styled(({ children, ...props }) => (
    <BulletPoint {...props}>
      {children[1]}{children[0]}
    </BulletPoint>
  ))`
    font-weight: bold;
  `;
  

      

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
                  <Typography variant='h5'>{data.name}</Typography>
                  <Typography variant='h5'>{data.male? <MaleIcon sx={{color: 'blue', fontSize: '40px'}}/> : <FemaleIcon sx={{color: 'blue', fontSize: '40px'}}/>}</Typography>
                </Box>
                <Box sx={{marginY: 'auto',display: 'flex', justifyContent: 'space-between', paddingX: '20px'}}>
                <Stack sx={{alignItems:'flex-end'}}>
                  <Typography>
                    Life time races:
                  </Typography>
                <Chip sx={{paddingX: '10px', fontSize: '15px'}} label="123"/>
                </Stack>
                <Stack sx={{alignItems:'flex-end'}}>
                  <Typography>
                    Average placement:
                  </Typography>
                <Chip sx={{paddingX: '10px', fontSize: '15px'}} label="456"/>
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
                  <Grid item xs={12} md={6} sx={{display:'flex', flexWrap:'nowrap'}}>
                      <BulletPoint>Age: </BulletPoint>
                      <DataText>{data.age}y. old</DataText>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{display:'flex', flexWrap:'nowrap'}}>
                      <BulletPoint>Gender:</BulletPoint>
                      <DataText>{data.male? "Male" : "Female"}</DataText>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{display:'flex', flexWrap:'nowrap'}}>
                      <BulletPoint>Represents</BulletPoint>
                      <DataText>{data.country}</DataText>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{display:'flex', flexWrap:'nowrap'}}>
                      <BulletPoint>Horse name:</BulletPoint>
                      <DataText 
                      onClick={() => navigate(`/Horse/${data.horseId}`)}
                      sx={{
                        paddingX: '10px', 
                        paddingY: '3px',
                        cursor: 'pointer', 
                        backgroundColor: 'rgba(0,0,0,0.15)', 
                        borderRadius: '5px'}}>
                        csikóu</DataText>
                  </Grid>
              </Grid>
            
            <Title>History:</Title>

          
          </Stack>
        </Stack>
    </Box>
  );
}
  