const { Schema, model } = require('mongoose');

const networkSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Not a valid email!"]
            
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
    });
        networkSchema
        .virtual('friendcount')
          // Getter
          .get(function () {
              return this.friends.length;
          });

   
const User = model('user', networkSchema);
  
module.exports = networkSchema;