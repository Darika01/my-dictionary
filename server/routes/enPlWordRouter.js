const express = require('express');

const EnPlWordController = require('../controllers/enPlWordController');

const router = express.Router();

router.post('/en-pl/word', EnPlWordController.createWord);
router.put('/en-pl/word/:id', EnPlWordController.updateWord);
router.delete('/en-pl/word/:id', EnPlWordController.deleteWord);
router.get('/en-pl/word/:id', EnPlWordController.getWordById);
router.get('/en-pl/word/details/:id', EnPlWordController.getWordDetailsById);
router.get('/en-pl/word/:lang/:text', EnPlWordController.getWordByText);
router.get('/en-pl/words', EnPlWordController.getWords);

module.exports = router;
