class Player {
    constructor(username, uuid) {
        this.username = username;
        this.uuid = uuid;
        this.kills = [];
        this.died = false;
        this.elo = 1000;
    }

    setElo(newElo) {
        this.elo = newElo;
    }
}

module.exports = {
    Player,
};