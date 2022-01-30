import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;

export const axiosAuthBearer = axios.create({
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        "Authorization": `Bearer ${Cookies.get('secretTk')}`,
    },
    withCredentials: true,
})

const axiosDef = axios.create({
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        // 'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
    },
    withCredentials: true,
})

export default axiosDef;