const { Player } = require('./player');
const { UUIDToUsername } = require('./utility');

let inGame = false;
let players = [];

const startGame = async (uuids) => {
    // Register all the Players.
    uuids = uuids.split(',');
    players = [];
    for (const uuid of uuids) {
        const username = await UUIDToUsername(uuid);
        players.push(new Player(username, uuid));
    }

    // Set game state to true.
    setInGame(true);
};

const endGame = () => {
    setInGame(false);
};

const setInGame = (value) => {
    inGame = value;
};

const isInGame = () => {
    return inGame;
};

const getPlayers = () => {
    return players;
};


module.exports = {
    setInGame,
    isInGame,
    startGame,
    endGame,
    getPlayers,
};