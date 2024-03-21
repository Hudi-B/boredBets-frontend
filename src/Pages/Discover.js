import { apiUrl } from '../boredLocal';
import { Box, FormControlLabel, TextField,Autocomplete, Stack, Chip, Button, Slider} from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import * as React from 'react';
import { useNavigate } from "react-router-dom";


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
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';


export default function Discover() {
  const [horses, setHorses] = useState([]);
  const [users, setUsers] = useState([]);
  const [jockeys, setJockeys] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [allData, setAllData] = useState([]);
  const [searchValues, setSearchValues] = useState([]);
  const [selected, setSelected] = useState([]);
  const [singleItem, setSingleItem] = useState({});
  const navigate = useNavigate();

  const [userActive, setUserActive] = useState(true);
  const [jockeyActive, setJockeyActive] = useState(true);
  const [horseActive, setHorseActive] = useState(true);

  const [value1, setValue1] = React.useState([1, 6]);


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
              icon: <FontAwesomeIcon icon={faHorseHead}/>,
              id: horse.id, 
              name: horse.name, 
              gender: horse.stallion ? "Male" : "Female",
              type: "Horse"

          })),
          ...jockeyResponse.data.map((jockey) => ({
            icon: <FontAwesomeIcon icon={faHelmetSafety}/>, 
              id: jockey.id,
              name: jockey.name, 
              gender: jockey.male ? "Male" : "Female",
              type: "Jockey"
          })),
          // Uncomment the following line if you want to fetch users
          // ...userResponse.data.map((user) => ({ icon: <PersonIcon />, id: user.id, name: user.name, gender: user.gender })),
        ];
      
        values.sort((a, b) => a.name.localeCompare(b.name));
        setSearchValues(values);
        setAllData(values);

        setFetching(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  

  const ListItem = ( data ) => {
    return (
      <Box display={"flex"} 
      sx={{
        width: '100%', 
        gap: 1, 
        justifyContent: 'space-between', 
        marginX: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        padding: 1,
        paddingX: 2,
        borderRadius:'20px'}}>
      <Box>{data.icon}
      {data.name}</Box>
      {data.gender === "Male" ? <MaleIcon sx={{color: 'blue'}} /> : <FemaleIcon sx={{color: 'pink' }} />}
      </Box>
    );
  };

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - 1), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + 1)]);
    }
  };






  return (
    <Box sx={{ py: 15, px: 5,display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', width: '100%', gap: 2 }}>
            <Autocomplete
            sx={{ width: '60%', marginRight: 'auto' }}
            disabled={fetching}
            onChange={(event, newValue) => {
                navigate(
                  newValue.type === "Horse" ? `/Horse/${newValue.id}` :
                  newValue.type === "Jockey" ? `/Jockey/${newValue.id}` :
                  newValue.type === "User" ? `/User/${newValue.id}` : "/discover"
              );
            }}
            selectOnFocus
            handleHomeEndKeys
            options={searchValues}
            getOptionLabel={(option) => {
              return option.name;
            }}
            renderOption={(props, option) => 
            <li {...props}
            key={option.id}
             style={{padding: '0px'}}>
                {ListItem(option)}
              </li>
          }
            renderInput={(params) => (
              <TextField {...params} 
              onChange={(e) => {
                setSearchValues(
                  allData.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
                );
              }}
              onFocus={() => setSearchValues(allData)}
              label="Search" />
            )}
          />


        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', }}>
          <Box 
          sx={{
            width: '30%',
            minWidth: '180px',
            maxWidth: '300px', 
            backgroundColor: 'rgba(4, 112, 107, 0.5)',
            borderRadius: '10px', 
            padding: '5px',
            marginRight: '10px' }}>
              <Box sx={{
                height: '100%',
                borderRadius: '8px', 
                width: 'fill',
                backgroundColor: 'rgb(4, 112, 107)',
                display: 'flex',
                flexDirection: 'column', 
                gap: 1,
                padding: 1
              }}>

              <Chip 
                  variant='filled' 
                  color="success" 
                  icon={<PersonIcon />} 
                  label="Users" 
                  onDelete={() => setUserActive(!userActive)}
                  deleteIcon={userActive? <CircleIcon /> : <CircleOutlinedIcon />}/>
                  
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0, paddingLeft: 2  }}>
                
                <FormControlLabel disabled={!userActive} 
                sx={{color: 'rgb(240, 240, 240)'}}
                  control={
                    <Checkbox
                      defaultChecked
                      size='small'
                      color='default'
                      icon={< CircleOutlinedIcon/>}
                      checkedIcon={<CircleIcon />}
                    />} label="Non-private" />



                  <FormControlLabel disabled={!userActive}
                  sx={{color: 'rgb(240, 240, 240)'}}
                  control={
                    <Checkbox
                      size='small'
                      color='default'
                      icon={< CircleOutlinedIcon/>}
                      checkedIcon={<CircleIcon />}
                    />} label="Admin" />
                </Box>


              <Chip 
                  variant='filled' 
                  color="success" 
                  icon={<FontAwesomeIcon icon={faHorseHead} />} 
                  label="Horses"
                  onDelete={() => setHorseActive(!horseActive)}
                  deleteIcon={horseActive? <CircleIcon /> : <CircleOutlinedIcon />}/>
              {/*age, gender, */}
              <Box color={'rgb(240, 240, 240)'} sx={{ display: 'flex', flexDirection: 'column', gap: 0, paddingX: 2  }}>
                Age:
              <Slider
                color='warning'
                value={value1}
                disabled={!horseActive}
                width='fill'
                min={1}
                max={6}
                onChange={handleChange1}
                valueLabelDisplay="auto"
                disableSwap
              />
                
                
                
                <FormControlLabel disabled={!horseActive} 
                  control={
                    <Checkbox
                      defaultChecked
                      size='small'
                      color='default'
                      icon={< CircleOutlinedIcon/>}
                      checkedIcon={<CircleIcon />}
                    />} label="Stallion" />
              </Box>


              <Chip 
                  variant='filled' 
                  color="success" 
                  width="100%"
                  icon={<FontAwesomeIcon icon={faHelmetSafety}/>} 
                  label="Jockeys" 
                  onDelete={() => setJockeyActive(!jockeyActive)}
                  deleteIcon={jockeyActive? <CircleIcon /> : <CircleOutlinedIcon />}/>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0, paddingLeft: 2  }}>

                <FormControlLabel disabled={!jockeyActive} 
                  sx={{color: 'rgb(240, 240, 240)'}}
                    control={
                      <Checkbox
                        defaultChecked
                        size='small'
                        color='default'
                        icon={< CircleOutlinedIcon/>}
                        checkedIcon={<CircleIcon />}
                      />} label="Male" />

                <FormControlLabel disabled={!jockeyActive} 
                sx={{color: 'rgb(240, 240, 240)'}}
                  control={
                    <Checkbox
                      defaultChecked
                      size='small'
                      color='default'
                      icon={< CircleOutlinedIcon/>}
                      checkedIcon={<CircleIcon />}
                    />} label="Has a horse" />

              </Box>

                



              </Box>
          </Box>

          <Stack direction="column" sx={{ width: '80%' }}>
            {searchValues.map((item) => (
              <Button 
              component={Link} 
              to={
                item.type === "Horse" ? `/Horse/${item.id}` : 
                item.type === "Jockey" ? `/Jockey/${item.id}` : 
                item.type === "User" ? `/User/${item.id}`: "/community"}
              key={item.id}
              sx={{ 
                width: '100%', 
                height : '75px',
                color: 'white', 
                backgroundColor: 'rgb(4, 112, 107)', 
                borderRadius: 3,
                marginBottom: 1,
                justifyContent: 'flex-start',
                '&:hover': {
                  backgroundColor: 'rgb(4, 112, 107)',
                  boxShadow: '0 0 30px rgb(4, 50,50)',
                }
              }}
              >
                <Box sx={{fontSize: 40, marginX: 2}}>
                  {item.icon}
                </Box>
                <Box sx={{fontSize: 15, height: '100%', display: 'flex', alignItems: 'flex-start'}}>
                  {item.name}
                </Box>
                <Box sx={{height: '100%', marginLeft: 'auto'}}>
                  {item.gender === "Male" ? 
                      <MaleIcon sx={{color: 'blue', fontSize: 35 }} /> : 
                      <FemaleIcon sx={{color: 'pink', fontSize: 35 }} />}
                </Box>
              </Button>
            ))}
          </Stack>
        </Box>
    </Box>
  );
}
