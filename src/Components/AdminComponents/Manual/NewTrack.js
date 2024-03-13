import * as React from 'react';
import {FormGroup, TextField, Slider, Button, Alert, AlertTitle, InputLabel} from '@mui/material';
import axios from 'axios';
import { apiUrl } from '../../../boredLocal';
import { useSnackbar } from 'notistack';


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
    const { enqueueSnackbar } = useSnackbar();

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
            axios.post(`${apiUrl}Track/TrackPost`, formState)
            .then((response) => {
                enqueueSnackbar(response.statusText, {variant: 'success'});
            })
            .catch((error) => {
                enqueueSnackbar(error.message, {variant: 'error'});
            }) 
        }
    }
    

    return (
        <FormGroup spacing={2}>
            <TextField id="outlined-basic" label="Name" variant="outlined" name="name" onChange={handleChange} />
            { alertOnName ?
                <Alert sx={{marginTop: '10px'}} severity="warning">
                    <AlertTitle>Warning</AlertTitle>
                    The track should have a name.
                </Alert> 
                :
                null
            }
            
            <TextField id="outlined-basic" sx={{marginTop: '10px'}} label="Country" variant="outlined" name="country"  onChange={handleChange} />
            { alertOnCountry ?
                <Alert sx={{marginTop: '10px'}} severity="warning">
                    <AlertTitle>Warning</AlertTitle>
                    The track should have a country.
                </Alert> 
                :
                null
            }

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

            <Button variant="contained" onClick={() => handleSubmit()}>Send</Button>
        </FormGroup>
    );
}