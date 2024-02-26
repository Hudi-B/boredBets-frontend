import axios from 'axios';
import config from '../config';
import { useEffect } from 'react';
export default function App() {

  useEffect(() => {
    axios.get(`${config.apiUrl}user/getAllUsers`)
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
