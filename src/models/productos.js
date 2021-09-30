const axios = require('axios');

const searchProducts = async ({ value }) => (
    axios
        .get(`search?q=${value}`)
        .then((response) => {
            const { data } = response;
            return data;
        })
        .catch((error) => error)
);

module.exports = {
    searchProducts,
};
