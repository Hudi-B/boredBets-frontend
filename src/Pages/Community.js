import axios from 'axios';
import config from '../config';
import { useEffect } from 'react';
export default function App() {

  useEffect(() => {
    axios.get(`${config.apiUrl}user/getAllUsers`,  { headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI1YzRmYzIxMC0yMzc5LTQ2NjktOTBiNi0wY2U2YzUxYWI5YzYiLCJuYmYiOjE3MDg5NzU1MzYsImV4cCI6MTcwODk3OTA3NiwiaWF0IjoxNzA4OTc1NTM2LCJpc3MiOiJib3JlZEJldHMiLCJhdWQiOiJib3JlZEJldHNfRnJvbnRlbmQifQ.Kunu5nxl9-46DlmKXzW9TvWWBxx7PWyw6TOjYZjz1cM'}})
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    })
  },[])

  return (
    <div>
        Community
    </div>
  );
}
