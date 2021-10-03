const axios = require('axios');

const searchProducts = async ({ query }) => (
    axios
        .get(`search?q=${query}&limit=4`)
        .then((response) => {
            const { data } = response;
            return data;
        })
        .catch((error) => error)
);

module.exports = {
    searchProducts,
};
