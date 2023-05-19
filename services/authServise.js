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

async function login(email, password) {
    if (email == '' || password == '') {
        throw new Error('All fields are required!');
    }
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
   // console.log('user : '+user);
    if (!user) {
        throw new Error('Incorrect email or password!');
    }
    const passChech = await bcrypt.compare(password, user.hashedPass);

    if (!passChech) {
        throw new Error('Incorrect email or password!');
    }

    const token = createSession(user);
    return token;
}


function createSession({ _id, email, username }) {
    const payload = {
        _id,
        email,
        username
    }

    const token = jwt.sign(payload, secretWord);

    return token;
};

function verifyToken(token) {
    //console.log('verifytoken '+jwt.verify(token, secretWord));
    return jwt.verify(token, secretWord);
};


module.exports = {
    register,
    login,
    verifyToken
}