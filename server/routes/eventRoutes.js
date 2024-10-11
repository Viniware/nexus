const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController.js');

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.post('/register', eventController.createEvent);
router.put('/:id/update', eventController.updateEvent);
router.delete('/:id/delete', eventController.deleteEvent);

module.exports = router;
