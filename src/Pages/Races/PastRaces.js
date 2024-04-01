import {useEffect, useState} from 'react';
import axios from 'axios';
import { apiUrl } from '../../boredLocal';
import {Stack, Box, Grid, Divider, Typography, Button} from "@mui/material";

import MapIcon from '@mui/icons-material/Map';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function PastRaces({race}) {

    const userData = [
        { name: "Alice", time: "10:00", country: "France" },
        { name: "Bob", time: "12:30", country: "Germany" },
        { name: "Charlie", time: "17:15", country: "India" },
        { name: "Diana", time: "08:45", country: "Italy" },
        { name: "Ethan", time: "14:00", country: "Japan" },
        { name: "Flora", time: "20:20", country: "Nigeria" },
        { name: "George", time: "05:55", country: "Russia" },
        { name: "Henry", time: "09:30", country: "South Africa" },
        { name: "Isla", time: "11:10", country: "Spain" },
        { name: "Jack", time: "16:45", country: "United Kingdom" },
        { name: "Kim", time: "07:25", country: "United States" },
        { name: "Leo", time: "13:00", country: "Venezuela" },
        { name: "Mia", time: "18:30", country: "France" },
        { name: "Noah", time: "03:15", country: "Germany" },
        { name: "Olivia", time: "21:45", country: "India" },
        { name: "Peter", time: "06:00", country: "Italy" },
        { name: "Quinn", time: "10:30", country: "Japan" },
        { name: "Rory", time: "15:00", country: "Nigeria" },
        { name: "Sophia", time: "22:10", country: "Russia" },
        { name: "Thomas", time: "02:45", country: "South Africa" },
        { name: "Umaima", time: "07:15", country: "Spain" },
        { name: "Victor", time: "12:00", country: "United Kingdom" },
        { name: "Willow", time: "16:30", country: "United States" },
        { name: "Xavier", time: "20:00", country: "Venezuela" },
      ];

    const firstThree = userData.slice(0, 3);
    const restData = userData.slice(3);



    const smallRaceCard = (race) => {
        return (
            <Grid container 
            className='preventSelect'
            component={Button}
            variant='default'
            onClick={() => {console.log(race)}}
            sx={{
                textTransform: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '50px',
                paddingX: 2,
                paddingY:1,
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '50px',
            }}
            >
                <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
                {race.time}
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

    const bigRaceCard = (race) => {
        return (
            <Grid container 
            item
            lg={5.9}
            xs={12}
            className='preventSelect'
            component={Button}
            variant='default'
            onClick={() => {console.log(race)}}
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
                {race.time}
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
                width: '75%', 
                maxWidth: '750px',
                backgroundColor: 'rgba(4, 88, 88, 0.7)',
                gap: 1,
                marginTop: 10,
                padding: 3,
                borderRadius:'30px',
                marginX: 5}} direction={'column'}>
            <Typography variant='h4' sx={{fontWeight: '800', letterSpacing: '3px'}}>Most Recent:</Typography>
    
            <Grid container sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingX: 2}}
                >
                <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
               <AccessTimeIcon /></Grid>

                <Grid item xs={3} ></Grid>
                
                <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <MapIcon /></Grid>
            </Grid>

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