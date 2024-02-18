import * as React from 'react';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import {TextField } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { List, ListItem, ListItemText } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import Button from '@mui/material/Button';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import dayjs from 'dayjs';

import ListItemButton from '@mui/material/ListItemButton';

export default function NewRace() {
  const [raceDate, setRaceDate] = React.useState();
  const [raceTimeWhen, setRaceTimeWhen] = React.useState();
  const [raceTime, setRaceTime] = React.useState(0);
  const [weather, setWeather] = React.useState('Clear');
  const [selectedTrackID, setSelectedTrackID] = React.useState();
  const [tracks, setTracks] = React.useState([]);

  React.useEffect(() => {
    axios.get('https://localhost:7090/api/Track/AllTrack')
    .then((response) => {
        const updatedTracks = response.data.map(track => {
            return {...track, selected: false};
        });
        setTracks(updatedTracks);
        setSelectedTrackID(updatedTracks[0].id);
    })
}, []);

  const handleDateChange = (newValue) => {
    setRaceDate(newValue);
  };

  const isFutureDate = raceDate && raceDate.isAfter(new Date());

  const handleSubmit = () => {
    const tempTime = new Date(raceDate);
    if(raceTimeWhen){
        tempTime.setHours(raceTimeWhen.hour()+1);
        tempTime.setMinutes(raceTimeWhen.minute());
    }else{
        tempTime.setHours(12+1);
        tempTime.setMinutes(0);
    }
    const formState= {
        raceScheduled: tempTime.toISOString(),
        raceTime: raceTime,
        weather: weather,
    }
    axios.post(`https://localhost:7090/api/Race/RacePost?TrackId=${selectedTrackID}`, formState)
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    })
  }


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

        <InputLabel id="demo-simple-select-label">Track:</InputLabel>
        <List dense fullWidth sx={{ paddingTop: '0', maxHeight: '200px', overflow: 'auto' }}>
            <ListSubheader sx={{ marginTop: 'none', backgroundColor: 'gray', color: 'white' }}>
            <Box display="flex" justifyContent="space-between">
                <span className='listItem'>Name</span>
                <span className='listItem'>Country</span>
                <span className='listItem'>Length(m)</span>
                <span className='listItem'>Surface</span>
                <span className='listItem last'>Oval</span>
            </Box>

            </ListSubheader>
            {tracks.map((track) => {
                return (
                <ListItem
                    key={track.id}
                    >
                    <ListItemButton
                        sx={{backgroundColor: track.selected === true ? 'silver' : 'none'}}
                        onClick={() => {
                            setSelectedTrackID(track.id);
                            setTracks(tracks.map(t => t.id === track.id ? {...t, selected: true} : {...t, selected: false}));
                        }}>
                        <ListItemText 
                        id={track.id}
                        primary={
                            <Box display="flex" justifyContent="space-between">
                                <span className='listItem'>{track.name}</span>
                                <span className='listItem'>{track.country}</span>
                                <span className='listItem'>{track.length}</span>
                                <span className='listItem'>{track.surface}</span>
                                <span className='listItem'>{track.oval ? 'Yes' : 'No'}</span>
                            </Box>
                        }
                        />
                    </ListItemButton>
                </ListItem>
                );
            })}
        </List>

        <Box
            sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            gap: 5,
        }}>
            <DemoItem label="Date of Race">
            <DatePicker
                label=""
                value={raceDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
            />
            </DemoItem>

            <TimeField
                label="Time of race"
                format="HH:mm"
                onChange={(value) => { setRaceTimeWhen(value); }}
                    />
        </Box>

        
        <TextField
            label="Race time in minutes"
            type="number"
            name="raceTime"
            fullWidth
            value={raceTime}
            sx={{marginTop: '10px', marginBottom: '10px'}}
            onChange={(event) => {setRaceTime(Number(event.target.value));}}
            disabled={isFutureDate}
        />


        <InputLabel id="demo-simple-select-label">Weather</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={weather}
            fullWidth
                onChange={(event) => setWeather(event.target.value )}
            >
            <MenuItem value={"Clear"}>Clear</MenuItem>
            <MenuItem value={"Rain"}>Rain</MenuItem>
            <MenuItem value={"Wind"}>Wind</MenuItem>
            <MenuItem value={"Snow"}>Snow</MenuItem>
        </Select>

        <Button fullWidth sx={{marginTop: '10px'}} variant="contained" onClick={handleSubmit}>Send</Button>
    </LocalizationProvider>
  );
}
