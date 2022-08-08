const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  setLikeCard,
  deleteLikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().dataUri(),
  }),
}), createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', setLikeCard);
router.delete('/:cardId/likes', deleteLikeCard);

module.exports = router;
