const translate = require('translation-google');
const PlRuWord = require('../models/plRuWordModel');
const axios = require('axios');
const getWordsByDict = require('./utils/getWordsByDict');
const deleteWordById = require('./utils/deleteWordById');

const getWords = async (req, res) => await getWordsByDict(req, res, PlRuWord, 'pl', 'ru');
const deleteWord = async (req, res) => await deleteWordById(req, res, PlRuWord);

const createWord = (req, res) => {
    let body = req.body;
    if (body.wordType === 'word') body.wordText = body.wordText.charAt(0).toLowerCase() + body.wordText.slice(1);
    if (!body) {
        return res.status(400).json({
            error: 'You must provide a word'
        });
    }
    translate(body.wordText, { from: 'pl', to: body.translationLang })
        .then(translationRes => {
            if (translationRes.from.language.iso !== 'pl') {
                return res.status(400).json({
                    message: 'Translation error. Word not added'
                });
            }

            const data = {
                word: {
                    text: body.wordText,
                    lang: 'pl'
                },
                translation: {
                    text: translationRes.text.charAt(0).toLowerCase() + translationRes.text.slice(1),
                    lang: body.translationLang
                },
                wordType: body.wordType
            };

            const word = new PlRuWord(data);

            if (!word) {
                return res.status(400).json({
                    message: 'Schema error'
                });
            }

            word.save()
                .then(() => {
                    return res.status(201).json({
                        message: 'Word added',
                        data: word
                    });
                })
                .catch(err => {
                    return res.status(400).json(err);
                });
        })
        .catch(translationError => {
            return res.status(translationError.code ?? 500).json({
                message: translationError.message ?? 'Translation error. Word not added',
                ...translationError
            });
        });

    // PlRuWord.findOne({ en: body.wordText }, (err, word) => {
    //     if (word) {
    //         return res.status(400).json({ message: 'Word already exists', data: word });
    //     } else {
    //         translateAndSave();
    //     }
    // }).catch(err =>
    //     res.status(500).json({
    //         err,
    //         message: 'Some error'
    //     })
    // );
};

const updateWord = async (req, res) => {
    const body = req.body;
    const word = new PlRuWord(req.body);
    if (!body) {
        return res.status(400).json({
            message: 'You must provide a body to update'
        });
    }

    PlRuWord.findOne({ _id: req.params.id })
        .exec()
        .then(word => {
            if (!word) {
                return res.status(404).json({ message: `Word not found`, code: 404 });
            }
            word.translation.text = body.translationText;
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

module.exports = {
    createWord,
    updateWord,
    deleteWord,
    getWords
};
