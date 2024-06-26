import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {Stack, Divider, Grid, Typography, Button, Hidden, Skeleton, Box, Pagination} from "@mui/material";
import React  from 'react';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { apiUrl } from '../../boredLocal';

import MapIcon from '@mui/icons-material/Map';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import {FormatDate, secondaryColor} from '../../boredLocal';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function PastRaces({races, pageNum, setPastRacesPage }) {
    const [firstThree, setFirstThree] = useState([]);
    const [restData, setRestData] = useState([]);   
    const [pending, setPending] = useState(true);
    const [maxPage, setMaxPage] = useState(5);
    const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));


    const fetchLastFiveRaces = async () => {
        axios.get(apiUrl+`Race/GetFivePreviousRaces`)
        .then((response) => {
            setFirstThree(response.data.slice(0, 3));
        })
        .catch((error) => {
            enqueueSnackbar("Something went wrong", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
        })
    }

    useEffect(() => {
        if (!races || races.length === 0) return; 
        const racesArray = Object.values(races.allHappenedRaces);

        fetchLastFiveRaces();

        setRestData(racesArray);
        setMaxPage(races.totalPage);
        setPending(false);
    },[races]);

    const smallRaceCard = (race) => {
        return (
            <Grid container 
                className='preventSelect'
                key={race.id}
                component={Button}
                variant='default'
                onClick={() => {navigate("/race/"+race.id)}}
                sx={{
                    textTransform: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingX: 2,
                    paddingY:1,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '50px',
                }}
            >
                <Hidden smUp> {/*Small screen */}
                    <Grid item xs={12} sx={{display: 'flex',  justifyContent: 'center', alignItems: 'center', marginY: 0.3, fontWeight:'750', letterSpacing: '1px'}}>
                    <MapIcon sx={{marginRight: '10px'}} /> {race.name}
                    </Grid>
                        <Divider sx={{width: '100%', borderColor: 'black'}} />
                    <Grid item xs={12} sx={{display: 'flex',  justifyContent: 'center', alignItems: 'center', marginY: 0.3}}>
                        {race.country}
                    </Grid>
                        <Divider sx={{width: '100%', borderColor: 'black'}} />
                    <Grid item xs={12}sx={{display: 'flex',justifyContent: 'center', alignItems: 'center', marginTop: 0.3}}>
                    <AccessTimeIcon sx={{marginRight: '10px'}} />{FormatDate(race.raceScheduled)}
                    </Grid>
                </Hidden>

                <Hidden smDown>{/*big screen */}
                    <Grid item xs={12} sx={{marginY: 0.3,paddingLeft: '10px', fontWeight:'750', letterSpacing: '1px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                        {race.name}
                    </Grid>

                        <Divider sx={{width: '100%', borderColor: 'black'}} />

                    <Grid item sm={6} sx={{paddingLeft: '15px',display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginY: 0.3}}>
                        {race.country}
                    </Grid>

                    <Hidden smUp>
                        <Divider sx={{width: '100%', borderColor: 'black'}} />
                    </Hidden>

                    <Grid item xs={12} sm={6} sx={{display: 'flex', paddingRight: '10px', justifyContent: 'flex-end', alignItems: 'center', marginTop: 0.3}}>
                        {FormatDate(race.raceScheduled)}
                    </Grid>
                </Hidden>
            </Grid>
    )}

    function smallSkeletons() {
        const skeletons = [];
        for (let i = 0; i < 3; i++) {
            skeletons.push(
            <Skeleton variant="rectangular" key={"btc"+i+0.1} sx={{width: '100%', height: '75px', marginY:'0px', borderRadius:'50px'}} />
            );
        }
        return skeletons;
    }

    const bigRaceCard = (race) => {
        return (
            <Grid container 
            item
            key={race.id}
            lg={5.9}
            xs={12}
            className='preventSelect'
            component={Button}
            variant='default'
            onClick={() => {navigate("/race/"+race.id)}}
            sx={{
                textTransform: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '80px',
                paddingX: 2,
                paddingY:1,
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '20px',
                marginBottom: '10px',
            }}
            >
                <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
                {FormatDate(race.raceScheduled)}
                </Grid>
                    <Divider orientation="vertical" flexItem color="black" />
                <Grid item xs={3} sx={{fontWeight:'750', letterSpacing: '1px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {race.name}
                </Grid>
                
                <Divider orientation="vertical" flexItem color="black" />
                <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {race.country}
                </Grid>
            </Grid>
    )}

    function bigSkeletons() {
        const skeletons = [];
        for (let i = 0; i < 20; i++) {
            skeletons.push(
            <Skeleton variant="rectangular" key={"btc"+i+0.2} sx={{width: '100%', height: '130px', margin:'none', borderRadius:'20px'}} />
            );
        }
        return skeletons;
    }

    const handlePageChange = (event, value) => {
        setPastRacesPage(value);
      };


    return (
        <Stack direction={'column'} sx={{ paddingX: 1, width: '100%', display:'flex',justifyContent: 'center', alignItems: 'center'}} >
            <Stack sx={{
                width: '85%', 
                maxWidth: '750px',
                backgroundColor: secondaryColor,
                gap: 1,
                marginTop: 10,
                padding: 3,
                borderRadius:'30px',
                marginX: 5}} direction={'column'}>
            <Typography variant='h4' sx={{fontWeight: '800', letterSpacing: '3px'}}>Most Recent:</Typography>
        
        <Hidden smDown>
            <Grid container sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingX: 2}}
                >
                <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
                <MapIcon color='secondary' /></Grid>

                <Grid item xs={3} ></Grid>

                <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <AccessTimeIcon color='secondary' /></Grid>
                
            </Grid>
        </Hidden>
            {pending ? 
                    smallSkeletons() 
                :
                    firstThree.map((user) => (
                    smallRaceCard(user)
                    ))
            }
            </Stack>


            <Stack sx={{
                width: '100%', 
                backgroundColor: secondaryColor,
                maxWidth: '1400px',
                gap: 1,
                padding: 3,
                marginTop:10,
                borderTopRightRadius: '40px',
                borderTopLeftRadius: '40px',
                }} direction={'column'}>
                <Typography variant='h4' sx={{fontWeight: '700'}}>All Past Races in register:</Typography>
                <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <Pagination
                        page={pageNum}
                        onChange={handlePageChange}
                        color='primary'
                        sx={{
                        '& .MuiPaginationItem-page': {
                            color: 'white', // Set the color of the page numbers to white
                        },
                        '& .MuiPaginationItem-ellipsis': {
                            color: 'white', // Set the color of the ellipsis to white
                        },
                        '& .MuiPaginationItem-icon': {
                            color: 'white', // Set the color of the icons to white
                        },
                        }}
                        value={pageNum}
                        count={maxPage}
                        showFirstButton
                        showLastButton
                        size={isSmallScreen ? 'small' : 'medium'}
                    />            
                </Box>
                <Grid container sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingX: 2}}>
                    {pending ? 
                        bigSkeletons() 
                    :
                        restData.map((user) => (
                            bigRaceCard(user)
                        ))
                    }
                </Grid>
                <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <Pagination
                        page={pageNum}
                        onChange={handlePageChange}
                        color='primary'
                        value={pageNum}
                        sx={{
                        '& .MuiPaginationItem-page': {
                            color: 'white', // Set the color of the page numbers to white
                        },
                        '& .MuiPaginationItem-ellipsis': {
                            color: 'white', // Set the color of the ellipsis to white
                        },
                        '& .MuiPaginationItem-icon': {
                            color: 'white', // Set the color of the icons to white
                        },
                        }}
                        count={maxPage}
                        showFirstButton
                        showLastButton
                        size={isSmallScreen ? 'small' : 'medium'}
                    />            
                </Box>
            </Stack>
        </Stack>
    );
}