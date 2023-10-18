const { Schema, model } = require('mongoose');

const networkSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            type: Number,
            min: [1, 'Too few eggs'],
            max: 280
        }
    }
)