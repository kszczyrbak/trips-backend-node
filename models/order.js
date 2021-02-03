mongoose = require('mongoose')

const Order = mongoose.model('Order', {
    trip_id: String,
    user_id: String,
    count: Number,
    totalPrice: Number,
    date: Date
})

module.exports = Order