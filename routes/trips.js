const trips = require('express').Router();
'use strict';

const { upload } = require('./upload')

const { updateSeatsLeft } = require('./common')

const Trip = require('../models/trip')
const Comment = require('../models/comment')

trips.post('/:trip_id/upload', upload.single('image'), (req, res) => {
    Trip.findOneAndUpdate({
        _id: req.params.trip_id
    }, {
        $push: {
            photos: req.filename
        }
    }).then(trip => {
        console.log(trip.photos)
    })
    res.send({ file: req.filename });
})

trips.post('/', (req, res) => {
    let trip = new Trip(req.body);

    trip.save(err => {
        if (err) throw err;
        res.status(200).json(trip)
    })
})

trips.put('/:trip_id/comments', (req, res) => {
    let patchBody = req.body
    patchBody.trip_id = req.params.trip_id

    Comment.findOneAndUpdate({
        user_id: patchBody.user_id,
        trip_id: patchBody.trip_id
    }, patchBody, {
        upsert: true
    }).then(comment => {
        res.status(200).json(comment)
        updateTripRating(patchBody.trip_id)
    })
})

function updateTripRating(_trip_id) {
    Comment.find({
        trip_id: _trip_id
    }, (err, comments) => {
        if (err) throw err;
        console.log(comments)
        let newRating = comments.map(comment => comment.rating).reduce((a, b) => a + b, 0) / comments.length
        Trip.findOneAndUpdate({
            _id: _trip_id
        }, {
            rating: newRating
        }, {
            new: true
        }).then(trip => {
            console.log(trip)
        })
    })
}

trips.get('/:trip_id/comments', (req, res) => {
    Comment.find({
        trip_id: req.params.trip_id
    }).where('text').ne("").then(comments => {
        res.status(200).json(comments);
    })
})

trips.get('/', (req, res) => {
    Trip.find({}).then(trips => {
        res.status(200).json(trips);
    })
});

trips.get('/:id', (req, res) => {
    Trip.findOne({
        _id: req.params.id
    }).then(trip => {
        res.status(200).json(trip);
    })
});

trips.put('/:id', (req, res) => {
    let patchBody = req.body;

    Trip.findOneAndUpdate({
        _id: req.params.id
    }, patchBody).then(trip => {
        res.status(200).json(trip);
        console.log(trip);
        updateSeatsLeft(trip)
    })
});

trips.delete('/:id', (req, res) => {
    Trip.deleteOne({
        _id: req.params.id
    }, err => {
        if (err) {
            res.status(400).json({
                "message": err
            })
        };
        res.status(200).json({
            "message": "OK"
        });
    })
});

trips.delete('/', (req, res) => {
    Trip.deleteMany({}, err => {
        if (err) throw err;
    })

    res.status(200).json({
        "message": "OK"
    });
});


module.exports = trips;