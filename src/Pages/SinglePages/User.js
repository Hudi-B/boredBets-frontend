import { Box, Stack, Typography, Chip, Grid, Avatar } from '@mui/material';
import { useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { apiUrl } from '../../boredLocal';
import axios from 'axios';
import { useState } from 'react';
import { styled } from '@mui/material/styles';

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
  console.log(process.env.PUBLIC_URL);

  useEffect(() => {
    axios.get(`${apiUrl}User/GetByUserId?userId=${id}`)
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
          <Stack className='preventSelect' direction="row" sx={{margin: '20px', gap: 1 }}>
          <Avatar sx={{
                width: '200px',
                height: '200px',
              }}
              src={process.env.PUBLIC_URL + pfpImage}/>
            <Stack direction={"column"} sx={{
              width: '100%',
              height: 'fill',
            }}>
              <Box sx={{paddingTop: '20px', width: 'fill', display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant='h5'>Individuals name FR</Typography>
                <Typography variant='h5'>Icon</Typography>
              </Box>
              <Box sx={{marginY: 'auto',display: 'flex', justifyContent: 'space-between', paddingX: '20px'}}>
              <Stack sx={{alignItems:'flex-end'}}>
                <Typography>
                  Explain uno:
                </Typography>
              <Chip sx={{paddingX: '10px', fontSize: '15px'}} label="123"/>
              </Stack>
              <Stack sx={{alignItems:'flex-end'}}>
                <Typography>
                  Explain dos:
                </Typography>
              <Chip sx={{paddingX: '10px', fontSize: '15px'}} label="456"/>
              </Stack>
              </Box>
            </Stack>
          </Stack>

          <Stack 
            className='preventSelect' 
            direction="column" 
            sx={{
              width: '100%', 
              marginTop: '30px'}}
          >
            <Title>Individuals Information:</Title>
            {isPrivate? (
              
              <Box sx={{display:'flex', flexWrap:'nowrap', paddingY: '20px', paddingX: '50px',margin: '20px', backgroundColor: 'error.main', borderRadius: '10px'}}>
                
                <Typography sx={{color: 'white'}}> 
                    Due to privacy settings, we are unable to provide access this users private information.
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
  