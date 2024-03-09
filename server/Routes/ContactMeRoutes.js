const { contacteMeMessage } = require('../Controllers/ContactMeControllers');

const router = require('express').Router();


// route for sending message to me
router.post('/sendmessage', contacteMeMessage);

module.exports = router;