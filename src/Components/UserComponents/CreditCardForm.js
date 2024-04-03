import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, InputAdornment, Input, Grid, Typography, Button, Stack, TextField } from '@mui/material';
import { apiUrl } from '../../boredLocal';
import { useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';

const CreditCardForm = ({ onClose, onSubmit }) => {

    const userId = useSelector((state) => state.auth.userId);
    const [cardNum, setCardNum] = useState('');
    const [name, setName] = useState('');
    const [exp, setExp] = useState('');
    const [cvc, setCvc] = useState('');
    const [holder, setHolder] = useState('');
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = (event) => {
        event.preventDefault();

        var expirationSplit = exp.split('/');
        var expirationYear = expirationSplit[1];
        var expirationMonth =  expirationSplit[0];

        if( !validateCardNumber(cardNum) || !validateCvc(cvc) || !validateHolder(holder) || !validateExp(expirationMonth, expirationYear) ) {

            if(!validateCardNumber(cardNum)) enqueueSnackbar("Invalid Card Number", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
            if(!validateCvc(cvc)) enqueueSnackbar("Invalid CVC", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
            if(!validateHolder(holder)) enqueueSnackbar("Invalid Holder", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
            if(!validateExp(expirationMonth, expirationYear)) enqueueSnackbar("Invalid Expiration Date", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });

            return;
        }

        var formData = {
            userId: userId,
            creditcardNum: cardNum,
            cvc: cvc,
            expMonth: expirationMonth,
            expYear: expirationYear,
            cardName: name,
            cardHoldername: holder,
        };
        axios
            .post(apiUrl + `UserCard/UserCardPost`, formData)
            .then((response) => {
                enqueueSnackbar("Card Added", { variant: 'success', autoHideDuration: 3000, TransitionComponent: Slide, });
                onClose();
                onSubmit();
            })
            .catch((error) => {
                console.log(error);
                console.log(formData);
            });
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    const validateCardNumber = (cardNumber) => {
        return cardNumber.length === 19;
    }

    const validateCvc = (cvc) => {
        return cvc.length === 3;
    }

    const validateHolder = (holder) => {
        return holder.trim().includes(' ');
    }

    const validateExp = (expM, expY) => {
        var currentYear = new Date().getFullYear() % 100;
        var currentMonth = new Date().getMonth() + 1;

        return (
            (expY > currentYear && expM > 0 && expM <= 12) || (expY === currentYear && expM >= currentMonth && expM <= 12)
        );
    }

    const handleNameChange = (event) => {
        const inputValue = event.target.value;
        const formattedValue = inputValue.replace(/[^a-zA-z\s]/g, '');
        setName(formattedValue);
    }

    const handleCardNumberChange = (event) => {
        const inputValue = event.target.value;
        const noLetter = inputValue.replace(/[^\d]/g, '');
        const formattedValue = noLetter.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
        setCardNum(formattedValue); 
    }

    const handleHolderChange = (event) => {
        const inputValue = event.target.value;
        const formattedValue = inputValue.toUpperCase().replace(/[^A-Z\s]/g, '');
        setHolder(formattedValue);
    }

    const handleExpChange = (event) => {
        const inputValue = event.target.value;
        const noLetter = inputValue.replace(/[^\d/]/g, '');
        const formattedValue = noLetter.replace(/\s+/g, '').replace(/(\d{2})(?=\d{1})/g, '$1/').trim();
        setExp(formattedValue);
    }

    const handleCvcChange = (event) => {
        const inputValue = event.target.value;
        const noLetter = inputValue.replace(/[^\d]/g, '');
        setCvc(noLetter);
    }

    return (
        <Box onKeyDown={handleKeyPress}>
            <Box>
                <ClearIcon style={{ color: 'white', position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} onClick={onClose} />
            </Box>
            <Box sx={{ padding: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'rgb(4, 112, 107)' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', color: 'white' }}>ADD A NEW CARD</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-end',
                        width: '350px',
                        height: '210px',
                        backgroundImage: 'radial-gradient(circle 897px at 9% 80.3%, rgba(55, 60, 245, 1) 0%, rgba(234, 161, 15, 0.9) 100.2%)',
                        borderRadius: '10px',
                        padding: '20px',
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        position: 'relative',
                        gap: '15px',
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            height: 'fit-content',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            padding: '18px',
                        }}
                    >
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent={'space-between'} sx={{ width: '100%' }}>
                            <Stack>
                                <Typography sx={{ color: 'white', fontSize: '12px', letterSpacing: '1.5px' }}>CARD NAME</Typography>
                                <Input
                                    disableUnderline
                                    fullWidth
                                    placeholder="My card"
                                    value={name}
                                    inputProps={{ maxLength: 25 }}
                                    onChange={(event) => handleNameChange(event)}
                                    sx={{ color: 'white', fontSize: '17px', letterSpacing: '1.5px', caretColor: 'red' }}
                                />
                            </Stack>
                            <CreditCardIcon style={{ height: '40px', width: 'auto', color: 'white' }} />
                        </Stack>
                    </Box>
                    <Grid container spacing={2} alignItems="center" className="number-container">
                        <Grid item xs={12}>
                            <Typography sx={{ color: 'white', fontSize: '10px', letterSpacing: '1.5px' }}>CARD NUMBER</Typography>
                            <Input
                                id='card-number-input'
                                disableUnderline
                                fullWidth
                                placeholder="XXXX XXXX XXXX XXXX"
                                value={cardNum}
                                inputProps={{ maxLength: 19 }}
                                onChange={(event) => handleCardNumberChange(event)}
                                sx={{ color: 'white', fontSize: '13px', letterSpacing: '1.5px', caretColor: 'red' }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center" className="name-date-cvv-container">
                        <Grid item xs={7}>
                            <Typography sx={{ color: 'white', fontSize: '10px', letterSpacing: '1.5px' }}>CARD HOLDER</Typography>
                            <Input
                                id='card-holder-input'
                                disableUnderline
                                fullWidth
                                onChange={(event) => handleHolderChange(event)}
                                placeholder="JOHN DOE"
                                value={holder}
                                inputProps={{ maxLength: 25 }}
                                sx={{ color: 'white', fontSize: '13px', letterSpacing: '1.5px' }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Typography sx={{ color: 'white', fontSize: '10px', letterSpacing: '1.5px' }}>EXP</Typography>
                            <Input
                                id='exp-date-input'
                                disableUnderline
                                fullWidth
                                placeholder="MM/YY"
                                value={exp}
                                onChange={(event) => handleExpChange(event)}
                                inputProps={{ maxLength: 5 }}
                                sx={{ color: 'white', fontSize: '13px', letterSpacing: '1.5px' }}
                            />  
                        </Grid>
                        <Grid item xs={2}>
                            <Typography sx={{ color: 'white', fontSize: '10px', letterSpacing: '1.5px' }}>CVC</Typography>
                            <Input
                                id='cvc-input'
                                disableUnderline
                                fullWidth
                                placeholder="CVC"
                                inputProps={{ maxLength: 3 }}
                                value={cvc}
                                onChange={(event) => handleCvcChange(event)}
                                type="password"
                                sx={{ color: 'white', fontSize: '13px', letterSpacing: '1.5px' }}
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Button variant="contained" sx={{ width: 'fit-content', marginTop: '20px' }} onClick={handleSubmit}>ADD CARD</Button>

            </Box>
        </Box>
    );
};

export default CreditCardForm;