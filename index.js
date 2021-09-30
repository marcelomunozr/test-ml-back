require('./src/middleware/axios-middleware');
const express = require('express');
const coors = require('cors');
const routes = require('./src/routes');

const app = express();
app.use(coors()).use(express.json());
routes(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('server at port', PORT);
});

module.exports = app;
