const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const gameController = require('../controllers/gameController');
const session = require('../midllewares/session');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/game', gameController);
    app.use('*', (req, res) => {
        res.render('404');
    })
}