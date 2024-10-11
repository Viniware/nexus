const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3060;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const eventRoutes = require('./routes/eventRoutes');
const courtRoutes = require('./routes/courtRoutes');
const userRoutes = require('./routes/userRoutes');
const eventParticipantRoutes = require('./routes/eventParticipantRoutes');

app.use('/api/events', eventRoutes);
app.use('/api/courts', courtRoutes);
app.use('/api/users', userRoutes);
app.use('/api/eventParticipants', eventParticipantRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

