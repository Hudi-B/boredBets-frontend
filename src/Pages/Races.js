import { Typography, Box, Stack, Button, Divider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from '../boredLocal';

export default function App() {
    const [allFutureRaces, setAllFutureRaces] = useState([]);
    const [allPastRaces, setAllPastRaces] = useState([]);
    const [thisRace, setThisRace] = useState({});
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
console.log(allPastRaces);
    const SelectedARace = (raceId) => {
        axios.get(apiUrl+`Race/GetByRaceId?Id=`+raceId)
        .then((response) => {
            setThisRace(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    return (
        <Stack 
        direction="row" 
        justifyContent={"space-around"} 
        width={"100vw"}
        divider={<Divider orientation="vertical" flexItem />}>
            <Box display="flex" flexDirection="column">
                <Typography variant="h5">Incoming races</Typography>
                {allFutureRaces.map((race) => (
                    <Button key={race.Id} onClick={() => SelectedARace(race.Id)}>
                        {race.Name}
                    </Button>
                ))}
            </Box>

            <Box display="flex" flexDirection="column">
                <Typography variant="h5">Previous races</Typography>
                {allPastRaces.map((race) => (
                    <Button key={race.id} onClick={() => SelectedARace(race.Id)}>
                        {race.Name}
                    </Button>
                ))}
            </Box>
                
            <Box display="flex" flexDirection="column">
                <Typography variant="h5">Selected race:</Typography>
            </Box>
        </Stack>
    );
}
  