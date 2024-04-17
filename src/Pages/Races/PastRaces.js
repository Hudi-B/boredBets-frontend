import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { apiUrl } from '../../boredLocal';
import {Stack, Divider, Grid, Typography, Button, Hidden} from "@mui/material";
import React  from 'react';

import MapIcon from '@mui/icons-material/Map';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function PastRaces({races}) {
    const navigate = useNavigate();
    const [smallScreen, setSmallScreen] = useState(false);
    const [firstThree, setFirstThree] = useState([]);
    const [restData, setRestData] = useState([]);   
    const moment = require('moment');

    
    useEffect(() => {
        setFirstThree(races.allHappenedRaces.slice(0, 3));
        setRestData(races.allHappenedRaces.slice(3));
    },[]);

    useEffect(() => {
        if (window.innerWidth < 400) {
            setSmallScreen(true);
        }
        else {
            setSmallScreen(false);
        }
    }, [window.innerWidth]);


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
                    <AccessTimeIcon sx={{marginRight: '10px'}} />{moment(race.raceScheduled).format("yyyy, MMMM d, HH:mm")}
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
                    {moment(race.raceScheduled).format("yyyy, MMMM d, HH:mm")}
                    </Grid>
                </Hidden>
            </Grid>
    )}

    const bigRaceCard = (race) => {
        return (
            <Grid container 
            item
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
                {moment(race.raceScheduled).format("yyyy, MMMM d, HH:mm")}
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

    return (
        <Stack direction={'column'} sx={{ paddingX: 1, width: '100%', display:'flex',justifyContent: 'center', alignItems: 'center'}} >
            <Stack sx={{
                width: '85%', 
                maxWidth: '750px',
                backgroundColor: 'rgba(4, 88, 88, 0.7)',
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
                <MapIcon /></Grid>

                <Grid item xs={3} ></Grid>

                <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <AccessTimeIcon /></Grid>
                
            </Grid>
        </Hidden>

            {firstThree.map((user) => (
                smallRaceCard(user)
            ))}
            </Stack>


            <Stack sx={{
                width: '100%', 
                backgroundColor: 'rgba(4, 88, 88, 0.7)',
                gap: 1,
                padding: 3,
                marginTop:10,
                borderTopRightRadius: '40px',
                borderTopLeftRadius: '40px',
                }} direction={'column'}>
                <Typography variant='h4' sx={{fontWeight: '700'}}>All Past Races in register:</Typography>
                <Grid container sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingX: 2}}>
                    {restData.map((user) => (
                        bigRaceCard(user)
                    ))}
                </Grid>
            </Stack>
        </Stack>
    );
}