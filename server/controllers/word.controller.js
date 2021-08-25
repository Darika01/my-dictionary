const Word = require('../models/word.model');
const translate = require('translation-google');
const wd = require('word-definition');

const getTranslation = (text, langTo) =>
    translate(text, { to: langTo })
        .then(res => {
            if (res.text === text) {
                return {
                    success: false
                };
            }
            return {
                success: true,
                res: {
                    langFrom: 'en',
                    // langFrom: res.from.language.iso,
                    translatedText: res.text
                }
            };
        })
        .catch(err => {
            return {
                success: false,
                err: err
            };
        });

const createWord = (req, res) => {
    let body = req.body;
    if (body.wordType === 'word') body.text = body.text.charAt(0).toLowerCase() + body.text.slice(1);
    if (!body) {
        return res.status(400).json({
            error: 'You must provide a word'
        });
    }

    // Word.findOne({ en: body.text }, (err, word) => {
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

    getTranslation(body.text, body.langTo).then(translationRes => {
        if (translationRes.success) {
            const { langFrom, translatedText } = translationRes.res;
            wd.getDef(body.text, langFrom, { exact: false }, definitionRes => {
                const data = {
                    [langFrom]: body.text,
                    [body.langTo]: translatedText,
                    wordType: body.wordType,
                    definition: body.definition ? body.definition : definitionRes?.definition ?? null,
                    category: definitionRes?.category ?? null
                };

                console.log('data to save', data);
                const word = new Word(data);
                console.log('saved word', word);

                if (!word) {
                    return res.status(400).json({
                        message: 'Schema error'
                    });
                }

                word.save()
                    .then(() => {
                        return res.status(201).json({
                            id: word._id,
                            message: 'Word added'
                        });
                    })
                    .catch(err => {
                        console.log('error while adding word', err);
                        return res.status(400).json({
                            err,
                            message: 'Word not added'
                        });
                    });
            });
        } else
            return res.status(res.code ?? 500).json({
                message: 'Translation error. Word not added',
                code: 500,
                ...res.err
            });
    });
};

const updateWord = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update'
        });
    }

    Word.findOne({ _id: req.params.id }, (err, word) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Word not found!'
            });
        }
        word.pl = body.pl;
        word.en = body.en;
        word.definition = body.definition;
        word.category = body.category;
        word.wordType = body.wordType;
        word.save()
            .then(() => {
                return res.status(200).json({
                    id: word._id,
                    message: 'Word updated!'
                });
            })
            .catch(error => {
                return res.status(500).json({
                    error,
                    message: 'Word not updated!'
                });
            });
    });
};

const deleteWord = async (req, res) => {
    await Word.findOneAndDelete({ _id: req.params.id })
        .exec()
        .then(word => {
            if (!word) {
                return res.status(404).json({ message: 'Word not found', code: 404 });
            }
            return res.status(200).json({ message: 'Word was deleted', data: word });
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({ message: err, code: 400 });
        });
};

const getWordById = async (req, res) => {
    await Word.findOne({ _id: req.params.id }, (err, word) => {
        if (err) {
            return res.status(400).json({ message: err, code: 400 });
        }
        if (!word) {
            return res.status(404).json({ message: `Word not found`, code: 404 });
        }

        return res.status(200).json(word);
    }).catch(err => console.log(err));
};

const getWordDetailsById = async (req, res) => {
    await Word.findOne({ _id: req.params.id }, (err, word) => {
        if (err) {
            return res.status(400).json({ message: err, code: 400 });
        }
        if (!word) {
            return res.status(404).json({ message: `Word not found`, code: 404 });
        }

        const googleDictionaryApi = require('google-dictionary-api');

        googleDictionaryApi
            .search(word.en, 'en')
            .then(results => {
                console.log(results[0].meaning, {
                    word,
                    ...results[0].meaning
                });
                return res.status(200).json({ word, ...results[0].meaning });
            })
            .catch(error => {
                console.log('google-dictionary-api error', error);
                return res.status(200).json({ word: word });
            });
    }).catch(err => console.log(err));
};

const getWordByText = async (req, res) => {
    await Word.findOne({ [req.params.lang]: req.params.text }, (err, word) => {
        if (err) {
            return res.status(400).json({ message: err, code: 400 });
        }
        if (!word) {
            return res.status(404).json({ message: `Word not found`, code: 404 });
        }

        const googleDictionaryApi = require('google-dictionary-api');

        googleDictionaryApi
            .search('fill', 'en')
            .then(results => {
                console.log(results[0].meaning);
            })
            .catch(error => {
                console.log(error);
            });

        return res.status(200).json(word);
    }).catch(err => console.log(err));
};

const getWords = async (req, res) => {
    await Word.find({}, (err, words) => {
        if (err) {
            return res.status(400).json({ message: err, code: 400 });
        }
        return res.status(200).json(words);
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
