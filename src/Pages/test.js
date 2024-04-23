import React, { useState } from 'react';
import axios from 'axios';

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

    axios.post(`https://api.imgbb.com/1/upload?expiration=600&key=${apiKey}`, imageFormData)
      .then((response) => {
        setImage(response.data.data.display_url);
        console.log(response.data.data.display_url);
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };

  return (
    <div>
        <h1>Upload Image to Server</h1>
        <input type="file" onChange={handleImageChange} accept="image/*" />
        <button onClick={handleSend}>Upload</button>
        <img src={image} alt="Preview" /> 
    </div>
  );
};

export default ImageUploader;
