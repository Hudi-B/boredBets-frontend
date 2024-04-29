const axios = require('axios');

const endpointUrl = 'https://boredbetsapidev.azurewebsites.net/api/HeadsUp/HeadsUp';

const makeApiCall = async () => {
    try {
        await axios.get(endpointUrl);
        console.log('HeadsUp call successful');
    } catch (error) {
        console.error('Error making API call:', error.message);
    }
};

const callApiPeriodically = () => {
    makeApiCall();
    setInterval(makeApiCall, 300000);
};

callApiPeriodically();