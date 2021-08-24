const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Word = new Schema(
    {
        pl: { type: String, required: true },
        en: { type: String, required: true },
        definition: { type: String, required: false },
        category: { type: String, required: false },
        wordType: { type: String, enum: ['word', 'phrase', 'sentence'], required: true }
    },
    { timestamps: true }
);

// replace _id by id for front
Word.method('toJSON', function () {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('words', Word);
