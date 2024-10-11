const EventParticipant = require('../models/EventParticipant');
const Event = require('../models/Event');
const User = require('../models/User');
const EventParticipant = require('../models/EventParticipant');

exports.registerParticipant = async (req, res) => {
    try {
        const { userId, eventId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const existingParticipant = await EventParticipant.findOne({ user: userId, event: eventId });
        if (existingParticipant) {
            return res.status(400).json({ message: 'User already registered for this event'});
        }

        const eventParticipant = new EventParticipant({ user: userId, event: eventId });
        await eventParticipant.save();

        res.status(201).json({ message: 'User registered successfully to the event', eventParticipant });
    } catch (erro) {
        res.status(500).json({ message: error.message });
    }
};

exports.getParticipantsByEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const participants = await EventParticipant.find({ event: eventId }).populate('user', 'username email');
        res.status(200).json(participants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.removeParticipant = async (req, res) => {
    try {
        const { userId, eventId } = req.body;

        const eventParticipant = await EventParticipant.findOne({ user: userId, event: eventId });
        if (!eventParticipant) {
            return res.status(404).json({ message: 'Participant not found for this event' });
        }

        await eventParticipant.remove();
        res.status(200).json({ message: 'Participant removed from the event'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEventsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const events = await EventParticipant.find({ user: userId }).populate('event', 'name location date');
        res.status(200).json(events);
    } catch(error) {
        res.status(500).json({ message: error.message }); 
    }
};

