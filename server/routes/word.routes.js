const express = require('express');

const WordController = require('../controllers/word.controller');

const router = express.Router();

router.post('/word', WordController.createWord);
router.put('/word/:id', WordController.updateWord);
router.delete('/word/:id', WordController.deleteWord);
router.get('/word/:id', WordController.getWordById);
router.get('/word/details/:id', WordController.getWordDetailsById);
router.get('/word/:lang/:text', WordController.getWordByText);
router.get('/words', WordController.getWords);

module.exports = router;
