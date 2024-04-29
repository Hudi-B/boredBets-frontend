import { Stack, Box, Typography, Paper} from "@mui/material";
import { useEffect, useState } from "react";
import UpcomingRaces from "./Races/UpcomingRaces";
import PastRaces from "./Races/PastRaces";
import axios from 'axios';
import { apiUrl } from '../boredLocal';

import {secondaryColor} from '../boredLocal';

import { enqueueSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';

export default function RacesPage() {
    const [present, setPresent] = useState(true);
    const [allPastRaces, setAllPastRaces] = useState([]);
    const [allUpcomingRaces, setAllUpcomingRaces] = useState([]);
    const [pastRacesPage,setPastRacesPage] = useState(1);
    useEffect(() => {
        axios.get(`${apiUrl}Race/GetAllFutureRaces`)
        .then((response) => {

            setAllUpcomingRaces(response.data);
        })
        .catch((error) => {

            console.log(error);
    
        enqueueSnackbar("Error while requesting upcoming races.", {
            variant: 'error',
            autoHideDuration: 3000,
            TransitionComponent: Slide,
          });

        });
    }, []);

    useEffect(() => {
        console.log("ran");
        axios.get(`${apiUrl}Race/GetAllHappendRaces?page=`+pastRacesPage)
        .then((response) => {
            setAllPastRaces(response.data);
        })
        .catch((error) => {

            console.log(error);
            
            enqueueSnackbar("Error while requesting past races.", {
              variant: 'error',
              autoHideDuration: 3000,
              TransitionComponent: Slide,
            });

        });
    }, [pastRacesPage]);


const switchButtons = (upcoming) => {
    return (
        <Box
        variant="default"
        sx={{
            paddingX: 5,
            paddingY: 1,
            paddingTop: 1.4,
            width: '100%', 
            textAlign: 'center',
            fontSize: '20px',
            textTransform: 'uppercase',
            fontWeight: 'bolder',
            letterSpacing: '3px',
            color: present === upcoming ? 'rgb(240,240,240)' : 'rgba(200,200,200,0.5)',
            borderRadius: '0px',
            '&:hover': { //this is only required to keep the buttons color on hover
            backgroundColor: present === upcoming
                ? 'transparent'
                : 'rgba(200,200,200,0.05)',
            transition: 'background-color 0.3s ease', // Transition effect
            },
            backgroundColor: present === upcoming
            ? 'rgba(200,200,200,0.1)'
            : 'transparent',
            transition: 'background-color 0.7s ease', // Transition effect
        }}
        onClick={() => setPresent(upcoming)}
        >
        {upcoming ? "Upcoming" : "Passed"}
        </Box>)
}
    return (
        <Stack 
        direction={"column"} spacing={2}>
            <Paper elevation={5} sx={{backgroundColor: secondaryColor, display: 'flex'}}>
                {switchButtons(true)}
                {switchButtons(false)}
            </Paper>
            {present?
                <UpcomingRaces races={allUpcomingRaces}/>
                :
                <PastRaces races={allPastRaces} pageNum={pastRacesPage} setPastRacesPage={setPastRacesPage}/>
            }
        </Stack>
    );
}
  