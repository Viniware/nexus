const Court = require('../models/Court');
const Event = require('../models/Event');
const User = require('../models/User');

exports.createCourt = async (req, res) => {
    try {
        const { name, location, description, ownerId } = req.body;

        const owner = await User.findById(ownerId);
        if (!owner) {
            return res.status(404).json({ message: 'Owner not found' });
        }

        const court = new Court({ name, location, description, owner: ownerId });
        await court.save();

        res.status(201).json({ message: 'Court created successfully', court });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCourtById = async (req, res) => {
    try {
        const court = await Court.findById(req.params.id).populate('owner', 'username');
        if (!court) {
            return res.status(404).json({ message: 'Court not found' });
        }

        res.status(200).json(court);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getAllCourts = async (req, res) => {
    try {
        const courts = await Court.find().populate('owner', 'username');
        res.status(200).json(courts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCourt = async (req, res) => {
    try {
        const { name, location, description, ownerId } = req.body;

        const court = await Court.findById(req.params.id);
        if (!court) {
            return res.status(404).json({ message: 'Court not found' });
        }

        court.name = name || court.name;
        court.location = location || court.location;
        court.description = description || court.description;
        court.owner = ownerId || court.owner;

        await court.save();

        res.status(200).json({ message: 'Court updated successfully', court });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCourt = async (req, res) => {
    try {
        const court = await Court.findByIdAndDelete(req.params.id);
        if (!court) {
            return res.status(404).json({ message: 'Court not found' });
        }

        res.status(200).json({ message: 'Court deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

