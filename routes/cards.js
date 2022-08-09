const router = require('express').Router();
const { validateObjId, validateCardBody } = require('../middlewares/validations');
const {
  getCards,
  createCard,
  deleteCard,
  setLikeCard,
  deleteLikeCard,
} = require('../controllers/cards');

router.put('/:id/likes', validateObjId, setLikeCard);
router.delete('/:id/likes', validateObjId, deleteLikeCard);
router.delete('/:id', validateObjId, deleteCard);
router.get('/', getCards);
router.post('/', validateCardBody, createCard);

module.exports = router;
