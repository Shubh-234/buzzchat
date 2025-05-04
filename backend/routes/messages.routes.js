const express = require('express');
const {sendMessage} = require('../controllers/message.controllers')

const router = express.Router();

router.post('/send/:id',sendMessage);

module.exports = router;
