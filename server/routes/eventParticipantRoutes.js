const express = require('express');
const router = express.Router();
const eventParticipantController = require('../controllers/eventParticipantController');
const { getEventById } = require('../controllers/eventController');

router.post('/register', eventParticipantController.joinEvent);
router.post('/remove', eventParticipantController.leaveEvent);
router.get('/:eventId/participants', eventParticipantController.getParticipantsByEvent);
router.get('/user/:userId/events', eventParticipantController.getEventByUser);

module.exports = router;