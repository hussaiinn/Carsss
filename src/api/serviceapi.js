import axios from 'axios';

const API_URL = 'http://localhost:3100/api/data';

const getData = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};

export default getData;
