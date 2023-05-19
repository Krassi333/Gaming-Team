const { isGuest } = require('../midllewares/guards');
const { register, login } = require('../services/authServise');
const errorParser = require('../util/errorParser');

const router = require('express').Router();

router.get('/register', isGuest(),async (req, res) => {
    res.render('register', {
        title: "Register Page"
    })
});

router.post('/register',  isGuest(),async (req, res) => {
    const data = req.body;

    try {
        if (data.password != data.repass) {
            throw new Error('Passwords don\'t match !');
        }

        const token = await register(data.username, data.email, data.password);

        res.cookie('token', token);

        res.redirect('/');

    } catch (err) {
        const errors = errorParser(err);

        res.render('register', {
            title: 'Register Page',
            errors,
            data

        })
    }
});

module.exports = router;