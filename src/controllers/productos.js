const Productos = require('../models/productos');

const errorResponse = {
    status: 'error',
    message: 'Error de servicio, intentelo mas tarde',
    code: '500',
};

/**
 * obtiene productos según resultado búsqueda
 */
const searchProducts = async (req, res) => {
    res.set('Content-Type', 'application/json');
    const response = await Productos.searchProducts(req.params);
    if (response) {
        const result = [];
        /**
         * TODO: modificar objeto para que se devuelva como lo solicita el test
         */
        Object.keys(response).forEach((value) => {
            result.push(response[value]);
        });
        return res.status(200).send(result);
    }
    return res.status(500).send(errorResponse);
};

module.exports = {
    searchProducts,
};
