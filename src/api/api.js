import axios from 'axios';
import configure from './configuration';

const api = axios.create(configure);

export default api;