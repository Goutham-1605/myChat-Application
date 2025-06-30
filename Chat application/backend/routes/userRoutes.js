const express = require('express');
const router = express.Router();
const { registerUser, loginUser, allUsers } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/registerUser', registerUser);
router.post('/loginUser', loginUser);
router.get('/', protect, allUsers);

module.exports = router;