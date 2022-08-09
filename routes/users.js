const router = require('express').Router();
const { validateObjId, validateAvatar, validateProfile } = require('../middlewares/validations');
const {
  getUser,
  getUsers,
  getCurrentUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.patch('/me/avatar', validateAvatar, updateUserAvatar);
router.get('/me', getCurrentUser);
router.patch('/me', validateProfile, updateUserInfo);
router.get('/:id', validateObjId, getUser);
router.get('/', getUsers);

module.exports = router;
