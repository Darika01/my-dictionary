const express = require('express');
const DictionaryController = require('../controllers/DictionaryController');
const authJwt = require('../middleware/authJwt');

const router = express.Router();

router.get('/dictionaries', authJwt, DictionaryController.getAll);
router.post('/dictionary', authJwt, DictionaryController.create);
router.get('/dictionaries/:dictName/words', authJwt, DictionaryController.getAllWords);

module.exports = router;
