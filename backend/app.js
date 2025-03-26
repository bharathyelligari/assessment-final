const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const cartRoutes = require('./routes/cart');
const usersRoutes = require('./routes/users');
const addressRoutes = require('./routes/address');

const app = express();

// middlewares
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

// routeMiddleware
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/address', addressRoutes);

module.exports = app;