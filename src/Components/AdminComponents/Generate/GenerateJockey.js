import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import { apiUrl } from '../../../boredLocal';
import { useSnackbar } from 'notistack';


export default function GenerateJockey() {
    const [alert, setAlert] = React.useState(false);
    const [quantity, setQuantity] = React.useState(0);
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = () => {
        if (quantity<1) {
            setAlert(true);
        }else{
            setAlert(false);
            axios.post(`${apiUrl}Jockey/GenerateJockey?quantity=${quantity}`)
            .then((response) => {
                console.log(response);
                enqueueSnackbar( response.message, {variant: 'success'});
            })
            .catch((error) => {
                enqueueSnackbar( error.message, {variant: 'error'});
            })
        }
    };

    return (
        <FormGroup spacing={2}>
            <FormLabel sx={{textAlign: 'center'}} component="legend">For quicker data generation, make sure you wont use numbers greater than 1000</FormLabel>
            <TextField id="outlined-basic" label="Generation Count" variant="outlined" name="name" onChange={(e) => setQuantity(e.target.value)} />
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
    );
}
