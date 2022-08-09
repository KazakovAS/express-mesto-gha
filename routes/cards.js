const router = require('express').Router();
const { validateObjId, validateCardBody } = require('../middlewares/validations');
const {
  getCards,
  createCard,
  deleteCard,
  setLikeCard,
  deleteLikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validateCardBody, createCard);
router.delete('/:id', validateObjId, deleteCard);
router.put('/:id/likes', validateObjId, setLikeCard);
router.delete('/:id/likes', validateObjId, deleteLikeCard);

module.exports = router;
