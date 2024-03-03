import axios from 'axios';
import { apiUrl } from '../boredLocal';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { Box } from '@mui/material';
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
