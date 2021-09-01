const express = require('express');
const WordController = require('../controllers/WordController');

const router = express.Router();

router.get('/words', WordController.getAll);
router.post('/word/:dictName', WordController.create);
router.put('/word/:dictName/:id', WordController.update);
router.get('/word/:dictName/:id', WordController.getById);
router.delete('/word/:dictName/:id', WordController.deleteById);

module.exports = router;
