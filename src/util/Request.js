import axios from 'axios';

axios.defaults.withCredentials = true;

const axiosDef = axios.create({
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        // 'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
    },
    withCredentials: true,
})

export default axiosDef;