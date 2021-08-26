const Word = require('../models/word.model');
const translate = require('translation-google');
const axios = require('axios');

const getGoogleTranslateApi = word => `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

const createWord = (req, res) => {
    let body = req.body;
    if (body.wordType === 'word') body.text = body.text.charAt(0).toLowerCase() + body.text.slice(1);
    if (!body) {
        return res.status(400).json({
            error: 'You must provide a word'
        });
    }

    const googleDictionaryApi = getGoogleTranslateApi(body.text);

    axios
        .get(googleDictionaryApi)
        .then(googleRes => {
            translate(body.text, { to: body.langTo })
                .then(translationRes => {
                    const data = {
                        // [translationRes.from.language.iso.langFrom]: body.text,
                        en: body.text,
                        [body.langTo]: translationRes.text,
                        wordType: body.wordType,
                        definition: body.definition
                            ? body.definition
                            : googleRes.data[0].meanings[0].definitions[0].definition ?? null,
                        category: googleRes.data[0].meanings[0].partOfSpeech ?? null
                    };

                    const word = new Word(data);

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
        })
        .catch(googleError => {
            return res.status(404).json({
                code: 404,
                message: 'Google definition error. Word not added'
            });
        });

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
};

const updateWord = async (req, res) => {
    const body = req.body;
    const word = new Word(req.body);
    if (!body) {
        return res.status(400).json({
            message: 'You must provide a body to update'
        });
    }

    Word.findOne({ _id: req.params.id })
        .exec()
        .then(word => {
            if (!word) {
                return res.status(404).json({ message: `Word not found`, code: 404 });
            }
            word.pl = body.pl;
            word.en = body.en;
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
            return res.status(500).json(err);
        });
};

const getWordById = async (req, res) => {
    await Word.findOne({ _id: req.params.id }, (err, word) => {
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
    await Word.findOne({ _id: req.params.id })
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
    await Word.findOne({ [req.params.lang]: req.params.text }, (err, word) => {
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

const getWords = async (req, res) => {
    await Word.find({})
        .sort({ updatedAt: -1 })
        .exec()
        .then(words => {
            return res.status(200).json(words);
        })
        .catch(err => {
            return res.status(err).json({ message: err, code: 400 });
        });
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
