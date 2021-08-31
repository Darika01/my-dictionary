const express = require('express');

const PlRuWordController = require('../controllers/plRuWordController');

const router = express.Router();

router.post('/pl-ru/word', PlRuWordController.createWord);
router.put('/pl-ru/word/:id', PlRuWordController.updateWord);
router.delete('/pl-ru/word/:id', PlRuWordController.deleteWord);
// router.get('/words/:langFrom/:langTo', getWordsByDict);
router.get('/pl-ru/words', PlRuWordController.getWords);

module.exports = router;
