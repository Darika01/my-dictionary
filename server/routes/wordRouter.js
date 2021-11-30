const express = require('express');
const WordController = require('../controllers/WordController');
const authJwt = require('../middleware/authJwt');

const router = express.Router();

router.get('/words', authJwt, WordController.getAll);
router.post('/word/:dictName', authJwt, WordController.create);
router.put('/word/:dictName/:id', authJwt, WordController.update);
router.get('/word/:dictName/:id', authJwt, WordController.getById);
router.delete('/word/:dictName/:id', authJwt, WordController.deleteById);

module.exports = router;
