const Game = require("../models/Game");

async function getAllGames() {
    return Game.find({}).lean();
}

async function create(game) {
    return Game.create(game);
}

async function findById(id) {
    return Game.findById(id).lean();
}

async function deleteGame(id) {
    return Game.findByIdAndDelete(id);
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