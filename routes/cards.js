const router = require('express').Router();
const { getCards, createCard, deleteCard, setLikeCard, deleteLikeCard } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', setLikeCard);
router.delete('/:cardId/likes', deleteLikeCard);

module.exports = router;
