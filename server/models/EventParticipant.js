const mongoose = require('mongoose');

const eventParticipantSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    event: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Event', 
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Pending',
    },
}, {
    timestamps: true,
});

const EventParticipant = mongoose.model('EventParticipant', eventParticipantSchema);
module.exports = EventParticipant;
