class Player {
    constructor(username, uuid, elo) {
        this.username = username;
        this.uuid = uuid;
        this.kills = [];
        this.died = false;
        this.elo = elo;
    }

    setElo(newElo) {
        this.elo = newElo;
    }

}

module.exports = {
    Player,
};