const axios = require('axios');

const endpointUrl = 'https://boredbetsapidev.azurewebsites.net/headsUp';

const makeApiCall = async () => {
    try {
        const response = await axios.get(endpointUrl);
        console.log('API call successful:', response.data);
    } catch (error) {
        console.error('Error making API call:', error.message);
    }
};

const callApiPeriodically = () => {
    makeApiCall();
    setInterval(makeApiCall, 300000);
};

callApiPeriodically();