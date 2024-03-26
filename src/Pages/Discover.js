import { apiUrl } from '../boredLocal';
import { Input, RadioGroup, Radio, Typography, Grid, Box, FormControlLabel, TextField,Autocomplete, Stack, Chip, Button, Slider, Divider} from '@mui/material';
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
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { styled } from '@mui/material/styles';


export default function Discover() {
  const [horses, setHorses] = useState([]);
  const [users, setUsers] = useState([]);
  const [jockeys, setJockeys] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [allData, setAllData] = useState([]);
  const [searchValues, setSearchValues] = useState([]);
  const [serverError, setServerError] = useState(false);
  
  const navigate = useNavigate();

  const [userActive, setUserActive] = useState(false);
  const [jockeyActive, setJockeyActive] = useState(false);
  const [horseActive, setHorseActive] = useState(false);

  const userFilterDefault = {
    private: false,
    public: false,
    female: false,
    male: false,
  };

  const horseFilterDefault = {
    minAge: 0,
    maxAge: 6,
    stallion: false,
    mare: false,
  };

  const jockeyFilterDefault = {
    male: false,
    female: false,
    withahorse: false,
    withoutahorse: false,
  }

  const [userFilters, setUserFilters] = useState(userFilterDefault);

  const [horseFilters, setHorseFilters] = useState(horseFilterDefault);

  const [jockeyFilters, setJockeyFilters] = useState(jockeyFilterDefault);
  


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
        setFetching(false);
      }
    })();
  }, []);
  
  useEffect(() => {
    if(searchValues.length < 1 && !fetching ) {
      setServerError(true);
    }
    else {
      setServerError(false);
    }
  },[fetching]);
  const applyFilters = () => {
    
  }

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
 
  const handleChipClick = (sender) => {
    switch (sender) {
      case "Horse":
          setHorseActive(!horseActive);

        setUserActive(false);
        setUserFilters(userFilterDefault);

        setJockeyActive(false);
        setJockeyFilters(jockeyFilterDefault);
        break;

      case "User":
        setHorseActive(false);
        setHorseFilters(horseFilterDefault);

          setUserActive(!userActive);

        setJockeyActive(false);
        setJockeyFilters(jockeyFilterDefault);
        break;
        
      case "Jockey":
        setHorseActive(false);
        setHorseFilters(horseFilterDefault);

        setUserActive(false);
        setUserFilters(userFilterDefault);
        
          setJockeyActive(!jockeyActive);
          break;

      default:
        break;
    }
  }

  const Cube = (item) => (
    <Button 
      component={Link} 
      to={
        item.type === "Horse" ? `/Horse/${item.id}` : 
        item.type === "Jockey" ? `/Jockey/${item.id}` : 
        item.type === "User" ? `/User/${item.id}`: "/community"}
      sx={{
        textTransform: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        minWidth: '175px',
        height: '125px',
        backgroundColor: 'rgb(4, 112, 107)', 
        borderRadius: '10px',
        marginInline: 'auto',
        '&:hover': {
          backgroundColor: 'rgb(4, 112, 107)',
          boxShadow: '0 0 30px rgb(4, 50,50)',
        }
      }}
    >
      <Typography 
        sx={{ 
          fontWeight: 'bold', 
          fontSize: '22px', 
          color: 'white', 
          textAlign: 'center' }}
          > 
          {item.icon}
          &nbsp;
          {item.name}
          </Typography>
      <Box>
        {item.gender === "Male" ? 
          <MaleIcon sx={{color: 'blue', fontSize: 35}} /> : 
          <FemaleIcon sx={{color: 'pink', fontSize: 35 }} />}
          
        {/*
        This is for displaying Warning messages regarding individuals
        <MaleIcon sx={{color: 'blue', fontSize: 35, position: 'absolute', right: 0}} />*/}
      </Box>
    </Button>
  );

  const filterCheckBox = (label, disabled) => {
return(
    <FormControlLabel disabled={!disabled} 
    sx={{color: 'rgb(240, 240, 240)', marginX: 1}}
      control={
        <Checkbox
          size='small'
          color='default'
          icon={< CircleOutlinedIcon/>}
          checkedIcon={<CheckCircleRoundedIcon />}
          checked={horseFilters[label.toLowerCase()] }
          onChange={() => filterBooleanToggle(label, disabled)}
        />} label={label} />
        )
  };
  
  const filterBooleanToggle = (label, category) => {
    switch (category) {
      case horseActive:
        setHorseFilters({ ...horseFilters, [label.toLowerCase()]: !horseFilters[label.toLowerCase()] });
        break;
      case userActive:
        setUserFilters( { ...userFilters, [label.toLowerCase()]: !userFilters[label.toLowerCase()] });
        break;
      case jockeyActive:
        setJockeyFilters( { ...jockeyFilters, [label.toLowerCase().replace(/\s/g, '')]: !jockeyFilters[label.toLowerCase().replace(/\s/g, '')] });
        break;
      default:
          break;
    }
  };
  return (
    <Box sx={{ py: 15, px: 5,display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', width: '100%', gap: 2 }}>
            <Autocomplete
            sx={{ width: '80%', marginX: 'auto' }}
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


        <Grid container gap={1} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          

          <Grid item xs={12} sm={2}
          sx={{
            minWidth: '180px',
            maxWidth: '300px',
            backgroundColor: 'rgba(4, 112, 107, 0.5)',
            borderRadius: '10px', 
            padding: 1}}>
              <Button variant='contained' onClick={() => applyFilters()} sx={{width: '100%', marginY: 1}} color='success'>Apply Filters</Button>
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
                    onDelete={() => handleChipClick("User")}
                    deleteIcon={userActive? <CircleIcon /> : <CircleOutlinedIcon />}/>
                    
                <Box sx={{ color: 'rgb(240, 240, 240)', display: 'flex', flexDirection: 'column', gap: 0}}>
                  
                  <Typography sx={{ marginX: 1, color: !userActive && 'rgba(40, 40, 40,0.8)' }}>Privacy:</Typography>
                  {filterCheckBox("Public", userActive)}
                  {filterCheckBox("Private", userActive)}

                  <Divider color={'rgb(0, 0, 0)'} sx={{marginY: 1}} />
                  
                  <Typography sx={{ marginX: 1, color: !userActive && 'rgba(40, 40, 40,0.8)' }}>Gender:</Typography>
                  {filterCheckBox("Male", userActive)}
                  {filterCheckBox("Female", userActive)}

                </Box>


                <Chip 
                    variant='filled' 
                    color="success" 
                    icon={<FontAwesomeIcon icon={faHorseHead} />} 
                    label="Horses"
                    onDelete={() => handleChipClick("Horse")}
                    deleteIcon={horseActive? <CircleIcon /> : <CircleOutlinedIcon />}/>
              {/*age, gender, */}
                <Box color={'rgb(240, 240, 240)'} sx={{ display: 'flex', flexDirection: 'column', gap: 0, }}>
                  
                  <Typography sx={{ marginX: 2, color: !horseActive && 'rgba(40, 40, 40,0.8)' }}>Age range:</Typography>
                  <Box sx={{ marginBottom: 1, marginX: 1, display: 'flex', flexDirection: 'row', gap: 0, }}>
                    <TextField onChange={(e) => setHorseFilters({ ...horseFilters, minAge: Number(e.target.value) })} disabled={!horseActive} size='small' placeholder='min' />
                    <TextField onChange={(e) => setHorseFilters({ ...horseFilters, maxAge: Number(e.target.value) })} disabled={!horseActive} size='small' placeholder='max' />
                  </Box>
                  
                  <Divider color={'rgb(0, 0, 0)'} sx={{marginY: 1}}/>
                  
                  <Typography sx={{ marginX: 1, color: !horseActive && 'rgba(40, 40, 40,0.8)' }}>Gender:</Typography>
                  {filterCheckBox("Stallion", horseActive)}
                  {filterCheckBox("Mare", horseActive)}
                  
                </Box>


                <Chip 
                    variant='filled' 
                    color="success" 
                    width="100%"
                    icon={<FontAwesomeIcon icon={faHelmetSafety}/>} 
                    label="Jockeys" 
                    onDelete={() => handleChipClick("Jockey")}
                    deleteIcon={jockeyActive? <CircleIcon /> : <CircleOutlinedIcon />}/>

                <Box sx={{ color: 'rgb(240, 240, 240)', display: 'flex', flexDirection: 'column', gap: 0}}>
                
                  <Typography sx={{ marginX: 1, color: !jockeyActive && 'rgba(40, 40, 40,0.8)' }}>Gender:</Typography>
                  {filterCheckBox("Male", jockeyActive)}
                  {filterCheckBox("Female", jockeyActive)}

                  <Divider color={'rgb(0, 0, 0)'} sx={{marginY: 1}}/>

                  <Typography sx={{ marginX: 1, color: !jockeyActive && 'rgba(40, 40, 40,0.8)' }}>Status:</Typography>
                  {filterCheckBox("With a horse", jockeyActive)}
                  {filterCheckBox("Without a horse", jockeyActive)}

                </Box>
              </Box>
          </Grid>

          <Grid item xs={12} sm={7}>
            {serverError ? 
              <img style={{height: '60vh'}} src={process.env.PUBLIC_URL + "server_error.png"} /> 
              : 
              <Grid container display={'flex'} spacing={1}>
              {searchValues.map((item) => (
                <Grid item xs key={item.id}>
                  {Cube(item)}
                </Grid>
              ))}
            </Grid> }
            
          </Grid>
        </Grid>
    </Box>
  );
}
