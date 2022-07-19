const router = require('express').Router();
const { getUsers, getCurrentUser, createUser } = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:userId', getCurrentUser);

module.exports = router;
