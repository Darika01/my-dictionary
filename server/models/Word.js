const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Word = new Schema(
    {
        wordText: { type: String, required: true },
        translationText: { type: String, required: true },
        definition: { type: String, required: false },
        category: { type: String, required: false },
        phonetic: { type: String, required: false },
        phoneticAudio: { type: String, required: false },
        wordType: { type: String, enum: ['word', 'phrase', 'sentence'], required: true },
        dictionary: {
            type: Schema.Types.ObjectId,
            ref: process.argv.slice(2)[0] === 'test' ? 'Dictionary-test' : 'Dictionary',
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: process.argv.slice(2)[0] === 'test' ? 'User-test' : 'User',
            required: true
        }
    },
    { timestamps: true }
);

Word.method('toJSON', function () {
    // eslint-disable-next-line no-invalid-this
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model(process.argv.slice(2)[0] === 'test' ? 'Word-test' : 'Word', Word);
