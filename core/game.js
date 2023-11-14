const { Player } = require('./player');
const { UUIDToUsername } = require('./utility');

let inGame = false;
let players = [];
let placement = [];

const startGame = async (uuids) => {
    // Register all the Players.
    uuids = uuids.split(',');
    players = [];
    placement = [];
    for (const uuid of uuids) {
        if (uuid === '5ebbbc83-a7e8-4bcf-9045-2f92fa539cff') {
            console.log('found cayci');
            continue;
        }
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
    placement.unshift(victim.username);
    console.log(placement);
};

const killedByNaturalCauses = (victim) => {
    victim = getPlayerByUsername(victim);
    victim.died = true;
    placement.unshift(victim.username);
    console.log(placement);
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

const removePlayerFromGame = (username) => {
    players = players.filter(player => player.username !== username);
    console.log(players);
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
    removePlayerFromGame,
};