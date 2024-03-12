import * as React from 'react';
import {AlertTitle, Alert, Button, Slider, TextField, FormGroup, Box} from '@mui/material';
import axios from 'axios';
import { apiUrl } from '../../../boredLocal';


export default function NewJockey() {
    const [alert, setAlert] = React.useState(false);
    const [formState, setFormState] = React.useState({
        name: '',
        quality: 1,
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
            setAlert(true);
        }else{
            setAlert(false);
            axios.post(`${apiUrl}Jockey/JockeyPost`, formState)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    };

    return (
        <>
            <FormGroup spacing={2}>
                <TextField id="outlined-basic" label="Name" variant="outlined" name="name" value={formState.name} onChange={handleChange} />
                { alert ?
                    <Alert sx={{marginTop: '10px'}} severity="warning">
                        <AlertTitle>Warning</AlertTitle>
                        The jockey should have a name atleast.
                    </Alert> 
                    :
                    null
                }
                <Box sx={{marginTop: '10px'}}>Quality:</Box>
                <Slider
                    max={10}
                    min={1}
                    size="medium"
                    valueLabelDisplay="auto"
                    name="quality"
                    value={formState.quality}
                    onChange={(event, newValue) => setFormState(prevState => ({ ...prevState, quality: newValue }))}
                />
                <Button variant="contained" onClick={() => handleSubmit()}>Send</Button>
            </FormGroup>
        </>
    );
}
