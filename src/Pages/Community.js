import axios from 'axios';
import config from '../config';
export default function App() {
  axios.post(`${config.apiUrl}user/getAllUsers`)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
  return (
    <div>
        Community
    </div>
  );
}
