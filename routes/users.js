const router = require('express').Router();
const { getUsers, getCurrentUser, createUser } = require('../controllers/users');

router.get('/users', getUsers);
router.post('/users', createUser);
router.get('/users/:userId', getCurrentUser);

module.exports = router;
