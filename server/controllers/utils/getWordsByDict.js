const getWordsByDict = async (req, res, ModelName, langFrom, langTo) => {
    await ModelName.find({ 'word.lang': langFrom, 'translation.lang': langTo })
        .sort({ updatedAt: -1 })
        .exec()
        .then(words => {
            return res.status(200).json(words);
        })
        .catch(err => {
            return res.status(err).json({ message: err, code: 400 });
        });
};
module.exports = getWordsByDict;
