const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const gameController = require('../controllers/gameController');
const session = require('../midllewares/session');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth',session(), authController);
    app.use('/game',session(), gameController);
}