const axios = require('axios');

const URL_API = 'https://api.mercadolibre.com/';

axios.defaults.params = {};

axios.interceptors.request.use((config) => {
    const endpoint = `${URL_API}${config.url}`;
    config.url = endpoint;
    return config;
}, (err) => Promise.reject(err));
