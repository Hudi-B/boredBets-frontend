import React from "react";
import { useEffect, useState } from "react";
import { Box, Typography,  Chip, Paper, Stack, Dialog, DialogContent, Input, InputAdornment, Select, Skeleton, FormControl, MenuItem, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CardPaper from "./CardPaper";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { apiUrl } from '../../boredLocal';
import CreditCardForm from "./CreditCardForm";
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';
import { useDispatch } from 'react-redux';
import { updateWallet } from '../../auth/authSlice';

const TilePaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    boxShadow: theme.shadows[4],
    backgroundColor: 'rgb(4, 112, 107)',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'white',
}))

const BackgroundBox = styled(Box)(({ theme }) => ({
    backgroundColor: 'rgb(0, 93, 93)',
    padding: theme.spacing(3),
    borderRadius: '5px',
}))

export default function Cards() {
    const [cardData, setCardData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const userId = useSelector((state) => state.auth.userId);
    const wallet = useSelector((state) => state.auth.wallet);
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [selectedCard, setSelectedCard] = useState('None');
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const handleDeposit = () => {
        if (amount <= 4) {
            enqueueSnackbar("Minimum deposit amount is €5", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
            return;
        }
        if (selectedCard === 'None') {
            enqueueSnackbar("Please select a card", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
            return;
        }
        if (amount > 1000) {
            enqueueSnackbar("Maximum deposit amount is €1000", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
            return;
        }
        axios.put(apiUrl+`User/UpdateWalletByUserId?UserId=` + userId, { wallet: amount })
        .then(() => {
            enqueueSnackbar("Deposit Successful", { variant: 'success', autoHideDuration: 3000, TransitionComponent: Slide, });
            fetchWallet();
        })
        .catch((error) => {
            console.log(error);
        })
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'EUR' });
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        await axios.get(apiUrl+`UserCard/GetAllUserCardsByUserId?UserId=` + userId)
        .then((response) => {
            setCardData(response.data);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const fetchWallet = async () => {
        await axios.get(apiUrl+`User/GetWalletByUserId?UserId=` + userId)
        .then((response) => {
            dispatch(updateWallet(response.data.wallet));
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleDelete = async (cardId) => {
        axios.delete(apiUrl+`UserCard/DeleteByCreditCardNum?CreditCardNum=` + cardId)
        .then(() => {
            enqueueSnackbar("Card Deleted", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
            fetchData();
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleDepositChange = (event) => {
        const formattedAmount = event.target.value.replace(/[^0-9.]/g, '');
        setAmount(formattedAmount);
    }
    
    return (
        <Box sx={{ 
            width: '100%',
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '10px', 
            margin: '0px', 
            overflowY: ''}}
        >
            <Stack direction={'column'} spacing={1} sx={{ width: '100%', alignItems: 'center' }}>
                <TilePaper>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography variant="h5">Balance:</Typography>
                        <Chip label="Finish" icon={<AddIcon style={{ color: 'white' }} />} style={{ color: 'white' }} onClick={() => {handleDeposit()}} />
                    </Stack>
                </TilePaper>
                <TilePaper sx={{ width: '98%' }}>
                    <Box sx={{ padding: '35px', justifyContent: 'center', display: 'flex', color: 'white' }}>
                        <Stack direction={'row'} spacing={4} sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <BackgroundBox>
                                <Typography variant="h2">{formatCurrency(wallet)}</Typography>
                                <Typography variant="h6">profit placeholder</Typography>
                            </BackgroundBox>
                            <Stack direction={'column'} spacing={2}>
                                <Input value={amount} onChange={handleDepositChange} placeholder="Deposit Amount" startAdornment={<InputAdornment position="start" style={{ color: 'white' }}>€</InputAdornment>} sx={{ color: 'white' }}/>
                                <FormControl>
                                    <Select value={selectedCard} variant="standard" onChange={(e) => setSelectedCard(e.target.value)} sx={{ color: 'white' }}>
                                        <MenuItem value={'None'}>Select a card</MenuItem>
                                        {cardData.map((card) => (
                                            <MenuItem key={card.creditcardNum.toString()} value={card.creditcardNum}>{card.cardName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button variant="contained" onClick={() => handleDeposit()}>Deposit</Button>
                            </Stack>
                        </Stack>
                    </Box>
                </TilePaper>
                <TilePaper>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography variant="h5">Manage your cards:</Typography>
                        <Chip label="Add" icon={<AddIcon style={{ color: 'white' }} />} style={{ color: 'white' }} onClick={handleOpen} />
                    </Stack>
                </TilePaper>
                {
                    isLoading ? (
                        <>
                            <Skeleton variant="rounded" animation="wave" width={'98%'} height={250} />
                            <Skeleton variant="rounded" animation="wave" width={'98%'} height={250} />
                            <Skeleton variant="rounded" animation="wave" width={'98%'} height={250} />
                        </>
                    ) : (
                        cardData.map((card) => (
                            <CardPaper 
                                key={card.creditcardNum.toString()}
                                onDelete={() => handleDelete(card.creditcardNum)}
                                cardName={card.cardName} 
                                cardNumber={card.creditcardNum} 
                                expirationYear={card.expYear} 
                                expirationMonth={card.expMonth} 
                                holderName={card.cardHoldername} 
                                cvc={card.cvc} />
                        ))
                    ) 
                }
            </Stack>
            <Dialog open={open} onClose={handleClose} >
                <DialogContent sx={{ backgroundColor : 'rgb(4, 112, 107)'}}>
                    <CreditCardForm onClose={handleClose} onSubmit={() => {fetchData()}} />
                </DialogContent>
            </Dialog>
        </Box>
    );
}