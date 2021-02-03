const comments = require('express').Router();
'use strict';

const Comment = require('../models/comment')


comments.post('/', (req, res) => {
    let comment = new Comment(req.body);

    comment.save(err => {
        if (err) throw err;
        console.log(comment._id)
        res.status(200).json(comment)
    })
})

comments.get('/:id', (req, res) => {
    Comment.findOne({
        _id: req.params.id
    }).then(comment => {
        res.status(200).json(comment);
    })
});

comments.get('/', (req, res) => {
    Comment.find({}).then(comments => {
        res.status(200).json(comments);
    })
});

comments.get('/user/:user_id', (req, res) => {
    Comment.find({
        user_id: req.params.user_id
    }).then(comments => {
        res.status(200).json(comments);
    })
});

comments.get('/trip/:trip_id', (req, res) => {
    Comment.find({
        trip_id: req.params.trip_id
    }).then(comments => {
        res.status(200).json(comments);
    })
});

comments.delete('/:id', (req, res) => {
    Comment.deleteOne({
        _id: id
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

module.exports = comments;