const Dictionary = require('../models/Dictionary');

const create = async (req, res) => {
    const body = req.body;
    body.name = body.langFrom + '-' + body.langTo;
    console.log(`body`, body);
    const dictionary = new Dictionary(body);

    if (!dictionary) {
        return res.status(400).json({
            message: 'Schema error'
        });
    }

    Dictionary.findOne({ langFrom: body.langFrom, langTo: body.langTo })
        .exec()
        .then(dict => {
            if (dict) {
                return res.status(400).json({ message: 'Dictionary already exists' });
            }
            dictionary
                .save()
                .then(() =>
                    res.status(201).json({
                        message: 'Dictionary added',
                        data: dictionary
                    })
                )
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(500).json(err));
};

const getAll = async (req, res) => {
    await Dictionary.find()
        .sort({ updatedAt: -1 })
        .exec()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(err).json({ message: err }));
};

const getAllWords = async (req, res) => {
    await Dictionary.findOne({ name: req.params.dictName })
        .populate('words')
        .sort({ updatedAt: -1 })
        .exec((err, data) => {
            if (err) return res.status(err).json({ message: err });
            if (!data) return res.status(404).json({ message: 'Dictionary not found' });
            return res.status(200).json(data.words);
        });
    // .then(data => res.status(200).json(data))
    // .catch(err => res.status(err).json({ message: err }));
};

module.exports = {
    create,
    getAll,
    getAllWords
};
