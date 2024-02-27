import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios';
import config from '../../../boredLocal';


export default function NewHorse() {
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
            axios.post(`${config.apiUrl}Jockey/JockeyPost`, formState)
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
                {alert?
                    <Alert className='mt-2' severity="warning">
                        <AlertTitle>Warning</AlertTitle>
                        The jockey should have a name atleast.
                    </Alert> 
                :null}
                <div className='mt-2'>Quality:</div>
                <Slider
                    max={10}
                    min={1}
                    size="medium"
                    valueLabelDisplay="auto"
                    name="quality"
                    value={formState.quality}
                    onChange={(event, newValue) => setFormState(prevState => ({ ...prevState, quality: newValue }))}
                />

                <Button variant="contained" onClick={handleSubmit}>Send</Button>
            </FormGroup>
        </>
    );
}
