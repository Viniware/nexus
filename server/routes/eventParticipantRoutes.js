const express = require('express');
const router = express.Router();
const eventParticipantController = require('../controllers/eventParticipantController');

router.post('/register', eventParticipantController.registerParticipant);
router.post('/remove', eventParticipantController.removeParticipant);
router.get('/:eventId/participants', eventParticipantController.getParticipantsByEvent);
router.get('/user/:userId/events', eventParticipantController.getEventsByUser);

module.exports = router;
