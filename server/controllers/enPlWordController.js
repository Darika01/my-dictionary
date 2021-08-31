const EnPlWord = require('../models/enPlWordModel');
const axios = require('axios');
const createNewWord = require('./enPlWord/createNewWord');
const getWordsByDict = require('./utils/getWordsByDict');
const deleteWordById = require('./utils/deleteWordById');

const getWords = async (req, res) => await getWordsByDict(req, res, EnPlWord, 'en', 'pl');
const createWord = async (req, res) => await createNewWord(req, res);
const deleteWord = async (req, res) => await deleteWordById(req, res, EnPlWord);

const updateWord = async (req, res) => {
    const body = req.body;
    const word = new EnPlWord(req.body);
    if (!body) {
        return res.status(400).json({
            message: 'You must provide a body to update'
        });
    }

    EnPlWord.findOne({ _id: req.params.id })
        .exec()
        .then(word => {
            if (!word) {
                return res.status(404).json({ message: `Word not found`, code: 404 });
            }
            word.translation.text = body.translationText;
            word.definition = body.definition;
            word.category = body.category;
            word.wordType = body.wordType;
            word.save()
                .then(() => {
                    return res.status(200).json({
                        message: 'Word updated!',
                        data: word
                    });
                })
                .catch(err => {
                    return res.status(500).json(err);
                });
        })
        .catch(err => {
            return res.status(500).json(err);
        });
};

const getWordById = async (req, res) => {
    await EnPlWord.findOne({ _id: req.params.id }, (err, word) => {
        if (err) {
            return res.status(400).json(err);
        }
        if (!word) {
            return res.status(404).json({ message: 'Word not found', code: 404 });
        }

        return res.status(200).json(word);
    }).catch(err => console.log(err));
};

const getWordDetailsById = async (req, res) => {
    await EnPlWord.findOne({ _id: req.params.id })
        .exec()
        .then(word => {
            if (!word) {
                return res.status(404).json({ message: 'Word not found', code: 404 });
            }

            const googleDictionaryApi = getGoogleTranslateApi(word.en);

            axios
                .get(googleDictionaryApi)
                .then(googleRes => {
                    return res.status(200).json({ ...googleRes.data[0], word });
                })
                .catch(error => {
                    return res.status(200).json({ word: word });
                });
        })
        .catch(err => {
            return res.status(500).json(err);
        });
};

const getWordByText = async (req, res) => {
    await EnPlWord.findOne({ [req.params.lang]: req.params.text }, (err, word) => {
        if (err) {
            return res.status(400).json(err);
        }
        if (!word) {
            return res.status(404).json({ message: `Word not found`, code: 404 });
        }

        const googleDictionaryApi = require('google-dictionary-api');

        googleDictionaryApi
            .search(req.params.text, 'en')
            .then(results => {
                console.log(results[0].meaning);
            })
            .catch(error => {
                console.log(error);
            });

        return res.status(200).json(word);
    }).catch(err => console.log(err));
};

module.exports = {
    createWord,
    updateWord,
    deleteWord,
    getWords,
    getWordById,
    getWordDetailsById,
    getWordByText
};
