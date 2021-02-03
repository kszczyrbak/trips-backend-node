const users = require('express').Router();
'use strict';

const User = require('../models/user')


users.post('/', (req, res) => {
    let user = new User(req.body);

    user.save(err => {
        if (err) throw err;
        console.log(user._id)
        res.status(200).json(user)
    })
})

users.get('/', (req, res) => {
    User.find({}).then(function(users) {
        res.status(200).json(users);
    })
});

users.get('/:id', (req, res) => {
    User.findOne({
        _id: req.params.id
    }).then(user => {
        res.status(200).json(user);
    })
});


users.get('/email/:email', (req, res) => {
    User.findOne({
        email: req.params.email
    }).then(user => {
        res.status(200).json(user);
    })
});

users.get('/role/:email', (req, res) => {
    User.findOne({
        email: req.params.email
    }).then(user => {
        res.status(200).json(user.role);
    })
});

users.put('/:id', (req, res) => {
    let patchBody = req.body;

    User.updateOne({
        _id: req.params.id
    }, patchBody).then(user => {
        res.status(200).json(user);
    })
});

users.delete('/:id', (req, res) => {
    User.deleteOne({
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

module.exports = users;