import { apiUrl } from '../boredLocal';
import { Box, Grid, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function App() {
  const [value, setValue] = useState(null);
  const [data, setData] = useState();

  useEffect(() => {
    axios.get(`${apiUrl}horse/getAllHorses`)
      .then((response) => {
        setData(response.data.map((horse) => horse.name));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box sx={{ py: 15, px: 5 }}>
      <Grid container spacing={2}>
        <Grid xs={12} md={12} lg={12} sx={{ py: 1 }}>
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              if (typeof newValue === 'string') {
                setValue({
                  title: newValue,
                });
              } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
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
            options={data} // Use the data directly as options
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === 'string') {
                return option;
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue;
              }
              // Regular option
              return option.title;
            }}
            renderOption={(props, option) => <li {...props}>{option}</li>}
            sx={{ width: 300 }}
            freeSolo
            renderInput={(params) => (
              <TextField {...params} label="Search" />
            )}
          />
        </Grid>
        <Grid xs={2} md={4} lg={2} sx={{ py: 1, px: 1 }}>
          Filters
        </Grid>
        <Grid xs={10} md={8} lg={10} sx={{ py: 1, px: 1 }}>
          Items
        </Grid>
      </Grid>
    </Box>
  );
}
