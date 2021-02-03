mongoose = require('mongoose')

const Comment = mongoose.model('Comment', {
    trip_id: String,
    user_id: String,
    userName: String,
    date: Date,
    rating: Number,
    text: String
})

module.exports = Comment