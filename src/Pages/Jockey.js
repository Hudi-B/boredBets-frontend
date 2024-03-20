import { Box, Stack, Typography, Chip } from '@mui/material';
import { useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { apiUrl } from '../boredLocal';
import axios from 'axios';
import { useState } from 'react';


export default function App() {
  const id = useLocation().pathname.split("/")[2];
  const [pfpImage, setPfpImage] = useState('./stock_pfp.png'); //should also pull the user's pfp, and only set it to default if it doesn't exist

  const [data, setData] = useState({});
  console.log(process.env.PUBLIC_URL);

  useEffect(() => {
    axios.get(`${apiUrl}Jockey/GetJockeyById?JockeyId=${id}`)
    .then((response) => {
        setData(response.data);
    })
    .catch((error) => {
        console.log(error);
    })
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: 'rgb(4, 112, 107)',
        borderTopRightRadius: '20px',
        borderTopLeftRadius: '20px',
        minHeight:'100%',
        width:'90%',
        maxWidth: '1000px',
        marginTop: '100px',
        marginLeft:'auto',
        marginRight:'auto',
      }}>

        <Stack direction="collumn">
          <Stack className='preventSelect' direction={"row"} sx={{margin: '20px',width: '100%', gap: 1 }}>
            <Box id="insteadOfPfp" sx={{
                width: '200px',
                minWidth: '200px',
                height: '200px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '30px',
                backgroundColor: 'white',
            }}>pfp FR</Box>
            <Stack direction={"column"} sx={{
              width: '100%',
              height: '100%',
            }}>
              <Box sx={{paddingTop: '20px', width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant='h5'>Individuals name FR</Typography>
                <Typography variant='h5'>Icon</Typography>
              </Box>
              <Box sx={{width: '100%', marginY: 'auto',display: 'flex', justifyContent: 'space-between', paddingX: '20px'}}>
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
        </Stack>
    </Box>
  );
}
  