const { hasUser } = require('../midllewares/guards');
const { getAllGames, create, findById, deleteGame, edit, addBuyer, searchRezults } = require('../services/gameServices');
const errorParser = require('../util/errorParser');

const router = require('express').Router();

router.get('/create', hasUser(), (req, res) => {
    const user = req.cookies.token;

    res.render('create', {
        title: 'Create Page',
        user
    })
});

module.exports = router;