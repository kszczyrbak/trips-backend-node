const Trip = require('../models/trip')

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

module.exports = {
    updateSeatsLeft: updateSeatsLeft
}