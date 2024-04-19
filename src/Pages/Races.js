import { Stack, Button} from "@mui/material";
import { useEffect, useState } from "react";
import UpcomingRaces from "./Races/UpcomingRaces";
import PastRaces from "./Races/PastRaces";
import axios from 'axios';
import { apiUrl } from '../boredLocal';

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
        <Button variant="default" sx={{
            paddingX: 5,
            paddingY: 1,
            paddingTop: 1.4,
            width: '100%', 
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bolder',
            fontSize: '18px',
            letterSpacing: '3px',
            borderRadius: '0px',
            '&:hover': { //this is only required to keep the buttons color on hover
                backgroundColor: present === upcoming
                ? 'rgba(4, 88, 88, 0.7)'
                : 'rgba(4, 112, 107, 0.3)'
            },

            backgroundColor: (present===upcoming?
                'rgba(4, 88, 88, 0.7)':
                'rgba(4, 112, 107, 0.3)'
            ),
            }}
            onClick={() => setPresent(upcoming)}
            >
            {upcoming? "Upcoming": "History"}
        </Button>
    )
}
    return (
        <Stack 
        direction={"column"} spacing={2}>
            <Stack sx={{backgroundColor: 'rgba(4, 112, 107, 0.5)',borderBottom: '3px solid rgba(0,0,0,0.5)'}} direction={"row"} justifyContent={"space-around"}>
                {switchButtons(true)}
                {switchButtons(false)}
            </Stack>
            {present?
                <UpcomingRaces races={allUpcomingRaces}/>
                :
                <PastRaces races={allPastRaces} pageNum={pastRacesPage} setPastRacesPage={setPastRacesPage}/>}
        </Stack>
    );
}
  