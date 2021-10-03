const axios = require('axios');

const searchProducts = async (query) => (
    axios
        .get(`sites/MLA/search?q=${encodeURIComponent(query)}&&limit=4`)
        .then((response) => {
            const { data } = response;
            return data;
        })
        .catch((error) => error)
);

const searchProduct = async ({ id }) => (
    axios
        .get(`items/${id}`)
        .then((response) => {
            const { data } = response;
            return data;
        })
        .catch((error) => error)
);

const searchProductDescription = async ({ id }) => (
    axios
        .get(`items/${id}/description`)
        .then((response) => {
            const { data } = response;
            return data;
        })
        .catch((error) => error)
);

module.exports = {
    searchProducts,
    searchProduct,
    searchProductDescription,
};
