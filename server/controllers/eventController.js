const Event = require('../models/Event');
const Court = require('../models/Court');
const User = require('../models/User');
const EventParticipant = require('../models/EventParticipant');

exports.createEvent = async (req, res) => {
    try {
        const { name, time, location, courtId, userId } = req.body;

        const court = await Court.findById(courtId);
        const user = await User.findById(userId);

        if (!court || !user) {
            return res.status(404).json({ message: 'Court or User not found' });
        }

        const event = new Event({ name, time, location, court: courtId, creator: userId });
        await event.save();

        const eventParticipant = new EventParticipant({ user: userId, event: event._id });
        await eventParticipant.save();

        res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('court').populate('creator', 'username');
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('court').populate('creator', 'username');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEventsByCourt = async (req, res) => {
    try {
        const { courtId } = req.params;
        const events = await Event.find({ court: courtId }).populate('creator', 'username');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const { name, time, location, description, courtId, userId } = req.body;

        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        event.name = name || event.name;
        event.time = time || event.time;
        event.location = location || event.location;
        event.description = description || event.description;
        event.court = courtId || event.court;
        event.creator = userId || event.creator;

        await event.save();

        res.status(200).json({ message: 'Event uptimed successfully', event });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};