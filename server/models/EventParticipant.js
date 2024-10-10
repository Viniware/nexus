const mongoose = require('mongoose');

const EventParticipantSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    joinedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('EventParticipant', EventParticipantSchema);
