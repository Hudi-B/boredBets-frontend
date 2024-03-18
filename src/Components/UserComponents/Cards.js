import React from "react";
import { useEffect, useState } from "react";
import { Box, Typography, Grid, Chip, Paper, Stack, Card, Dialog, DialogContent, DialogActions, DialogTitle } from "@mui/material";
import { styled } from "@mui/material/styles";
import CardPaper from "./CardPaper";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { apiUrl } from '../../boredLocal';
import CreditCardForm from "./CreditCardForm";
import { useSelector } from 'react-redux';

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
    const userId = '77b9dfd8-2037-4cf4-822a-ccc235b40531';
    const [open, setOpen] = useState(false);

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
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleDelete = async (cardId) => {
        axios.delete(apiUrl+`UserCard/DeleteByCreditCardNum?CreditCardNum=` + cardId)
        .then((response) => {
            setCardData(response.data);
            setIsLoading(false);
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
            <Stack direction={'column'} spacing={2} sx={{ width: '100%', alignItems: 'center' }}>
                <TilePaper>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography variant="h5">Manage your cards:</Typography>
                        <Chip label="Add" icon={<AddIcon style={{ color: 'white' }} />} style={{ color: 'white' }} onClick={handleOpen} />
                    </Stack>
                </TilePaper>
                {
                    isLoading ? (
                        <Typography>Loading...</Typography>
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
            <Dialog open={open} onClose={handleClose}>
                <DialogContent sx={{ backgroundColor : 'rgb(4, 112, 107)'}}>
                    <CreditCardForm onClose={handleClose} />
                </DialogContent>
            </Dialog>
        </Box>
    );
}