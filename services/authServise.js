const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretWord = 'wertgf789fdghmh043@';

async function register(username, email, password) {

    const existingUsername = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    const existingEmail = await User.findOne({ email }).collation({ locale: "en", strength: 2 });

    if (existingUsername) {
        throw new Error('Username is taken !');
    } else if (existingEmail) {
        throw new Error('The email is already registried !');
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User.create({ username, email, hashedPass });

    const token = createSession(user);

    return token;
};

module.exports = {
    register,
    login,
    verifyToken
}