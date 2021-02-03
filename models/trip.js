mongoose = require('mongoose')

const Trip = mongoose.model('Trip', {
    name: String,
    country: String,
    rating: Number,
    startDate: Date,
    endDate: Date,
    description: String,
    price: Number,
    seatsLeft: Number,
    maxSeats: Number,
    photos: [String]
});

module.exports = Trip