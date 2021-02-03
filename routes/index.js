const routes = require('express').Router();
const comments = require('./comments');
const orders = require('./orders');
const trips = require('./trips');
const users = require('./users');

routes.use('/users', users);
routes.use('/trips', trips);
routes.use('/orders', orders);
routes.use('/comments', comments);

routes.get('/', (req, res) => {
    res.status(200).json({
        message: 'Connected!'
    });
});

module.exports = routes;