const { isGuest } = require('../midllewares/guards');
const { register, login } = require('../services/authServise');
const errorParser = require('../util/errorParser');

const router = require('express').Router();

router.get('/register', isGuest(),async (req, res) => {
    res.render('register', {
        title: "Register Page"
    })
});

module.exports = router;