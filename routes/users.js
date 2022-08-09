const router = require('express').Router();
const {
  validateId,
  validateAvatar,
  validateUserInfo,
} = require('../middlewares/validations');
const {
  getUser,
  getUsers,
  getCurrentUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.patch('/me/avatar', validateAvatar, updateUserAvatar);
router.get('/me', getCurrentUser);
router.patch('/me', validateUserInfo, updateUserInfo);
router.get('/:id', validateId, getUser);
router.get('/', getUsers);

module.exports = router;
