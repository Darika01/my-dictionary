const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlRuWord = new Schema(
    {
        word: {
            text: { type: String, required: true },
            lang: { type: String, required: true }
        },
        translation: {
            text: { type: String, required: true },
            lang: { type: String, required: true }
        },
        wordType: { type: String, enum: ['word', 'phrase', 'sentence'], required: true }
    },
    { timestamps: true }
);

// replace _id by id for front
PlRuWord.method('toJSON', function () {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('lol', PlRuWord);
module.exports = mongoose.model(process.argv.slice(2)[0] === 'test' ? 'pl-ru-test' : 'pl-ru', PlRuWord);
// module.exports = mongoose.model(process.argv.slice(2)[0] === 'test' ? 'test' : 'words', PlRuWord);
