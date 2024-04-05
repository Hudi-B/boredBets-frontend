import React from "react";
import { useEffect, useState } from "react";
import { Box, Typography,  Chip, Paper, Stack, Dialog, DialogContent, Input, InputAdornment, Select, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import CardPaper from "./CardPaper";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { apiUrl } from '../../boredLocal';
import CreditCardForm from "./CreditCardForm";
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';

const TilePaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    boxShadow: theme.shadows[4],
    backgroundColor: 'rgb(4, 112, 107)',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'white',
}))

export default function Cards() {

    const [cardData, setCardData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const userId = useSelector((state) => state.auth.userId);
    const [currentWallet, setCurrentWallet] = useState(0);
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState(0);
    const { enqueueSnackbar } = useSnackbar();

    const handleDeposit = () => {
        axios.get(apiUrl+`User/GetWalletByUserId?UserId=` + userId)
        .then((response) => {
            setCurrentWallet(response.data.wallet);
            console.log(response.data.wallet);
        })
        .catch((error) => {
            console.log(error);
        })
        var newWallet = Number(currentWallet) + Number(amount);
        axios.put(apiUrl+`User/UpdateWalletByUserId?UserId=` + userId, { wallet: newWallet })
        .then(() => {
            
        })
        .catch((error) => {
            
        })
    }

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
                        <Typography variant="h5">Deposit:</Typography>
                        <Chip label="Finish" icon={<AddIcon style={{ color: 'white' }} />} style={{ color: 'white' }} onClick={() => {handleDeposit()}} />
                    </Stack>
                    <Box sx={{ padding: '35px', justifyContent: 'center', display: 'flex', color: 'white' }}>
                        <Stack direction={'row'} spacing={5}>
                            <Stack direction={'column'} spacing={1}>
                                <Typography variant="caption">Amount</Typography>
                                <Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" startAdornment={<InputAdornment position="start">$</InputAdornment>} />
                            </Stack>
                            <Stack direction={'column'} spacing={1}>
                                <Typography variant="caption">Card</Typography>
                                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Card" />
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