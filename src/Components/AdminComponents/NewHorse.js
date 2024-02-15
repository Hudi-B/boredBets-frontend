import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Switch from '@mui/material/Switch';
import axios from 'axios';

export default function NewHorse() {
    const [alert, setAlert] = React.useState(false);
    const [formState, setFormState] = React.useState({
        name: '',
        age: 2,
        stallion: false,
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
            axios.post('https://localhost:7090/api/Horse/HorsePost', formState)
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
            <div className='title'>New horse</div>
            <FormGroup spacing={2}>
                <TextField id="outlined-basic" label="Name" variant="outlined" name="name" value={formState.name} onChange={handleChange} />
                {alert?
                    <Alert className='mt-2' severity="warning">
                        <AlertTitle>Warning</AlertTitle>
                        The horse should have a name atleast.
                    </Alert> 
                :null}
                <div className='mt-2'>Age:</div>
                <Slider
                    max={6}
                    min={2}
                    size="medium"
                    valueLabelDisplay="auto"
                    name="age"
                    value={formState.age}
                    onChange={(event, newValue) => setFormState(prevState => ({ ...prevState, age: newValue }))}
                />
<FormControlLabel control={<Switch onChange={handleChange} name="stallion" />} label="Stallion" />                <Button variant="contained" onClick={handleSubmit}>Send</Button>
            </FormGroup>
        </>
    );
}
