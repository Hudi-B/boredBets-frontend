import React, { useState, useEffect } from 'react';
import { Button, Box,Dialog, Paper,CircularProgress, Avatar,IconButton, Typography } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { apiUrl, secondaryColor } from '../../boredLocal';
import { useDispatch } from 'react-redux';
import { updateProfilePicture } from '../../auth/authSlice';
import { useSelector } from 'react-redux';

import { enqueueSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';

import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function ChangeImage() {
    const [open, setOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageDeleteUrl, setImageDeleteUrl] = useState(null);
    const [fullscreen, setFullscreen] = useState(false);
    const [imageFormData, setImageFormData] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth);



    useEffect(() => {
        if (window.innerWidth < 500) {
            setFullscreen(true);
        }
        else {
            setFullscreen(false);
        }
    }, [window.innerWidth]);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setPreviewImage(null);
        setImageUrl(null);
        setImageDeleteUrl(null);
        setImageFormData(null);
    };
    
    console.log(open);
    
    const handleImageChange = (e) => {
        setIsLoading(true);
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
          }
        const formData = new FormData();
        formData.append('image', file);
        setImageFormData(formData);
        setIsLoading(false);
      };

      const handleSend = () => {
        if (!imageFormData) {
          return;
        }
        setIsLoading(true);
        const apiKey = '063f989f8cf5a570f7bb571df9db3708'; //api key to save the images to MY account
    
        axios.post(`https://api.imgbb.com/1/upload?&key=${apiKey}`, imageFormData)
          .then((response) => {
            setImageUrl(response.data.data.display_url);
            setImageDeleteUrl(response.data.data.delete_url);
            dispatch(updateProfilePicture(response.data.data.display_url));
            handleServerUpload(response.data.data.display_url,response.data.data.delete_url);
        })
          .catch((error) => {
            console.error('Error uploading image:', error);
            enqueueSnackbar("An error occured while uploading your profile picture. Please try again later", {
                variant: 'error',
                autoHideDuration: 3000,
                TransitionComponent: Slide,
            });
          })
      };
      const handleServerUpload = (display_url, delete_url) => {
          
        axios.put(apiUrl+'User/UpdateImageByUserId?UserId='+userData.userId, {
            imageLink: display_url,
            imageDeleteLink: delete_url
        })
        .then((response) => {
            enqueueSnackbar("Profile picture succesfully uploaded!", {
                variant: 'success',
                autoHideDuration: 3000,
                TransitionComponent: Slide,
            });
        }).catch((error) => {
            console.error('Error uploading image:', error);
            enqueueSnackbar("An error occured while uploading your profile picture to our server. Please try again later", {
                variant: 'error',
                autoHideDuration: 3000,
                TransitionComponent: Slide,
            })
        }).finally(() => {
            setIsLoading(false);
            handleClose();
        })
      }
      const handleClear = () => {
        setIsLoading(true);
        axios.put(apiUrl+'User/UpdateImageByUserId?UserId='+userData.userId, {
            imageLink: "",
            imageDeleteLink: ""
        })
        .then((response) => {
            dispatch(updateProfilePicture(""));
            enqueueSnackbar("Profile picture succesfully cleared!", {
                variant: 'success',
                autoHideDuration: 3000,
                TransitionComponent: Slide,
            });
        })
        .catch((error) => {
            console.error('Error uploading image:', error);
            enqueueSnackbar("An error occured while deleting your profile picture. Please try again later", {
                variant: 'error',
                autoHideDuration: 3000,
                TransitionComponent: Slide,
            });
          }).finally(() => {
            setIsLoading(false);
            handleClose();
          });
      };
      

    return (
        <>
        <IconButton size='small' onClick={() => handleOpen()} sx={{position: 'absolute', bottom: '0', right: '0', color: 'rgb(75,75,75)', backgroundColor: 'white', border:'0.5px solid rgb(75,75,75)', '&:hover': {backgroundColor: 'rgb(200,200,200)'}}}>
            <AddIcon sx={{fontSize: '20px'}} />
        </IconButton> 
            <Dialog
                open={open}
                className="preventSelect"
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullScreen={fullscreen}
            >
                {isLoading && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 9999,
                            color: 'white',
                            flexDirection: 'column',
                        }}
                    >
                        Bigger pictures take more time to upload, please wait...
                        <CircularProgress color='inherit' />
                    </Box>
                )}
                <Box 
                sx={{
                    backgroundColor: secondaryColor,
                    width: fullscreen? '100%' : '450px',
                    maxWidth: '100%',
                    height: fullscreen? '100%' : '600px',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding:'30px'}}>
                    {fullscreen &&
                        <Button onClick={handleClose}
                        sx={{
                            ripple: 'rgba(50, 50, 50, 0.5)',
                            position: 'absolute', 
                            top: 10, 
                            left: 10, 
                            borderRadius: '50%',
                            '&:hover': {
                                backgroundColor: 'rgba(50, 50, 50, 0.2)',
                              },
                              '&:active': {
                                backgroundColor: 'rgba(50, 50, 50, 0.5)',
                              },
                        }}>
                            <CloseIcon sx={{fontSize: '50px', color: 'rgb(50, 50, 50)'}}/>
                        </Button>
                    }
                    <Box sx={{ marginY:3, marginTop: fullscreen? '15vh' : 1.5, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Typography sx={{fontWeight: '600', width: '100%', textAlign: 'center', fontSize: 20}}>boredBets</Typography>
                       <Typography sx={{fontWeight: '600', width: '100%', textAlign: 'center', fontSize: 30, marginBottom: 2}}>Profile Picture</Typography>
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="contained-button-file" style={{overflow: 'hidden'}}>
                            <Box sx={{width: '300px', height: '300px', overflow: 'hidden', borderRadius: '50%', position: 'relative'}}>
                                <Avatar sx={{width: '100%', height: '100%'}} src={previewImage?previewImage:userData.imageUrl} />
                                {!previewImage && 
                                <Typography sx={{
                                    fontWeight: '600',
                                    textAlign: 'center',
                                    width: '100%',
                                    fontSize: 15,
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    paddingY: 1.5,
                                    transform: 'translate(-50%, -50%)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>Click here to change image</Typography>
                                }
                            </Box>
                        </label>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: 1}}>
                        <Paper elevation={5}   
                        onClick={handleSend}
                        sx={{
                            paddingY: 1,
                            paddingX:3,
                            color: 'white',
                            letterSpacing: 0.7,
                            borderRadius: 3,
                            backgroundColor: "rgba(200, 200, 200, 0.05)",
                            '&:hover': {
                                backgroundColor: 'rgba(50, 50, 50, 0.11)',
                                },
                                '&:active': {
                                    backgroundColor: 'rgba(50, 50, 50, 0.08)',
                                },
                            fontWeight: 'bold',
                        }}>
                        Change <EditIcon />
                        </Paper>
                        <Paper onClick={handleClear}
                        sx={{
                            paddingY: 1,
                            color: 'white',
                            letterSpacing: 0.7,
                            paddingX:2,
                            borderRadius: 3,
                            border: '2px solid white',
                            backgroundColor: "rgba(200, 200, 200, 0)",
                            '&:hover': {
                                backgroundColor: 'rgba(50, 50, 50, 0.11)',
                                },
                                '&:active': {
                                    backgroundColor: 'rgba(50, 50, 50, 0.08)',
                                },
                            fontWeight: 'bold',
                        }}>
                            Clear <DeleteForeverIcon />
                        </Paper>
                    </Box>
                </Box>
            </Dialog>
        </>
    );
}