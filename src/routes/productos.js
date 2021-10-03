const router = require('express').Router();
const Productos = require('../controllers/productos');

router.get('/items?:query', Productos.searchProducts);
router.get('/items/:id', Productos.searchProduct);
router.get('/items/:id/description', Productos.searchProductDescription);

module.exports = router;
