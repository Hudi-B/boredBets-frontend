import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    anger: {
      main: '#F40B27',
      dark: '#B3001B',
    },
    apple: {
      main: '#5DBA40',
      dark: '#3D8E2D',
    },
    steelBlue: {
      main: '#5C76B7',
      dark: '#3E4E7F',
    },
    violet: {
      main: '#BC00A3',
      dark: '#8A007A',
    },
  },
});

const ImageUploader = () => {
  const [imageFormData, setImageFormData] = useState(null);
  const [image, setImage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setImageFormData(formData);
  };

  const handleSend = () => {
    if (!imageFormData) {
      return;
    }
    const apiKey = '79e36beafc907dce47452c2429ca5592';

    axios.post(`https://api.imgbb.com/1/upload?&key=${apiKey}`, imageFormData)
      .then((response) => {
        setImage(response.data.data.display_url);
        console.log(response.data.data.display_url);
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
    <div>
        <h1>Upload Image to Server</h1>
        <input type="file" onChange={handleImageChange} accept="image/*" />
        <button onClick={handleSend}>Upload</button>
        <img src={image} alt="Preview" /> 
        <Button variant="contained" color='steelBlue' sx={{backgroundColor: 'white'}} >GeciBogyó</Button>
    </div>
    </ThemeProvider>
  );
};

export default ImageUploader;
