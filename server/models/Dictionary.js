const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Dictionary = new Schema(
    {
        langFrom: { type: String, required: true },
        langTo: { type: String, required: true },
        name: { type: String, required: true },
        words: [
            {
                type: Schema.Types.ObjectId,
                ref: process.argv.slice(2)[0] === 'test' ? 'Word-test' : 'Word'
            }
        ]
    },
    { timestamps: true }
);

Dictionary.method('toJSON', function () {
    // eslint-disable-next-line no-invalid-this
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model(process.argv.slice(2)[0] === 'test' ? 'Dictionary-test' : 'Dictionary', Dictionary);
