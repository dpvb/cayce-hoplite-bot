const { calcDeathToNCElo, calcKillElo, calcDeathToPlayerElo, calcPlacementEloGain, calcWinnerEloGain } = require('./elo');
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

const endGame = (winner) => {
    // Place the winner in the first placement spot.
    placement.unshift(winner);
    // Calculate placement elo gain for every player.
    for (let i = 0; i < placement.length; i++) {
        const currPlayer = getPlayerByUsername(placement[i]);
        const currPlayerElo = currPlayer.elo;
        let currPlayerEloGain = 0;
        for (let j = i + 1; j < placement.length; j++) {
            const victim = getPlayerByUsername(placement[j]);
            const victimElo = victim.elo;
            const eloGain = calcPlacementEloGain(currPlayerElo, victimElo);
            victim.elo = victimElo - eloGain;
            currPlayerEloGain += eloGain;
            console.log(`${currPlayer.username} placed above ${victim.username}. Elo: ${currPlayerElo} -> ${currPlayerElo + currPlayerEloGain} | ${victimElo} -> ${victim.elo}`);
        }
        currPlayer.elo += currPlayerEloGain;
    }
    // Calculate winner elo gain for the winner.
    const winnerPlayer = getPlayerByUsername(winner);
    let winnerEloGain = 0;
    for (let i = 1; i < placement.length; i++) {
        const loser = getPlayerByUsername(placement[i]);
        const loserElo = loser.elo;
        const eloGain = calcWinnerEloGain(winnerPlayer.elo, loserElo);
        loser.elo = loserElo - eloGain;
        winnerEloGain += eloGain;
        console.log(`${winnerPlayer.username} won against ${loser.username}. Elo: ${winnerPlayer.elo} -> ${winnerPlayer.elo + eloGain} | ${loserElo} -> ${loser.elo}`);
    }
    winnerPlayer.elo += winnerEloGain;

    // Round all elos and print them out.
    for (const player of players) {
        player.elo = Math.round(player.elo);
        console.log(`${player.username} - ${player.elo}`);
    }

    // Set game state to false.
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
    // Get the players.
    victim = getPlayerByUsername(victim);
    killer = getPlayerByUsername(killer);
    // Set the victim to died.
    victim.died = true;
    // Add the kill to the killer.
    killer.kills.push(victim.username);
    // Add the victim to the placement.
    placement.unshift(victim.username);
    // Calculate the new elo for the killer.
    const newKillerElo = calcKillElo(killer.elo, victim.elo);
    // Calculate the new elo for the victim.
    const newVictimElo = calcDeathToPlayerElo(victim.elo, killer.elo);
    // Print out the updated elos.
    console.log(`${killer.username} killed ${victim.username}. Elo: ${killer.elo} -> ${newKillerElo} | ${victim.elo} -> ${newVictimElo}`);
    // Set the new elos.
    killer.elo = newKillerElo;
    victim.elo = newVictimElo;
};

const killedByNaturalCauses = (victim) => {
    // Add the victim to the placement.
    victim = getPlayerByUsername(victim);
    // Set the victim to died.
    victim.died = true;
    // Add the victim to placement.
    placement.unshift(victim.username);
    // Deduct elo from this player.
    const newElo = calcDeathToNCElo(victim.elo);
    console.log(`${victim.username} died to natural causes. Elo: ${victim.elo} -> ${newElo}`);
    victim.elo = newElo;
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