const { Schema, model, Types } = require('mongoose');
const User = require('./User');

const urlPattern = /https?:\/\/./i;

const gameSchema = new Schema({
    name: { type: String, require: true, minlength: [4, 'Name must be at least 4 characters long!'] },
    image: {
        type: String, required: true, validate: {
            validator: (value) => urlPattern.test(value),
            message: 'Invalid URL!'
        }
    },
    price: {
        type: Number, required: true, validate: {
            validator: (value) => value > 0,
            message: 'Price must be positive number!'
        }
    },
    description: { type: String, required: true, minlength: [10, 'Description must be at least 10 characters long!'] },
    genre: { type: String, required: true, minlength: [2, 'Genre must be at least 2 characters long!'] },
    platform: { type: String, required: true, enum: ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'] },
    bouthBy: { type: [Types.ObjectId], ref: User, default: [] },
    owner: { type: [Types.ObjectId], ref: User }
})

gameSchema.index({ name: 1, platform: 1 }, {
    colattion: {
        locale: 'en',
        strength: 2
    }
});

const Game = model('Game', gameSchema);

module.exports = Game;