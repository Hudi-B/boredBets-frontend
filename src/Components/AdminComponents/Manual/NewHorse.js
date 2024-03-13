import * as React from 'react';
import {Switch, AlertTitle, Alert, Button, Slider, TextField, FormControlLabel, FormGroup, Box} from '@mui/material';
import axios from 'axios';
import { apiUrl } from '../../../boredLocal';
import { useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';


export default function NewHorse() {
    const [alert, setAlert] = React.useState(false);
    const [formState, setFormState] = React.useState({
        name: '',
        age: 2,
        stallion: false,
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
            setAlert(true);
        }else{
            setAlert(false);
            axios.post(`${apiUrl}Horse/HorsePost`, formState)
            .then((response) => {
                enqueueSnackbar(response.message, {
                    variant: 'success',
                    autoHideDuration: 3000,
                    TransitionComponent: Slide, // Use the actual Slide component
                  });
            })
            .catch((error) => {
                enqueueSnackbar(error.message, {
                    variant: 'error',
                    autoHideDuration: 3000,
                    TransitionComponent: Slide, // Use the actual Slide component
                  });
            })
        }
    };

    return (
        <FormGroup spacing={2}>
            <TextField id="outlined-basic" label="Name" variant="outlined" name="name" value={formState.name} onChange={handleChange} />
            { alert ?
                <Alert sx={{marginTop: '10px'}} severity="warning">
                    <AlertTitle>Warning</AlertTitle>
                    The horse should have a name atleast.
                </Alert> 
                :
                null
            }
            <Box marginTop={2}>Age:</Box>
            <Slider
                max={6}
                min={2}
                size="medium"
                valueLabelDisplay="auto"
                name="age"
                value={formState.age}
                onChange={(event, newValue) => setFormState(prevState => ({ ...prevState, age: newValue }))}
            />
            <FormControlLabel control={<Switch onChange={handleChange} name="stallion" />} label="Stallion" />
            <Button variant="contained" onClick={() => handleSubmit()}>Send</Button>
        </FormGroup>
    );
}
