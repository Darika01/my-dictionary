const Word = require('../models/word.model');

const createWord = (req, res) => {
    let body = req.body;
    if (!body) {
        return res.status(400).json({
            // success: false,
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

    const translateAndSave = () => {
        const translateWord = async (text, langTo) => {
            const translate = require('translation-google');
            return await translate(text, { to: langTo })
                .then(res => {
                    // console.log(res.text);
                    // console.log(res.from.language.iso);
                    return {
                        langFrom: res.from.language.iso,
                        translatedText: res.text
                    };
                })
                .catch(err => {
                    console.error(err);
                    return res.status(err.code).json({
                        err,
                        message: 'Translation error. Word not added'
                    });
                });
        };

        translateWord(body.text, body.langTo).then(translatedRes => {
            body.langFrom = translatedRes.langFrom;
            body.translatedText = translatedRes.translatedText;

            let wd = require('word-definition');
            wd.getDef(body.text, translatedRes.langFrom, { exact: false }, definitionRes => {
                const data = {
                    [body.langFrom]: body.text,
                    [body.langTo]: translatedRes.translatedText,
                    wordType: body.wordType,
                    definition: definitionRes?.definition ?? null,
                    category: definitionRes?.category ?? null
                };

                console.log('data to save', data);
                const word = new Word(data);
                console.log('saved word', word);

                if (!word) {
                    return res.status(400).json({
                        message: 'Schema error'
                    });
                    // return res.status(400).json({ error: err });
                }

                word.save()
                    .then(() => {
                        return res.status(201).json({
                            // success: true,
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
        });
    };
    translateAndSave();
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
        word.name = body.name;
        // word.time = body.time;
        // word.rating = body.rating;
        word.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: word._id,
                    message: 'Word updated!'
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Word not updated!'
                });
            });
    });
};

const deleteWord = async (req, res) => {
    await Word.findOneAndDelete({ _id: req.params.id }, (err, word) => {
        if (err) {
            return res.status(400).json({ message: err, code: 400 });
        }
        if (!word) {
            return res.status(404).json({ message: 'Word not found', code: 404 });
        }

        return res.status(200).json({ message: 'Word was deleted', data: word });
    }).catch(err => console.log(err));
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
                console.log(results[0].meaning, { word, ...results[0].meaning });
                return res.status(200).json({ word, ...results[0].meaning });
            })
            .catch(error => {
                console.log(error);
                return res.status(200).json(word);
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
        // if (words.length) {
        //     return res.status(404).json({ message: `Word not found`, code: 404 });
        // }
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
