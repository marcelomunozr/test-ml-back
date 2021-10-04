/* eslint-disable camelcase */
const Productos = require('../models/productos');

const errorResponse = {
    status: 'error',
    message: 'Error de servicio, intentelo mas tarde',
    code: '500',
};

const author = {
    name: 'Marcelo',
    lastname: 'Muñoz',
};

const getCategories = (algo) => {
    const { available_filters } = algo;
    if (available_filters !== 'undefined') {
        const valores = available_filters[0].values;
        return valores;
    }
    return [];
};

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

const getItemsResult = (response) => {
    const { results } = response;
    const categories = getCategories(response);
    const items = getItems(results);
    const objResults = {
        author,
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
            const result = getItemsResult(response);
            return res.status(200).send(result);
        }
    } catch (error) {
        return res.status(500).send(errorResponse);
    }
    return res.status(500).send(errorResponse);
};

const getSingleItem = (productInfo, productDesc) => {
    const {
        id,
        title,
        currency_id,
        price,
        secure_thumbnail,
        condition,
        shipping: { free_shipping },
        sold_quantity,
    } = productInfo;
    const { plain_text } = productDesc;
    const objItem = {
        author,
        item: {
            id,
            title,
            price: {
                currency: currency_id,
                amount: price,
                decimals: price,
            },
            picture: secure_thumbnail,
            condition,
            free_shipping,
            sold_quantity,
            description: plain_text,
        },
    };
    return objItem;
};

/**
 * obtiene producto según ID
 */
const searchProduct = async (req, res) => {
    res.set('Content-Type', 'application/json');
    try {
        const responseInfo = await Productos.searchProduct(req.params);
        const responseDescription = await Productos.searchProductDescription(req.params);
        if (responseInfo && responseDescription) {
            const singleItem = getSingleItem(responseInfo, responseDescription);
            return res.status(200).send(singleItem);
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
        console.log(req.params);
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
