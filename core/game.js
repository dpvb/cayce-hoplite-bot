const { UUIDToUsername } = require('./utility');

let inGame = false;
let players = [];

const startGame = async (uuids) => {
    setInGame(true);
    uuids = uuids.split(',');
    players = [];
    for (const uuid of uuids) {
        const username = await UUIDToUsername(uuid);
        players.push(username);
    }
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