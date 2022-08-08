const router = require('express').Router();
const { validateObjId, validateAvatar, validateProfile } = require('../middlewares/validations');
const {
  getUsers,
  getCurrentUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.patch('/me', validateProfile, updateUserInfo);
router.patch('/me/avatar', validateAvatar, updateUserAvatar);

module.exports = router;
