const translate = require('translation-google');
const axios = require('axios');
const getGoogleTranslateApi = require('../utils/getGoogleTranslateApi');
const EnPlWord = require('../../models/enPlWordModel');

const createNewWord = (req, res) => {
    let body = req.body;
    if (body.wordType === 'word') body.wordText = body.wordText.charAt(0).toLowerCase() + body.wordText.slice(1);
    if (!body) {
        return res.status(400).json({
            error: 'You must provide a word'
        });
    }

    const googleDictionaryApi = getGoogleTranslateApi(body.wordText);

    const translateWord = (body, googleRes) => {
        translate(body.wordText, { from: 'en', to: body.translationLang })
            .then(translationRes => {
                const data = {
                    // [translationRes.from.language.iso.langFrom]: body.wordText,
                    word: {
                        text: body.wordText,
                        lang: 'en'
                    },
                    translation: {
                        text: translationRes.text.charAt(0).toLowerCase() + translationRes.text.slice(1),
                        lang: body.translationLang
                    },
                    wordType: body.wordType,
                    definition: body.definition
                        ? body.definition
                        : googleRes?.data[0].meanings[0].definitions[0].definition ?? null,
                    category: googleRes?.data[0].meanings[0].partOfSpeech ?? null,
                    phonetic: googleRes?.data[0].phonetic ?? null,
                    phoneticAudio: googleRes?.data[0].phonetics[0].audio ?? null
                };

                const word = new EnPlWord(data);

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
    };

    if (body.wordType === 'word')
        axios
            .get(googleDictionaryApi)
            .then(googleRes => {
                translateWord(body, googleRes);
            })
            .catch(googleError => {
                return res.status(404).json({
                    code: 404,
                    message: 'Google definition error. Word not added'
                });
            });
    else translateWord(body);

    // EnPlWord.findOne({ en: body.wordText }, (err, word) => {
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
module.exports = createNewWord;
