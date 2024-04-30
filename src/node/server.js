const axios = require('axios');

const endpointUrl = 'https://boredbetsapi.azurewebsites.net/api/HeadsUp/HeadsUp';

const makeApiCall = async () => {
    try {
        const currentTime = new Date().toLocaleString();
        await axios.get(endpointUrl);
        console.log(`[${currentTime}] HeadsUp call successful`);
    } catch (error) {
        console.error('Error making API call:', error.message);
    }
};

const callApiPeriodically = () => {
    makeApiCall();
    setInterval(makeApiCall, 300000);
};

callApiPeriodically();