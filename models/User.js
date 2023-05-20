const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true, minlength: [5, "Username must be at least 5 characters long ! "] },
    email: { type: String, required: true, minlength: [10, "Emai must be at least 10 characters long !"] },
    hashedPass: { type: String, required: true, minlength: [4, "Password must be at least 4 characters long !"] }
});

const User = model('User', userSchema);

module.exports = User;