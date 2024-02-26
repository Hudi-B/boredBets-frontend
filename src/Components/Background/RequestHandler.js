import axios from 'axios';
async function makeRequest(request) {
    try {
        const response = await axios({
            method: request.method,
            url: request.url,
            data: request.data || {}, 
            headers: request.headers || {}
        });
        return response; 
    } catch (error) {
        console.error('Error making request', error);
    }
}
export default makeRequest;