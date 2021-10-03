/* eslint-disable camelcase */
const Productos = require('../models/productos');

const errorResponse = {
    status: 'error',
    message: 'Error de servicio, intentelo mas tarde',
    code: '500',
};

const getCategories = ({ filters }) => filters.lenght && filters[0].values[0].path_from_root;

const getItems = (results) => {
    const items = results.map((item) => {
        const {
            id,
            title,
            prices: { prices },
            available_quantity,
            thumbnail,
            condition,
            shipping: { free_shipping },
            address,
            attributes,
        } = item;
        const {
            currency_id,
            amount,
        } = prices[0];
        const finalItem = {
            id,
            title,
            price: {
                currency: currency_id,
                amount,
                decimals: available_quantity,
            },
            picture: thumbnail,
            condition,
            free_shipping,
            /** extras */
            address,
            attributes,
        };
        return finalItem;
    });
    /** return results; */
    return items;
};

const getItemResult = (response) => {
    const { results } = response;
    const categories = getCategories(response);
    const items = getItems(results);
    const objResults = {
        author: {
            name: 'Marcelo',
            lastname: 'Muñoz',
        },
        categories,
        items,
    };
    return objResults;
};

/**
 * obtiene productos según resultado búsqueda
 */
const searchProducts = async (req, res) => {
    res.set('Content-Type', 'application/json');
    try {
        const { query: { q } } = req;
        const response = await Productos.searchProducts(q);
        if (response) {
            const result = getItemResult(response);
            return res.status(200).send(result);
        }
    } catch (error) {
        return res.status(500).send(errorResponse);
    }
    return res.status(500).send(errorResponse);
};

/**
 * obtiene producto según ID
 */
const searchProduct = async (req, res) => {
    res.set('Content-Type', 'application/json');
    try {
        const response = await Productos.searchProduct(req.params);
        if (response) {
            return res.status(200).send(response);
        }
    } catch (error) {
        return res.status(500).send(errorResponse);
    }
    return res.status(500).send(errorResponse);
};

/**
 * obtiene descripción del producto según ID
 */
const searchProductDescription = async (req, res) => {
    res.set('Content-Type', 'application/json');
    try {
        const response = await Productos.searchProductDescription(req.params);
        if (response) {
            return res.status(200).send(response);
        }
    } catch (error) {
        return res.status(500).send(errorResponse);
    }
    return res.status(500).send(errorResponse);
};

module.exports = {
    searchProducts,
    searchProduct,
    searchProductDescription,
};
