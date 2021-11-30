const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            minLength: 4
        },
        dictionary: {
            type: Schema.Types.ObjectId,
            ref: process.argv.slice(2)[0] === 'test' ? 'Dictionary-test' : 'Dictionary'
            // required: true
        },
        words: [
            {
                type: Schema.Types.ObjectId,
                ref: process.argv.slice(2)[0] === 'test' ? 'Word-test' : 'Word'
            }
        ]
    },
    { timestamps: true }
);

User.method('toJSON', function () {
    // eslint-disable-next-line no-invalid-this
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model(process.argv.slice(2)[0] === 'test' ? 'User-test' : 'User', User);
