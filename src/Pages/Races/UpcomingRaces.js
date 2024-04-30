import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {Stack, Divider, Grid, Typography, Button, Hidden, Skeleton} from "@mui/material";
import React  from 'react';

import MapIcon from '@mui/icons-material/Map';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { createTheme } from '@mui/material/styles';

import {secondaryColor, FormatDate} from '../../boredLocal';


export default function UpcomingRaces({races}) {
    const [firstThree, setFirstThree] = useState([]);
    const [restData, setRestData] = useState([]);   
    const [pending, setPending] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        if (!races || races.length === 0) return; 
        const racesArray = Object.values(races);

        setFirstThree(racesArray.slice(0, 3));
        setRestData(racesArray.slice(3));
        setPending(false);
    },[races]);

    console.log(races);

    const smallRaceCard = (race) => {
        return (
            <Grid container 
                className='preventSelect'
                component={Button}
                key={race.id}
                variant='default'
                onClick={() => {navigate("/race/"+race.id)}}
                sx={{
                    textTransform: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingX: 2,
                    paddingY:1,
                    backgroundColor: 'rgba(200,200,200,0.1)',
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
            <Skeleton variant="rectangular" key={"btc"+i+0.2} sx={{width: '100%', height: '75px', marginY:'0px', borderRadius:'50px'}} />
            );
        }
        return skeletons;
    }
    const bigRaceCard = (race) => {
        return (
            <Grid container 
            key={race.id}
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
                backgroundColor: 'rgba(200,200,200,0.1)',
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
            <Skeleton variant="rectangular" key={"btc"+i+0.1} sx={{width: '100%', height: '130px', margin:'none',marginBottom:1, borderRadius:'20px'}} />
            );
        }
        return skeletons;
    }


    return (
        <Stack direction={'column'} key={"btc"} sx={{ paddingX: 1, width: '100%', display:'flex',justifyContent: 'center', alignItems: 'center'}} >
            <Stack sx={{
                width: '85%', 
                maxWidth: '750px',
                boxShadow: ' 0 0 30px '+secondaryColor,
                gap: 1,
                marginTop: 10,
                padding: 3,
                borderRadius:'30px',
                marginX: 5}} direction={'column'}>
            <Typography key={"btc2"} variant='h4' sx={{fontWeight: '800', letterSpacing: '3px'}}>Upcoming:</Typography>
        
            <Hidden key={"btc3"} smDown>
                <Grid key={"btc3.1"} container sx={{
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
            {pending ? 
                    smallSkeletons() 
                :
                    firstThree.map((user) => (
                    smallRaceCard(user)
                    ))
            }
        </Stack>


        <Stack key={"btc5"}
        sx={{
            width: '100%', 
            backgroundColor: 'rgba(63, 85, 115,0.7)',
            boxShadow: ' 0 0 30px '+secondaryColor,
            gap: 1,
            padding: 3,
            maxWidth: '1400px',
            marginTop:10,
            borderTopRightRadius: '40px',
            borderTopLeftRadius: '40px',
            borderBottom: 'none',
            }} 
        direction={'column'}>
            <Typography key={'btc'} variant='h4' sx={{fontWeight: '700'}}>All coming races:</Typography>
            <Grid container sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingX: 2}}>
                {pending ? 
                    bigSkeletons() 
                :
                    restData.map((user) => (
                        bigRaceCard(user)
                    ))
                }
            </Grid>
        </Stack>
        </Stack>
    );
}