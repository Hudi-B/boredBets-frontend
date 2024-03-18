import React from 'react';
import { Box, InputAdornment, Input, Grid, Typography, Button } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const CreditCardForm = ({ onClose }) => {
    return (
        <Box sx={{ width: '500px', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'rgb(4, 112, 107)' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', color: 'white' }}>Add a new card</Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                    width: '300px',
                    height: '200px',
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
                            id="cardNumber"
                            sx={{ color: 'white', fontSize: '13px', letterSpacing: '1.5px', caretColor: 'red' }}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center" className="name-date-cvv-container">
                    <Grid item xs={7}>
                        <Typography sx={{ color: 'white', fontSize: '10px', letterSpacing: '1.5px' }}>CARD NUMBER</Typography>
                        <Input
                            disableUnderline
                            fullWidth
                            placeholder="JOHN DOE"
                            id="holderName"
                            sx={{ color: 'white', fontSize: '13px', letterSpacing: '1.5px' }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography sx={{ color: 'white', fontSize: '10px', letterSpacing: '1.5px' }}>EXP</Typography>
                        <Input
                            disableUnderline
                            fullWidth
                            placeholder="MM/YY"
                            id="expiry"
                            sx={{ color: 'white', fontSize: '13px', letterSpacing: '1.5px' }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Typography sx={{ color: 'white', fontSize: '10px', letterSpacing: '1.5px' }}>CVV</Typography>
                        <Input
                            disableUnderline
                            fullWidth
                            placeholder="CVC"
                            id="cvc"
                            type="password"
                            sx={{ color: 'white', fontSize: '13px', letterSpacing: '1.5px' }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default CreditCardForm;