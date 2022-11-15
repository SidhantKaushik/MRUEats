const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, getUsers, getUserById, getAdmins } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/', getUsers);
/* router.get('/:id', getUserById); */
/* router.get('/:isAdmin', getAdmins) */

module.exports = router;