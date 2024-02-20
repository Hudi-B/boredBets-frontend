import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AlertTitle from '@mui/material/AlertTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import config from '../../../config';


export default function NewTrack() {
    const [alertOnName, setAlertOnName] = React.useState(false);
    const [alertOnCountry, setAlertOnCountry] = React.useState(false);
    const [formState, setFormState] = React.useState({
        name: '',
        country: '',
        length: 0,
        surface: 'Dry',
        oval: false
    });

    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = () => {
        if (!formState.name) {
            setAlertOnName(true);
        }else{
            setAlertOnName(false);
        }
        if (!formState.country) {
            setAlertOnCountry(true);
        }else{
            setAlertOnCountry(false);
        }
        if (!alertOnName && !alertOnCountry) {
            axios.post(`${config.apiUrl}Track/TrackPost`, formState)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            }) 
        }
    }
    

    return (
        <>
            <FormGroup spacing={2}>
                <TextField id="outlined-basic" label="Name" variant="outlined" name="name" onChange={handleChange} />
                {alertOnName?
                    <Alert className='mt-2' severity="warning">
                        <AlertTitle>Warning</AlertTitle>
                        The track should have a name.
                    </Alert> 
                :null}
                <TextField id="outlined-basic" className='mt-2' label="Country" variant="outlined" name="country"  onChange={handleChange} />
                {alertOnCountry?
                    <Alert className='mt-2' severity="warning">
                        <AlertTitle>Warning</AlertTitle>
                        The track should have a country.
                    </Alert> 
                :null}
                <InputLabel id="label-slider">Lenght: (m)</InputLabel>
                <Slider
                    max={3000}
                    min={400}
                    step={100}
                    size="medium"
                    valueLabelDisplay="auto"
                    name="length"
                    value={formState.length}
                    onChange={(event, newValue) => setFormState(prevState => ({ ...prevState, length: newValue }))}
                />
            <InputLabel id="demo-simple-select-label">Surface</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formState.surface}
                label="Surface"
                    onChange={(event) => setFormState(prevState => ({ ...prevState, surface: event.target.value }))}
                >
                    <MenuItem value={"Dry"}>Dry</MenuItem>
                    <MenuItem value={"Wet"}>Wet</MenuItem>
                    <MenuItem value={"Frozen"}>Frozen</MenuItem>
                </Select>

                <FormControlLabel control={<Checkbox onChange={handleChange} name="oval" />} label="Oval" />

                <Button variant="contained" onClick={handleSubmit}>Send</Button>
            </FormGroup>
        </>
    );
}
