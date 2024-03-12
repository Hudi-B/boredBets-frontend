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


export default function App() {
  const [value, setValue] = useState(null);
  const [data, setData] = useState();

  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    axios.get(`${apiUrl}horse/getAllHorses`)
      .then((response) => {
        setData(response.data.map((horse) => horse.name));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const [checked, setChecked] = React.useState([0]);//List

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Box sx={{ py: 15, px: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12} sx={{ py: 1 }}>
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              if (typeof newValue === 'string') {
                setValue({
                  title: newValue,
                });
              } else if (newValue && newValue.inputValue) {
                
                setValue({
                  title: newValue.inputValue,
                });
              } else {
                setValue(newValue);
              }
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="Searchbar"
            options={data} 
            getOptionLabel={(option) => {
              if (typeof option === 'string') {
                return option;
              }
              if (option.inputValue) {
                return option.inputValue;
              }
              return option.title;
            }}
            renderOption={(props, option) => <li {...props}>{option}</li>}
            sx={{ width: 'auto' }}
            freeSolo
            renderInput={(params) => (
              <TextField {...params} label="Search" />
            )}
          />
        </Grid>
        <Grid item xs={2} md={4} lg={2} sx={{ py: 1, px: 1 }}>

              <Box className="container">
                <Box className="animation-container">
                    <Box className="animated-element"></Box>
                    Mama
                </Box>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                  {[0, 1, 2, 3].map((value) => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                      <ListItem key={value} disablePadding>
                        <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(value) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Box>

        </Grid>
        <Grid item xs={10} md={8} lg={10} sx={{ py: 1, px: 1 }}>
          Items
        </Grid>
      </Grid>
    </Box>
  );
}
