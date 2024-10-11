const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
    },
    date: { 
        type: Date, 
        required: true
     },
    court: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Court',
        required: true,
    },
    partipants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EventParticipant'
    }],
    material: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;