import { Box } from '@mui/material';
import { useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { apiUrl } from '../boredLocal';
import axios from 'axios';
import { useState } from 'react';


export default function App() {
  const id = useLocation().pathname.split("/")[2];
  const [data, setData] = useState({});
  console.log(id);

  useEffect(() => {
    axios.get(`${apiUrl}Horse/GetHorseById?HorseId=${id}`)
    .then((response) => {
        setData(response.data);
    })
    .catch((error) => {
        console.log(error);
    })
  }, []);

  return (
    <Box>
      
    </Box>
  );
}
  