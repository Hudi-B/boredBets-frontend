import { apiUrl } from '../boredLocal';
import { Box, Grid, TextField,Autocomplete} from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import '../styles/Community.css';
import * as React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { faHorseHead, faHelmetSafety } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { keys } from '@mui/system';

import PersonIcon from '@mui/icons-material/Person';


export default function App() {
  const [value, setValue] = useState(null);
  const [horses, setHorses] = useState([]);
  const [users, setUsers] = useState([]);
  const [jockeys, setJockeys] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [searchValues, setSearchValues] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const horseResponse = await axios.get(`${apiUrl}Horse/getAllHorses`);
        setHorses(horseResponse.data);
      
        const jockeyResponse = await axios.get(`${apiUrl}Jockey/GetAllJockeys`);
        setJockeys(jockeyResponse.data);
      
        /* Uncomment the following lines if you want to fetch users
        const userResponse = await axios.get(`${apiUrl}User/GetAllUsers`);
        setUsers(userResponse.data);
        */
      
        let values = [
          ...horseResponse.data.map((horse) => ({ 
              type: <FontAwesomeIcon icon={faHorseHead}/>,
              id: horse.id, 
              name: horse.name, 
              gender: horse.stallion ? <MaleIcon sx={{color:'blue'}}/> : <FemaleIcon sx={{color:'pink'}}/> 
          })),
          ...jockeyResponse.data.map((jockey) => ({
              type: <FontAwesomeIcon icon={faHelmetSafety}/>, 
              id: jockey.id,
              name: jockey.name, 
              gender: jockey.male ? <MaleIcon sx={{color:'blue'}}/> : <FemaleIcon sx={{color:'pink'}}/> 
          })),
          // Uncomment the following line if you want to fetch users
          // ...userResponse.data.map((user) => ({ type: <PersonIcon />, id: user.id, name: user.name, gender: user.gender })),
        ];
      
        values.sort((a, b) => a.name.localeCompare(b.name));
        setSearchValues(values);

        setFetching(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Box sx={{ py: 15, px: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12} sx={{ py: 1 }}>
            <Autocomplete
            onChange={(event, newValue) => {
              if (typeof newValue === 'string') {
                setValue({
                  name: newValue,
                });
              } else if (newValue && newValue.inputValue) {
                setValue({
                  name: newValue.inputValue,
                });
              } else {
                setValue(newValue);
              }
            }}
            selectOnFocus
            handleHomeEndKeys
            options={searchValues}
            getOptionLabel={(option) => {
              return option.name;
            }}
            renderOption={(props, option) => 
            <li {...props}key={option.id}>
              {option.type}
              {option.name}
              {option.gender}
            </li>
          }
            sx={{ width: 'auto' }}
            renderInput={(params) => (
              <TextField {...params} label="Search" />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
