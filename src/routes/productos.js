const router = require('express').Router();
const Productos = require('../controllers/productos');

router.get('/items/:value', Productos.searchProducts);

module.exports = router;
