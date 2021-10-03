const router = require('express').Router();
const Productos = require('../controllers/productos');

router.get('/items:query', Productos.searchProducts);

module.exports = router;
