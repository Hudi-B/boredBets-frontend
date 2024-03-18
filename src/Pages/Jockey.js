import { Box, Stack } from '@mui/material';
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
        height:'100%',
        width:'90%',
        maxWidth: '1000px',
        marginTop: '100px',
        marginLeft:'auto',
        marginRight:'auto',
      }}>

        <Stack direction="collumn">
          <Stack direction={"row"}>
            
          </Stack>
        </Stack>
      
    </Box>
  );
}
  