const router = require('express').Router();
const { validateObjId, validateCardBody } = require('../middlewares/validatons');
const {
  getCards,
  createCard,
  deleteCard,
  setLikeCard,
  deleteLikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validateCardBody, createCard);
router.delete('/:cardId', validateObjId, deleteCard);
router.put('/:cardId/likes', validateObjId, setLikeCard);
router.delete('/:cardId/likes', validateObjId, deleteLikeCard);

module.exports = router;
