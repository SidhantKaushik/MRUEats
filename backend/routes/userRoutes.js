const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUser, getAdmins, getUser, getUsers } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

//Register
router.post('/', registerUser);
//Login
router.post('/login', loginUser);
//Update user
router.put('/UPDATE', updateUser, protect);
//Get user by id
router.route('/:id').get(getUser, protect);
//Get all users
router.get('/', getUsers, protect);

module.exports = router;