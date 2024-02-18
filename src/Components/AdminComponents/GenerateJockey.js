import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Switch from '@mui/material/Switch';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';

export default function NewHorse() {
    const [alert, setAlert] = React.useState(false);

    const [quantity, setQuantity] = React.useState(0);

    const handleSubmit = () => {
        if (quantity<1) {
            setAlert(true);
        }else{
            setAlert(false);
            axios.post('https://localhost:7090/api/Horse/GenerateJockey', quantity)
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
                <FormLabel sx={{textAlign: 'center'}} component="legend">For quicker data generation, make sure you wont use numbers greater than 1000</FormLabel>
                <TextField id="outlined-basic" label="Generation Count" variant="outlined" name="name" value={quantity} />
                {alert?
                    <Alert className='mt-2' severity="warning">
                        <AlertTitle>Warning</AlertTitle>
                        Please ensure to input a positive number.
                    </Alert> 
                :null}
                <Button sx={{marginTop: '10px'}} variant="contained" onClick={handleSubmit}>Send</Button>
            </FormGroup>
        </>
    );
}
