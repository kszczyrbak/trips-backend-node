const { model } = require('mongoose')

mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: String,
    email: String,
    role: {
        type: String,
        enum: ['USER', 'ADMIN']
    }
})

module.exports = User