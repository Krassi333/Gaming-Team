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

async function addBuyer(gameId, userId) {
    const game = await Game.findById(gameId);
    game.bouthBy.push(userId.toString());
    console.log(game.bouthBy);
    return game.save();
}

async function searchRezults(searchName, searchPlatform) {
    if (!searchName && !searchPlatform) {
        return await Game.find({}).lean();
    } else {
        return await Game.find({ name: searchName, platform: searchPlatform }).collation({ locale: 'en', strength: 2 }).lean();
    }

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