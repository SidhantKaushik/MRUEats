const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUser, getUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

//Register
router.post('/', registerUser);
//Login
router.post('/login', loginUser);
//Update user
router.put('/UPDATE', updateUser, protect);
//Get user by id
router.route('/:id').get(getUser, protect);

module.exports = router;