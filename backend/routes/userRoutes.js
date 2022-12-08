const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUser, getAdmins, getUser, getUsers } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
//PUT to update profile
router.put('/UPDATE', updateUser, protect);
router.route('/:id').get(getUser, protect);
router.get('/', getUsers);

module.exports = router;