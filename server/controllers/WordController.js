const translate = require('translation-google');
const Word = require('../models/Word');
const getGoogleTranslateApi = require('./utils/getGoogleTranslateApi');
const axios = require('axios');
const findDict = require('./utils/findDict');
const User = require('../models/User');

const translateWord = (res, body, langFrom, langTo, dict, user) => {
    translate(body.wordText, { from: langFrom, to: langTo })
        .then(translationRes => {
            if (translationRes.from.language.iso !== langFrom) {
                return res.status(400).json({
                    message: 'Translation error. Word not added'
                });
            }

            body.translationText = translationRes.text.charAt(0).toLowerCase() + translationRes.text.slice(1);

            const word = new Word(body);
            word.dictionary = { _id: dict._id };
            word.author = { _id: user._id };
            console.log(`word`, word);

            if (!word) {
                return res.status(400).json({
                    message: 'Schema error'
                });
            }

            word.save((err, wordRes) => {
                if (err) return res.status(400).json(err);

                dict.words.push(wordRes._id);
                dict.save((err, dictRes) => {
                    if (err) return res.status(400).json(err);
                    user.words.push(wordRes._id);
                    user.save((err, userRes) => {
                        if (err) return res.status(400).json(err);
                        return res.status(201).json({
                            message: 'Word added',
                            data: word
                        });
                    });
                });
            });
        })
        .catch(translationError =>
            res.status(translationError.code ?? 500).json({
                message: translationError.message ?? 'Translation error. Word not added',
                ...translationError
            })
        );
};

const create = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'UNAUTHORIZED' });
    }

    const user = await User.findById(req.user.id);
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            error: 'You must provide a word'
        });
    }

    if (body.wordType === 'word') body.wordText = body.wordText.charAt(0).toLowerCase() + body.wordText.slice(1);

    const dict = await findDict(req.params.dictName, res);
    if (!dict) return;
    const langFrom = req.params.dictName.split('-')[0];
    const langTo = req.params.dictName.split('-')[1];

    if (body.wordType === 'word' && langFrom === 'en') {
        const googleDictionaryApi = getGoogleTranslateApi(body.wordText);
        axios
            .get(googleDictionaryApi)
            .then(googleRes => {
                body.definition = body.definition
                    ? body.definition
                    : googleRes?.data[0].meanings[0].definitions[0].definition ?? null;
                body.category = googleRes?.data[0].meanings[0].partOfSpeech ?? null;
                body.phonetic = googleRes?.data[0].phonetic ?? null;
                body.phoneticAudio = googleRes?.data[0].phonetics[0].audio ?? null;
                console.log('body :>> ', body);
                translateWord(res, body, langFrom, langTo, dict, user);
            })
            .catch(() =>
                res.status(404).json({
                    code: 404,
                    message: 'Google definition error. Word not added'
                })
            );
    } else translateWord(res, body, langFrom, langTo, dict, user);
};

const update = async (req, res) => {
    const body = req.body;
    if (!req.body) {
        return res.status(400).json({
            message: 'You must provide a body to update'
        });
    }
    const langFrom = req.params.dictName.split('-')[0];
    const dict = await findDict(req.params.dictName, res);
    if (!dict) return;
    Word.findOne({ _id: req.params.id, dictionary: dict._id }, (err, word) => {
        if (err) return res.status(500).json(err);
        if (!word) {
            return res.status(404).json({ message: `Word not found` });
        }

        if (langFrom === 'en') {
            word.translationText = body.translationText;
            word.definition = body.definition;
            word.category = body.category;
            word.wordType = body.wordType;
        } else {
            word.translationText = body.translationText;
            word.wordType = body.wordType;
        }
        console.log('word :>> ', word);
        word.save(err => {
            if (err) return res.status(500).json(err);
            return res.status(200).json({
                message: 'Word updated!',
                data: word
            });
        });
    });
};

const getById = async (req, res) => {
    const dict = await findDict(req.params.dictName, res);
    if (!dict) return;
    await Word.findOne({ _id: req.params.id, dictionary: dict._id }, (err, word) => {
        if (err) return res.status(400).json(err);
        if (!word) return res.status(404).json({ message: 'Word not found' });

        if (dict.langFrom === 'en') {
            const googleDictionaryApi = getGoogleTranslateApi(word.wordText);
            return axios
                .get(googleDictionaryApi)
                .then(googleRes => {
                    const wordData = {
                        wordText: word.wordText,
                        translationText: word.translationText,
                        wordType: word.wordType,
                        definition: word.definition,
                        phonetic: googleRes.data[0].phonetic,
                        phoneticAudio: googleRes.data[0].phonetics[0]?.audio,
                        meanings: googleRes.data[0].meanings
                    };
                    return res.status(200).json(wordData);
                })
                .catch(() => res.status(200).json({ word }));
        }
        return res.status(200).json(word);
    }).catch(err => console.log(err));
};

const deleteById = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'UNAUTHORIZED' });
    }
    const dict = await findDict(req.params.dictName, res);
    const user = await User.findById(req.user.id);

    if (!dict) return;

    await Word.findOneAndDelete({ _id: req.params.id })
        .exec()
        .then(word => {
            if (!word) {
                return res.status(404).json({ message: 'Word not found' });
            }
            dict.words.pull({ _id: req.params.id });
            dict.save((err, dictRes) => {
                if (err) return res.status(500).json(err);
                user.words.pull({ _id: req.params.id });
                user.save((err, userRes) => {
                    if (err) return res.status(500).json(err);
                    // return res.status(200).json({ message: 'Word was deleted', data: word });
                    if (err) return res.status(500).json(err);
                    return res.status(200).json({ message: 'Word was deleted', data: word });
                });
            });
        })
        .catch(err => res.status(500).json(err));
};

const getAll = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'UNAUTHORIZED' });
    }
    try {
        const user = await User.findById(req.user?.id);
        await Word.find({ author: user._id })
            .sort({ updatedAt: -1 })
            .exec()
            .then(data => {
                console.log('BBBBB', data);
                res.status(200).json(data);
            })
            .catch(err => res.status(err).json({ message: err }));
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: 'Server Error'
        });
    }
};

module.exports = {
    create,
    update,
    getById,
    deleteById,
    getAll
};
