import React from 'react';
import { useState } from 'react';
import { Box, InputAdornment, Input, Grid, Typography, Button, Stack, TextField } from '@mui/material';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import ClearIcon from '@mui/icons-material/Clear';

const CreditCardForm = ({ onClose }) => {

    const [cardNum, setCardNum] = useState('');
    const [name, setName] = useState('');
    const [exp, setExp] = useState('');
    const [cvc, setCvc] = useState('');
    const [holder, setHolder] = useState('');

    const handleCardNumberChange = (event) => {
        const inputValue = event.target.value;
        const noLetter = inputValue.replace(/[^\d]/g, '');
        const formattedValue = noLetter.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
        setCardNum(formattedValue);
    }

    const handleHolderChange = (event) => {
        const inputValue = event.target.value;
        const noNumber = inputValue.replace(/[\d]/g, '');
        setHolder(noNumber);
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
        <Box>
            <Box>
                <ClearIcon style={{ color: 'white', position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} onClick={onClose} />
            </Box>
            <Box sx={{ padding: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'rgb(4, 112, 107)' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', color: 'white' }}>Add a new card</Typography>
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
                            justifyContent: 'flex-end',
                            height: 'fit-content',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            padding: '18px',
                        }}
                    >
                        <CreditCardIcon sx={{ height: '40px', width: 'auto' }} />
                    </Box>
                    <Grid container spacing={2} alignItems="center" className="number-container">
                        <Grid item xs={12}>
                            <Typography sx={{ color: 'white', fontSize: '10px', letterSpacing: '1.5px' }}>CARD NUMBER</Typography>
                            <Input
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
            </Box>
        </Box>
    );
};

export default CreditCardForm;