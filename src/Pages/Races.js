import { Typography, Box, Stack, Button, TextField} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from '../boredLocal';

export default function App() {
    const [allFutureRaces, setAllFutureRaces] = useState();
    const [allPastRaces, setAllPastRaces] = useState();
    const [allXCountryRaces, setAllXCountryRaces] = useState();

    const [selectedRace, setSelectedRace] = useState();
    const [countryToSearch, setCountryToSearch] = useState();

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

    const SearchByCountry = (countryName) => {
        axios.get(apiUrl+`Race/GetByCountry?country=${countryToSearch}`)
        .then((response) => {
            console.log(response);
            setAllXCountryRaces(response.data);
        })
    }


    const SelectedARace = async (raceId) => {
        console.log(raceId);
        axios.get(apiUrl+`Race/GetByRaceId?Id=`+raceId)
        .then((response) => {
            setSelectedRace(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <Stack 
        direction={"column"} spacing={2}>
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
                    {selectedRace && 
                    <Button variant="outlined" onClick={() => setSelectedRace(null)}>
                        {selectedRace.id}
                    </Button>}
                </Box>
            </Stack>
            <Stack direction="row">
                <TextField variant="outlined"  label="Country" onChange={(e) => setCountryToSearch(e.target.value)} fullWidth sx={{marginInline: 1, opacity: 1.2}} />
                <Button variant="contained" onClick={() => SearchByCountry(countryToSearch)}>Search</Button>
            </Stack>
            <Stack gap={1} backgroundColor={"lime"} fullWidth>
               
            {allXCountryRaces && allXCountryRaces.map((race) => (
                <Button variant="outlined" fullWidth>{race.id}, Length: {race.length}, Weather: {race.weather}</Button>
            ))}
            </Stack>
        </Stack>
    );
}
  