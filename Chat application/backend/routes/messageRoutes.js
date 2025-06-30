const express = require('express');
const { getAllMessages, createMessage } = require('../controllers/messageController');

const router = express.Router();

router.get('/', getAllMessages);
router.post('/', createMessage);

module.exports = router;