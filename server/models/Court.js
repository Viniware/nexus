const mongoose = require('mongoose');

const courtSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        address: {
            type: String,
            required: true,
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        }
    },
    sportType: {
        type: String,
        required: true,
        enum: ['Basketball', 'Soccer', 'Tennis', 'Volleyball', 'Badminton'],
    },
    availability: {
        type: Boolean,
        default: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    amenities: {
        type: [String],
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 3,
    }
}, {
    timestamps: true,
});

const Court = mongoose.model('Court', courtSchema);

module.exports = Court;