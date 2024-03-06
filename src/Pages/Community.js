import { apiUrl } from '../boredLocal';
import { Box } from '@mui/material';
import axios from 'axios';
import {useState, useEffect} from 'react';
export default function App() {

  // useEffect(() => {
  //   axios.get(`${apiUrl}user/getAllUsers`,  { headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` } })
  //   .then((response) => {
  //       console.log(response);
  //   })
  //   .catch((error) => {
  //       console.log(error);
  //   })
  // },[])

  

  return (
    <Box>
        Community
    </Box>
  );
}
