const Dictionary = require('../../models/Dictionary');

const findDict = (dictName, res) =>
    Dictionary.findOne({ name: dictName }, (err, dict) => {
        if (err) return res.status(500).json(err);
        if (!dict) return res.status(404).json({ message: 'Dictionary not found' });
        return dict;
    });

module.exports = findDict;
