const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
    reactionBody: {
        type: String, required: true,
        maxlength: 280
    },
    username: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => {
            if (date) return date.toIOSString().split("T")[0];
        },
    }
});

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: [1, 'Too few characters'],
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    });


const thought = model('thought', thoughtSchema);

module.exports = thought;