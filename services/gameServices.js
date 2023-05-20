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

async function edit(id, data) {
    const game = await Game.findById(id);

    game.name = data.name;
    game.image = data.image;
    game.price = data.price;
    game.description = data.description;
    game.genre = data.genre;
    game.platform = data.platform;

    return game.save();
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