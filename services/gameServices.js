const Game = require("../models/Game");
async function create(game) {
    return Game.create(game);
}

module.exports = {
    getAllGames,
    create,
    findById,
    deleteGame,
    edit,
    addBuyer,
    searchRezults
}