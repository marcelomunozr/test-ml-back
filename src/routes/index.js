const path = '/api';
const indCallback = require('./productos');

module.exports = (app) => {
    app.use(path, indCallback);
    app.use('*', (req, res) => {
        res
            .status(404)
            .json({ err: `Path ${req.originalUrl} not found` });
    });
};
