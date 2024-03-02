import { Typography, Box, Stack, Button} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from '../boredLocal';

export default function App() {
    const [allFutureRaces, setAllFutureRaces] = useState();
    const [allPastRaces, setAllPastRaces] = useState();
    const [thisRace, setThisRace] = useState();
    const [scrollY, setScrollY] = useState(0);

    //Race/GetByCountry?country=asd
    useEffect(() => {
        axios.get(apiUrl+`Race/GetAllFutureRaces`)
        .then((response) => {
            setAllFutureRaces(response.data);
        })
        .catch((error) => {
            console.log(error);
        })


        axios.get(apiUrl+`Race/GetAllHappendRaces`)
        .then((response) => {
            setAllPastRaces(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    const SelectedARace = async (raceId) => {
        console.log(raceId);
        axios.get(apiUrl+`Race/GetByRaceId?Id=`+raceId)
        .then((response) => {
            setThisRace(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
    console.log(window.scrollY);
        return () => {
          window.removeEventListener('scroll', handleScroll);

        };
      }, []);
      const handleScroll = () => {
        setScrollY(window.scrollY);
        // You can perform additional logic based on the scroll position here
      };
    

    return (
        <Stack 
        direction="row" 
        justifyContent={"space-around"} 
        width={"100vw"}>
            <Box display="flex" flexDirection="column">
                <Typography variant="h5" sx={{marginBottom: 2, backgroundColor: 'gray', color: 'white', padding: 1, borderRadius: 3}}>Incoming races</Typography>
                {allFutureRaces &&allFutureRaces.map((race) => (
                    <Button variant="outlined" sx={{marginBottom: 1}} key={race.Id} onClick={() => SelectedARace(race.id)}>
                        {race.name}
                    </Button>
                ))}
            </Box>

            <Box display="flex" flexDirection="column" sx={{marginInline: 1}}>
                <Typography variant="h5" sx={{marginBottom: 2, backgroundColor: 'gray', color: 'white', padding: 1, borderRadius: 3}}>Previous races</Typography>
                {allPastRaces && allPastRaces.map((race) => (
                    <Button variant="outlined" sx={{marginBottom: 1}} key={race.id} onClick={() => SelectedARace(race.id)}>
                        {race.name}
                    </Button>
                ))}
            </Box>
                
            <Box display="flex" flexDirection="column">
                <Typography variant="h5" sx={{marginBottom: 2, backgroundColor: 'gray', color: 'white', padding: 1, borderRadius: 3}}>Selected race</Typography>
                {thisRace && 
                <Button variant="outlined" onClick={() => setThisRace(null)}>
                    {thisRace.id}
                </Button>}
            </Box>
        </Stack>
    );
}
  