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

router.post('/create', hasUser(), async (req, res) => {
    const game = {
        name: req.body.name,
        image: req.body.image,
        price: Number(req.body.price),
        description: req.body.description,
        genre: req.body.genre,
        platform: req.body.platform,
        owner: req.user._id
    }

    try {
        await create(game);
        res.redirect('/game/catalog');
    } catch (err) {
        const errors = errorParser(err);
        const user = req.cookies.token;

        res.render('create', {
            title: "Create Page",
            user,
            errors
        })
    }
});


router.get('/catalog', async (req, res) => {
    const games = await getAllGames();


    res.render('catalog', {
        title: 'Catalog Page',
        games
    });
});

router.get('/:id/details', async (req, res) => {
    const game = await findById(req.params.id);
    const user = req.cookies.token;

    if (req.user) {
        if (req.user._id.toString() == game.owner.toString()) {
            game.isOwner = true;
        }

        if (game.bouthBy.map(x => x.toString()).includes(req.user._id.toString())) {
            game.alreadyBuyd = true;
        } else {
            game.canBuy = true;
        }
    }

    //console.log(game.alreadyBuyd);
   // console.log(game.canBuy);

    res.render('details', {
        title: 'Details Page',
        game,
        user
    })
});

router.get('/:id/delete', hasUser(), async (req, res) => {
    const game = await findById(req.params.id);

    if (!req.user || req.user._id.toString() != game.owner.toString()) {
        res.redirect('/auth/login');
        return;
    }
    await deleteGame(req.params.id);
    res.redirect('/game/catalog');
});
module.exports = router;