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

const killedByPlayer = (victim, killer) => {
    victim = getPlayerByUsername(victim);
    killer = getPlayerByUsername(killer);
    victim.died = true;
    killer.kills.push(victim.username);
    console.log(victim);
    console.log(killer);
};

const killedByNaturalCauses = (victim) => {
    victim = getPlayerByUsername(victim);
    victim.died = true;
    console.log(victim);
};

const isPlayerInGame = (username) => {
    return players.some(player => {
        if (player.username === username) {
            return true;
        }
        return false;
    });
};

const getPlayerByUsername = (username) => {
    return players.find(player => player.username === username);
};


module.exports = {
    setInGame,
    isInGame,
    startGame,
    endGame,
    getPlayers,
    isPlayerInGame,
    killedByPlayer,
    killedByNaturalCauses,
};