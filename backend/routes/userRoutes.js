const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUser, getAdmins, getUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
//PUT to update profile
//router.put('/update', updateUser);
router.route('/:id').get(getUser).put( updateUser);
//router.get('/me', getMe);
//router.get('/', getUsers);
router.get('/admins', protect, getAdmins);
router.put('/UPDATE', updateUser);
//router.get('/:id', getUserById);


module.exports = router;