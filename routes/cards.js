const router = require('express').Router();
const { validateId, validateCard } = require('../middlewares/validations');
const {
  getCards,
  createCard,
  deleteCard,
  setLikeCard,
  deleteLikeCard,
} = require('../controllers/cards');

router.put('/:id/likes', validateId, setLikeCard);
router.delete('/:id/likes', validateId, deleteLikeCard);
router.delete('/:id', validateId, deleteCard);
router.get('/', getCards);
router.post('/', validateCard, createCard);

module.exports = router;
