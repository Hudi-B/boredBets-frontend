import * as React from 'react';
import {FormGroup, TextField, Button, Alert, AlertTitle, FormLabel} from '@mui/material';
import axios from 'axios';
import { apiUrl } from '../../../boredLocal';


export default function NewHorse() {
    const [alert, setAlert] = React.useState(false);
    const [quantity, setQuantity] = React.useState();

    const handleSubmit = () => {
        if (quantity<1) {
            setAlert(true);
        }else{
            setAlert(false);
            axios.post(`${apiUrl}Horse/GenerateHorses?quantity=${quantity}`)
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
                <TextField id="outlined-basic" label="Generation Count" variant="outlined" name="name" onChange={e => setQuantity(e.target.value)}/>
                { alert ?
                    <Alert sx={{marginTop: '10px'}} severity="warning">
                        <AlertTitle>Warning</AlertTitle>
                        Please ensure to input a positive number.
                    </Alert>
                    :
                    null
                }
                <Button sx={{marginTop: '10px'}} variant="contained" onClick={() => handleSubmit()}>Send</Button>
            </FormGroup>
        </>
    );
}
