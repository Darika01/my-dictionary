const express = require('express');
const DictionaryController = require('../controllers/DictionaryController');

const router = express.Router();

router.get('/dictionaries', DictionaryController.getAll);
router.post('/dictionary', DictionaryController.create);
router.get('/dictionaries/:dictName/words', DictionaryController.getAllWords);

module.exports = router;
