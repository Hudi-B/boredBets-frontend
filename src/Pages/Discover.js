import { apiUrl, fontColor,secondaryColor } from '../boredLocal';
import {Skeleton, Tooltip, ThemeProvider, createTheme, Pagination, Typography, Grid, Box, FormControlLabel, TextField, Chip, Button, Divider, Avatar} from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import Checkbox from '@mui/material/Checkbox';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { faHorseHead, faHelmetSafety } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PersonIcon from '@mui/icons-material/Person';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import LockIcon from '@mui/icons-material/Lock';
import ReportRoundedIcon from '@mui/icons-material/ReportRounded';

import { useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const whiteInputTheme = createTheme({
  components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: fontColor, 
                transition: 'border-color 0.3s ease-in-out', 
              },
              '&:hover fieldset': {
                borderColor: 'rgb(100, 100, 100)',
              },
              '&.Mui-focused fieldset': {
                borderColor: fontColor, 
              },
            },
            '& .MuiInputBase-input': {
              color: fontColor,
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            '&.Mui-focused': {
              color: fontColor, 
            },
            '&.MuiInputLabel-outlined': {
              color: fontColor,
            },
          },
        },
      },
    },
});


export default function Discover() {
  const [fetching, setFetching] = useState(true);
  const [allData, setAllData] = useState([]);
  const [serverError, setServerError] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [maxPage, setMaxPage] = useState(5);
  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [userActive, setUserActive] = useState(false);
  const [jockeyActive, setJockeyActive] = useState(false);
  const [horseActive, setHorseActive] = useState(false);

  const [filterGroup, setFilterGroup] = useState("");

  const userFilterDefault = {
    private: false,
    public: false
  };

  const horseFilterDefault = {
    minAge: 1,
    maxAge: 6,
    stallion: false,
    mare: false,
  };

  const jockeyFilterDefault = {
    male: false,
    female: false,
    hashorse: false,
    hasnohorse: false,
  }
  const [userFilter, setUserFilter] = useState(userFilterDefault);

  const [horseFilter, setHorseFilter] = useState(horseFilterDefault);

  const [jockeyFilter, setJockeyFilter] = useState(jockeyFilterDefault);

  const applyFilters = () => {
    var errorOnFilter = false;
    setPageNum(1);

    if (horseActive) {
      setUserFilter(userFilterDefault);
      setJockeyFilter(jockeyFilterDefault);

      if (horseFilter.minAge === 0) {
        setHorseFilter({ ...horseFilter, minAge: 1 });
      }

      if (horseFilter.maxAge === 0) {
        setHorseFilter({ ...horseFilter, maxAge: 6 });
      }

      if (Number.isNaN(horseFilter.minAge)) {
        enqueueSnackbar( "Please set a valid number for minimum age", {
          variant: 'error',
          autoHideDuration: 3000,
          TransitionComponent: Slide, // Use the actual Slide component
        });
        errorOnFilter = true;
      } 

      if (Number.isNaN(horseFilter.maxAge)) {
        enqueueSnackbar( "Please set a valid number for maximum age", {
          variant: 'error',
          autoHideDuration: 3000,
          TransitionComponent: Slide, // Use the actual Slide component
        });
        errorOnFilter = true;
      }

      if (!errorOnFilter) {
        setUserFilter(userFilterDefault);
        setJockeyFilter(jockeyFilterDefault);
      filterGroup === "Horse" ? requestData() : setFilterGroup("Horse");
      }
    }
    else if (jockeyActive) {
      setUserFilter(userFilterDefault);
      setHorseFilter(horseFilterDefault);
      filterGroup === "Jockey" ? requestData() : setFilterGroup("Jockey");

    }else if (userActive) {
      setHorseFilter(horseFilterDefault);
      setJockeyFilter(jockeyFilterDefault);
      filterGroup === "User" ? requestData() : setFilterGroup("User");
    }
    else {
      setHorseFilter(horseFilterDefault);
      setJockeyFilter(jockeyFilterDefault);
      setUserFilter(userFilterDefault);
      filterGroup === "" ? requestData() : setFilterGroup("");
    }
  }

    const handlePageChange = (event, value) => {
      setPageNum(value);
    };


    useEffect(() => {
      requestData();
    }, [filterGroup]);

    useEffect(() => {
      requestData();
    }, [pageNum]);

    const requestData = async () => {
      if (filterGroup!=="") {
        const filtersToSend = {jockeyFilter, userFilter, horseFilter};

        setFetching(true);
        axios.post(`${apiUrl}SearchBar?filteredGroup=${filterGroup}&pageNum=${pageNum}`, filtersToSend)
        .then((response) => {
            setAllData(response.data.search);
            setMaxPage(response.data.maxPage);
            setServerError(false);
            setFetching(false);
        }).catch((error) => {
            enqueueSnackbar("Something went wrong", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
            setFetching(false);
            setServerError(true);
        })
      } else {
          setFetching(true);
          axios.get(`${apiUrl}SearchBar?page=${pageNum}`)
          .then((response) => {
              setAllData(response.data.search);
              setMaxPage(response.data.maxPage);
              setServerError(false);
              setFetching(false);
          }).catch((error) => {
              enqueueSnackbar("Something went wrong", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
              setFetching(false);
              setServerError(true);
          })
      }
    }
  const handleChipClick = (sender) => {
    switch (sender) {
      case "Horse":
          setHorseActive(!horseActive);
        setUserActive(false);
        setJockeyActive(false);
        break;

      case "User":
        setHorseActive(false);
          setUserActive(!userActive);
        setJockeyActive(false);
        break;
        
      case "Jockey":
        setHorseActive(false);
        setUserActive(false);
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
        item.type === "Horse" ? `/Horse/${item.data.id}` : 
        item.type === "Jockey" ? `/Jockey/${item.data.id}` : 
        item.type === "User" && `/User/${item.data.id}`}
      sx={{
        textTransform: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minWidth: '175px',
        height: '125px',
        backgroundColor: secondaryColor, 
        borderRadius: '10px',
        marginInline: 'auto',
        '&:hover': {
          backgroundColor: 'rgb(51, 68, 92)',//slightly lighter than secondaryColor
          boxShadow: '0 0 15px rgb(50, 50,50)',
        }
      }}
    >
      <Typography 
        sx={{ 
          fontWeight: 'bold', 
          fontSize: '22px', 
          color: fontColor, 
          textAlign: 'center',
          position: 'absolute',
          bottom: 5,
          left: 8}}> 
        {item.type === "Horse" ? <FontAwesomeIcon icon={faHorseHead} /> : 
        item.type === "Jockey" ? <FontAwesomeIcon icon={faHelmetSafety} /> : 
        item.type === "User" && <PersonIcon sx={{fontSize: 35}}/> }
      </Typography>

      <Typography 
        sx={{ 
          fontWeight: 'bold', 
          fontSize: '22px', 
          color: fontColor, 
          textAlign: 'center'}}
          > 
        {item.data.name}
      </Typography>

      <Box>
        {item.type === "Horse"
          ? (item.data.stallion===true ? 
                <MaleIcon sx={{ color: 'blue', fontSize: 35 }} /> 
                :
                <FemaleIcon sx={{ color: 'pink', fontSize: 35 }} />)
          :null
        }

        {
        item.type ==="Jockey"? 
            (item.data.male ? 
            <MaleIcon sx={{ color: 'blue', fontSize: 35 }} /> 
            :
            <FemaleIcon sx={{ color: 'pink', fontSize: 35 }} />)
          :null 
        }

        {/*
        This is for displaying Warning messages regarding individuals
        */}
        {item.type === "Jockey" && item.data.hashorse === false ? 
        <Tooltip title="This Jockey is currently without a horse " placement="top">
          <ReportRoundedIcon sx={{color: 'yellow', fontSize: 30, position: 'absolute', right: 7, bottom: 7}} />
        </Tooltip> : null}

        {item.type === "User" && item.data.isPrivate === true ? 
        <Tooltip title="This User has set his profile to private " placement="top">
          <LockIcon sx={{color: 'rgba(0,0,0,0.5)', fontSize: 30, position: 'absolute', right: 7, bottom: 7}} />
        </Tooltip> : null}
      </Box>
    </Button>
  );

  const filterCheckBox = (label, disabled) => {
    return(
      <FormControlLabel disabled={!disabled} 
      sx={{color: fontColor, marginX: 1}}
        control={
          <Checkbox
            size='small'sx={{color: fontColor, '&.Mui-checked': {color: fontColor}}}
            icon={< CircleOutlinedIcon/>}
            checkedIcon={<CheckCircleRoundedIcon />}
            checked={horseFilter[label.toLowerCase()] }
            onChange={() => filterBooleanToggle(label, disabled)}
          />} 
      label={label} />
    )
  };
  
  const filterBooleanToggle = (label, category) => {
    switch (category) {
      case horseActive:
        setHorseFilter({ ...horseFilter, [label.toLowerCase()]: !horseFilter[label.toLowerCase()] });
        break;
      case userActive:
        setUserFilter( { ...userFilter, [label.toLowerCase()]: !userFilter[label.toLowerCase()] });
        break;
      case jockeyActive:
        setJockeyFilter( { ...jockeyFilter, [label.toLowerCase().replace(/\s/g, '')]: !jockeyFilter[label.toLowerCase().replace(/\s/g, '')] });
        break;
      default:
        break;
    }
  };


  return (
    <Box sx={{ py: 15, px: 5,display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', width: '100%', gap: 2 }}>
      <Grid container gap={1} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
  {/*
  Filters ↓
  */}
        <Grid item xs={12} sm={2}
          sx={{
            minWidth: '200px',
            maxWidth: '300px',
            backgroundColor: secondaryColor,
            borderRadius: '10px',
            padding: 1.5,
            paddingX: 1}}>
          <Button variant='contained' onClick={() => applyFilters()} sx={{width: '100%', marginY: 1}} color='primary'>Apply Filters</Button>
          <Box sx={{
            height: '100%',
            borderRadius: '8px', 
            width: 'fill',
            backgroundColor: 'rgba(63, 85, 115,0.7)',
            display: 'flex',
            flexDirection: 'column', 
            gap: 1,
            padding: 1
          }}>
            <Chip 
              variant='filled' 
              color='primary'
              icon={<PersonIcon />} 
              label="Users" 
              onDelete={() => handleChipClick("User")}
              onClick={() => handleChipClick("User")}
              deleteIcon={userActive? <CircleIcon /> : <CircleOutlinedIcon />}/>
                
            <Box sx={{ color: fontColor, display: 'flex', flexDirection: 'column', gap: 0}}>
              
              <Typography sx={{ marginX: 1, color: !userActive ? 'rgba(40, 40, 40,0.8)' : undefined }}>Privacy:</Typography>
              {filterCheckBox("Public", userActive)}
              {filterCheckBox("Private", userActive)}

            </Box>


            <Chip 
              variant='filled' 
              color='primary'
              icon={<FontAwesomeIcon icon={faHorseHead} />} 
              label="Horses"
              onDelete={() => handleChipClick("Horse")}
              onClick={() => handleChipClick("Horse")}
              deleteIcon={horseActive? <CircleIcon /> : <CircleOutlinedIcon />}/>

            <Box color={'rgb(240, 240, 240)'} sx={{ display: 'flex', flexDirection: 'column', gap: 0, }}>
                  
            <Typography sx={{ marginX: 2, color: !horseActive && 'rgba(40, 40, 40,0.8)' }}>Age&nbsp;range:  1&nbsp;-&nbsp;6 </Typography>
            <Box sx={{ marginBottom: 1, marginX: 1, display: 'flex', flexDirection: 'row', gap: 0, }}>
              <ThemeProvider theme={whiteInputTheme}>
                <TextField onChange={(e) => setHorseFilter({ ...horseFilter, minAge: Number(e.target.value) })} disabled={!horseActive} size='small' placeholder='min' />
                <TextField onChange={(e) => setHorseFilter({ ...horseFilter, maxAge: Number(e.target.value) })} disabled={!horseActive} size='small' placeholder='max' />
              </ThemeProvider>
            </Box>
              <Divider color={horseActive?'white':'black'} sx={{marginY: 1}}/>
                  
              <Typography sx={{ marginX: 1, color: !horseActive && 'rgba(40, 40, 40,0.8)' }}>Gender:</Typography>
              {filterCheckBox("Stallion", horseActive)}
              {filterCheckBox("Mare", horseActive)}
            </Box>

            <Chip 
              variant='filled' 
              color='primary'
              width="100%"
              icon={<FontAwesomeIcon icon={faHelmetSafety}/>} 
              label="Jockeys" 
              onDelete={() => handleChipClick("Jockey")}
              onClick={() => handleChipClick("Jockey")}
              deleteIcon={jockeyActive? <CircleIcon /> : <CircleOutlinedIcon />}/>

            <Box sx={{ color: fontColor, display: 'flex', flexDirection: 'column', gap: 0}}>
            
              <Typography sx={{ marginX: 1, color: !jockeyActive && 'rgba(40, 40, 40,0.8)' }}>Gender:</Typography>
              {filterCheckBox("Male", jockeyActive)}
              {filterCheckBox("Female", jockeyActive)}

              <Divider color={jockeyActive?'white':'black'} sx={{marginY: 1}}/>

              <Typography sx={{ marginX: 1, color: !jockeyActive && 'rgba(40, 40, 40,0.8)' }}>Status:</Typography>
              {filterCheckBox("Has horse", jockeyActive)}
              {filterCheckBox("Has no horse", jockeyActive)}

            </Box>
          </Box>
        </Grid>
  {/*
  Shown data, or error message ↓
  */}

        <Grid item xs={12} sm={7}>
          
          <Box sx={{marginTop: 2, display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', alignItems: 'center'}}>
            <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
              <Pagination
                page={pageNum}
                onChange={handlePageChange}
                sx={{
                  '& .MuiPaginationItem-page': {
                    color: fontColor,
                  },
                  '& .MuiPaginationItem-ellipsis': {
                    color: fontColor, 
                  },
                  '& .MuiPaginationItem-icon': {
                    color: fontColor,
                  },
                }}
                value={pageNum}
                count={maxPage}
                size={isSmallScreen ? 'small' : 'medium'}
              />            
            </Box>
            {serverError ? 
                <Box sx={{ textAlign: 'center', padding: '50px' }}>
                 <Typography variant="h2">An error occured on the server.</Typography>
                 <Typography variant="h5">Please try again later.</Typography>
                 <Avatar variant="square" src={process.env.PUBLIC_URL + "images/errorcatlight.png"} sx={{ height: 'auto', width: 'auto' }} />
                </Box>
              : 
                <Grid container display={'flex'} spacing={1}>
                {!fetching ? 
                  allData.map((item) => (
                    <Grid item xs key={item.data.id}>
                      {Cube(item)}
                    </Grid>
                  ))
                :
                  Array.from({ length: 60 }).map((_, index) => (
                    <Grid item xs key={index}>
                      <Skeleton variant="rectangular" 
                        sx={{
                          backgroundColor: 'rgba(0, 0, 0, 0.15)',
                          width: '100%',
                          minWidth: '175px',
                          height: '125px',
                          borderRadius: '10px',
                          marginInline: 'auto',}} 
                      />
                    </Grid>
                  ))
                }
                </Grid>
              }
            <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', }}>
              <Pagination
                page={pageNum}
                onChange={handlePageChange}
                color='primary'
                sx={{
                  '& .MuiPaginationItem-page': {
                    color: fontColor,
                  },
                  '& .MuiPaginationItem-ellipsis': {
                    color: fontColor,
                  },
                  '& .MuiPaginationItem-icon': {
                    color: fontColor,
                  },
                }}
                value={pageNum}
                count={maxPage}
                showFirstButton
                showLastButton
                size={isSmallScreen ? 'small' : 'medium'}
              />            
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
