import React from "react";
import { useEffect, useState } from "react";
import { Box, Typography,  Chip, Paper, Stack, Dialog, Grid, DialogContent, Input, InputAdornment, Select, Skeleton, FormControl, MenuItem, Button, Avatar } from "@mui/material";
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
    backgroundColor: 'rgb(50, 50, 50, 0.2)',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'white',
}))

const BackgroundBox = styled(Box)(({ theme }) => ({
    backgroundColor: 'rgb(50,71,101)',
    padding: theme.spacing(1),
    borderRadius: '5px',
}))

export default function Cards() {
    const [cardData, setCardData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const userId = useSelector((state) => state.auth.userId);
    const wallet = useSelector((state) => state.auth.wallet);
    const [profit, setProfit] = useState(0);
    const [open, setOpen] = useState(false);
    const [depositAmount, setDepositAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [selectedDepositCard, setSelectedDepositCard] = useState('None');
    const [selectedWithdrawCard, setSelectedWithdrawCard] = useState('None');
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const handleDeposit = () => {
        if (depositAmount <= 4) {
            enqueueSnackbar("Minimum deposit amount is €5", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
            return;
        }
        if (selectedDepositCard === 'None') {
            enqueueSnackbar("Please select a card to deposit from", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
            return;
        }
        if (depositAmount > 1000) {
            enqueueSnackbar("Maximum deposit amount is €1000", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
            return;
        }
        axios.put(apiUrl+`User/UpdateWalletByUserId?UserId=` + userId, { creditCard: selectedDepositCard, wallet: depositAmount })
        .then(() => {
            enqueueSnackbar("Deposit Successful", { variant: 'success', autoHideDuration: 3000, TransitionComponent: Slide, });
            fetchWallet();
        })
        .catch((error) => {
            enqueueSnackbar("Something went wrong", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
        })
    };

    const handleWithdraw = () => {
        if (selectedWithdrawCard === 'None') {
            enqueueSnackbar("Please select a card to withdraw to", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
            return;
        }
        if (withdrawAmount > wallet) {
            enqueueSnackbar("Not enough funds in wallet", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
            return;
        }
        axios.put(apiUrl+`User/UpdateWalletByUserId?UserId=` + userId, { creditCard: selectedWithdrawCard, wallet: -Math.abs(withdrawAmount) })
        .then(() => {
            enqueueSnackbar("Deposit Successful", { variant: 'success', autoHideDuration: 3000, TransitionComponent: Slide, });
            fetchWallet();
        })
        .catch((error) => {
            enqueueSnackbar("Something went wrong", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
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
        fetchWallet();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        await axios.get(apiUrl+`UserCard/GetAllUserCardsByUserId?UserId=` + userId)
        .then((response) => {
            setCardData(response.data);
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        })
        .catch((error) => {
            enqueueSnackbar("Something went wrong", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
        })
    }

    const fetchWallet = async () => {
        await axios.get(apiUrl+`User/GetWalletByUserId?UserId=` + userId)
        .then((response) => {
            dispatch(updateWallet(response.data.wallet));
            setProfit(response.data.profit);
        })
        .catch((error) => {
            enqueueSnackbar("Failed to fetch wallet", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
        })
    }

    const handleDelete = async (cardId) => {
        axios.delete(apiUrl+`UserCard/DeleteByCreditCardNum?CreditCardNum=` + cardId)
        .then(() => {
            enqueueSnackbar("Card Deleted", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
            fetchData();
        })
        .catch((error) => {
            enqueueSnackbar("Failed to delete card", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
        })
    }

    const handleDepositChange = (event) => {
        const formattedAmount = event.target.value.replace(/[^0-9]/g, '');
        setDepositAmount(formattedAmount);
    }

    const handleWithdrawChange = (event) => {
        const formattedAmount = event.target.value.replace(/[^0-9]/g, '');
        setWithdrawAmount(formattedAmount);
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
                <TilePaper sx={{ textAlign: 'left' }}>
                        <Typography variant="h5">Balance</Typography>
                </TilePaper>
                <TilePaper sx={{ width: '98%' }}>
                    <Box sx={{ padding: '15px', justifyContent: 'center', display: 'flex', color: 'white' }}>
                        <Grid container spacing={4} sx={{alignItems: 'center', justifyContent: 'center' }}>
                            <Grid item xs={12} sm={6} md={12} lg={6}>
                                <BackgroundBox sx={{ justifyItems: 'center', overflow: 'hidden' }}>
                                    <Typography variant="h2">{formatCurrency(wallet)}</Typography>
                                    <Stack direction={'column'} spacing={0} sx={{ justifyItems: 'start' }}>
                                        <Typography variant="subtitle2">Profit:</Typography>
                                        <Typography variant="h6" sx={{ color: profit > 0 ? 'limegreen' : 'firebrick' }}>{formatCurrency(profit)}</Typography>
                                    </Stack>
                                </BackgroundBox>
                            </Grid>
                            <Grid item xs={12} sm={6} md={12} lg={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Stack direction={'row'} spacing={3}>
                                    <Stack direction={'column'} spacing={3} >
                                        <Input value={depositAmount} onChange={handleDepositChange} placeholder="Deposit Amount" startAdornment={<InputAdornment position="start"><Typography variant="caption1" sx={{ color: 'white' }}>€</Typography></InputAdornment>} sx={{ color: 'white' }} inputProps={{ maxLength: 4 }}/>
                                        <FormControl>
                                            <Select value={selectedDepositCard} variant="standard" onChange={(e) => setSelectedDepositCard(e.target.value)} sx={{ color: 'white' }} >
                                                <MenuItem sx={{ color: 'black' }} value={'None'}>Select a card</MenuItem>
                                                {cardData.map((card) => (
                                                    <MenuItem sx={{ color: 'black' }} key={card.creditcardNum.toString()} value={card.creditcardNum}>{card.cardName}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <Button variant="contained" onClick={() => handleDeposit()}>Deposit</Button>
                                    </Stack>
                                    <Stack direction={'column'} spacing={3}>
                                    <Input value={withdrawAmount} onChange={handleWithdrawChange} placeholder="Withdraw Amount" startAdornment={<InputAdornment position="start" ><Typography variant="caption1" sx={{ color: 'white' }}>€</Typography></InputAdornment>} sx={{ color: 'white' }} inputProps={{ maxLength: 4 }}/>
                                        <FormControl>
                                            <Select value={selectedWithdrawCard} variant="standard" onChange={(e) => setSelectedWithdrawCard(e.target.value)} sx={{ color: 'white' }}>
                                                <MenuItem sx={{ color: 'black' }} value={'None'}>Select a card</MenuItem>
                                                {cardData.map((card) => (
                                                    <MenuItem sx={{ color: 'black' }} key={card.creditcardNum.toString()} value={card.creditcardNum}>{card.cardName}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <Button variant="contained" onClick={() => handleWithdraw()}>Withdraw</Button>
                                    </Stack>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </TilePaper>
                <TilePaper>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography variant="h5">Manage your cards</Typography>
                        <Chip label="Add" icon={<AddIcon style={{ color: 'white' }} />} style={{ color: 'white' }} onClick={handleOpen} />
                    </Stack>
                </TilePaper>
                {
                    isLoading ? (
                        <>
                            {Array.from({ length: 10 }).map((_, index) => (
                            <Skeleton key={index} variant="rounded" animation="wave" width={'98%'} height={250} />
                        ))}
                        </>
                    ) : (
                        cardData.length > 0 ? (
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
                        ) : (
                                <Box sx={{ textAlign: 'center', padding: '50px', paddingBottom: '100px' }}>
                                    <Typography variant="h2">No cards added yet.</Typography>
                                    <Typography variant="h5">Add a card to add funds to your Wallet!</Typography>
                                    <Avatar variant="square" src={process.env.PUBLIC_URL + "images/errorcatlight.png"} sx={{ width: 'auto', height: '300px' }} />
                                </Box>
                        )
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