const Court = require('../models/Court');

exports.createCourt = async (req, res) => {
    try {
        const { 
            name,
            location,
            sportType,
            capacity,
            availability = true,
            amenities,
            rating = 3
        } = req.body;

        if (!name || !location || !sportType || capacity === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const court = new Court({
            name,
            location,
            sportType,
            capacity,
            availability,
            amenities,
            rating
        });

        await court.save();

        res.status(201).json({ message: 'Court created successfully', court });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCourtById = async (req, res) => {
    try {
        const court = await Court.findById(req.params.id);
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
        const courts = await Court.find();
        res.status(200).json(courts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCourt = async (req, res) => {
    try {
        const { name, location, description } = req.body;

        const court = await Court.findById(req.params.id);
        if (!court) {
            return res.status(404).json({ message: 'Court not found' });
        }

        court.name = name || court.name;
        court.location = location || court.location;
        court.description = description || court.description;

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

