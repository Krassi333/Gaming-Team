const Game = require("../models/Game");

async function getAllGames() {
    return Game.find({}).lean();
}

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