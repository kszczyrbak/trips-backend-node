const orders = require('express').Router();
'use strict';

const Order = require('../models/order')
const Trip = require('../models/trip')

orders.post('/', (req, res) => {
    let orders = req.body;

    Order.collection.insertMany(orders, (err, docs) => {
        if (err) {
            res.status(400).json({
                "message": err
            })
        } else {
            res.status(200).json(docs)
            for (order of orders) {
                checkoutUpdateSeatCount(order)
            }
        }
    });
})

orders.delete('/:order_id', (req, res) => {
    Order.findOneAndDelete({
        _id: req.params.order_id
    }, (err, order) => {
        if (err) {
            res.status(400).json({
                "message": err
            })
        };
        res.status(200).json({
            "message": "OK"
        });
        cancelUpdateSeatCount(order)
    })
})

orders.get('/user/:user_id',
    (req, res) => {
        Order.find({
            user_id: req.params.user_id
        }).then(orders => {
            res.status(200).json(orders);
        })
    }
)

orders.get('/',
    (req, res) => {
        Order.find({}).then(orders => {
            res.status(200).json(orders);
        })
    }
)

function checkoutUpdateSeatCount(order) {
    Trip.updateOne({
        _id: order.trip_id
    }, {
        "$inc": {
            seatsLeft: -order.count
        }
    }).then(
        function(trip) {
            console.log(trip)
        }
    )
    Trip.updateOne({
        _id: order.trip_id,
        seatsLeft: {
            "$lt": 0
        }
    }, {
        seatsLeft: 0
    }).then(
        function(trip) {
            console.log(trip)
        }
    )
}

function cancelUpdateSeatCount(order) {
    Trip.updateOne({
        _id: order.trip_id
    }, {
        "$inc": {
            seatsLeft: order.count
        }
    }).then(
        trip => {
            updateSeatsLeft(trip);
        }
    )
}

function updateSeatsLeft(trip) {
    if (trip.seatsLeft > trip.maxSeats) {
        trip.seatsLeft = trip.maxSeats;
        let id = trip._id
        delete trip._id;
        Trip.findByIdAndUpdate(id, trip).then(trip => {
            console.log(trip);
        });
    }
}

module.exports = orders;