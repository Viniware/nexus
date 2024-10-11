const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

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

app.use('/api/events', eventRoutes);
app.use('/api/courts', courtRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});


